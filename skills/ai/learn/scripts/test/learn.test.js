const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { mkdtempSync, readFileSync, rmSync, writeFileSync, copyFileSync } = require("node:fs");
const { readdir, readFile } = require("node:fs/promises");
const { tmpdir } = require("node:os");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..", "..", "..", "..", "..");
const cliPath = path.join(repoRoot, "skills", "ai", "learn", "scripts", "dist", "learn.js");
const fixturePath = path.join(repoRoot, "skills", "ai", "learn", "scripts", "fixtures", "sample-learning.json");
const skillRoot = path.join(repoRoot, "skills", "ai", "learn");

function forbiddenLexemes() {
  return [
    [0x74, 0x61, 0x73, 0x74, 0x65],
    [0x54, 0x61, 0x73, 0x74, 0x65],
    [0x63, 0x6f, 0x6d, 0x6d, 0x61, 0x6e, 0x64, 0x63, 0x6f, 0x64, 0x65],
    [0x43, 0x6f, 0x6d, 0x6d, 0x61, 0x6e, 0x64, 0x43, 0x6f, 0x64, 0x65],
    [0x43, 0x6f, 0x6d, 0x6d, 0x61, 0x6e, 0x64, 0x20, 0x43, 0x6f, 0x64, 0x65],
  ].map((codes) => String.fromCharCode(...codes));
}

async function listFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      return listFiles(full);
    }
    return [full];
  }));
  return files.flat();
}

function runCli(args, options = {}) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    input: options.input,
    env: options.env ? { ...process.env, ...options.env } : process.env,
  });
}

function parseJson(stdout) {
  return JSON.parse(stdout);
}

function tempHome() {
  return mkdtempSync(path.join(tmpdir(), "learn-cli-test-"));
}

test("skill artifacts avoid prohibited source and concept names", async () => {
  const scannedRoots = [
    skillRoot,
    path.join(repoRoot, "skills", "ai", "SKILL.md"),
    path.join(repoRoot, "skills", "ai", "AGENTS.md"),
    path.join(repoRoot, "skills", "ai", "README.md"),
    path.join(repoRoot, "skills", "ai", "metadata.json"),
  ];
  const files = [];

  for (const root of scannedRoots) {
    if (root.endsWith(".md") || root.endsWith(".json")) {
      files.push(root);
    } else {
      files.push(...await listFiles(root));
    }
  }

  const ignored = new Set([
    path.join(skillRoot, "scripts", "test", "learn.test.js"),
  ]);
  const textExtensions = new Set([".md", ".json", ".ts", ".js"]);

  for (const file of files) {
    if (ignored.has(file) || !textExtensions.has(path.extname(file))) {
      continue;
    }
    const content = await readFile(file, "utf8");
    for (const lexeme of forbiddenLexemes()) {
      assert.equal(content.includes(lexeme), false, `${path.relative(repoRoot, file)} contains prohibited text`);
    }
  }
});

test("template prints the complete learning input shape", () => {
  const result = runCli(["template"]);
  assert.equal(result.status, 0, result.stderr);

  const template = parseJson(result.stdout);
  for (const field of [
    "title",
    "category",
    "trigger",
    "correction",
    "preferredStrategy",
    "generalizedRule",
    "zpdScaffold",
    "evidence",
    "scope",
    "confidence",
  ]) {
    assert.ok(Object.hasOwn(template, field), `missing ${field}`);
  }
  assert.ok(Array.isArray(template.evidence));
});

test("help and unknown commands return structured JSON", () => {
  const help = runCli(["help"]);
  assert.equal(help.status, 0, help.stderr);
  assert.equal(parseJson(help.stdout).commands.add, "Write one RDF/Turtle learning and regenerate STEERING.md.");

  const unknown = runCli(["not-a-command"]);
  assert.notEqual(unknown.status, 0);
  const error = parseJson(unknown.stderr);
  assert.equal(error.status, "error");
  assert.match(error.error, /Unknown command/);
});

test("init uses AGENTS_HOME when no home option is provided", () => {
  const home = tempHome();
  try {
    const result = runCli(["init"], { env: { AGENTS_HOME: home } });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(parseJson(result.stdout).home, home);
    assert.match(readFileSync(path.join(home, "STEERING.md"), "utf8"), /# Agent Steering/);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test("init creates a progressive-disclosure steering index", () => {
  const home = tempHome();
  try {
    const result = runCli(["init", "--home", home]);
    assert.equal(result.status, 0, result.stderr);

    const output = parseJson(result.stdout);
    assert.equal(output.status, "success");
    assert.equal(output.entries, 0);

    const index = readFileSync(path.join(home, "STEERING.md"), "utf8");
    assert.match(index, /Load linked RDF entries only when the IF condition matches/);
    assert.match(index, /\| IF current task involves \| THEN load \| Strategy \| Confidence \| Scope \|/);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test("add writes deterministic RDF and regenerates the index", () => {
  const home = tempHome();
  try {
    runCli(["init", "--home", home]);
    const result = runCli(["add", "--home", home, "--input", fixturePath]);
    assert.equal(result.status, 0, result.stderr);

    const output = parseJson(result.stdout);
    assert.equal(output.status, "success");
    assert.equal(output.entries, 1);
    assert.match(output.rdfPath, /prefer-executable-proof-over-screenshots-c9ae19cfb7\.ttl$/);

    const rdf = readFileSync(output.rdfPath, "utf8");
    assert.match(rdf, /a steering:Learning/);
    assert.match(rdf, /steering:generalizedRule/);
    assert.match(rdf, /prov:wasDerivedFrom <memory:\/\/MEMORY\.md:1375>/);

    const index = readFileSync(path.join(home, "STEERING.md"), "utf8");
    assert.match(index, /\.steering\/evidence\/prefer-executable-proof-over-screenshots-c9ae19cfb7\.ttl/);
    assert.match(index, /When a workflow has a canonical proof command/);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test("add accepts JSON from stdin and normalizes category paths", () => {
  const home = tempHome();
  try {
    const payload = {
      title: "Prefer narrow rules",
      category: "Review Feedback",
      trigger: "broad rule requests",
      correction: "Do not turn one example into an unbounded rule.",
      preferredStrategy: "Choose the smallest safe task class.",
      generalizedRule: "Generalize feedback only to the smallest safe task class.",
      zpdScaffold: "Name the old move, the target move, and the scope boundary.",
      evidence: [{ uri: "conversation://current-thread#feedback", label: "Current correction" }],
      confidence: 0.8,
    };
    const result = runCli(["add", "--home", home, "--input", "-"], { input: JSON.stringify(payload) });
    assert.equal(result.status, 0, result.stderr);

    const output = parseJson(result.stdout);
    assert.equal(output.status, "success");
    assert.match(output.rdfPath, /[\\/]review-feedback[\\/]/);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test("add writes optional provenance labels, status, date, avoid text, and escaped index cells", () => {
  const home = tempHome();
  try {
    const payload = {
      id: "custom-learning",
      title: "Prefer quoted evidence",
      category: "Evidence",
      trigger: "quoted | trigger",
      correction: "User said \"verify\" before finalizing.",
      preferredStrategy: "Check evidence before finalizing.",
      generalizedRule: "Use provenance before summary | especially for proof claims.",
      zpdScaffold: "Pause, inspect, then summarize.\nKeep scope narrow.",
      evidence: [{ uri: "doc://steering/spec", label: "Steering spec" }],
      scope: "repo",
      confidence: 1,
      avoid: "Do not rely on unsupported proof.",
      createdAt: "2026-06-08T00:00:00.000Z",
      status: "active",
    };
    const result = runCli(["add", "--home", home, "--input", "-"], { input: JSON.stringify(payload) });
    assert.equal(result.status, 0, result.stderr);

    const output = parseJson(result.stdout);
    const rdf = readFileSync(output.rdfPath, "utf8");
    assert.match(rdf, /learn:custom-learning a steering:Learning/);
    assert.match(rdf, /User said \\"verify\\" before finalizing\./);
    assert.match(rdf, /dcterms:created "2026-06-08T00:00:00\.000Z"\^\^xsd:dateTime/);
    assert.match(rdf, /steering:avoid "Do not rely on unsupported proof\."/);
    assert.match(rdf, /# evidence-label doc:\/\/steering\/spec Steering spec/);

    const index = readFileSync(path.join(home, "STEERING.md"), "utf8");
    assert.match(index, /quoted \\\| trigger/);
    assert.match(index, /Use provenance before summary \\\| especially for proof claims\./);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test("add rejects missing input, non-objects, missing fields, bad confidence, bad dates, and malformed evidence", () => {
  const home = tempHome();
  try {
    const missingInput = runCli(["add", "--home", home]);
    assert.notEqual(missingInput.status, 0);
    assert.match(parseJson(missingInput.stderr).error, /requires --input/);

    const nonObject = runCli(["add", "--home", home, "--input", "-"], { input: "[]" });
    assert.notEqual(nonObject.status, 0);
    assert.match(parseJson(nonObject.stderr).error, /JSON object/);

    const missingField = runCli(["add", "--home", home, "--input", "-"], { input: JSON.stringify({ title: "Only title" }) });
    assert.notEqual(missingField.status, 0);
    assert.match(parseJson(missingField.stderr).error, /Missing required field/);

    const base = {
      title: "Reject invalid input",
      category: "evidence",
      trigger: "invalid input",
      correction: "Bad payloads should fail.",
      preferredStrategy: "Validate before writing.",
      generalizedRule: "Reject malformed learning payloads.",
      zpdScaffold: "Check required fields first.",
      evidence: ["memory://valid"],
    };

    const badConfidence = runCli(["add", "--home", home, "--input", "-"], {
      input: JSON.stringify({ ...base, confidence: 2 }),
    });
    assert.notEqual(badConfidence.status, 0);
    assert.match(parseJson(badConfidence.stderr).error, /confidence/);

    const badDate = runCli(["add", "--home", home, "--input", "-"], {
      input: JSON.stringify({ ...base, createdAt: "not-a-date" }),
    });
    assert.notEqual(badDate.status, 0);
    assert.match(parseJson(badDate.stderr).error, /createdAt/);

    const badEvidence = runCli(["add", "--home", home, "--input", "-"], {
      input: JSON.stringify({ ...base, evidence: [{ label: "missing URI" }] }),
    });
    assert.notEqual(badEvidence.status, 0);
    assert.match(parseJson(badEvidence.stderr).error, /Evidence entries/);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test("add rejects unsupported evidence URI schemes", () => {
  const home = tempHome();
  try {
    const payload = {
      title: "Reject bad evidence",
      category: "evidence",
      trigger: "invalid evidence",
      correction: "Only supported provenance schemes are allowed.",
      preferredStrategy: "Reject unsupported evidence links.",
      generalizedRule: "Every learning must cite supported evidence.",
      zpdScaffold: "Check URI scheme before writing RDF.",
      evidence: ["ftp://example.invalid/evidence"],
    };
    const result = runCli(["add", "--home", home, "--input", "-"], { input: JSON.stringify(payload) });
    assert.notEqual(result.status, 0);

    const error = parseJson(result.stderr);
    assert.equal(error.status, "error");
    assert.match(error.error, /scheme is not allowed/);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test("lint rejects broken index links", () => {
  const home = tempHome();
  try {
    runCli(["init", "--home", home]);
    writeFileSync(
      path.join(home, "STEERING.md"),
      "[missing](.steering/evidence/missing.ttl)\n",
      "utf8",
    );

    const result = runCli(["lint", "--home", home]);
    assert.notEqual(result.status, 0);

    const output = parseJson(result.stdout);
    assert.equal(output.status, "error");
    assert.ok(output.errors.some((error) => error.includes("links to missing RDF file")));
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test("lint reports missing home and malformed RDF files", () => {
  const missingHome = path.join(tmpdir(), "learn-cli-missing-home");
  rmSync(missingHome, { recursive: true, force: true });
  const missing = runCli(["lint", "--home", missingHome]);
  assert.notEqual(missing.status, 0);
  const missingOutput = parseJson(missing.stdout);
  assert.ok(missingOutput.errors.some((error) => error.includes("Home does not exist")));
  assert.ok(missingOutput.errors.some((error) => error.includes("Missing STEERING.md")));

  const home = tempHome();
  try {
    runCli(["init", "--home", home]);
    const dir = path.join(home, ".steering", "broken");
    require("node:fs").mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "bad.ttl"), "learn:bad a steering:Learning .\n", "utf8");

    const result = runCli(["lint", "--home", home]);
    assert.notEqual(result.status, 0);
    const output = parseJson(result.stdout);
    assert.ok(output.errors.some((error) => error.includes("missing required marker")));
    assert.ok(output.warnings.some((warning) => warning.includes("not indexed")));
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test("lint rejects duplicate learning IDs across RDF files", () => {
  const home = tempHome();
  try {
    runCli(["init", "--home", home]);
    const add = parseJson(runCli(["add", "--home", home, "--input", fixturePath]).stdout);
    const duplicatePath = path.join(home, ".steering", "evidence", "duplicate.ttl");
    copyFileSync(add.rdfPath, duplicatePath);

    const result = runCli(["lint", "--home", home]);
    assert.notEqual(result.status, 0);

    const output = parseJson(result.stdout);
    assert.equal(output.status, "error");
    assert.ok(output.errors.some((error) => error.includes("duplicate learning id")));
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

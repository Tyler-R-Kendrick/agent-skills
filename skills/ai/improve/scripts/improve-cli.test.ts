#!/usr/bin/env node
const { mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join } = require("node:path");
const { spawnSync } = require("node:child_process");
const assert = require("node:assert/strict");
const { runVista } = require("./vista-lib.ts");
const { runAgentLightning, runAssertGate, runGepa, runSkillOpt, runTraceOptimization } = require("./techniques-lib.ts");
const { runSimula } = require("./simulation-lib.ts");

const repoRoot = join(__dirname, "../../../..");
const cliPath = join(repoRoot, "skills", "ai", "improve", "scripts", "improve-cli.ts");

function run(args, cwd = repoRoot) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd,
    encoding: "utf8",
  });
}

function parseJson(stdout) {
  return JSON.parse(stdout.trim());
}

function testHelpCommands() {
  const global = run(["--help"]);
  assert.equal(global.status, 0, global.stderr);
  assert.equal(global.stderr, "");
  assert.ok(global.stdout.includes("Commands:"));
  assert.ok(global.stdout.includes("init"));
  assert.ok(global.stdout.includes("improve"));
  assert.ok(global.stdout.includes("eval"));
  assert.ok(global.stdout.includes("simulate"));
  assert.ok(global.stdout.includes("lint"));
  assert.ok(!global.stdout.includes("schema"));
  assert.ok(!global.stdout.includes("check"));
  assert.ok(!global.stdout.includes("run-vista"));

  for (const command of ["init", "improve", "eval", "simulate", "lint"]) {
    const result = run([command, "--help"]);
    assert.equal(result.status, 0, result.stderr);
    assert.ok(result.stdout.includes(command));
    assert.ok(result.stdout.includes("Examples:"));
  }
}

function testDeprecatedCommandsAreRejected() {
  for (const command of ["schema", "check", "print-schema", "scaffold", "select", "run-vista"]) {
    const result = run([command, "--json"]);
    assert.equal(result.status, 2, `${command} should be rejected`);
    assert.ok(result.stderr.includes(`Unknown command: ${command}`));
  }
}

function testInitAndLintWorkspace() {
  const root = mkdtempSync(join(tmpdir(), "improve-cli-init-"));
  try {
    const out = join(root, "workspace");
    const init = run(["init", out, "--json"]);
    assert.equal(init.status, 0, init.stderr);
    const initPayload = parseJson(init.stdout);
    assert.equal(initPayload.command, "init");
    assert.equal(initPayload.artifact, "workflow");
    assert.deepEqual(initPayload.techniques, ["vista", "eval-trace"]);
    assert.ok(initPayload.files.includes("improve.plan.json"));
    assert.ok(initPayload.files.includes("candidates/.gitignore"));
    assert.ok(initPayload.files.includes("reports/.gitignore"));
    assert.ok(initPayload.files.includes("vista/run.json"));
    assert.ok(initPayload.files.includes("vista/summaries/.gitignore"));

    const lint = run(["lint", out, "--json"]);
    assert.equal(lint.status, 0, lint.stderr);
    const lintPayload = parseJson(lint.stdout);
    assert.equal(lintPayload.command, "lint");
    assert.equal(lintPayload.ok, true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function testImproveGepaAndLint() {
  const root = mkdtempSync(join(tmpdir(), "improve-cli-gepa-"));
  try {
    const target = join(root, "prompt.md");
    const out = join(root, "gepa-workspace");
    writeFileSync(target, "Answer the user in valid JSON.\n", "utf8");

    const improve = run(["improve", target, "--gepa", "--out", out, "--json"]);
    assert.equal(improve.status, 0, improve.stderr);
    const payload = parseJson(improve.stdout);
    assert.equal(payload.command, "improve");
    assert.equal(payload.artifact, "prompt");
    assert.deepEqual(payload.techniques, ["gepa"]);
    assert.ok(payload.files.includes("improve.plan.json"));
    assert.ok(payload.files.includes("gepa/config.json"));
    assert.ok(payload.files.includes("gepa/reflections.json"));
    assert.ok(payload.files.includes("gepa/candidate-frontier.json"));
    assert.ok(payload.files.includes("gepa/outputs/run.json"));
    assert.ok(payload.files.includes("vista/run.json"));
    assert.ok(payload.files.includes("reports/.gitignore"));

    const lint = run(["lint", out, "--json"]);
    assert.equal(lint.status, 0, lint.stderr);
    assert.equal(parseJson(lint.stdout).ok, true);

    const seed = readFileSync(join(out, "inputs", "seed.md"), "utf8");
    assert.equal(seed, "Answer the user in valid JSON.\n");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function testImproveTechniqueFlagsSelectArtifacts() {
  const root = mkdtempSync(join(tmpdir(), "improve-cli-techniques-"));
  try {
    const cases = [
      [["--gepa"], "prompt", ["gepa"]],
      [["--trace"], "workflow", ["trace"]],
      [["--skillopt"], "skill", ["skillopt"]],
      [["--agent-lightning"], "agent", ["agent-lightning"]],
      [["--assert"], "agent", ["assert"]],
      [["--skillopt", "--vista"], "skill", ["vista", "skillopt"]],
    ];
    for (const [flags, artifact, techniques] of cases) {
      const out = join(root, `${artifact}-${techniques.join("-")}`);
      const result = run(["improve", root, ...flags, "--out", out, "--json"]);
      assert.equal(result.status, 0, result.stderr);
      const payload = parseJson(result.stdout);
      assert.equal(payload.artifact, artifact);
      assert.deepEqual(payload.techniques, techniques);
      if (techniques.includes("trace")) assert.ok(payload.files.includes("trace/graph-spec.json"));
      if (techniques.includes("trace")) assert.ok(payload.files.includes("trace/optimization.json"));
      if (techniques.includes("skillopt")) assert.ok(payload.files.includes("skillopt/config.yaml"));
      if (techniques.includes("skillopt")) assert.ok(payload.files.includes("skillopt/edit-set.json"));
      if (techniques.includes("skillopt")) assert.ok(payload.files.includes("skillopt/outputs/.gitignore"));
      if (techniques.includes("agent-lightning")) assert.ok(payload.files.includes("agent-lightning/reward-spec.json"));
      if (techniques.includes("agent-lightning")) assert.ok(payload.files.includes("agent-lightning/rollouts.jsonl"));
      if (techniques.includes("assert")) assert.ok(payload.files.includes("assert/eval_config.yaml"));
      if (techniques.includes("assert")) assert.ok(payload.files.includes("assert/behavior-taxonomy.json"));
      if (techniques.includes("assert")) assert.ok(payload.files.includes("assert/artifacts/results/.gitignore"));
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function testEvalStandardsAndLint() {
  const root = mkdtempSync(join(tmpdir(), "improve-cli-eval-"));
  try {
    const standards = [
      ["--agentevals", "agentevals"],
      ["--agent-skills", "agent-skills"],
      ["--assert", "assert"],
    ];
    for (const [flag, standard] of standards) {
      const out = join(root, standard);
      const evalResult = run(["eval", root, flag, "--out", out, "--json"]);
      assert.equal(evalResult.status, 0, evalResult.stderr);
      const evalPayload = parseJson(evalResult.stdout);
      assert.equal(evalPayload.command, "eval");
      assert.equal(evalPayload.standard, standard);
      assert.ok(evalPayload.files.length > 0);
      if (standard === "agent-skills") assert.ok(evalPayload.files.includes(`${evalPayload.suite}-workspace/.gitignore`));
      if (standard === "assert") assert.ok(evalPayload.files.includes("artifacts/results/.gitignore"));

      const lint = run(["lint", out, flag, "--json"]);
      assert.equal(lint.status, 0, lint.stderr);
      const lintPayload = parseJson(lint.stdout);
      assert.equal(lintPayload.command, "lint");
      assert.equal(lintPayload.mode, "eval");
      assert.equal(lintPayload.standard, standard);
      assert.equal(lintPayload.ok, true);
      assert.equal(lintPayload.errors.length, 0);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function testEvalDefaultsToCurrentDirectoryForAgentSkills() {
  const root = mkdtempSync(join(tmpdir(), "improve-cli-eval-cwd-"));
  try {
    const result = run(["eval", "--agent-skills", "--json"], root);
    assert.equal(result.status, 0, result.stderr);
    const payload = parseJson(result.stdout);
    assert.equal(payload.standard, "agent-skills");
    assert.ok(payload.files.includes("evals/evals.json"));

    const lint = run(["lint", ".", "--agent-skills", "--json"], root);
    assert.equal(lint.status, 0, lint.stderr);
    assert.equal(parseJson(lint.stdout).ok, true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function testSimulateDefaultsAndLint() {
  const root = mkdtempSync(join(tmpdir(), "improve-cli-simulate-"));
  try {
    const brief = join(root, "domain.md");
    const out = join(root, "simulation");
    writeFileSync(brief, "Simulate realistic support-ticket escalation data.\n", "utf8");

    const result = run(["simulate", brief, "--out", out, "--json"]);
    assert.equal(result.status, 0, result.stderr);
    const payload = parseJson(result.stdout);
    assert.equal(payload.command, "simulate");
    assert.equal(payload.mode, "simulate");
    assert.deepEqual(payload.techniques, ["simula", "qdc"]);
    assert.ok(payload.files.includes("simulate.plan.json"));
    assert.ok(payload.files.includes("simulation/run.json"));
    assert.ok(payload.files.includes("samples/.gitignore"));
    assert.ok(payload.files.includes("taxonomies/factors.json"));
    assert.ok(payload.files.includes("reports/.gitignore"));
    assert.ok(payload.files.includes("critics/dual-critic-rubric.md"));
    assert.ok(payload.files.includes("metrics/qdc-metrics.json"));
    assert.ok(payload.files.includes("simula/mechanism-design.md"));

    const lint = run(["lint", out, "--json"]);
    assert.equal(lint.status, 0, lint.stderr);
    const lintPayload = parseJson(lint.stdout);
    assert.equal(lintPayload.mode, "simulate");
    assert.equal(lintPayload.ok, true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function testSimulateTechniqueFlagsAndBrokenLint() {
  const root = mkdtempSync(join(tmpdir(), "improve-cli-simulate-techniques-"));
  try {
    const out = join(root, "simulation");
    const result = run(["simulate", root, "--source-grounded", "--multi-agent", "--base-refine", "--knowledge-tree", "--out", out, "--json"]);
    assert.equal(result.status, 0, result.stderr);
    const payload = parseJson(result.stdout);
    assert.deepEqual(payload.techniques, ["source-grounded", "multi-agent", "base-refine", "knowledge-tree"]);
    assert.ok(payload.files.includes("source-grounded/source-plan.json"));
    assert.ok(payload.files.includes("source-grounded/grounding-audit.jsonl"));
    assert.ok(payload.files.includes("multi-agent/roles.json"));
    assert.ok(payload.files.includes("multi-agent/transcript.jsonl"));
    assert.ok(payload.files.includes("base-refine/base-refine-plan.json"));
    assert.ok(payload.files.includes("base-refine/refinements.jsonl"));
    assert.ok(payload.files.includes("knowledge-tree/tree-spec.json"));
    assert.ok(payload.files.includes("knowledge-tree/tree.json"));

    const goodLint = run(["lint", out, "--json"]);
    assert.equal(goodLint.status, 0, goodLint.stderr);

    unlinkSync(join(out, "samples", "samples.jsonl"));
    const brokenLint = run(["lint", out, "--json"]);
    assert.equal(brokenLint.status, 1, brokenLint.stderr);
    const brokenPayload = parseJson(brokenLint.stdout);
    assert.ok(brokenPayload.errors.some((error) => error.includes("samples/samples.jsonl")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function testEvalLintFailsForMissingAgentSkillsFixture() {
  const root = mkdtempSync(join(tmpdir(), "improve-cli-eval-bad-"));
  try {
    const out = join(root, "skill");
    const evalsPath = join(out, "evals", "evals.json");
    const evalResult = run(["eval", root, "--agent-skills", "--out", out]);
    assert.equal(evalResult.status, 0, evalResult.stderr);
    const evals = JSON.parse(readFileSync(evalsPath, "utf8"));
    evals.evals[0].files = ["evals/files/missing.csv"];
    writeFileSync(evalsPath, `${JSON.stringify(evals, null, 2)}\n`, "utf8");

    const lint = run(["lint", out, "--agent-skills", "--json"]);
    assert.equal(lint.status, 1, lint.stderr);
    const payload = parseJson(lint.stdout);
    assert.equal(payload.ok, false);
    assert.ok(payload.errors.some((error) => error.includes("missing.csv")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function testWorkspaceLintFailsForMissingVistaPrompt() {
  const root = mkdtempSync(join(tmpdir(), "improve-cli-bad-workspace-"));
  try {
    const out = join(root, "workspace");
    const init = run(["init", out]);
    assert.equal(init.status, 0, init.stderr);
    const vistaPromptPath = join(out, "vista", "prompts", "hypothesis-agent.md");
    const vistaPrompt = readFileSync(vistaPromptPath, "utf8");
    unlinkSync(vistaPromptPath);
    const brokenVista = run(["lint", out, "--json"]);
    assert.equal(brokenVista.status, 1, brokenVista.stderr);
    const brokenVistaPayload = parseJson(brokenVista.stdout);
    assert.ok(brokenVistaPayload.errors.some((error) => error.includes("vista/prompts/hypothesis-agent.md")));
    writeFileSync(vistaPromptPath, vistaPrompt, "utf8");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function testVistaRunIsDeterministic() {
  const spec = {
    seed: "Answer briefly.",
    objective: "Improve support-agent correctness.",
    cases: [
      { id: "json-format", feedback: "Failed JSON parse; response was prose." },
      { id: "tool-order", feedback: "Trace shows the lookup tool ran after final answer." },
    ],
  };
  const first = runVista(spec);
  const second = runVista(spec);
  assert.deepEqual(first, second);
  assert.equal(first.algorithm, "vista");
  assert.equal(first.mode, "orchestrated-loop");
  assert.equal(first.roles.hypothesisAgent.owner, "calling-agent");
  assert.ok(first.loop.iterations.length > 0);
  assert.ok(first.agentPrompts.hypothesis.includes("Generate semantically labeled hypotheses"));
  assert.ok(first.agentPrompts.rewrite.includes("Rewrite the seed artifact"));
  assert.ok(first.agentPrompts.verify.includes("Verify one candidate"));
  assert.ok(first.selectedCandidate.text.includes("Improvement focus:"));
}

function testTechniqueLibrariesProduceConcreteOutputs() {
  const spec = {
    suite: "support-agent",
    artifact: "skill",
    seed: "Answer support requests with evidence.",
    cases: [
      { id: "schema", feedback: "Response failed JSON schema parse.", score: 0.1 },
      { id: "tool", feedback: "Trace shows lookup tool was called after final response.", score: 0.2 },
      { id: "policy", feedback: "Potential policy and credential exposure.", score: 0 },
    ],
  };

  const gepa = runGepa(spec);
  assert.equal(gepa.algorithm, "gepa-local");
  assert.ok(gepa.reflections.length > 0);
  assert.ok(gepa.candidates.length > 0);
  assert.ok(gepa.frontier.length > 0);
  assert.ok(gepa.selectedText.includes("## "));
  assert.ok(gepa.selectedText.includes("evidence"));

  const trace = runTraceOptimization(spec);
  assert.equal(trace.algorithm, "trace-local");
  assert.ok(trace.graphSpec.nodes.length >= 3);
  assert.ok(trace.patches.length > 0);

  const skillopt = runSkillOpt(spec);
  assert.equal(skillopt.algorithm, "skillopt-local");
  assert.ok(skillopt.editSet.length > 0);
  assert.ok(skillopt.selected.text.includes("Improvement Patch"));

  const lightning = runAgentLightning(spec);
  assert.equal(lightning.algorithm, "agent-lightning-local");
  assert.equal(lightning.rollouts.length, spec.cases.length);
  assert.ok(Array.isArray(lightning.policyUpdate.preferredActions));

  const assertGate = runAssertGate(spec);
  assert.equal(assertGate.algorithm, "assert-local");
  assert.ok(assertGate.taxonomy.dimensions.length > 0);
  assert.equal(assertGate.scores.length, spec.cases.length);
}

function testSimulaLibraryProducesDatasetArtifacts() {
  const first = runSimula({
    suite: "support-sim",
    domain: "Cloud deployment support escalation with routing, policy, and tool traces.",
    objective: "Generate eval-ready agent simulation data.",
    targetSize: 12,
    techniques: ["simula", "qdc"],
  });
  const second = runSimula({
    suite: "support-sim",
    domain: "Cloud deployment support escalation with routing, policy, and tool traces.",
    objective: "Generate eval-ready agent simulation data.",
    targetSize: 12,
    techniques: ["simula", "qdc"],
  });
  assert.deepEqual(first, second);
  assert.equal(first.algorithm, "simula-local");
  assert.equal(first.samples.length, 12);
  assert.ok(first.factorTaxonomy.factors.length >= 3);
  assert.ok(first.coverageGrid.cells.length >= 3);
  assert.equal(first.criticDecisions.length, 12);
  assert.ok(first.qdcMetrics.observed.taxonomicCoverage > 0);
  assert.equal(first.sourceGrounding.length, first.acceptedSamples.length);
  assert.equal(first.baseRefineRecords.length, first.samples.length);
  assert.ok(first.multiAgentTranscript.length >= first.samples.length);
  assert.ok(first.knowledgeTree.root.children.length > 0);
}

testHelpCommands();
testDeprecatedCommandsAreRejected();
testInitAndLintWorkspace();
testImproveGepaAndLint();
testImproveTechniqueFlagsSelectArtifacts();
testEvalStandardsAndLint();
testEvalDefaultsToCurrentDirectoryForAgentSkills();
testSimulateDefaultsAndLint();
testSimulateTechniqueFlagsAndBrokenLint();
testEvalLintFailsForMissingAgentSkillsFixture();
testWorkspaceLintFailsForMissingVistaPrompt();
testVistaRunIsDeterministic();
testTechniqueLibrariesProduceConcreteOutputs();
testSimulaLibraryProducesDatasetArtifacts();

console.log("improve-cli tests passed");
process.exit(0);

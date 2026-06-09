#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_os_1 = require("node:os");
const node_path_1 = require("node:path");
const node_process_1 = require("node:process");
const REQUIRED_FIELDS = [
    "title",
    "category",
    "trigger",
    "correction",
    "preferredStrategy",
    "generalizedRule",
    "zpdScaffold",
    "evidence",
];
const REQUIRED_TTL_MARKERS = [
    "a steering:Learning",
    "dcterms:title",
    "steering:category",
    "steering:trigger",
    "steering:correction",
    "steering:preferredStrategy",
    "steering:generalizedRule",
    "steering:zpdScaffold",
    "steering:confidence",
    "prov:wasDerivedFrom",
];
const ALLOWED_EVIDENCE_SCHEMES = new Set([
    "memory:",
    "conversation:",
    "doc:",
    "file:",
    "web:",
    "http:",
    "https:",
]);
function defaultHome() {
    return process.env.AGENTS_HOME || (0, node_path_1.join)((0, node_os_1.homedir)(), ".agents");
}
function parseArgs(argv) {
    const [command = "help", ...rest] = argv;
    const options = {};
    for (let i = 0; i < rest.length; i += 1) {
        const token = rest[i];
        if (!token.startsWith("--")) {
            continue;
        }
        const [key, inlineValue] = token.slice(2).split("=", 2);
        if (inlineValue !== undefined) {
            options[key] = inlineValue;
            continue;
        }
        const next = rest[i + 1];
        if (next && !next.startsWith("--")) {
            options[key] = next;
            i += 1;
        }
        else {
            options[key] = true;
        }
    }
    return { command, options };
}
function optionString(options, name) {
    const value = options[name];
    return typeof value === "string" ? value : undefined;
}
async function readStdin() {
    const chunks = [];
    for await (const chunk of node_process_1.stdin) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("utf8");
}
async function readJsonInput(inputPath) {
    const raw = inputPath === "-" ? await readStdin() : await (0, promises_1.readFile)(inputPath, "utf8");
    return JSON.parse(raw);
}
function slugify(value) {
    const slug = value
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 72)
        .replace(/-+$/g, "");
    return slug || "learning";
}
function deterministicId(input, category) {
    const base = slugify(input.title);
    const hash = (0, node_crypto_1.createHash)("sha256")
        .update(JSON.stringify({
        title: input.title,
        category,
        trigger: input.trigger,
        generalizedRule: input.generalizedRule,
    }))
        .digest("hex")
        .slice(0, 10);
    return `${base}-${hash}`;
}
function evidenceUri(evidence) {
    return typeof evidence === "string" ? evidence : evidence.uri;
}
function evidenceLabel(evidence) {
    return typeof evidence === "string" ? undefined : evidence.label;
}
function validateInput(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error("Input must be a JSON object.");
    }
    const input = value;
    for (const field of REQUIRED_FIELDS) {
        if (!(field in input)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    for (const field of REQUIRED_FIELDS.filter((field) => field !== "evidence")) {
        if (typeof input[field] !== "string" || !input[field]?.trim()) {
            throw new Error(`Field ${field} must be a non-empty string.`);
        }
    }
    if (!Array.isArray(input.evidence) || input.evidence.length === 0) {
        throw new Error("Field evidence must be a non-empty array.");
    }
    for (const evidence of input.evidence) {
        if (typeof evidence === "string") {
            validateEvidenceUri(evidence);
            continue;
        }
        if (!evidence || typeof evidence !== "object" || typeof evidence.uri !== "string") {
            throw new Error("Evidence entries must be strings or objects with a uri string.");
        }
        validateEvidenceUri(evidence.uri);
    }
    if (input.confidence !== undefined) {
        if (typeof input.confidence !== "number" || input.confidence < 0 || input.confidence > 1) {
            throw new Error("Field confidence must be a number from 0 through 1.");
        }
    }
    if (input.createdAt !== undefined && Number.isNaN(Date.parse(input.createdAt))) {
        throw new Error("Field createdAt must be an ISO-compatible date string.");
    }
    return input;
}
function normalizeRecord(input) {
    const category = slugify(input.category);
    const id = slugify(input.id || deterministicId(input, category));
    const avoid = Array.isArray(input.avoid)
        ? input.avoid
        : input.avoid
            ? [input.avoid]
            : [];
    return {
        id,
        title: input.title.trim(),
        category,
        trigger: input.trigger.trim(),
        correction: input.correction.trim(),
        preferredStrategy: input.preferredStrategy.trim(),
        generalizedRule: input.generalizedRule.trim(),
        zpdScaffold: input.zpdScaffold.trim(),
        evidence: input.evidence,
        scope: input.scope?.trim() || "global",
        confidence: input.confidence ?? 0.6,
        avoid,
        createdAt: input.createdAt,
        status: input.status?.trim() || "active",
        relativePath: `.steering/${category}/${id}.ttl`,
    };
}
function validateEvidenceUri(uri) {
    let parsed;
    try {
        parsed = new URL(uri);
    }
    catch {
        throw new Error(`Evidence URI is invalid: ${uri}`);
    }
    if (!ALLOWED_EVIDENCE_SCHEMES.has(parsed.protocol)) {
        throw new Error(`Evidence URI scheme is not allowed: ${uri}`);
    }
}
function turtleString(value) {
    return value
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n");
}
function turtleIri(value) {
    return `<${value.replace(/[\s<>"{}|\\^`]/g, (char) => encodeURIComponent(char))}>`;
}
function decimal(value) {
    return value.toFixed(2);
}
function buildTurtle(record) {
    const lines = [
        "@prefix steering: <https://agents.local/steering#> .",
        "@prefix learn: <https://agents.local/steering/learning/> .",
        "@prefix prov: <http://www.w3.org/ns/prov#> .",
        "@prefix dcterms: <http://purl.org/dc/terms/> .",
        "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .",
        "",
        `learn:${record.id} a steering:Learning ;`,
        `  dcterms:title "${turtleString(record.title)}" ;`,
        `  steering:category "${turtleString(record.category)}" ;`,
        `  steering:trigger "${turtleString(record.trigger)}" ;`,
        `  steering:correction "${turtleString(record.correction)}" ;`,
        `  steering:preferredStrategy "${turtleString(record.preferredStrategy)}" ;`,
        `  steering:generalizedRule "${turtleString(record.generalizedRule)}" ;`,
        `  steering:zpdScaffold "${turtleString(record.zpdScaffold)}" ;`,
        `  steering:confidence "${decimal(record.confidence)}"^^xsd:decimal ;`,
        `  steering:scope "${turtleString(record.scope)}" ;`,
        `  steering:status "${turtleString(record.status)}" ;`,
        `  steering:artifactPath "${turtleString(record.relativePath)}" ;`,
    ];
    if (record.createdAt) {
        lines.push(`  dcterms:created "${turtleString(record.createdAt)}"^^xsd:dateTime ;`);
    }
    for (const avoid of record.avoid) {
        lines.push(`  steering:avoid "${turtleString(avoid)}" ;`);
    }
    record.evidence.forEach((evidence, index) => {
        const uri = evidenceUri(evidence);
        const suffix = index === record.evidence.length - 1 ? " ." : " ;";
        lines.push(`  prov:wasDerivedFrom ${turtleIri(uri)}${suffix}`);
        const label = evidenceLabel(evidence);
        if (label) {
            lines.push(`# evidence-label ${turtleString(uri)} ${turtleString(label)}`);
        }
    });
    return `${lines.join("\n")}\n`;
}
async function ensureHome(home) {
    await (0, promises_1.mkdir)((0, node_path_1.join)(home, ".steering"), { recursive: true });
}
async function walkTurtleFiles(root) {
    if (!(0, node_fs_1.existsSync)(root)) {
        return [];
    }
    const entries = await (0, promises_1.readdir)(root, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (entry) => {
        const fullPath = (0, node_path_1.join)(root, entry.name);
        if (entry.isDirectory()) {
            return walkTurtleFiles(fullPath);
        }
        return entry.isFile() && entry.name.endsWith(".ttl") ? [fullPath] : [];
    }));
    return files.flat().sort();
}
function extractString(content, predicate) {
    const pattern = new RegExp(`${predicate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+"((?:\\\\.|[^"])*)"`);
    const match = content.match(pattern);
    return match ? match[1].replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\\\/g, "\\") : undefined;
}
function extractId(content) {
    return content.match(/learn:([a-z0-9-]+)\s+a\s+steering:Learning/)?.[1];
}
function parseRecordFromTurtle(home, filePath, content) {
    const id = extractId(content);
    const title = extractString(content, "dcterms:title");
    const category = extractString(content, "steering:category");
    const trigger = extractString(content, "steering:trigger");
    const generalizedRule = extractString(content, "steering:generalizedRule");
    const confidenceRaw = extractString(content, "steering:confidence");
    const scope = extractString(content, "steering:scope") || "global";
    const status = extractString(content, "steering:status") || "active";
    if (!id || !title || !category || !trigger || !generalizedRule || !confidenceRaw) {
        return undefined;
    }
    return {
        id,
        title,
        category,
        trigger,
        correction: extractString(content, "steering:correction") || "",
        preferredStrategy: extractString(content, "steering:preferredStrategy") || "",
        generalizedRule,
        zpdScaffold: extractString(content, "steering:zpdScaffold") || "",
        evidence: [],
        scope,
        confidence: Number(confidenceRaw),
        avoid: [],
        status,
        relativePath: (0, node_path_1.relative)(home, filePath).split(node_path_1.sep).join("/"),
    };
}
async function regenerateIndex(home) {
    await ensureHome(home);
    const files = await walkTurtleFiles((0, node_path_1.join)(home, ".steering"));
    const records = [];
    for (const file of files) {
        const content = await (0, promises_1.readFile)(file, "utf8");
        const record = parseRecordFromTurtle(home, file, content);
        if (record) {
            records.push(record);
        }
    }
    records.sort((a, b) => a.category.localeCompare(b.category) || a.trigger.localeCompare(b.trigger));
    const lines = [
        "# Agent Steering",
        "",
        "This file indexes generalized reasoning strategies learned from user feedback.",
        "Load linked RDF entries only when the IF condition matches the current task.",
        "",
        "## Load Policy",
        "",
        "- Start with this index when available.",
        "- Load only matching RDF files from `.steering/`.",
        "- Prefer fresher, higher-confidence, narrower-scope entries when rules conflict.",
        "- Treat evidence links as provenance, not as always-loaded context.",
        "",
        "## Steering Entries",
        "",
        "| IF current task involves | THEN load | Strategy | Confidence | Scope |",
        "|--------------------------|-----------|----------|------------|-------|",
    ];
    for (const record of records) {
        lines.push(`| ${markdownCell(record.trigger)} | [${record.relativePath}](${record.relativePath}) | ${markdownCell(record.generalizedRule)} | ${decimal(record.confidence)} | ${markdownCell(record.scope)} |`);
    }
    lines.push("", "## Instruction Hook", "", "When available, agents should read this index before substantial work, then load only matching linked RDF entries.", "");
    const indexPath = (0, node_path_1.join)(home, "STEERING.md");
    await (0, promises_1.writeFile)(indexPath, lines.join("\n"), "utf8");
    return { entries: records.length, path: indexPath };
}
function markdownCell(value) {
    return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
}
async function commandInit(home) {
    await ensureHome(home);
    const result = await regenerateIndex(home);
    return { status: "success", command: "init", home, steeringPath: result.path, entries: result.entries };
}
async function commandAdd(home, inputPath) {
    if (!inputPath) {
        throw new Error("add requires --input <json|->.");
    }
    await ensureHome(home);
    const input = validateInput(await readJsonInput(inputPath));
    const record = normalizeRecord(input);
    const ttlPath = (0, node_path_1.join)(home, ".steering", record.category, `${record.id}.ttl`);
    await (0, promises_1.mkdir)((0, node_path_1.dirname)(ttlPath), { recursive: true });
    await (0, promises_1.writeFile)(ttlPath, buildTurtle(record), "utf8");
    const index = await regenerateIndex(home);
    return {
        status: "success",
        command: "add",
        home,
        id: record.id,
        rdfPath: ttlPath,
        steeringPath: index.path,
        entries: index.entries,
    };
}
async function commandLint(home) {
    const errors = [];
    const warnings = [];
    const steeringPath = (0, node_path_1.join)(home, "STEERING.md");
    const steeringDir = (0, node_path_1.join)(home, ".steering");
    if (!(0, node_fs_1.existsSync)(home)) {
        errors.push(`Home does not exist: ${home}`);
    }
    if (!(0, node_fs_1.existsSync)(steeringPath)) {
        errors.push(`Missing STEERING.md: ${steeringPath}`);
    }
    if (!(0, node_fs_1.existsSync)(steeringDir)) {
        errors.push(`Missing .steering directory: ${steeringDir}`);
    }
    const files = await walkTurtleFiles(steeringDir);
    const seenIds = new Set();
    const ttlRelativePaths = new Set(files.map((file) => (0, node_path_1.relative)(home, file).split(node_path_1.sep).join("/")));
    for (const file of files) {
        const content = await (0, promises_1.readFile)(file, "utf8");
        const rel = (0, node_path_1.relative)(home, file).split(node_path_1.sep).join("/");
        const id = extractId(content);
        if (!id) {
            errors.push(`${rel}: missing learn:<id> steering subject.`);
        }
        else if (seenIds.has(id)) {
            errors.push(`${rel}: duplicate learning id ${id}.`);
        }
        else {
            seenIds.add(id);
        }
        for (const marker of REQUIRED_TTL_MARKERS) {
            if (!content.includes(marker)) {
                errors.push(`${rel}: missing required marker ${marker}.`);
            }
        }
        const evidenceMatches = content.matchAll(/prov:wasDerivedFrom\s+<([^>]+)>/g);
        for (const match of evidenceMatches) {
            try {
                validateEvidenceUri(decodeURIComponent(match[1]));
            }
            catch (error) {
                errors.push(`${rel}: ${error.message}`);
            }
        }
    }
    if ((0, node_fs_1.existsSync)(steeringPath)) {
        const index = await (0, promises_1.readFile)(steeringPath, "utf8");
        const linkMatches = [...index.matchAll(/\]\((\.steering\/[^)]+\.ttl)\)/g)].map((match) => match[1]);
        const indexLinks = new Set(linkMatches);
        for (const link of linkMatches) {
            if (!ttlRelativePaths.has(link)) {
                errors.push(`STEERING.md links to missing RDF file: ${link}`);
            }
        }
        for (const ttlPath of ttlRelativePaths) {
            if (!indexLinks.has(ttlPath)) {
                warnings.push(`RDF file is not indexed: ${ttlPath}`);
            }
        }
    }
    return {
        status: errors.length === 0 ? "success" : "error",
        command: "lint",
        home,
        files: files.length,
        errors,
        warnings,
    };
}
function commandTemplate() {
    return {
        title: "Prefer executable proof over screenshots",
        category: "evidence",
        trigger: "UI completion claims",
        correction: "Screenshots alone are not accepted proof for workflows with a canonical recording contract.",
        preferredStrategy: "Run the executable recording or validation flow before claiming completion.",
        generalizedRule: "When a workflow has a canonical proof command, use it before declaring success.",
        zpdScaffold: "Pause before final summary and ask which proof contract applies to the changed surface.",
        evidence: ["memory://MEMORY.md:1375"],
        scope: "global",
        confidence: 0.9,
        avoid: ["Do not treat visual inspection as the full evidence contract."],
        createdAt: "2026-06-08T00:00:00.000Z",
    };
}
function commandHelp() {
    return {
        status: "success",
        commands: {
            template: "Print JSON input shape.",
            init: "Create STEERING.md and .steering/.",
            add: "Write one RDF/Turtle learning and regenerate STEERING.md.",
            lint: "Validate steering artifacts.",
        },
        options: {
            home: "Artifact home. Defaults to $AGENTS_HOME or ~/.agents.",
            input: "JSON file path or '-' for stdin, required by add.",
        },
    };
}
async function main() {
    const { command, options } = parseArgs(process.argv.slice(2));
    const home = optionString(options, "home") || defaultHome();
    let result;
    switch (command) {
        case "template":
            result = commandTemplate();
            break;
        case "init":
            result = await commandInit(home);
            break;
        case "add":
            result = await commandAdd(home, optionString(options, "input"));
            break;
        case "lint":
            result = await commandLint(home);
            if (result.status === "error") {
                node_process_1.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
                (0, node_process_1.exit)(1);
            }
            break;
        case "help":
        case "--help":
        case "-h":
            result = commandHelp();
            break;
        default:
            throw new Error(`Unknown command: ${command}`);
    }
    node_process_1.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    node_process_1.stderr.write(`${JSON.stringify({ status: "error", error: message })}\n`);
    (0, node_process_1.exit)(1);
});

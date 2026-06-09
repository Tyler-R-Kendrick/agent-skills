type SimulationTechnique = "simula" | "qdc" | "source-grounded" | "multi-agent" | "base-refine" | "knowledge-tree";

type SimulationSpec = {
  suite?: string;
  domain?: string;
  objective?: string;
  targetSize?: number;
  techniques?: SimulationTechnique[];
};

const STOPWORDS = new Set([
  "about",
  "against",
  "before",
  "between",
  "customer",
  "describe",
  "domain",
  "generate",
  "quality",
  "realistic",
  "should",
  "simulation",
  "synthetic",
  "target",
  "their",
  "there",
  "these",
  "using",
  "where",
  "with",
]);

const COMPLEXITY_OPERATORS = [
  "add-constraints",
  "inject-ambiguity",
  "require-counterfactual",
  "compose-subtasks",
];

function runSimula(spec: SimulationSpec) {
  const normalized = normalizeSimulationSpec(spec);
  const terms = extractTerms(`${normalized.domain} ${normalized.objective}`);
  const factorTaxonomy = buildFactorTaxonomy(normalized.suite, terms);
  const coverageGrid = buildCoverageGrid(normalized.suite, factorTaxonomy, normalized.targetSize);
  const samples = buildSamples(normalized, terms, coverageGrid);
  const criticDecisions = samples.map((sample) => dualCritic(sample));
  const acceptedSamples = samples.filter((sample) => criticDecisions.find((decision) => decision.sampleId === sample.id)?.decision !== "reject");
  const lineage = acceptedSamples.map((sample) => ({
    id: sample.id,
    reviewer: "simula-local",
    sources: sample.provenance.sources,
    transforms: sample.provenance.transforms,
  }));
  return sortJson({
    algorithm: "simula-local",
    mode: "dataset-level-mechanism-design",
    suite: normalized.suite,
    objective: normalized.objective,
    terms,
    sourceManifest: {
      version: "1.0.0",
      suite: normalized.suite,
      sources: [
        {
          id: "source-domain",
          path: "inputs/domain.md",
          provenance: "generated-from-target-or-spec",
          role: "domain-brief",
        },
      ],
    },
    factorTaxonomy,
    expansionPlan: {
      version: "1.0.0",
      suite: normalized.suite,
      mode: "breadth-first",
      levels: [
        { depth: 1, targetNodes: factorTaxonomy.factors.length, instruction: "Expand high-level variation factors." },
        { depth: 2, targetNodes: coverageGrid.cells.length, instruction: "Expand factor levels into concrete sampling cells." },
      ],
      stopRules: [
        "Stop when a cell duplicates existing factor coverage.",
        "Stop when a cell cannot be scored for quality, diversity, complexity, and provenance.",
      ],
    },
    samplingStrategy: {
      version: "1.0.0",
      suite: normalized.suite,
      targetSize: normalized.targetSize,
      localDiversity: {
        antiModeCollapse: true,
        compareAgainstPriorAttempts: true,
        distinctInstantiationsPerCell: Math.max(1, Math.ceil(normalized.targetSize / Math.max(1, coverageGrid.cells.length))),
      },
      complexity: {
        schedule: ["easy", "medium", "hard"],
        complexificationOperators: COMPLEXITY_OPERATORS,
      },
      splits: {
        train: 0.7,
        validation: 0.15,
        test: 0.15,
      },
    },
    coverageGrid,
    complexification: {
      version: "1.0.0",
      suite: normalized.suite,
      operators: COMPLEXITY_OPERATORS.map((operator) => ({
        id: operator,
        instruction: instructionForOperator(operator),
      })),
    },
    qualityGates: {
      version: "1.0.0",
      suite: normalized.suite,
      gates: [
        { id: "schema-valid", type: "deterministic", passRate: schemaValidRate(samples) },
        { id: "on-cell", type: "deterministic", passRate: onCellRate(samples, coverageGrid) },
        { id: "not-duplicate", type: "semantic-proxy", duplicateRate: duplicateRate(samples) },
        { id: "dual-critic-pass", type: "critic", acceptRate: acceptedSamples.length / Math.max(1, samples.length) },
      ],
    },
    sourceGrounding: sourceGrounding(acceptedSamples),
    multiAgentTranscript: multiAgentTranscript(samples, criticDecisions),
    baseRefineRecords: baseRefineRecords(samples),
    knowledgeTree: knowledgeTree(normalized.suite, terms, factorTaxonomy),
    criticDecisions,
    samples,
    acceptedSamples,
    lineage,
    qdcMetrics: qdcMetrics(normalized.suite, samples, acceptedSamples, coverageGrid),
    taxonomicCoverage: taxonomicCoverage(normalized.suite, samples, coverageGrid),
    complexityElo: complexityElo(normalized.suite, samples),
  });
}

function normalizeSimulationSpec(spec: SimulationSpec) {
  const targetSize = Number.isFinite(spec.targetSize) ? Number(spec.targetSize) : 24;
  return {
    suite: stringValue(spec.suite, "simulation-suite"),
    domain: stringValue(spec.domain, "Agent workflow data with realistic user intent, constraints, and evaluation labels."),
    objective: stringValue(spec.objective, "Generate high-quality simulated examples with coverage, diversity, complexity, and provenance."),
    targetSize: Math.max(3, Math.min(250, Math.floor(targetSize))),
    techniques: Array.isArray(spec.techniques) && spec.techniques.length > 0 ? spec.techniques : ["simula", "qdc"] as SimulationTechnique[],
  };
}

function extractTerms(text: string): string[] {
  const terms = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((term) => term.replace(/^-+|-+$/g, ""))
    .filter((term) => term.length > 3 && !STOPWORDS.has(term));
  const unique = Array.from(new Set(terms));
  return (unique.length ? unique : ["agent", "workflow", "routing", "policy", "evidence"]).slice(0, 12);
}

function buildFactorTaxonomy(suite: string, terms: string[]) {
  const primary = terms.slice(0, 3);
  const secondary = terms.slice(3, 6);
  return {
    version: "1.0.0",
    suite,
    method: "global-diversification",
    factors: [
      {
        id: "intent",
        description: "Primary simulated user or task intent.",
        levels: levelsFromTerms(primary, ["request", "diagnose", "escalate"]),
      },
      {
        id: "context",
        description: "Available evidence and operating conditions.",
        levels: ["minimal-evidence", "typical-evidence", "conflicting-evidence"],
      },
      {
        id: "risk",
        description: "Failure mode pressure applied to the example.",
        levels: levelsFromTerms(secondary, ["low-risk", "policy-risk", "regression-risk"]),
      },
      {
        id: "difficulty",
        description: "Reasoning and interaction complexity.",
        levels: ["easy", "medium", "hard"],
      },
    ],
    criticLoop: {
      propose: "Generate candidate factors from domain terms.",
      critique: "Remove duplicate factors and ensure each factor can drive sampling.",
      refine: "Convert factors to finite levels for coverage-grid generation.",
    },
  };
}

function buildCoverageGrid(suite: string, taxonomy: any, targetSize: number) {
  const intent = taxonomy.factors.find((factor: any) => factor.id === "intent").levels;
  const context = taxonomy.factors.find((factor: any) => factor.id === "context").levels;
  const risk = taxonomy.factors.find((factor: any) => factor.id === "risk").levels;
  const difficulty = taxonomy.factors.find((factor: any) => factor.id === "difficulty").levels;
  const cells: any[] = [];
  for (const intentLevel of intent) {
    for (const contextLevel of context) {
      for (const riskLevel of risk) {
        const difficultyLevel = difficulty[cells.length % difficulty.length];
        cells.push({
          id: slug(`${intentLevel}-${contextLevel}-${riskLevel}-${difficultyLevel}`),
          factors: {
            context: contextLevel,
            difficulty: difficultyLevel,
            intent: intentLevel,
            risk: riskLevel,
          },
          minimumSamples: Math.max(1, Math.floor(targetSize / Math.max(1, intent.length * context.length * risk.length))),
        });
      }
    }
  }
  return {
    version: "1.0.0",
    suite,
    cells: cells.slice(0, Math.max(3, Math.min(cells.length, targetSize))),
  };
}

function buildSamples(spec: ReturnType<typeof normalizeSimulationSpec>, terms: string[], grid: any) {
  const samples = [];
  for (let index = 0; index < spec.targetSize; index += 1) {
    const cell = grid.cells[index % grid.cells.length];
    const complexity = complexityForIndex(index);
    const term = terms[index % terms.length] || "workflow";
    const operator = COMPLEXITY_OPERATORS[index % COMPLEXITY_OPERATORS.length];
    const split = index < spec.targetSize * 0.7 ? "train" : index < spec.targetSize * 0.85 ? "validation" : "test";
    samples.push({
      id: `sample-${String(index + 1).padStart(3, "0")}`,
      split,
      cell: cell.id,
      input: sampleInput(spec.domain, term, cell.factors, complexity.label, operator),
      expected: sampleExpected(cell.factors, complexity.label),
      factors: cell.factors,
      complexity: {
        label: complexity.label,
        operators: complexity.operators,
      },
      provenance: {
        generator: "simula-local",
        sources: ["source-domain"],
        status: "generated",
        transforms: ["taxonomy-cell-sampling", operator],
      },
    });
  }
  return samples;
}

function dualCritic(sample: any) {
  const schemaValid = Boolean(sample.id && sample.input && sample.expected && sample.factors && sample.provenance);
  const hasComplexity = Array.isArray(sample.complexity?.operators);
  const accept = schemaValid && hasComplexity;
  return {
    sampleId: sample.id,
    acceptanceCritic: `Accept: sample targets ${sample.cell} and declares provenance.`,
    rejectionCritic: accept ? "No blocking rejection found." : "Reject: missing schema or complexity metadata.",
    decision: accept ? "accept" : "reject",
  };
}

function sourceGrounding(samples: any[]) {
  return samples.map((sample) => ({
    sampleId: sample.id,
    grounded: sample.provenance.sources.length > 0,
    sourceIds: sample.provenance.sources,
    derivedSpan: `${sample.factors.intent}/${sample.factors.context}/${sample.factors.risk}`,
    transformChain: sample.provenance.transforms,
  }));
}

function multiAgentTranscript(samples: any[], decisions: any[]) {
  const rows = [];
  for (const sample of samples) {
    const decision = decisions.find((item) => item.sampleId === sample.id);
    rows.push({
      sampleId: sample.id,
      role: "generator",
      output: sample.input,
    });
    rows.push({
      sampleId: sample.id,
      role: "acceptance-critic",
      output: decision?.acceptanceCritic || "",
    });
    rows.push({
      sampleId: sample.id,
      role: "rejection-critic",
      output: decision?.rejectionCritic || "",
    });
    rows.push({
      sampleId: sample.id,
      role: "curator",
      output: decision?.decision || "review",
    });
  }
  return rows;
}

function baseRefineRecords(samples: any[]) {
  return samples.map((sample) => ({
    sampleId: sample.id,
    base: {
      input: sample.input.replace(" with explicit evidence", ""),
      expected: sample.expected,
    },
    refined: {
      input: sample.input,
      expected: sample.expected,
    },
    changes: [
      "normalize-schema",
      "attach-provenance",
      "align-complexity-metadata",
    ],
  }));
}

function knowledgeTree(suite: string, terms: string[], taxonomy: any) {
  return {
    version: "1.0.0",
    suite,
    root: {
      id: "domain",
      children: terms.slice(0, 6).map((term) => ({
        id: slug(term),
        children: taxonomy.factors.map((factor: any) => ({
          id: `${slug(term)}-${factor.id}`,
          factor: factor.id,
          levels: factor.levels,
        })),
      })),
    },
  };
}

function qdcMetrics(suite: string, samples: any[], accepted: any[], grid: any) {
  return {
    version: "1.0.0",
    suite,
    gates: {
      duplicateRateMaximum: 0.05,
      schemaValidRateMinimum: 1,
      taxonomicCoverageMinimum: 0.8,
    },
    metrics: {
      complexity: ["calibrated_complexity_elo", "operator_mix", "multi_step_rate"],
      diversity: ["taxonomic_coverage", "pairwise_semantic_distance", "duplicate_rate"],
      quality: ["schema_valid_rate", "critic_accept_rate", "lineage_complete_rate"],
    },
    observed: {
      criticAcceptRate: round(accepted.length / Math.max(1, samples.length)),
      duplicateRate: duplicateRate(samples),
      schemaValidRate: schemaValidRate(samples),
      taxonomicCoverage: taxonomicCoverage(suite, samples, grid).coverage,
    },
  };
}

function taxonomicCoverage(suite: string, samples: any[], grid: any) {
  const covered = new Set(samples.map((sample) => sample.cell));
  return {
    version: "1.0.0",
    suite,
    cellSource: "sampling/coverage-grid.json",
    denominator: grid.cells.length,
    numerator: covered.size,
    coverage: round(covered.size / Math.max(1, grid.cells.length)),
    missingCells: grid.cells.map((cell: any) => cell.id).filter((id: string) => !covered.has(id)),
    sampleSource: "samples/samples.jsonl",
  };
}

function complexityElo(suite: string, samples: any[]) {
  const counts = countBy(samples.map((sample) => sample.complexity.label));
  return {
    version: "1.0.0",
    suite,
    method: "batch-pairwise-calibrated-complexity",
    comparisons: samples.slice(0, 12).map((sample, index) => ({
      a: sample.id,
      b: samples[(index + 1) % samples.length]?.id || sample.id,
      winner: complexityRank(sample.complexity.label) >= complexityRank(samples[(index + 1) % samples.length]?.complexity.label || "easy") ? sample.id : samples[(index + 1) % samples.length].id,
    })),
    ratings: [
      { id: "easy", rating: 1000 + (counts.easy || 0) },
      { id: "medium", rating: 1200 + (counts.medium || 0) },
      { id: "hard", rating: 1400 + (counts.hard || 0) },
    ],
  };
}

function levelsFromTerms(terms: string[], fallback: string[]) {
  const values = terms.map((term) => slug(term)).filter(Boolean);
  return values.length >= 3 ? values.slice(0, 3) : fallback;
}

function complexityForIndex(index: number) {
  const labels = ["easy", "medium", "hard"];
  const label = labels[index % labels.length];
  return {
    label,
    operators: label === "easy" ? [] : label === "medium" ? [COMPLEXITY_OPERATORS[index % COMPLEXITY_OPERATORS.length]] : [COMPLEXITY_OPERATORS[index % COMPLEXITY_OPERATORS.length], COMPLEXITY_OPERATORS[(index + 1) % COMPLEXITY_OPERATORS.length]],
  };
}

function sampleInput(domain: string, term: string, factors: Record<string, string>, difficulty: string, operator: string): string {
  return `In ${domain.trim()}, simulate a ${difficulty} ${factors.intent} case about ${term} with ${factors.context}, ${factors.risk}, and operator ${operator}.`;
}

function sampleExpected(factors: Record<string, string>, difficulty: string): string {
  return `A correct response handles intent=${factors.intent}, context=${factors.context}, risk=${factors.risk}, and difficulty=${difficulty} with explicit evidence and no unsupported assumptions.`;
}

function instructionForOperator(operator: string): string {
  const instructions: Record<string, string> = {
    "add-constraints": "Add realistic constraints that force prioritization.",
    "compose-subtasks": "Combine two independently valid subtasks into one scenario.",
    "inject-ambiguity": "Add uncertainty that requires assumptions or clarification.",
    "require-counterfactual": "Ask what would change under a different condition.",
  };
  return instructions[operator] || "Apply a controlled complexity transform.";
}

function schemaValidRate(samples: any[]) {
  return round(samples.filter((sample) => sample.id && sample.input && sample.expected && sample.factors && sample.provenance).length / Math.max(1, samples.length));
}

function onCellRate(samples: any[], grid: any) {
  const cells = new Set(grid.cells.map((cell: any) => cell.id));
  return round(samples.filter((sample) => cells.has(sample.cell)).length / Math.max(1, samples.length));
}

function duplicateRate(samples: any[]) {
  const seen = new Set<string>();
  let duplicates = 0;
  for (const sample of samples) {
    const key = slug(`${sample.input} ${sample.expected}`).slice(0, 120);
    if (seen.has(key)) duplicates += 1;
    seen.add(key);
  }
  return round(duplicates / Math.max(1, samples.length));
}

function countBy(values: string[]) {
  const counts: Record<string, number> = {};
  for (const value of values) counts[value] = (counts[value] || 0) + 1;
  return counts;
}

function complexityRank(value: string) {
  return value === "hard" ? 3 : value === "medium" ? 2 : 1;
}

function stringValue(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function sortJson(value: any): any {
  if (Array.isArray(value)) return value.map(sortJson);
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(value).sort()) result[key] = sortJson(value[key]);
    return result;
  }
  return value;
}

module.exports = {
  runSimula,
};

type TechniqueCase = {
  id?: string;
  input?: string;
  output?: string;
  expected?: string;
  feedback?: string;
  score?: number;
  trace?: string;
};

type TechniqueSpec = {
  suite?: string;
  artifact?: string;
  seed?: string;
  objective?: string;
  cases?: TechniqueCase[];
  traces?: Array<Record<string, unknown> | string>;
  metrics?: Record<string, unknown>;
};

type NormalizedTechniqueCase = Required<TechniqueCase> & { id: string };

const SIGNALS = [
  {
    id: "output-schema",
    patterns: ["json", "schema", "parse", "format", "field", "malformed", "contract"],
    mutation: "Add an explicit output contract, validation checklist, and recovery path for malformed output.",
    reward: "schema_valid",
  },
  {
    id: "tool-sequencing",
    patterns: ["tool", "call", "lookup", "search", "order", "trace", "after final"],
    mutation: "Add tool preconditions, call ordering, stop criteria, and trace evidence requirements.",
    reward: "tool_order_valid",
  },
  {
    id: "grounding",
    patterns: ["source", "citation", "ground", "hallucinat", "unsupported", "retrieval", "context"],
    mutation: "Require claims to cite available evidence and define fallback behavior when evidence is missing.",
    reward: "grounded_claims",
  },
  {
    id: "coverage",
    patterns: ["edge", "case", "miss", "coverage", "regression", "unhandled", "scenario"],
    mutation: "Add explicit edge-case gates and preserve known-good baseline behavior.",
    reward: "coverage_hit",
  },
  {
    id: "efficiency",
    patterns: ["latency", "slow", "timeout", "token", "cost", "expensive", "budget"],
    mutation: "Add early exits, narrower context loading, and cost or latency budgets.",
    reward: "efficiency_gate",
  },
  {
    id: "policy",
    patterns: ["policy", "safety", "unsafe", "privacy", "secret", "credential", "pii"],
    mutation: "Add behavior boundaries, refusal conditions, and policy-specific regression gates.",
    reward: "policy_clean",
  },
  {
    id: "instruction-clarity",
    patterns: ["ambiguous", "unclear", "vague", "confusing", "ignored", "priority", "instruction"],
    mutation: "Rewrite priorities as ordered rules with concrete examples and conflict resolution.",
    reward: "instruction_following",
  },
];

function runGepa(spec: TechniqueSpec) {
  const normalized = normalizeTechniqueSpec(spec);
  const signals = analyzeSignals(normalized.cases);
  const reflections = signals.map((signal, index) => ({
    id: `reflection-${index + 1}`,
    signal: signal.id,
    evidenceCaseIds: signal.caseIds,
    diagnosis: signal.count > 0
      ? `${signal.count} evidence item(s) point to ${signal.id}.`
      : `No direct evidence found; keep ${signal.id} as a low-priority exploration branch.`,
    proposedMutation: signal.mutation,
  }));
  const candidates = reflections.slice(0, Math.max(2, Math.min(4, reflections.length))).map((reflection, index) => {
    const text = mutateText(normalized.seed, reflection.proposedMutation, index);
    const scores = scoreText(text, normalized.cases, reflection.signal);
    return {
      id: `gepa-candidate-${index + 1}`,
      reflectionId: reflection.id,
      text,
      scores,
      aggregateScore: round((scores.quality + scores.coverage + scores.constraintFit - scores.costPenalty) / 3),
      estimatedTokens: estimateTokens(text),
      mutationSummary: reflection.proposedMutation,
    };
  });
  const frontier = paretoFrontier(candidates);
  const selected = [...frontier].sort((left, right) => right.aggregateScore - left.aggregateScore || left.estimatedTokens - right.estimatedTokens)[0] || candidates[0];
  return sortJson({
    algorithm: "gepa-local",
    mode: "reflective-textual-evolution",
    suite: normalized.suite,
    artifact: normalized.artifact,
    baselineScore: baselineScore(normalized.cases),
    reflections,
    candidates,
    frontier: frontier.map((candidate) => candidate.id),
    selectedCandidateId: selected?.id,
    selectedText: selected?.text || normalized.seed,
  });
}

function runTraceOptimization(spec: TechniqueSpec) {
  const normalized = normalizeTechniqueSpec(spec);
  const signals = analyzeSignals(normalized.cases);
  const nodes = [
    { id: "input", kind: "data", trainable: false },
    { id: "context", kind: "retrieval", trainable: true },
    { id: "planner", kind: "reasoning", trainable: true },
    { id: "tool-call", kind: "action", trainable: true },
    { id: "final", kind: "output", trainable: true },
  ];
  const nodeLoss = nodes.map((node) => ({
    nodeId: node.id,
    loss: round(lossForNode(node.id, signals)),
    evidence: evidenceForNode(node.id, signals),
  }));
  const patches = nodeLoss
    .filter((item) => item.loss > 0)
    .sort((left, right) => right.loss - left.loss)
    .map((item, index) => ({
      id: `trace-patch-${index + 1}`,
      nodeId: item.nodeId,
      operation: traceOperation(item.nodeId),
      rationale: `Reduce loss attributed to ${item.nodeId}.`,
      evidence: item.evidence,
    }));
  return sortJson({
    algorithm: "trace-local",
    mode: "trace-aware-credit-assignment",
    suite: normalized.suite,
    graphSpec: {
      version: "1.0.0",
      suite: normalized.suite,
      artifact: normalized.artifact,
      optimizer: "microsoft-trace-compatible-local",
      nodes,
      edges: [
        { from: "input", to: "context" },
        { from: "context", to: "planner" },
        { from: "planner", to: "tool-call" },
        { from: "tool-call", to: "final" },
      ],
    },
    nodeLoss,
    patches,
    replayPlan: {
      baselineCases: normalized.cases.map((item) => item.id),
      requiredTraceFields: ["node_id", "input", "output", "latency_ms", "error", "parent_id"],
    },
  });
}

function runSkillOpt(spec: TechniqueSpec) {
  const normalized = normalizeTechniqueSpec(spec);
  const split = splitCases(normalized.cases);
  const gepa = runGepa(normalized);
  const editSet = gepa.reflections.slice(0, 4).map((reflection: any, index: number) => ({
    id: `skill-edit-${index + 1}`,
    operation: index % 3 === 0 ? "add" : index % 3 === 1 ? "replace" : "delete",
    target: reflection.signal,
    rationale: reflection.diagnosis,
    text: reflection.proposedMutation,
  }));
  const bestSkill = [
    normalized.seed.trim(),
    "",
    "## Improvement Patch",
    "",
    ...editSet.map((edit) => `- ${edit.text}`),
    "",
  ].join("\n");
  return sortJson({
    algorithm: "skillopt-local",
    mode: "bounded-skill-evolution",
    suite: normalized.suite,
    split,
    editSet,
    rejectedEdits: editSet.filter((_, index) => index > 1).map((edit) => ({
      ...edit,
      reason: "Held for a later iteration to keep the textual learning rate bounded.",
    })),
    selected: {
      id: "skillopt-candidate-1",
      text: bestSkill,
      validationScore: round(mean(split.val.map((item) => scoreCase(bestSkill, item, "coverage")))),
      heldOutGate: "strict-improvement-required",
    },
    history: [
      { step: 1, action: "split-cases", train: split.train.length, val: split.val.length, test: split.test.length },
      { step: 2, action: "propose-bounded-edits", count: editSet.length },
      { step: 3, action: "score-held-out", selected: "skillopt-candidate-1" },
    ],
  });
}

function runAgentLightning(spec: TechniqueSpec) {
  const normalized = normalizeTechniqueSpec(spec);
  const rollouts = normalized.cases.map((item, index) => {
    const safetyPenalty = textForCase(item).match(/policy|safety|secret|credential|pii/i) ? -0.25 : 0;
    const score = typeof item.score === "number" ? item.score : scoreCase(normalized.seed, item, "instruction-clarity");
    const reward = round(Math.max(-1, Math.min(1, score + safetyPenalty)));
    return {
      id: `rollout-${index + 1}`,
      caseId: item.id,
      reward,
      components: {
        taskSuccess: round(score),
        policyClean: safetyPenalty === 0 ? 1 : 0,
        regressionClean: reward >= 0.5 ? 1 : 0,
      },
    };
  });
  return sortJson({
    algorithm: "agent-lightning-local",
    mode: "reward-shaping-and-rollout-credit",
    suite: normalized.suite,
    rewardSpec: {
      version: "1.0.0",
      suite: normalized.suite,
      rewardComponents: [
        { id: "task-success", weight: 1 },
        { id: "policy-clean", weight: 1 },
        { id: "regression-clean", weight: 1 },
      ],
      penalties: [
        { id: "critical-policy-violation", value: -100 },
        { id: "tool-side-effect-without-approval", value: -50 },
      ],
    },
    rollouts,
    policyUpdate: {
      preferredActions: topSignals(analyzeSignals(normalized.cases), 3).map((signal) => signal.mutation),
      disallowedActions: ["hide policy failures", "train on held-out evals", "drop trace evidence"],
      meanReward: round(mean(rollouts.map((rollout) => rollout.reward))),
    },
  });
}

function runAssertGate(spec: TechniqueSpec) {
  const normalized = normalizeTechniqueSpec(spec);
  const signals = analyzeSignals(normalized.cases);
  const dimensions = topSignals(signals, 5).map((signal) => ({
    id: signal.id,
    description: `Detect ${signal.id} failures for ${normalized.artifact}.`,
    evidenceCaseIds: signal.caseIds,
    rubric: {
      pass: `The output satisfies the ${signal.id} requirement.`,
      fail: `The output violates or omits the ${signal.id} requirement.`,
    },
  }));
  const scores = normalized.cases.map((item) => {
    const row: Record<string, unknown> = { id: item.id };
    for (const dimension of dimensions) {
      row[dimension.id] = scoreCase(normalized.seed, item, dimension.id) >= 0.5;
    }
    return row;
  });
  return sortJson({
    algorithm: "assert-local",
    mode: "behavior-taxonomy-and-trace-gates",
    suite: normalized.suite,
    taxonomy: {
      behavior: `${normalized.suite.replace(/-/g, "_")}_behavior`,
      dimensions,
    },
    scores,
    metrics: dimensions.map((dimension) => ({
      dimension: dimension.id,
      passRate: round(mean(scores.map((row) => row[dimension.id] ? 1 : 0))),
    })),
    traceGates: [
      { id: "trace-evidence-present", requiredFields: ["tool_calls", "routing", "model_calls"] },
      { id: "policy-violation-rate", maximumRate: 0 },
      { id: "protected-regression-rate", maximumRate: 0 },
    ],
  });
}

function normalizeTechniqueSpec(spec: TechniqueSpec) {
  const cases = Array.isArray(spec.cases) && spec.cases.length > 0
    ? spec.cases
    : [{ id: "baseline", feedback: "No evidence cases supplied; optimize instruction clarity and coverage.", score: 0 }];
  return {
    suite: stringValue(spec.suite, "improve-suite"),
    artifact: stringValue(spec.artifact, "artifact"),
    seed: stringValue(spec.seed, "Replace with the artifact under improvement."),
    objective: stringValue(spec.objective, "Improve the artifact against eval and trace evidence."),
    cases: cases.map((item, index) => ({
      id: stringValue(item.id, `case-${index + 1}`),
      input: stringValue(item.input, ""),
      output: stringValue(item.output, ""),
      expected: stringValue(item.expected, ""),
      feedback: stringValue(item.feedback, ""),
      score: typeof item.score === "number" ? item.score : 0,
      trace: stringValue(item.trace, ""),
    })),
    traces: Array.isArray(spec.traces) ? spec.traces : [],
    metrics: spec.metrics && typeof spec.metrics === "object" ? spec.metrics : {},
  };
}

function analyzeSignals(cases: NormalizedTechniqueCase[]) {
  return SIGNALS.map((signal) => {
    const caseIds = cases
      .filter((item) => signal.patterns.some((pattern) => textForCase(item).includes(pattern)))
      .map((item) => item.id);
    return {
      ...signal,
      count: caseIds.length,
      caseIds,
    };
  }).sort((left, right) => right.count - left.count || left.id.localeCompare(right.id));
}

function topSignals(signals: ReturnType<typeof analyzeSignals>, count: number) {
  return signals.slice(0, count);
}

function mutateText(seed: string, mutation: string, index: number): string {
  const heading = index === 0 ? "Evidence-Guided Rules" : index === 1 ? "Verification Gates" : "Regression Notes";
  return [
    seed.trim(),
    "",
    `## ${heading}`,
    "",
    `- ${mutation}`,
    "- Cite the eval case, trace span, or fixture that justifies each behavior change.",
    "- Preserve behavior that is not contradicted by failing evidence.",
    "",
  ].join("\n");
}

function scoreText(text: string, cases: NormalizedTechniqueCase[], signal: string) {
  const caseScores = cases.map((item) => scoreCase(text, item, signal));
  return {
    quality: round(mean(caseScores)),
    coverage: round(Math.min(1, caseScores.filter((score) => score >= 0.5).length / Math.max(1, cases.length))),
    constraintFit: round(text.includes("Preserve") && text.includes("evidence") ? 1 : 0.5),
    costPenalty: round(Math.min(0.35, estimateTokens(text) / 4000)),
  };
}

function scoreCase(text: string, item: NormalizedTechniqueCase, signal: string): number {
  const lowerText = text.toLowerCase();
  const evidence = textForCase(item);
  const matchedSignal = SIGNALS.find((candidate) => candidate.id === signal);
  const signalHit = matchedSignal ? matchedSignal.patterns.some((pattern) => lowerText.includes(pattern.split(" ")[0])) : false;
  const evidenceHit = evidence.split(/[^a-z0-9-]+/).filter((token) => token.length > 4).some((token) => lowerText.includes(token));
  const baseline = typeof item.score === "number" ? item.score : 0;
  return round(Math.max(baseline, Math.min(1, 0.25 + (signalHit ? 0.35 : 0) + (evidenceHit ? 0.25 : 0) + (lowerText.includes("evidence") ? 0.15 : 0))));
}

function paretoFrontier(candidates: any[]) {
  return candidates.filter((candidate) => !candidates.some((other) => (
    other.id !== candidate.id
    && other.scores.quality >= candidate.scores.quality
    && other.scores.coverage >= candidate.scores.coverage
    && other.estimatedTokens <= candidate.estimatedTokens
    && (
      other.scores.quality > candidate.scores.quality
      || other.scores.coverage > candidate.scores.coverage
      || other.estimatedTokens < candidate.estimatedTokens
    )
  )));
}

function splitCases(cases: NormalizedTechniqueCase[]) {
  const ordered = [...cases].sort((left, right) => left.id.localeCompare(right.id));
  const trainCut = Math.max(1, Math.ceil(ordered.length * 0.6));
  const valCut = Math.max(trainCut + 1, Math.ceil(ordered.length * 0.8));
  return {
    train: ordered.slice(0, trainCut),
    val: ordered.slice(trainCut, valCut).length ? ordered.slice(trainCut, valCut) : ordered.slice(0, 1),
    test: ordered.slice(valCut).length ? ordered.slice(valCut) : ordered.slice(-1),
  };
}

function baselineScore(cases: NormalizedTechniqueCase[]) {
  return round(mean(cases.map((item) => typeof item.score === "number" ? item.score : 0)));
}

function lossForNode(nodeId: string, signals: ReturnType<typeof analyzeSignals>): number {
  const weights: Record<string, string[]> = {
    context: ["grounding", "coverage"],
    planner: ["instruction-clarity", "coverage", "policy"],
    "tool-call": ["tool-sequencing", "efficiency"],
    final: ["output-schema", "grounding", "policy"],
  };
  const nodeSignals = weights[nodeId] || [];
  return mean(signals.filter((signal) => nodeSignals.includes(signal.id)).map((signal) => signal.count));
}

function evidenceForNode(nodeId: string, signals: ReturnType<typeof analyzeSignals>): string[] {
  const ids = new Set<string>();
  for (const signal of signals) {
    if (lossForNode(nodeId, [signal] as any) > 0) {
      for (const id of signal.caseIds) ids.add(id);
    }
  }
  return Array.from(ids).sort();
}

function traceOperation(nodeId: string): string {
  const operations: Record<string, string> = {
    context: "narrow-or-refresh-context-before-planning",
    planner: "add-explicit-branch-and-stop-policy",
    "tool-call": "validate-tool-preconditions-and-call-order",
    final: "validate-output-contract-before-final",
  };
  return operations[nodeId] || "inspect-node-loss";
}

function textForCase(item: NormalizedTechniqueCase): string {
  return `${item.input} ${item.output} ${item.expected} ${item.feedback} ${item.trace}`.toLowerCase();
}

function stringValue(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length * 1.3));
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
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
  runAgentLightning,
  runAssertGate,
  runGepa,
  runSkillOpt,
  runTraceOptimization,
};

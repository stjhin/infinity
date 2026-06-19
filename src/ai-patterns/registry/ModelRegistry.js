/**
 * Centralized inventory of AI models for governance, compliance (EU AI Act),
 * and risk management.
 *
 * @module ai-patterns/registry/ModelRegistry
 */

/** @type {import('../types').AIModel[]} */
const MODELS = [
  {
    id: 'deepseek-v4-pro',
    name: 'DeepSeek V4 Pro',
    version: '4.0.0',
    supplier: 'DeepSeek',
    purpose: 'General-purpose reasoning, code generation, architecture design',
    complianceTags: ['SOC2', 'GDPR-ready', 'EU-AI-Act-limited-risk'],
  },
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    version: '4.0.0',
    supplier: 'DeepSeek',
    purpose: 'Fast lookups, simple classification, exploration tasks',
    complianceTags: ['SOC2', 'GDPR-ready', 'EU-AI-Act-minimal-risk'],
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    version: '2025-01-01',
    supplier: 'OpenAI',
    purpose: 'Multimodal reasoning, creative content, translation',
    complianceTags: ['SOC2', 'GDPR-ready', 'EU-AI-Act-limited-risk'],
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    version: '2025-06-01',
    supplier: 'Anthropic',
    purpose: 'Long-form analysis, safety-critical reasoning, document Q&A',
    complianceTags: ['SOC2', 'GDPR-ready', 'EU-AI-Act-limited-risk', 'constitutional-AI'],
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    version: '2.5.0',
    supplier: 'Google',
    purpose: 'Multimodal, long-context, agentic workflows',
    complianceTags: ['SOC2', 'GDPR-ready', 'EU-AI-Act-limited-risk'],
  },
]

/**
 * Look up a model by its id.
 * @param {string} id
 * @returns {import('../types').AIModel|undefined}
 */
export function getModel(id) {
  return MODELS.find((m) => m.id === id)
}

/**
 * Return all registered models.
 * @returns {import('../types').AIModel[]}
 */
export function listModels() {
  return [...MODELS]
}

/**
 * Filter models by a compliance tag.
 * @param {string} tag
 * @returns {import('../types').AIModel[]}
 */
export function filterByComplianceTag(tag) {
  return MODELS.filter((m) => m.complianceTags.includes(tag))
}

export default MODELS

/**
 * Shared type definitions for AI pattern components.
 *
 * @module ai-patterns/types
 */

/**
 * @typedef {'user'|'ai'|'system'} MessageRole
 */

/**
 * @typedef {'idle'|'understanding'|'planning'|'executing'|'outputting'} ThinkingPhase
 */

/**
 * @typedef {'idle'|'listening'|'transcribing'|'error'} VoiceState
 */

/**
 * @typedef {Object} Citation
 * @property {string} id
 * @property {string} title
 * @property {string} [url]
 * @property {number} [confidence] - 0.0 to 1.0
 */

/**
 * @typedef {Object} ThinkingStep
 * @property {ThinkingPhase} phase
 * @property {string} label
 * @property {string} [content]
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {MessageRole} role
 * @property {string} content
 * @property {number} timestamp
 * @property {Citation[]} [sources]
 * @property {ThinkingStep[]} [thinking]
 */

/**
 * @typedef {Object} AIModel
 * @property {string} id
 * @property {string} name
 * @property {string} version
 * @property {string} supplier
 * @property {string} purpose
 * @property {string[]} complianceTags
 */

/**
 * @typedef {Object} CIDeployment
 * @property {string} ciId
 * @property {string} environment - e.g. "us-prod", "eu-prod", "staging"
 * @property {string} assetId - linked asset
 * @property {string} deployedAt - ISO date string
 * @property {string} [version]
 */

/**
 * @typedef {Object} QuickAction
 * @property {string} label
 * @property {string} [icon]
 * @property {() => void} onClick
 */

export const TYPES = {} // module marker — types are JSDoc only

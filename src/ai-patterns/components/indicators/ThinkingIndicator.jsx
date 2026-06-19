import React from 'react'
import './ThinkingIndicator.css'

/** @type {Record<import('../../types').ThinkingPhase, string>} */
const PHASE_ICONS = {
  idle: 'hourglass_empty',
  understanding: 'psychology',
  planning: 'account_tree',
  executing: 'terminal',
  outputting: 'edit_note',
}

/** @type {Record<import('../../types').ThinkingPhase, string>} */
const PHASE_COLORS = {
  idle: 'var(--ai-thinking-phase-idle)',
  understanding: 'var(--ai-thinking-phase-understanding)',
  planning: 'var(--ai-thinking-phase-planning)',
  executing: 'var(--ai-thinking-phase-executing)',
  outputting: 'var(--ai-thinking-phase-outputting)',
}

/**
 * Status badge showing the AI's current reasoning phase.
 *
 * @param {Object} props
 * @param {import('../../types').ThinkingPhase} props.phase
 * @param {string} [props.label]
 * @param {boolean} [props.isActive=false]
 * @param {string} [props.className]
 */
export default function ThinkingIndicator({
  phase = 'idle',
  label,
  isActive = false,
  className = '',
}) {
  const icon = PHASE_ICONS[phase] || 'hourglass_empty'
  const color = PHASE_COLORS[phase] || PHASE_COLORS.idle
  const displayLabel = label || phase.charAt(0).toUpperCase() + phase.slice(1)

  return (
    <div
      className={`ai-thinking-indicator ${isActive ? 'ai-thinking-indicator--active' : ''} ${className}`.trim()}
      role="status"
      aria-label={`AI is thinking: ${displayLabel}`}
      style={{ '--ai-thinking-phase-color': color }}
    >
      <span className="material-symbols-rounded ai-thinking-indicator__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="ai-thinking-indicator__label">{displayLabel}</span>
      {isActive && <span className="ai-thinking-indicator__pulse" aria-hidden="true" />}
    </div>
  )
}

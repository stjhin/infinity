import React from 'react'
import './TypingIndicator.css'

/**
 * Animated "AI is typing" dots indicator.
 *
 * @param {Object} props
 * @param {string} [props.label='AI is typing']
 * @param {'small'|'medium'} [props.size='medium']
 * @param {string} [props.className]
 */
export default function TypingIndicator({
  label = 'AI is typing',
  size = 'medium',
  className = '',
}) {
  return (
    <div
      className={`ai-typing ${size === 'small' ? 'ai-typing--small' : ''} ${className}`.trim()}
      role="status"
      aria-label={label}
    >
      <span className="ai-typing__dots" aria-hidden="true">
        <span className="ai-typing__dot" />
        <span className="ai-typing__dot" />
        <span className="ai-typing__dot" />
      </span>
      <span className="ai-typing__label">{label}</span>
    </div>
  )
}

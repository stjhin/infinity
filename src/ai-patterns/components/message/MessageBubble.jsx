import React from 'react'
import './MessageBubble.css'

/**
 * Role-based message bubble with optional avatar and action bar.
 *
 * @param {Object} props
 * @param {import('../../types').MessageRole} props.role
 * @param {React.ReactNode} [props.avatar]
 * @param {string} [props.timestamp]
 * @param {React.ReactNode} [props.actions] - action buttons (copy, regenerate, etc.)
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export default function MessageBubble({
  role = 'ai',
  avatar,
  timestamp,
  actions,
  children,
  className = '',
}) {
  const roleLabel = role === 'ai' ? 'AI' : role === 'system' ? 'System' : 'You'

  return (
    <div className={`ai-message ai-message--${role} ${className}`.trim()}>
      {avatar && (
        <div className="ai-message__avatar" aria-hidden="true">
          {avatar}
        </div>
      )}

      <div className="ai-message__body">
        <div className="ai-message__header">
          <span className="ai-message__role">{roleLabel}</span>
          {timestamp && (
            <time className="ai-message__time" dateTime={timestamp}>
              {timestamp}
            </time>
          )}
        </div>

        <div className="ai-message__content">
          {children}
        </div>

        {actions && (
          <div className="ai-message__actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

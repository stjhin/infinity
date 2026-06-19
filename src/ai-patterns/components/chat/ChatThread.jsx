import React from 'react'
import './ChatThread.css'

/**
 * A single conversation thread in the sidebar history list.
 *
 * @param {Object} props
 * @param {{ id: string, title: string, messages: import('../../types').Message[], createdAt: string }} props.thread
 * @param {boolean} [props.isActive=false]
 * @param {(threadId: string) => void} [props.onClick]
 * @param {string} [props.className]
 */
export default function ChatThread({
  thread,
  isActive = false,
  onClick,
  className = '',
}) {
  const preview = thread.messages.length > 0
    ? thread.messages[thread.messages.length - 1].content.slice(0, 80)
    : 'Empty conversation'

  const messageCount = thread.messages.length

  return (
    <button
      type="button"
      className={`ai-thread ${isActive ? 'ai-thread--active' : ''} ${className}`.trim()}
      onClick={() => onClick?.(thread.id)}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="ai-thread__icon material-symbols-rounded" aria-hidden="true">
        chat_bubble
      </span>
      <div className="ai-thread__body">
        <span className="ai-thread__title">{thread.title}</span>
        <span className="ai-thread__preview">
          {preview}{preview.length >= 80 ? '...' : ''}
        </span>
      </div>
      <div className="ai-thread__meta">
        <span className="ai-thread__count">{messageCount}</span>
        <span className="ai-thread__date">
          {new Date(thread.createdAt).toLocaleDateString()}
        </span>
      </div>
    </button>
  )
}

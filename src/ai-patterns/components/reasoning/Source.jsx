import React from 'react'
import './Source.css'

/**
 * Single citation reference with optional confidence badge.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.url]
 * @param {number} [props.confidence] - 0.0 to 1.0
 * @param {() => void} [props.onClick]
 * @param {string} [props.className]
 */
export default function Source({
  title,
  url,
  confidence,
  onClick,
  className = '',
}) {
  const confidenceLevel =
    confidence == null ? null
    : confidence >= 0.8 ? 'high'
    : confidence >= 0.5 ? 'medium'
    : 'low'

  const confidencePercent = confidence != null ? `${Math.round(confidence * 100)}%` : null

  const content = (
    <span className={`ai-source ${className}`.trim()}>
      <span className="material-symbols-rounded ai-source__icon" aria-hidden="true">
        {url ? 'link' : 'description'}
      </span>
      <span className="ai-source__title">{title}</span>
      {confidencePercent && (
        <span className={`ai-source__confidence ai-source__confidence--${confidenceLevel}`}>
          {confidencePercent}
        </span>
      )}
    </span>
  )

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="ai-source__link"
        onClick={onClick}
      >
        {content}
      </a>
    )
  }

  if (onClick) {
    return (
      <button type="button" className="ai-source__link" onClick={onClick}>
        {content}
      </button>
    )
  }

  return content
}

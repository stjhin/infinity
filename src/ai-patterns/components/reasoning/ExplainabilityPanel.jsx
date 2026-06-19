import React from 'react'
import { listModels } from '../../registry/ModelRegistry'
import './ExplainabilityPanel.css'

/**
 * Shows confidence scores and explainability details alongside AI output.
 *
 * @param {Object} props
 * @param {number} props.confidence - 0.0 to 1.0
 * @param {string} [props.explanation]
 * @param {import('../../types').AIModel} [props.model]
 * @param {string} [props.className]
 */
export default function ExplainabilityPanel({
  confidence = 0,
  explanation,
  model,
  className = '',
}) {
  const percent = Math.round(confidence * 100)
  const level = confidence >= 0.8 ? 'high' : confidence >= 0.5 ? 'medium' : 'low'
  const label = level === 'high' ? 'High confidence' : level === 'medium' ? 'Moderate confidence' : 'Low confidence'

  return (
    <div className={`ai-explain ${className}`.trim()}>
      <div className="ai-explain__header">
        <span className="material-symbols-rounded" aria-hidden="true">insights</span>
        <span className="ai-explain__title">Explainability</span>
      </div>

      <div className="ai-explain__confidence">
        <div className="ai-explain__confidence-bar">
          <div
            className={`ai-explain__confidence-fill ai-explain__confidence-fill--${level}`}
            style={{ width: `${percent}%` }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${label}: ${percent}%`}
          />
        </div>
        <span className={`ai-explain__confidence-value ai-explain__confidence-value--${level}`}>
          {percent}%
        </span>
        <span className="ai-explain__confidence-label">{label}</span>
      </div>

      {explanation && (
        <div className="ai-explain__explanation">
          <span className="ai-explain__section-label">Explanation</span>
          <p className="ai-explain__text">{explanation}</p>
        </div>
      )}

      {model && (
        <div className="ai-explain__model">
          <span className="ai-explain__section-label">Model attribution</span>
          <span className="ai-explain__model-name">{model.name} v{model.version}</span>
          <span className="ai-explain__model-supplier">by {model.supplier}</span>
        </div>
      )}
    </div>
  )
}

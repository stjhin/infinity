import React, { useState } from 'react'
import ThinkingIndicator from '../indicators/ThinkingIndicator'
import ExplainabilityPanel from './ExplainabilityPanel'
import './ChainOfThought.css'

/**
 * Collapsible container visualizing the AI's multi-phase reasoning.
 *
 * @param {Object} props
 * @param {import('../../types').ThinkingStep[]} props.steps
 * @param {boolean} [props.isActive=false]
 * @param {boolean} [props.defaultExpanded=false]
 * @param {boolean} [props.embedded=false] - blend into parent bubble (no border, transparent bg)
 * @param {number} [props.confidence] - 0.0 to 1.0
 * @param {string} [props.explanation]
 * @param {import('../../types').AIModel} [props.model]
 * @param {string} [props.className]
 */
export default function ChainOfThought({
  steps = [],
  isActive = false,
  defaultExpanded = false,
  embedded = false,
  confidence,
  explanation,
  model,
  className = '',
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  if (steps.length === 0) return null

  const activeStep = isActive ? steps[steps.length - 1] : null

  return (
    <div className={`ai-cot ${expanded ? 'ai-cot--expanded' : ''} ${isActive ? 'ai-cot--active' : ''} ${embedded ? 'ai-cot--embedded' : ''} ${className}`.trim()}>
      <button
        type="button"
        className="ai-cot__header"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="ai-cot__header-left">
          <span className="material-symbols-rounded" aria-hidden="true">psychology</span>
          <span className="ai-cot__title">Chain of Thought</span>
          {activeStep && (
            <ThinkingIndicator
              phase={activeStep.phase}
              label={activeStep.label}
              isActive={true}
            />
          )}
        </span>

        <span className="ai-cot__header-right">
          {/* Compact confidence badge visible even when collapsed */}
          {confidence != null && (
            <span className={`ai-cot__confidence-badge ai-cot__confidence-badge--${confidence >= 0.8 ? 'high' : confidence >= 0.5 ? 'medium' : 'low'}`}>
              {Math.round(confidence * 100)}%
            </span>
          )}
          <span className="material-symbols-rounded ai-cot__chevron" aria-hidden="true">
            {expanded ? 'expand_less' : 'expand_more'}
          </span>
        </span>
      </button>

      {expanded && (
        <div className="ai-cot__steps">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`ai-cot__step ${i === steps.length - 1 && isActive ? 'ai-cot__step--active' : ''}`}
            >
              <div className="ai-cot__step-indicator">
                <ThinkingIndicator
                  phase={step.phase}
                  label={step.label}
                  isActive={i === steps.length - 1 && isActive}
                />
              </div>
              {step.content && (
                <div className="ai-cot__step-content">{step.content}</div>
              )}
            </div>
          ))}

          {/* Inline explainability — the final output of the reasoning process */}
          {confidence != null && explanation && (
            <div className="ai-cot__explainability">
              <ExplainabilityPanel
                confidence={confidence}
                explanation={explanation}
                model={model}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

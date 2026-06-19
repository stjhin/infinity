import React from 'react'
import './PersonaCard.css'

/**
 * Identity card for the AI agent/assistant.
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.description
 * @param {string} [props.avatarUrl]
 * @param {string[]} [props.capabilities]
 * @param {import('../../types').AIModel} [props.model]
 * @param {string} [props.className]
 */
export default function PersonaCard({
  name,
  description,
  avatarUrl,
  capabilities = [],
  model,
  className = '',
}) {
  return (
    <div className={`ai-persona ${className}`.trim()}>
      <div className="ai-persona__header">
        <div className="ai-persona__avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} />
          ) : (
            <span className="material-symbols-rounded" aria-hidden="true">smart_toy</span>
          )}
        </div>
        <div className="ai-persona__identity">
          <h3 className="ai-persona__name">{name}</h3>
          <p className="ai-persona__description">{description}</p>
        </div>
      </div>

      {capabilities.length > 0 && (
        <div className="ai-persona__capabilities">
          <span className="ai-persona__section-title">Capabilities</span>
          <div className="ai-persona__tags">
            {capabilities.map((cap) => (
              <span key={cap} className="ai-persona__tag">{cap}</span>
            ))}
          </div>
        </div>
      )}

      {model && (
        <div className="ai-persona__model">
          <span className="ai-persona__section-title">Powered by</span>
          <span className="ai-persona__model-name">{model.name} v{model.version}</span>
          <span className="ai-persona__model-supplier">{model.supplier}</span>
        </div>
      )}
    </div>
  )
}

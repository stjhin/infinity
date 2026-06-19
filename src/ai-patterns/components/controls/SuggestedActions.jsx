import React from 'react'
import QuickReply from './QuickReply'
import './SuggestedActions.css'

/**
 * A row/column of QuickReply chips for suggested follow-ups.
 *
 * @param {Object} props
 * @param {{label: string, icon?: string, onClick: () => void}[]} props.actions
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal']
 * @param {string} [props.className]
 */
export default function SuggestedActions({
  actions = [],
  orientation = 'horizontal',
  className = '',
}) {
  if (actions.length === 0) return null

  return (
    <div className={`ai-suggested ai-suggested--${orientation} ${className}`.trim()}>
      <span className="ai-suggested__label">Suggested</span>
      <div className="ai-suggested__list">
        {actions.map((action, i) => (
          <QuickReply
            key={i}
            label={action.label}
            icon={action.icon}
            onClick={action.onClick}
          />
        ))}
      </div>
    </div>
  )
}

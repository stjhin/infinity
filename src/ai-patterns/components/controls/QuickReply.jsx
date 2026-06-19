import React from 'react'
import Chip from '../../../components/Chip'
import './QuickReply.css'

/**
 * Quick-reply chip for suggested prompts and action buttons.
 * Wraps the existing Chip component with AI-pattern styling.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {string} [props.icon]
 * @param {() => void} [props.onClick]
 * @param {string} [props.className]
 */
export default function QuickReply({
  label,
  icon,
  onClick,
  className = '',
}) {
  return (
    <Chip
      label={label}
      leftIconName={icon || undefined}
      hasLeftIcon={!!icon}
      hasCancel={false}
      variant="outlined"
      onClick={onClick}
      className={`ai-quick-reply ${className}`.trim()}
    />
  )
}

import React from 'react'
import './Chip.css'
import { token, iconColor } from '../utils'

export default function Chip({
  label = 'Chip',
  // Variants from Figma
  state = 'enabled',         // enabled | hover | pressed | disabled
  variant = 'filled',        // filled | outlined
  // Icon toggles (Figma: Icon-L and Cancel)
  hasLeftIcon = true,
  hasCancel = true,
  // Icon color (uses --icon-* tokens from index.css)
  iconColor: iconColorProp,
  // Icon names (Google Material Symbols)
  leftIconName = 'dark_mode',
  // Handlers
  onClick,
  onCancel,
  // Misc
  disabled = false,
  className = '',
  ...rest
}) {
  const isDisabled = disabled || state === 'disabled'

  // Resolve icon color: explicit prop > auto from chip style
  const resolvedIconColor = iconColorProp != null ? iconColor(iconColorProp) : null

  // Appearance from Figma tokens
  const appearance = (() => {
    const isFilled = variant === 'filled'

    if (isDisabled) {
      return {
        '--chip-bg': token('color.asx-mono.200', '#b6c2cf'),
        '--chip-border-color': 'transparent',
        '--chip-border-width': '0px',
        '--chip-text-color': token('global.text.white', '#ffffff'),
        '--chip-icon-color': token('global.text.white', '#ffffff'),
      }
    }

    if (state === 'pressed') {
      if (isFilled) {
        return {
          '--chip-bg': token('color.asx-purple.1000', '#2b273f'),
          '--chip-border-color': 'transparent',
          '--chip-border-width': '0px',
          '--chip-text-color': token('global.text.white', '#ffffff'),
          '--chip-icon-color': token('global.text.white', '#ffffff'),
        }
      }
      return {
        '--chip-bg': token('color.asx-purple.200', '#dfd8fd'),
        '--chip-border-color': token('color.asx-purple.800', '#5e4db2'),
        '--chip-border-width': '2px',
        '--chip-text-color': token('color.asx-purple.800', '#5e4db2'),
        '--chip-icon-color': token('color.asx-purple.800', '#5e4db2'),
      }
    }

    if (state === 'hover') {
      if (isFilled) {
        return {
          '--chip-bg': token('color.asx-purple.900', '#352c63'),
          '--chip-border-color': 'transparent',
          '--chip-border-width': '0px',
          '--chip-text-color': token('global.text.white', '#ffffff'),
          '--chip-icon-color': token('global.text.white', '#ffffff'),
        }
      }
      return {
        '--chip-bg': token('color.asx-purple.200', '#dfd8fd'),
        '--chip-border-color': token('color.asx-purple.800', '#5e4db2'),
        '--chip-border-width': '1px',
        '--chip-text-color': token('color.asx-purple.800', '#5e4db2'),
        '--chip-icon-color': token('color.asx-purple.800', '#5e4db2'),
      }
    }

    // Enabled (default)
    if (isFilled) {
      return {
        '--chip-bg': token('color.asx-purple.800', '#5e4db2'),
        '--chip-border-color': 'transparent',
        '--chip-border-width': '0px',
        '--chip-text-color': token('global.text.white', '#ffffff'),
        '--chip-icon-color': token('global.text.white', '#ffffff'),
      }
    }
    return {
      '--chip-bg': token('global.bg.white', '#ffffff'),
      '--chip-border-color': token('color.asx-purple.800', '#5e4db2'),
      '--chip-border-width': '1px',
      '--chip-text-color': token('color.asx-purple.800', '#5e4db2'),
      '--chip-icon-color': token('color.asx-purple.800', '#5e4db2'),
    }
  })()

  const classes = [
    'chip',
    `chip--${variant}`,
    isDisabled ? 'chip--disabled' : '',
    className,
  ]

  const { style: extraStyle, ...restProps } = rest || {}
  const iconOverride = resolvedIconColor ? { '--chip-icon-color': resolvedIconColor } : {}
  const finalStyle = { ...appearance, ...iconOverride, ...(extraStyle || {}) }

  const handleClick = (e) => {
    if (isDisabled) return
    if (onClick) onClick(e)
  }

  const handleCancel = (e) => {
    e.stopPropagation()
    if (isDisabled) return
    if (onCancel) onCancel(e)
  }

  return (
    <div
      className={classes.filter(Boolean).join(' ')}
      style={finalStyle}
      onClick={handleClick}
      role="button"
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : 0}
      {...restProps}
    >
      {/* Left icon (Figma: Icon-L) */}
      {hasLeftIcon && leftIconName && (
        <span className="chip__icon" aria-hidden>
          <span className="material-symbols-rounded">{leftIconName}</span>
        </span>
      )}

      {/* Label */}
      <span className="chip__label">{label}</span>

      {/* Cancel button (Figma: Cancel) */}
      {hasCancel && (
        <span
          className="chip__cancel"
          aria-label={`Remove ${label}`}
          role="button"
          onClick={handleCancel}
          tabIndex={isDisabled ? -1 : 0}
        >
          <span className="material-symbols-rounded">close</span>
        </span>
      )}
    </div>
  )
}

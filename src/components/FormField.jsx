import React, { useId, useState, useEffect, useRef } from 'react'
import './FormField.css'
import googleIconNames from '../data/googleIconNames.json'
import Menu from './Menu'
import { token, iconColor } from '../utils'

const GOOGLE_ICON_SET = new Set(googleIconNames)

export default function FormField({
  // Content
  value = '',
  placeholder = 'Text',
  // Variants from Figma
  size = 'hug',         // hug | small | medium | large
  state = 'enabled',    // enabled | hover | active | focus | disabled
  validation = 'default', // default | error | success
  // Icon toggles
  hasLeftIcon = true,
  hasRightIcon = true,
  // Icon color (uses --icon-* tokens from index.css)
  iconColor: iconColorProp,
  // Icon names (Google Material Symbols)
  leftIconName = 'dark_mode',
  rightIconName = 'keyboard_arrow_down',
  // Field type
  fieldType = 'text',   // text | dropdown
  // Dropdown menu props
  dropdownItems = [],
  onSelect,
  menuValue,
  // Event handlers
  onChange,
  onClick,
  onFocus,
  onBlur,
  // Misc
  disabled = false,
  className = '',
  name,
  id,
  ...rest
}) {
  const generatedId = useId()
  const fieldId = id || generatedId

  // Dropdown menu open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef(null)

  // Determine if disabled from either state or explicit prop
  const isDisabled = disabled || state === 'disabled'

  // Effective focus: either Storybook-simulated (state prop) or real browser focus
  const hasFocus = state === 'focus' || isFocused

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isMenuOpen])

  // Compute validation icon override
  const computedLeftIcon = (() => {
    if (validation === 'error') return 'error'
    if (validation === 'success') return 'check_circle'
    return leftIconName
  })()

  // Resolve icon color: explicit prop > auto from validation > default black
  const resolvedIconColor = iconColorProp != null
    ? iconColor(iconColorProp)
    : (validation === 'error' ? iconColor('red')
      : validation === 'success' ? iconColor('green')
      : iconColor('black'))

  // Map logical variant + validation to CSS custom property overrides
  const appearance = (() => {
    // Base: use index.css root tokens as defaults
    const base = {
      '--form-field-bg': token('global.bg.white', '#ffffff'),
      '--form-field-border-color': token('color.asx-mono.1200', '#101214'),
      '--form-field-text-color': token('color.asx-mono.1200', '#101214'),
      '--form-field-icon-color': resolvedIconColor,
      '--form-field-border-width': '1px',
    }

    // State overrides
    if (isDisabled) {
      return {
        ...base,
        '--form-field-bg': token('color.asx-mono.100', '#c7d1db'),
        '--form-field-border-color': 'transparent',
        '--form-field-text-color': token('global.text.white', '#ffffff'),
        '--form-field-icon-color': iconColor('white'),
        '--form-field-border-width': '0px',
      }
    }

    if (state === 'hover') {
      base['--form-field-bg'] = token('color.asx-purple.100', '#f3f0ff')
    } else if (state === 'active') {
      base['--form-field-bg'] = token('color.asx-purple.200', '#dfd8fd')
    } else if (hasFocus) {
      base['--form-field-bg'] = token('color.asx-purple.200', '#dfd8fd')
      base['--form-field-border-color'] = token('color.asx-blue.800', '#0055cc')
      base['--form-field-border-width'] = '4px'
    }

    // Validation overrides (applied on top of state)
    if (validation === 'error') {
      base['--form-field-bg'] = token('color.asx-red.100', '#ffeceb')
      base['--form-field-border-color'] = token('color.asx-red.800', '#ae2e24')
      base['--form-field-border-width'] = '1px'
    } else if (validation === 'success') {
      base['--form-field-bg'] = token('color.asx-green.100', '#dcfff1')
      base['--form-field-border-color'] = token('color.asx-green.800', '#216e4e')
      base['--form-field-border-width'] = '1px'
    }

    return base
  })()

  const classes = [
    'form-field',
    size ? `form-field--${size}` : '',
    fieldType === 'dropdown' ? 'form-field--dropdown' : '',
    isDisabled ? 'is-disabled' : '',
    // State simulation classes (for Storybook pseudo-class hooks)
    state === 'hover' ? 'state-hover' : '',
    state === 'active' ? 'state-active' : '',
    hasFocus ? 'state-focus' : '',
    className,
  ]

  // Merge any style passed via props with our computed appearance
  const { style: extraStyle, ...restProps } = rest || {}
  const finalStyle = { ...appearance, ...(extraStyle || {}) }

  const renderIcon = (iconName) => {
    if (!iconName) return null
    // React nodes are allowed for advanced/custom usage.
    if (React.isValidElement(iconName)) return iconName

    // String icons are restricted to Google Material Symbols icon names.
    if (typeof iconName === 'string') {
      const name = iconName.trim()
      if (GOOGLE_ICON_SET.has(name)) {
        return <span className="material-symbols-rounded">{name}</span>
      }
      // Fallback: convert dashes to underscores (Figma icon naming convention)
      const validatedName = name.replace(/-/g, '_')
      if (GOOGLE_ICON_SET.has(validatedName)) {
        return <span className="material-symbols-rounded">{validatedName}</span>
      }
    }

    return null
  }

  const handleClick = (e) => {
    if (isDisabled) return
    if (fieldType === 'dropdown') {
      setIsMenuOpen((prev) => !prev)
    }
    if (onClick) onClick(e)
  }

  const handleChange = (e) => {
    if (isDisabled) return
    if (onChange) onChange(e)
  }

  const handleFocus = (e) => {
    setIsFocused(true)
    if (isDisabled) return
    if (onFocus) onFocus(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    if (isDisabled) return
    if (onBlur) onBlur(e)
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-flex' }}>
      <div
        className={classes.filter(Boolean).join(' ')}
        onClick={handleClick}
        style={finalStyle}
        role={fieldType === 'dropdown' ? 'combobox' : undefined}
        aria-expanded={fieldType === 'dropdown' ? isMenuOpen : undefined}
        aria-disabled={isDisabled || undefined}
        {...restProps}
      >
      {/* Left section: icon + input */}
      <div className="form-field__left">
        {hasLeftIcon && (
          <span className="form-field__icon" aria-hidden style={{ color: 'var(--form-field-icon-color)' }}>
            {renderIcon(computedLeftIcon)}
          </span>
        )}

        {fieldType === 'dropdown' ? (
          <span className="form-field__input" style={{ fontStyle: value ? 'normal' : 'italic' }}>
            {value || placeholder}
          </span>
        ) : (
          <input
            id={fieldId}
            name={name}
            type="text"
            className="form-field__input"
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
      </div>

      {/* Right section: dropdown caret (dropdown) or plain icon (text) */}
      {fieldType === 'dropdown' && hasRightIcon && (
        <span className="form-field__caret" aria-hidden style={{ color: 'var(--form-field-icon-color)' }}>
          {renderIcon(rightIconName)}
        </span>
      )}
      {fieldType !== 'dropdown' && hasRightIcon && rightIconName && (
        <span className="form-field__icon form-field__icon--right" aria-hidden style={{ color: 'var(--form-field-icon-color)' }}>
          {renderIcon(rightIconName)}
        </span>
      )}
      </div>

      {/* Dropdown menu */}
      {fieldType === 'dropdown' && isMenuOpen && (
        <div className="form-field__menu" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: 4,
          zIndex: 1000,
          '--menu-width': '100%',
        }}>
          <Menu
            items={dropdownItems}
            value={menuValue}
            showCheckbox={false}
            onChange={(newValue, item) => {
              setIsMenuOpen(false)
              if (onSelect) onSelect(newValue, item)
            }}
          />
        </div>
      )}
    </div>
  )
}

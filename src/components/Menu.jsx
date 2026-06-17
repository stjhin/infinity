import React, { useState, useCallback } from 'react'
import './Menu.css'
import { token } from '../utils'

function MenuItem({
  label,
  subtitle,
  selected = false,
  showCheckbox = true,
  showSubtitle = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
}) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleMouseEnter = useCallback((e) => {
    setHovered(true)
    if (onMouseEnter) onMouseEnter(e)
  }, [onMouseEnter])

  const handleMouseLeave = useCallback((e) => {
    setHovered(false)
    if (onMouseLeave) onMouseLeave(e)
  }, [onMouseLeave])

  const handleFocus = useCallback(() => setFocused(true), [])
  const handleBlur = useCallback(() => setFocused(false), [])

  // Compute state from Figma: Default, Hover, Selected, Focus
  const itemClasses = [
    'menu-item',
    selected ? 'menu-item--selected' : '',
    hovered ? 'menu-item--hover' : '',
    focused ? 'menu-item--focus' : '',
    className,
  ]

  // Appearance from Figma tokens
  const appearance = (() => {
    if (focused) {
      return {
        '--menu-item-bg': token('global.bg.white', '#ffffff'),
        '--menu-item-border-color': token('color.asx-blue.800', '#0055cc'),
        '--menu-item-border-width': '2px',
        '--menu-item-text-color': token('color.asx-mono.1200', '#101214'),
      }
    }
    if (selected) {
      return {
        '--menu-item-bg': token('global.bg.white', '#ffffff'),
        '--menu-item-border-color': 'transparent',
        '--menu-item-border-width': '0px',
        '--menu-item-text-color': token('color.asx-mono.1200', '#101214'),
        '--menu-item-checkbox-fill': token('color.asx-purple.800', '#5e4db2'),
      }
    }
    if (hovered) {
      return {
        '--menu-item-bg': token('color.asx-purple.200', '#dfd8fd'),
        '--menu-item-border-color': 'transparent',
        '--menu-item-border-width': '0px',
        '--menu-item-text-color': token('color.asx-mono.1200', '#101214'),
      }
    }
    // Default
    return {
      '--menu-item-bg': token('global.bg.white', '#ffffff'),
      '--menu-item-border-color': 'transparent',
      '--menu-item-border-width': '0px',
      '--menu-item-text-color': token('color.asx-mono.1200', '#101214'),
    }
  })()

  return (
    <div
      className={itemClasses.filter(Boolean).join(' ')}
      style={appearance}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="option"
      aria-selected={selected}
      tabIndex={0}
    >
      {/* Checkbox slot */}
      {showCheckbox && (
        <span className="menu-item__checkbox" aria-hidden>
          {selected ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" fill="var(--menu-item-checkbox-fill, #5e4db2)" />
              <path d="M7 12l3.5 3.5L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke={token('color.asx-mono.400', '#8c9bab')} strokeWidth="2" fill="none" />
            </svg>
          )}
        </span>
      )}

      {/* Text slot */}
      <div className="menu-item__text">
        <span className="menu-item__label">{label}</span>
        {showSubtitle && subtitle && (
          <span className="menu-item__subtitle">{subtitle}</span>
        )}
      </div>
    </div>
  )
}

export default function Menu({
  items = [],
  value,
  onChange,
  showCheckbox = true,
  showSubtitle = true,
  className = '',
  ...rest
}) {
  if (!items || items.length === 0) return null

  return (
    <div
      className={`menu ${className}`.trim()}
      role="listbox"
      {...rest}
    >
      {items.map((item, index) => (
        <MenuItem
          key={item.value ?? index}
          label={item.label}
          subtitle={item.subtitle}
          selected={value != null && item.value === value}
          showCheckbox={showCheckbox}
          showSubtitle={showSubtitle}
          onClick={() => {
            if (onChange) onChange(item.value, item)
          }}
        />
      ))}
    </div>
  )
}

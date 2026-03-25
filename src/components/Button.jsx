import React from 'react'
import './Button.css'
import variables from '../variables.json'

const IMG_ICON = 'http://localhost:3845/assets/4c41b1fe2598c2502a70f753f273a8ff32c806f5.svg'
const IMG_SPINNER = 'http://localhost:3845/assets/36997f8f3bf435d2073fe6daebe6ddd04fe8d2e2.svg'

// small helper to safely read token values
const token = (path, fallback) => {
  try {
    return path.split('.').reduce((o, k) => (o ? o[k] : undefined), variables) .value || fallback
  } catch (e) {
    return fallback
  }
}

export default function Button({
  children,
  variant = 'primary', // primary | tertiary | confirm-primary | confirm-tertiary | danger-primary | danger-tertiary | loading
  size = 'medium', // small | medium
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  btnType = 'text', // text | dropdown | icon-only | icon-only-dropdown
  onClick,
  className = '',
  ...rest
}) {
  // determine appearance tokens based on variant
  const vars = variables

  // mapping of logical variant -> token refs
  const appearance = (() => {
    switch (variant) {
      case 'tertiary':
        return {
          '--btn-bg': token('global.bg.white', '#ffffff'),
          '--btn-text': token('global.text.black', '#22272b'),
          '--btn-border': 'transparent',
          '--btn-active-border': 'transparent',
          '--btn-hover-bg': token('global.bg.brand100', '#f3f0ff'),
          '--btn-active-bg': token('global.bg.brand200', '#dfd8fd'),
          '--btn-focus-ring': '0 0 0 3px rgba(130,112,219,0.24), 0 0 0 1px var(--bg-white) inset',
        }
      case 'confirm-primary':
        return {
          // use brand color for confirm/primary (not green) to match the project's button palette
          '--btn-bg': token('global.bg.brand800', '#5e4db2'),
          '--btn-text': token('global.text.white', '#ffffff'),
          '--btn-hover-bg': token('global.bg.brand700', '#6e5dc6'),
          '--btn-active-bg': token('global.bg.brand900', '#352c63'),
          '--btn-border': token('global.bg.brand800', '#5e4db2'),
          '--btn-active-border': token('global.bg.brand900', '#352c63'),
          '--btn-focus-ring': '0 0 0 3px rgba(130,112,219,0.24), 0 0 0 1px var(--bg-white) inset',
        }
      case 'confirm-tertiary':
        return {
          '--btn-bg': token('global.bg.white', '#ffffff'),
          '--btn-text': token('global.text.brand-light', '#5e4db2'),
          '--btn-border': 'transparent',
          '--btn-active-border': 'transparent',
          '--btn-hover-bg': token('global.bg.brand100', '#f3f0ff'),
          '--btn-active-bg': token('global.bg.brand200', '#dfd8fd'),
          '--btn-focus-ring': '0 0 0 3px rgba(130,112,219,0.24), 0 0 0 1px var(--bg-white) inset',
        }
      case 'danger-primary':
        return {
          '--btn-bg': token('color.asx-red.600', '#e2483d'),
          '--btn-text': token('global.text.white', '#ffffff'),
          '--btn-hover-bg': token('color.asx-red.700', '#c9372c'),
          '--btn-active-bg': token('color.asx-red.800', '#ae2e24'),
          '--btn-border': token('color.asx-red.600', '#e2483d'),
          '--btn-active-border': token('color.asx-red.800', '#ae2e24'),
          '--btn-focus-ring': '0 0 0 3px rgba(226,72,61,0.24), 0 0 0 1px var(--bg-white) inset',
        }
      case 'danger-tertiary':
        return {
          '--btn-bg': token('global.bg.white', '#ffffff'),
          '--btn-text': token('global.text.error', '#ae2e24'),
          '--btn-border': 'transparent',
          '--btn-active-border': 'transparent',
          '--btn-hover-bg': token('global.bg.error-light', '#ffebe6'),
          '--btn-active-bg': token('global.bg.error-subtlest', '#fdd0c7'),
          '--btn-focus-ring': '0 0 0 3px rgba(226,72,61,0.24), 0 0 0 1px var(--bg-white) inset',
        }
      case 'loading':
        return {
          '--btn-bg': token('global.bg.gray100', '#f7f8f9'),
          '--btn-text': token('global.text.grey', '#738496'),
          '--btn-border': token('global.bg.gray300', '#dcdfe4'),
          '--btn-hover-bg': token('global.bg.gray100', '#f7f8f9'),
          '--btn-active-bg': token('global.bg.gray100', '#f7f8f9'),
          '--btn-focus-ring': '0 0 0 3px rgba(115,132,150,0.16), 0 0 0 1px var(--bg-white) inset',
        }
      case 'primary':
      default:
        return {
          // default/primary in Figma is a white background with dark text
          '--btn-bg': token('global.bg.white', '#ffffff'),
          '--btn-text': token('global.text.black', '#22272b'),
          '--btn-border': token('global.border.gray900', '#22272b'),
          '--btn-hover-bg': token('global.bg.gray100', '#f7f8f9'),
          '--btn-active-bg': token('global.bg.gray200', '#f1f2f4'),
          '--btn-active-border': token('global.border.gray900', '#22272b'),
          '--btn-focus-ring': '0 0 0 3px rgba(68,84,111,0.20), 0 0 0 1px var(--bg-white) inset',
        }
    }
  })()

  const classes = [
    'btn',
    variant ? `btn--${variant.replace(/\s+/g, '-').toLowerCase()}` : '',
    `btn--${size}`,
    btnType ? `btn--${btnType.replace(/\s+/g, '-').toLowerCase()}` : '',
    disabled ? 'is-disabled' : '',
    variant === 'loading' ? 'is-loading' : '',
    className,
  ]

  const inlineStyle = {
    ...appearance,
  }
  // merge any style passed via props (from story Controls) with our computed inline style
  const extraStyle = (rest && rest.style) || {}
  // make a shallow copy of rest without style so we don't pass it twice
  const { style: _s, ...restProps } = rest || {}
  const finalStyle = { ...inlineStyle, ...extraStyle }

  return (
    <button
      type="button"
      className={classes.filter(Boolean).join(' ')}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      style={finalStyle}
      {...restProps}
    >
      {variant === 'loading' && (
        <span className="btn__spinner" aria-hidden>
          <img src={IMG_SPINNER} alt="" />
        </span>
      )}

      {leadingIcon && variant !== 'loading' && (
        <span className="btn__icon" aria-hidden>
          {typeof leadingIcon === 'string' ? <img src={leadingIcon} alt="" /> : leadingIcon}
        </span>
      )}

      {/* only render visible label for non-icon button types; icon-only types hide the label */}
      {!(btnType && btnType.indexOf('icon') !== -1) && (
        <span className="btn__label">{children}</span>
      )}

      {trailingIcon && variant !== 'loading' && (
        <span className="btn__icon btn__icon--end" aria-hidden>
          {typeof trailingIcon === 'string' ? <img src={trailingIcon} alt="" /> : trailingIcon}
        </span>
      )}

      {/* dropdown caret for dropdown types */}
      {(btnType === 'dropdown' || btnType === 'icon-only-dropdown') && (
        <span className="btn__caret" aria-hidden>
          ▾
        </span>
      )}
    </button>
  )
}

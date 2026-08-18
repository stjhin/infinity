import React from 'react'
import './Toast.css'

// Variant palette synced from Figma "Notification / Toast" (Type=Success / Type=Loading).
// Values resolve from the pattern-level tokens in ../tokens.css with Figma literals as fallback.
const TYPE_STYLES = {
  success: {
    '--toast-icon-bg': 'var(--notification-success-icon-bg, #def7ec)',
    '--toast-icon-color': 'var(--notification-success-icon-fg, #03543f)',
  },
  loading: {},
}

export default function Toast({
  type = 'success', // success | loading
  title,
  children,
  iconName = 'check',
  showSpinner = false,
  hasClose = true,
  onClose,
  className = '',
  ...rest
}) {
  const isLoading = type === 'loading'
  const { style: extraStyle, ...restProps } = rest || {}

  const classes = [
    'toast',
    `toast--${type}`,
    className,
  ]

  return (
    <div
      className={classes.filter(Boolean).join(' ')}
      role="status"
      aria-busy={isLoading || undefined}
      style={{ ...(TYPE_STYLES[type] || {}), ...(extraStyle || {}) }}
      {...restProps}
    >
      {isLoading ? (
        showSpinner && (
          <span className="toast__icon toast__icon--spinner" aria-hidden>
            <span className="toast__spinner-glyph" />
          </span>
        )
      ) : (
        <span className="toast__icon" aria-hidden>
          <span className="material-symbols-rounded">{(iconName || 'check').trim() || 'check'}</span>
        </span>
      )}

      <div className="toast__content">
        {title && <div className="toast__title">{title}</div>}
        {children && <div className="toast__body">{children}</div>}
      </div>

      {hasClose && (
        <button
          type="button"
          className="toast__close"
          aria-label="Dismiss"
          onClick={onClose}
        >
          <span className="material-symbols-rounded">cancel</span>
        </button>
      )}
    </div>
  )
}

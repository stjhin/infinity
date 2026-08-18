import React from 'react'
import './AlertBanner.css'

// Variant palette synced from Figma "Notification / Alert Banner" (Type=Error / Type=Warning).
// Values resolve from the pattern-level tokens in ../tokens.css with Figma literals as fallback.
const TYPE_STYLES = {
  error: {
    '--banner-bg': 'var(--notification-error-bg, #fdf2f2)',
    '--banner-border': 'var(--notification-error-border, #fde8e8)',
    '--banner-accent': 'var(--notification-error-accent, #f05252)',
    '--banner-title': 'var(--notification-error-title, #9b1c1c)',
    '--banner-body': 'var(--notification-error-body, #c81e1e)',
    '--banner-icon-color': 'var(--notification-error-icon, #f05252)',
  },
  warning: {
    '--banner-bg': 'var(--notification-warning-bg, #fffbeb)',
    '--banner-border': 'var(--notification-warning-border, #fef3c7)',
    '--banner-accent': 'var(--notification-warning-accent, #d97706)',
    '--banner-title': 'var(--notification-warning-title, #92400e)',
    '--banner-body': 'var(--notification-warning-body, #b45309)',
    '--banner-icon-color': 'var(--notification-warning-icon, #d97706)',
  },
}

const DEFAULT_ICONS = {
  error: 'error',
  warning: 'warning',
}

export default function AlertBanner({
  type = 'error', // error | warning
  title,
  children,
  iconName,
  hasClose = true,
  onClose,
  dismissOnClick = true,
  className = '',
  ...rest
}) {
  const resolvedIcon = (iconName || '').trim() || DEFAULT_ICONS[type] || DEFAULT_ICONS.error
  const { style: extraStyle, ...restProps } = rest || {}
  const isDismissible = Boolean(onClose) && dismissOnClick

  const handleBannerClick = (event) => {
    if (!isDismissible) return
    // Let the close button keep its own handler.
    if (event.target.closest && event.target.closest('.alert-banner__close')) return
    onClose(event)
  }

  const classes = [
    'alert-banner',
    `alert-banner--${type}`,
    isDismissible ? 'alert-banner--dismissible' : '',
    className,
  ]

  return (
    <div
      className={classes.filter(Boolean).join(' ')}
      role={type === 'error' ? 'alert' : 'status'}
      onClick={handleBannerClick}
      style={{ ...TYPE_STYLES[type] || TYPE_STYLES.error, ...(extraStyle || {}) }}
      {...restProps}
    >
      <span className="alert-banner__accent" aria-hidden />

      <span className="alert-banner__icon" aria-hidden>
        <span className="material-symbols-rounded">{resolvedIcon}</span>
      </span>

      <div className="alert-banner__content">
        {title && <div className="alert-banner__title">{title}</div>}
        {children && <div className="alert-banner__body">{children}</div>}
      </div>

      {hasClose && (
        <button
          type="button"
          className="alert-banner__close"
          aria-label="Dismiss"
          onClick={onClose}
        >
          <span className="material-symbols-rounded">cancel</span>
        </button>
      )}
    </div>
  )
}
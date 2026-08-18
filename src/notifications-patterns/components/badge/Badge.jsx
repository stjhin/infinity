import React from 'react'
import './Badge.css'

export default function Badge({
  variant = 'single-digit', // single-digit | double-digit | dot
  count = '4',
  iconName = 'notifications',
  label,
  className = '',
  ...rest
}) {
  const isDot = variant === 'dot'
  const { style: extraStyle, ...restProps } = rest || {}

  const classes = [
    'badge',
    `badge--${variant}`,
    className,
  ]

  const accessibleLabel = isDot
    ? 'Unread notifications'
    : `${count} unread notifications`

  return (
    <div
      className={classes.filter(Boolean).join(' ')}
      role="img"
      aria-label={accessibleLabel}
      style={extraStyle || undefined}
      {...restProps}
    >
      <span className="badge__container">
        <span className="material-symbols-rounded">{(iconName || 'notifications').trim() || 'notifications'}</span>

        {isDot ? (
          <span className="badge__dot" aria-hidden />
        ) : (
          <span className={`badge__pill badge__pill--${variant}`}>{count}</span>
        )}
      </span>

      {label && <span className="badge__label">{label}</span>}
    </div>
  )
}

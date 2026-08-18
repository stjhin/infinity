import React, { useEffect, useId, useRef } from 'react'
import './Modal.css'

export default function Modal({
  open = true,
  title,
  children,
  confirmLabel = 'Confirm Delete',
  onConfirm,
  onClose,
  hasClose = true,
  hasIcon = true,
  iconName = 'warning',
  backdropDismiss = true,
  inline = false,
  className = '',
  ...rest
}) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open || inline) return undefined
    const handleKey = (event) => {
      if (event.key === 'Escape' && onClose) onClose(event)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, inline, onClose])

  if (!open) return null

  const { style: extraStyle, ...restProps } = rest || {}

  const handleBackdropClick = (event) => {
    if (!inline && backdropDismiss && onClose && event.target === event.currentTarget) {
      onClose(event)
    }
  }

  const dialog = (
    <div
      ref={dialogRef}
      className={['modal', className].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal={inline ? undefined : 'true'}
      aria-labelledby={title ? titleId : undefined}
      style={extraStyle || undefined}
      {...restProps}
    >
      <div className="modal__header">
        <div className="modal__heading">
          {hasIcon && (
            <span className="modal__icon" aria-hidden>
              <span className="material-symbols-rounded">{(iconName || 'warning').trim() || 'warning'}</span>
            </span>
          )}
          {title && (
            <h2 className="modal__title" id={titleId}>
              {title}
            </h2>
          )}
        </div>

        {hasClose && (
          <button
            type="button"
            className="modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="material-symbols-rounded">cancel</span>
          </button>
        )}
      </div>

      {children && <div className="modal__body">{children}</div>}

      <div className="modal__footer">
        <button type="button" className="modal__confirm" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </div>
  )

  if (inline) {
    return <div className="modal-inline">{dialog}</div>
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      {dialog}
    </div>
  )
}

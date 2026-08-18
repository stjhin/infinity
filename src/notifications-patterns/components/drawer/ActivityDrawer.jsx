import React from 'react'
import './ActivityDrawer.css'

export default function ActivityDrawer({
  items = [],
  title = 'Notifications',
  newCount,
  onMarkAllRead,
  onClose,
  onItemClick,
  className = '',
  ...rest
}) {
  const unreadCount = items.filter((item) => !item.read).length
  const hasUnread = unreadCount > 0
  const badgeCount = newCount != null ? newCount : unreadCount
  const { style: extraStyle, ...restProps } = rest || {}

  const handleItemClick = (item) => (event) => {
    if (onItemClick) onItemClick(item, event)
  }

  return (
    <div
      className={['activity-drawer', className].filter(Boolean).join(' ')}
      role="region"
      aria-label={title}
      style={extraStyle || undefined}
      {...restProps}
    >
      <div className="activity-drawer__header">
        <div className="activity-drawer__heading">
          <div className="activity-drawer__title">{title}</div>
          {badgeCount > 0 && <span className="activity-drawer__badge">{badgeCount} New</span>}
        </div>

        <div className="activity-drawer__actions">
          {hasUnread && (
            <button type="button" className="activity-drawer__markall" onClick={onMarkAllRead}>
              Mark all read
            </button>
          )}
          <button
            type="button"
            className="activity-drawer__close"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="material-symbols-rounded">cancel</span>
          </button>
        </div>
      </div>

      <div className="activity-drawer__list">
        {items.map((item) => (
          <div
            key={item.id ?? item.title}
            className={[
              'activity-drawer__item',
              item.read ? '' : 'activity-drawer__item--unread',
            ].filter(Boolean).join(' ')}
            onClick={handleItemClick(item)}
          >
            <span
              className="activity-drawer__item-icon"
              style={{ background: item.iconBg, color: item.iconColor }}
              aria-hidden
            >
              {item.avatarText ? (
                <span className="activity-drawer__item-avatar">{item.avatarText}</span>
              ) : (
                <span className="material-symbols-rounded">{item.iconName}</span>
              )}
            </span>

            <div className="activity-drawer__item-content">
              <div className="activity-drawer__item-title-row">
                <span className="activity-drawer__item-title">{item.title}</span>
                {item.time && <span className="activity-drawer__item-time">{item.time}</span>}
              </div>
              {item.body && <span className="activity-drawer__item-body">{item.body}</span>}
            </div>

            {!item.read && <span className="activity-drawer__item-dot" aria-hidden />}
          </div>
        ))}
      </div>
    </div>
  )
}

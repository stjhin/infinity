/**
 * Shared type definitions for notification pattern components.
 *
 * @module notifications-patterns/types
 */

/**
 * @typedef {'error'|'warning'} BannerType
 * Banner variant from Figma "Notification / Alert Banner".
 */

/**
 * @typedef {'success'|'loading'} ToastType
 * Toast variant from Figma "Notification / Toast".
 */

/**
 * @typedef {'single-digit'|'double-digit'|'dot'} BadgeVariant
 * Badge style from Figma "Notification / Badge".
 */

/**
 * @typedef {Object} NotificationItem
 * A single entry in the ActivityDrawer notification feed.
 * @property {string|number} id - Stable item key.
 * @property {string} title - Notification title.
 * @property {string} [time] - Relative timestamp (e.g. "2m ago").
 * @property {string} [body] - Supporting message text.
 * @property {boolean} [read] - Read state; unread items get a background and dot.
 * @property {string} [iconName] - Google Material Symbol name. Ignored when avatarText is set.
 * @property {string} [avatarText] - Initials rendered instead of an icon (e.g. "JD").
 * @property {string} [iconBg] - Icon circle background color.
 * @property {string} [iconColor] - Icon/avatar text color.
 */

export const TYPES = {} // module marker — types are JSDoc only

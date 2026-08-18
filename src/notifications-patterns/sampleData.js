/**
 * Shared sample notification content, synced from the Figma
 * "Notification Patterns Specimen Sheet" — used by the ActivityDrawer
 * stories and the pattern-level specimen docs so the data lives in one
 * place.
 */

export const SAMPLE_NOTIFICATION_ITEMS = [
  {
    id: 1,
    title: 'Jane Doe requested review',
    time: '2m ago',
    body: 'Submitted "Draft v4 branding guidelines" to the Marketing team workspace.',
    avatarText: 'JD',
    iconBg: '#c4b5fd',
    iconColor: '#4c1d95',
    read: false,
  },
  {
    id: 2,
    title: 'Database load spike detected',
    time: '15m ago',
    body: 'US-EAST production cluster load exceeded 92% capacity thresholds.',
    iconName: 'dns',
    iconBg: '#fee2e2',
    iconColor: '#991b1b',
    read: false,
  },
  {
    id: 3,
    title: 'SSL Certificate Renewed',
    time: '2h ago',
    body: 'Failsafe automated check successfully renewed wildcard domains.',
    iconName: 'check_circle',
    iconBg: '#def7ec',
    iconColor: '#03543f',
    read: true,
  },
]

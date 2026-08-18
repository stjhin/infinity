import React from 'react'
import Modal from './components/modal/Modal'
import AlertBanner from './components/banner/AlertBanner'
import Toast from './components/toast/Toast'
import ActivityDrawer from './components/drawer/ActivityDrawer'
import Badge from './components/badge/Badge'
import { SAMPLE_NOTIFICATION_ITEMS } from './sampleData'

const meta = {
  title: 'Notifications Patterns/Overview',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Notification Pattern Components — Overview

The **Notification Patterns** library implements the five critical UX communication layers of the Infinity design system — from modal alerts to passive indicators. All values (sizes, radii, colors, typography, shadows) are synced from the Figma **Notification Patterns Specimen Sheet**.

---

## Pattern Catalog

| # | Pattern | Component | What it does (plain language) |
|---|---------|-----------|-------------------------------|
| 01 | Modal Overlay | **Modal** | A blocking dialog with backdrop for critical, time-sensitive events that need a decision before anything else happens |
| 02 | Alert Banner | **AlertBanner** | A persistent, dismissible strip with an accent bar for important errors and warnings that stay visible until acted on |
| 03 | Transient Toast | **Toast** | A short-lived floating card confirming an action finished, or showing progress while it runs |
| 04 | Activity Drawer | **ActivityDrawer** | A side panel holding a persistent feed of messages with read/unread states, "N New" count and mark-all-read |
| 05 | Passive Badge | **Badge** | A quiet icon with a count pill or dot that signals unread notifications without interrupting |

---

## Layered Composition

Higher tiers compose lower tiers:

- **Tier 2 (Overlays):** Modal — backdrop + dialog + confirm action
- **Tier 1 (Surfaces):** ActivityDrawer — header, feed items, actions
- **Tier 1 (Transient):** AlertBanner, Toast — inline feedback strips
- **Tier 0 (Passive):** Badge — count/dot indicator on an icon

---

## Standalone Usage

Every component works independently. Minimal example:

\`\`\`jsx
import { AlertBanner, Toast, Badge } from './notifications-patterns'

export function FeedbackStack() {
  return (
    <div>
      <AlertBanner type="error" title="Billing update required">
        Your subscription has expired.
      </AlertBanner>
      <Toast type="success" title="Changes published">
        Your production site is now live.
      </Toast>
      <Badge variant="single-digit" count="4" iconName="notifications" label="Inbox" />
    </div>
  )
}
\`\`\`

---

## Accessibility

| Component | A11y Feature |
|-----------|-------------|
| Modal | role="dialog", aria-modal, aria-labelledby, Escape key and backdrop dismissal |
| AlertBanner | role="alert" (error) / role="status" (warning), labelled dismiss button |
| Toast | role="status", aria-busy while loading |
| ActivityDrawer | role="region", aria-label, labelled close/mark-all-read buttons |
| Badge | role="img" with aria-label such as "4 unread notifications" |

---

## Token System

Pattern-level tokens live in \`tokens.css\` (see **Styles**). Examples:

\`\`\`css
--notification-error-bg        /* Banner error background */
--notification-warning-title   /* Warning title text */
--notification-success-icon-bg /* Toast success icon circle */
--notification-attention       /* Count pill + unread dot */
--notification-shadow-modal    /* Modal elevation shadow */
--notification-backdrop        /* Modal overlay scrim */
\`\`\`

---

## File Structure

\`\`\`
src/notifications-patterns/
├── index.js                    # Barrel export
├── types.js                    # JSDoc type definitions
├── tokens.css                  # Pattern-level CSS custom properties
├── docs.stories.jsx            # This overview + specimen sheet
└── components/
    ├── banner/                 AlertBanner
    ├── toast/                  Toast
    ├── modal/                  Modal
    ├── drawer/                 ActivityDrawer
    └── badge/                  Badge
\`\`\`
`,
      },
    },
  },
}

export default meta

const LABEL_STYLE = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#626f86',
  marginBottom: 6,
}
const TITLE_STYLE = {
  margin: '0 0 8px',
  fontSize: 16,
  fontWeight: 700,
  color: '#22272b',
}
const SECTION_STYLE = {
  background: '#ffffff',
  borderRadius: 12,
  padding: 20,
  marginBottom: 16,
  boxShadow: '0 1px 2px rgba(16, 18, 20, 0.06)',
}

/**
 * Specimen Sheet — a faithful reproduction of the Figma
 * "Notification Patterns Specimen Sheet" (node 2114:1631).
 */
export const SpecimenSheet = {
  name: 'Specimen Sheet',
  render: () => (
    <div style={{ background: '#f1f2f4', padding: 24, fontFamily: 'var(--font-family-base)' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#626f86' }}>
          Pattern specimen
        </div>
        <h2 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700, color: '#22272b' }}>
          Notification Service Patterns
        </h2>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: '#626f86', maxWidth: 560 }}>
          A design system reference overview demonstrating critical UX communication layers ranging from modal alerts to passive indicators.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
          {/* Pattern 01 — Modal Overlay */}
          <section style={{ ...SECTION_STYLE, width: 480, minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <div style={LABEL_STYLE}>Pattern 01</div>
              <div style={TITLE_STYLE}>Modal Overlay</div>
              <Modal
                inline
                title="Delete Notification"
                iconName="warning"
                confirmLabel="Confirm Delete"
              >
                Are you absolutely sure you want to delete the Acme Production notification? This action is permanent and cannot be undone. All integration tokens will be immediately revoked.
              </Modal>
            </div>
          </section>

          {/* Pattern 02 — Alert Banner */}
          <section style={{ ...SECTION_STYLE, flex: 1, minWidth: 380 }}>
            <div style={LABEL_STYLE}>Pattern 02</div>
            <div style={TITLE_STYLE}>Alert Banner</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <AlertBanner type="error" title="Billing update required">
                Your subscription has expired. Update your details to avoid service interruption.
              </AlertBanner>
              <AlertBanner type="warning" title="Deprecation warning">
                API v1 endpoints will be sunset on October 1st. Migrate to API v2.
              </AlertBanner>
            </div>
          </section>

          {/* Pattern 03 — Transient Toast */}
          <section style={{ ...SECTION_STYLE, flex: 1, minWidth: 380 }}>
            <div style={LABEL_STYLE}>Pattern 03</div>
            <div style={TITLE_STYLE}>Transient Toast</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Toast type="success" title="Changes published">
                Your production site is now live.
              </Toast>
              <Toast type="loading" title="Uploading assets...">
                Copying 4 files (8.2 MB / 14 MB)
              </Toast>
            </div>
          </section>

          {/* Pattern 04 — Activity Drawer */}
          <section style={{ ...SECTION_STYLE, width: 380 }}>
            <div style={LABEL_STYLE}>Pattern 04</div>
            <div style={TITLE_STYLE}>Activity Drawer</div>
            <ActivityDrawer items={SAMPLE_NOTIFICATION_ITEMS} />
          </section>

          {/* Pattern 05 — Passive Badge */}
          <section style={{ ...SECTION_STYLE, flex: 1, minWidth: 320 }}>
            <div style={LABEL_STYLE}>Pattern 05</div>
            <div style={TITLE_STYLE}>Passive Badge</div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <Badge variant="single-digit" count="4" iconName="notifications" label="Single Digit" />
              <Badge variant="double-digit" count="12" iconName="mail" label="Double Digit" />
              <Badge variant="dot" iconName="chat_bubble" label="Dot Indicator" />
            </div>
          </section>
        </div>
      </div>
    </div>
  ),
}
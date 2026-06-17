import React from 'react'
import '../styles/typography.css'

const SIZES = [10, 12, 14, 16, 18, 21, 24, 28, 36, 48, 60, 96]

const WEIGHTS = [
  { name: 'Regular', token: '--font-weight-regular', value: 400 },
  { name: 'Medium', token: '--font-weight-medium', value: 500 },
  { name: 'Semibold', token: '--font-weight-semibold', value: 600 },
]

const FAMILIES = [
  { name: 'Noto Sans', token: '--font-family-noto-sans' },
  { name: 'Rubik', token: '--font-family-rubik' },
]

const TypeRow = ({ label, style }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8, padding: '4px 0', borderBottom: '1px solid var(--color-mono-100)' }}>
    <span style={{ minWidth: 80, fontSize: 11, color: 'var(--color-mono-500)', fontFamily: 'monospace' }}>{label}</span>
    <span style={style}>The quick brown fox jumps over the lazy dog</span>
  </div>
)

const meta = {
  title: 'Styles/Typography',
  parameters: {
    layout: 'padded',
    docs: { page: null },
  },
}

export default meta

export const TypeScale = {
  render: () => (
    <div style={{ padding: 24, fontFamily: 'var(--font-family-base)' }}>
      <h2 style={{ marginTop: 0 }}>Type scale</h2>
      {SIZES.map((size) => (
        <TypeRow
          key={size}
          label={`${size}px`}
          style={{ fontSize: size, lineHeight: 1.3, fontFamily: 'var(--font-family-base)' }}
        />
      ))}
    </div>
  ),
}

export const Weights = {
  render: () => (
    <div style={{ padding: 24, fontFamily: 'var(--font-family-base)' }}>
      <h2 style={{ marginTop: 0 }}>Font weights — 16px</h2>
      {WEIGHTS.map((w) => (
        <TypeRow
          key={w.name}
          label={w.name}
          style={{ fontSize: 16, fontWeight: w.value, fontFamily: 'var(--font-family-base)' }}
        />
      ))}
    </div>
  ),
}

export const Families = {
  render: () => (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginTop: 0, fontFamily: 'var(--font-family-base)' }}>Font families — 16px / Regular</h2>
      {FAMILIES.map((f) => (
        <TypeRow
          key={f.name}
          label={f.name}
          style={{ fontSize: 16, fontWeight: 400, fontFamily: `var(${f.token})` }}
        />
      ))}
    </div>
  ),
}

export const Specimen = {
  render: () => (
    <div style={{ padding: 24, fontFamily: 'var(--font-family-base)' }}>
      <h1 style={{ fontSize: 48, fontWeight: 600, margin: '0 0 8px' }}>Heading 1 — 48px Semibold</h1>
      <h2 style={{ fontSize: 36, fontWeight: 600, margin: '0 0 8px' }}>Heading 2 — 36px Semibold</h2>
      <h3 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>Heading 3 — 28px Semibold</h3>
      <h4 style={{ fontSize: 21, fontWeight: 500, margin: '0 0 8px' }}>Heading 4 — 21px Medium</h4>
      <p style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.5, maxWidth: 600, margin: '0 0 16px' }}>
        Body — 16px Regular. Design tokens are the visual design atoms of the design system — specifically,
        they are named entities that store visual design attributes. We use them in place of hard-coded
        values in order to maintain a scalable and consistent visual system.
      </p>
      <p style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, maxWidth: 600, margin: '0 0 16px', color: 'var(--color-mono-700)' }}>
        Small body — 14px Regular. Used for secondary content, metadata, and supporting text that
        doesn&apos;t need the same visual weight as the primary body copy.
      </p>
      <p style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.5, maxWidth: 600, margin: 0, color: 'var(--color-mono-500)' }}>
        Caption — 12px Regular. Reserved for labels, footnotes, and other tertiary content.
      </p>
    </div>
  ),
}

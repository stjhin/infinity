import React from 'react'

function DocsPage() {
  return (
    <div style={{ padding: '32px 40px', maxWidth: 800, fontFamily: 'var(--font-family-base)' }}>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--color-asx-navy-700)', margin: '0 0 32px' }}>
        <strong>Infinity</strong> is a design system built with React and Storybook. It provides a library of reusable UI components — buttons, chips, form fields, menus, and an entire AI chat pattern suite — built on a shared set of design tokens.
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--ai-cot-border)', margin: '0 0 32px' }} />

      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700, color: 'var(--color-asx-navy-900)' }}>
        What is a design system?
      </h2>

      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-asx-mono-600)', margin: '0 0 20px' }}>
        A design system is a single source of truth for how your product looks and behaves. Instead of designing every button or form field from scratch, you reach for a pre-built component that already follows your brand&rsquo;s colors, typography, spacing, and accessibility rules.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--ai-cot-border)' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--color-asx-navy-800)' }}>Concept</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--color-asx-navy-800)' }}>What it means</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid color-mix(in srgb, var(--ai-cot-border) 50%, transparent)' }}>
            <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--color-asx-navy-800)' }}>Components</td>
            <td style={{ padding: '8px 12px', color: 'var(--color-asx-mono-600)' }}>Reusable building blocks like buttons, inputs, and menus</td>
          </tr>
          <tr style={{ borderBottom: '1px solid color-mix(in srgb, var(--ai-cot-border) 50%, transparent)' }}>
            <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--color-asx-navy-800)' }}>Tokens</td>
            <td style={{ padding: '8px 12px', color: 'var(--color-asx-mono-600)' }}>Named design values like colors, font sizes, and spacing &mdash; change one token, and every component updates</td>
          </tr>
          <tr style={{ borderBottom: '1px solid color-mix(in srgb, var(--ai-cot-border) 50%, transparent)' }}>
            <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--color-asx-navy-800)' }}>Patterns</td>
            <td style={{ padding: '8px 12px', color: 'var(--color-asx-mono-600)' }}>Pre-built combinations of components for common scenarios, like an AI chat interface</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--color-asx-navy-800)' }}>Stories</td>
            <td style={{ padding: '8px 12px', color: 'var(--color-asx-mono-600)' }}>Interactive demos of each component where you can tweak props and see the result live</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const meta = {
  title: 'Infinity Design System',
  component: DocsPage,
  parameters: {
    docsOnly: true,
    previewTabs: { canvas: { hidden: true } },
    docs: { page: DocsPage },
  },
}

export default meta

// Story exists only to register the file
export const Docs = {}

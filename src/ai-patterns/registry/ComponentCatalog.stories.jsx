import React from 'react'
import {
  registerComponent,
  unregisterComponent,
  renderSafe,
  isRegistered,
  listRegistered,
  clearCatalog,
} from './ComponentCatalog'

// Register a demo component for the stories
function DemoTile({ label = 'Demo', color = '#8270db' }) {
  return React.createElement(
    'div',
    {
      style: {
        padding: '12px 20px',
        background: color,
        color: '#fff',
        borderRadius: 8,
        fontFamily: 'var(--font-family-base)',
        fontWeight: 600,
        fontSize: 14,
      },
    },
    label,
  )
}
registerComponent('DemoTile', DemoTile)

const meta = {
  title: 'AI Patterns/Registry/ComponentCatalog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Security guardrail that ensures AI-generated UIs can only render approved components. Use `registerComponent()` to add components and `renderSafe()` as the single entry-point for AI-driven rendering.',
      },
    },
  },
}

export default meta

export const RegisteredComponents = {
  render: () => {
    const list = listRegistered()
    return (
      <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
        <h3>Currently Registered ({list.length})</h3>
        {list.length === 0 ? (
          <p style={{ color: 'var(--color-asx-mono-500)' }}>No components registered.</p>
        ) : (
          <ul>
            {list.map((name) => (
              <li key={name} style={{ marginBottom: 4, fontFamily: 'monospace' }}>
                {name} — {isRegistered(name) ? '✓ Registered' : '✗ Not found'}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  },
}

export const SafeRenderDemo = {
  render: () => {
    return React.createElement(
      'div',
      { style: { fontFamily: 'var(--font-family-base)', padding: 16 } },
      React.createElement('h3', null, 'renderSafe() Demo'),
      React.createElement('p', { style: { marginBottom: 12 } }, 'Rendering "DemoTile" (allowed):'),
      renderSafe('DemoTile', { label: 'I am allowed!', color: '#22a06b' }),
      React.createElement('p', { style: { marginTop: 20, marginBottom: 12 } }, 'Rendering "EvilComponent" (blocked):'),
      React.createElement(
        'div',
        { style: { padding: 8, border: '1px dashed var(--color-asx-red-500)', borderRadius: 4 } },
        React.createElement('pre', { style: { fontSize: 12, margin: 0, color: 'var(--color-asx-navy-800)' } }, 'Result: {renderSafe("EvilComponent") === null ? "✅ Blocked (null)" : "❌ Rendered!"} '),
        renderSafe('EvilComponent', {}) === null
          ? React.createElement('span', { style: { color: 'var(--ai-confidence-high)', fontWeight: 600 } }, '✅ Blocked (returned null)')
          : React.createElement('span', { style: { color: 'var(--ai-confidence-low)' } }, '❌ Rendered!'),
      ),
    )
  },
}

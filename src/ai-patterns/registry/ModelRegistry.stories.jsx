import React from 'react'
import { listModels, getModel, filterByComplianceTag } from './ModelRegistry'
import { propControl } from '../../storybook/controlGroups'

const allModels = listModels()

const meta = {
  title: 'AI Patterns/Registry/ModelRegistry',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Centralized inventory of AI models for governance, compliance (EU AI Act), and risk management.',
      },
    },
  },
}

export default meta

export const AllModels = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
      <h3>Registered Models ({allModels.length})</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-asx-navy-300)' }}>
            <th style={{ textAlign: 'left', padding: 8 }}>ID</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Version</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Supplier</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Purpose</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Compliance</th>
          </tr>
        </thead>
        <tbody>
          {allModels.map((m) => (
            <tr key={m.id} style={{ borderBottom: '1px solid var(--color-asx-navy-200)' }}>
              <td style={{ padding: 8, fontFamily: 'monospace', fontSize: 12 }}>{m.id}</td>
              <td style={{ padding: 8 }}>{m.name}</td>
              <td style={{ padding: 8 }}>{m.version}</td>
              <td style={{ padding: 8 }}>{m.supplier}</td>
              <td style={{ padding: 8, maxWidth: 280 }}>{m.purpose}</td>
              <td style={{ padding: 8 }}>
                {m.complianceTags.map((t) => (
                  <span key={t} style={{ display: 'inline-block', padding: '1px 6px', borderRadius: 4, background: 'var(--color-asx-purple-100)', color: 'var(--color-asx-purple-800)', fontSize: 11, marginRight: 4, marginBottom: 2 }}>
                    {t}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}

export const LookupByID = {
  render: () => {
    const model = getModel('deepseek-v4-pro')
    return (
      <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
        <h3>Lookup: deepseek-v4-pro</h3>
        <pre style={{ background: 'var(--ai-bubble-ai-bg)', padding: 12, borderRadius: 8, fontSize: 13 }}>
          {JSON.stringify(model, null, 2)}
        </pre>
      </div>
    )
  },
}

export const FilterByCompliance = {
  render: () => {
    const filtered = filterByComplianceTag('GDPR-ready')
    return (
      <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
        <h3>Filter: GDPR-ready ({filtered.length} models)</h3>
        <ul>
          {filtered.map((m) => (
            <li key={m.id} style={{ marginBottom: 8 }}>
              <strong>{m.name}</strong> — {m.purpose}
            </li>
          ))}
        </ul>
      </div>
    )
  },
}

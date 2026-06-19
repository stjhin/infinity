import React from 'react'
import {
  getCIsForAsset,
  getAssetsForEnvironment,
  getEnvironmentsForAsset,
  listLinkedAssets,
} from './AssetCILinkage'

const meta = {
  title: 'AI Patterns/Registry/AssetCILinkage',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Formal record linking AI system lifecycle assets to their running deployments (CIs) across environments. Supports granular governance: EU vs. US production instances.',
      },
    },
  },
}

export default meta

function DeploymentTable({ deployments }) {
  if (deployments.length === 0) {
    return <p style={{ color: 'var(--color-asx-mono-500)', fontStyle: 'italic' }}>No deployments found.</p>
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ borderBottom: '2px solid var(--color-asx-navy-300)' }}>
          <th style={{ textAlign: 'left', padding: 6 }}>CI ID</th>
          <th style={{ textAlign: 'left', padding: 6 }}>Environment</th>
          <th style={{ textAlign: 'left', padding: 6 }}>Version</th>
          <th style={{ textAlign: 'left', padding: 6 }}>Deployed</th>
        </tr>
      </thead>
      <tbody>
        {deployments.map((d) => (
          <tr key={d.ciId} style={{ borderBottom: '1px solid var(--color-asx-navy-200)' }}>
            <td style={{ padding: 6, fontFamily: 'monospace', fontSize: 12 }}>{d.ciId}</td>
            <td style={{ padding: 6 }}>
              <span style={{
                display: 'inline-block',
                padding: '1px 8px',
                borderRadius: 4,
                background: d.environment.includes('prod') ? 'var(--color-asx-green-100, #dcfff1)' : 'var(--color-asx-navy-100)',
                color: d.environment.includes('prod') ? 'var(--ai-confidence-high, #22a06b)' : 'var(--color-asx-navy-800)',
                fontWeight: 600,
                fontSize: 11,
              }}>
                {d.environment}
              </span>
            </td>
            <td style={{ padding: 6, fontFamily: 'monospace', fontSize: 12 }}>{d.version}</td>
            <td style={{ padding: 6, fontSize: 12 }}>{new Date(d.deployedAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const AllLinkedAssets = {
  render: () => {
    const assets = listLinkedAssets()
    return (
      <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
        <h3>Linked Assets ({assets.length})</h3>
        {assets.map((assetId) => (
          <div key={assetId} style={{ marginBottom: 20 }}>
            <h4 style={{ marginBottom: 6 }}>{assetId}</h4>
            <p style={{ fontSize: 12, color: 'var(--color-asx-mono-500)', marginBottom: 8 }}>
              Environments: {getEnvironmentsForAsset(assetId).join(', ')}
            </p>
            <DeploymentTable deployments={getCIsForAsset(assetId)} />
          </div>
        ))}
      </div>
    )
  },
}

export const ByEnvironment = {
  render: () => {
    const envs = ['us-prod', 'eu-prod', 'staging']
    return (
      <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
        <h3>Assets by Environment</h3>
        {envs.map((env) => {
          const assets = getAssetsForEnvironment(env)
          return (
            <div key={env} style={{ marginBottom: 12 }}>
              <strong>{env}:</strong>{' '}
              {assets.length > 0
                ? assets.join(', ')
                : <span style={{ color: 'var(--color-asx-mono-500)', fontStyle: 'italic' }}>none</span>
              }
            </div>
          )
        })}
      </div>
    )
  },
}

export const SingleAssetDetail = {
  render: () => {
    const deployments = getCIsForAsset('deepseek-v4-pro')
    return (
      <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
        <h3>Asset: deepseek-v4-pro</h3>
        <p style={{ fontSize: 12, color: 'var(--color-asx-mono-500)', marginBottom: 8 }}>
          {deployments.length} deployment(s) across {getEnvironmentsForAsset('deepseek-v4-pro').length} environment(s)
        </p>
        <DeploymentTable deployments={deployments} />
      </div>
    )
  },
}

import React from 'react'
import Source from './Source'
import './SourcesPanel.css'

/**
 * Groups and displays citation references with optional confidence sorting.
 *
 * @param {Object} props
 * @param {import('../../types').Citation[]} props.sources
 * @param {'inline'|'grouped'|'panel'} [props.layout='inline']
 * @param {string} [props.className]
 */
export default function SourcesPanel({
  sources = [],
  layout = 'inline',
  className = '',
}) {
  if (sources.length === 0) return null

  const sorted = layout === 'grouped' || layout === 'panel'
    ? [...sources].sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    : sources

  return (
    <div className={`ai-sources ai-sources--${layout} ${className}`.trim()}>
      <span className="ai-sources__label">Sources</span>
      <div className="ai-sources__list">
        {sorted.map((s) => (
          <Source key={s.id} title={s.title} url={s.url} confidence={s.confidence} />
        ))}
      </div>
    </div>
  )
}

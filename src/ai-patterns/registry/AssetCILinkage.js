/**
 * Asset-CI Linkage — formal record linking AI system lifecycle assets
 * to their running deployments (CIs) across environments.
 *
 * Supports granular governance: independent management of specific instances
 * (e.g., EU vs. US production deployments of the same AI model).
 *
 * @module ai-patterns/registry/AssetCILinkage
 */

/**
 * @type {Map<string, import('../types').CIDeployment[]>}
 */
const linkage = new Map()

/**
 * Record a CI deployment for an asset.
 * @param {string} assetId
 * @param {import('../types').CIDeployment} deployment
 */
export function linkDeployment(assetId, deployment) {
  const existing = linkage.get(assetId) || []
  linkage.set(assetId, [...existing, deployment])
}

/**
 * Unlink a specific deployment from an asset.
 * @param {string} assetId
 * @param {string} ciId
 */
export function unlinkDeployment(assetId, ciId) {
  const existing = linkage.get(assetId) || []
  linkage.set(
    assetId,
    existing.filter((d) => d.ciId !== ciId),
  )
}

/**
 * Get all CI deployments for a given asset.
 * @param {string} assetId
 * @returns {import('../types').CIDeployment[]}
 */
export function getCIsForAsset(assetId) {
  return linkage.get(assetId) || []
}

/**
 * Find all assets that have a deployment in a given environment.
 * @param {string} environment - e.g. "us-prod", "eu-prod"
 * @returns {string[]} asset IDs
 */
export function getAssetsForEnvironment(environment) {
  const results = []
  for (const [assetId, deployments] of linkage.entries()) {
    if (deployments.some((d) => d.environment === environment)) {
      results.push(assetId)
    }
  }
  return results
}

/**
 * Get all environments an asset is deployed to.
 * @param {string} assetId
 * @returns {string[]}
 */
export function getEnvironmentsForAsset(assetId) {
  const deployments = linkage.get(assetId) || []
  return [...new Set(deployments.map((d) => d.environment))].sort()
}

/**
 * List all linked asset IDs.
 * @returns {string[]}
 */
export function listLinkedAssets() {
  return Array.from(linkage.keys()).sort()
}

/**
 * Clear all linkages (test teardown only).
 */
export function clearLinkages() {
  linkage.clear()
}

/* ── Seed sample data for Storybook demos ── */

linkDeployment('deepseek-v4-pro', {
  ciId: 'ci-us-prod-001',
  environment: 'us-prod',
  assetId: 'deepseek-v4-pro',
  deployedAt: '2026-05-15T10:00:00Z',
  version: '4.0.0',
})

linkDeployment('deepseek-v4-pro', {
  ciId: 'ci-eu-prod-002',
  environment: 'eu-prod',
  assetId: 'deepseek-v4-pro',
  deployedAt: '2026-05-16T08:30:00Z',
  version: '4.0.0',
})

linkDeployment('deepseek-v4-pro', {
  ciId: 'ci-staging-003',
  environment: 'staging',
  assetId: 'deepseek-v4-pro',
  deployedAt: '2026-06-18T14:00:00Z',
  version: '4.1.0-rc1',
})

linkDeployment('gpt-4o', {
  ciId: 'ci-us-prod-010',
  environment: 'us-prod',
  assetId: 'gpt-4o',
  deployedAt: '2026-04-01T00:00:00Z',
  version: '2025-01-01',
})

linkDeployment('gpt-4o', {
  ciId: 'ci-eu-prod-011',
  environment: 'eu-prod',
  assetId: 'gpt-4o',
  deployedAt: '2026-04-02T00:00:00Z',
  version: '2025-01-01',
})

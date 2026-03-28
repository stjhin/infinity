import fs from 'node:fs/promises'
import path from 'node:path'
import https from 'node:https'
import { existsSync, readFileSync } from 'node:fs'

const FIGMA_API_BASE = 'https://api.figma.com/v1'
const FIGMA_ENV_KEYS = new Set([
  'FIGMA_TOKEN',
  'FIGMATOKEN',
  'FIGMA_ACCESS_TOKEN',
  'Figma_Access_Token',
  'FIGMA_FILE_KEY',
  'FIGMAFILEKEY',
  'FIGMA_FILEKEY',
  'FIGMA_FILE_URL',
  'FIGMAURL',
  'FIGMA_URL',
  'FIGMA_NODE_URL',
  'FIGMA_NODE_ID',
  'FIGMANODE_ID',
  'FIGMA_NODEID',
  'FIGMA_COMPONENT_NAME',
  'FIGMACOMPONENTNAME',
])

function stripWrappingQuotes(value) {
  const text = String(value ?? '').trim()
  if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
    return text.slice(1, -1)
  }
  return text
}

function parseDotEnvValue(rawValue) {
  const trimmed = String(rawValue ?? '').trim()
  if (!trimmed) return ''

  const isQuoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))

  if (isQuoted) {
    return stripWrappingQuotes(trimmed)
  }

  // Support inline comments for unquoted values: VALUE # comment
  return trimmed.replace(/\s+#.*$/, '').trim()
}

function loadDotEnvFileIfPresent() {
  const envPath = path.resolve('.env')
  if (!existsSync(envPath)) return

  const raw = readFileSync(envPath, 'utf8')
  const lines = raw.split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eqIndex = trimmed.indexOf('=')
    if (eqIndex <= 0) continue

    const key = trimmed.slice(0, eqIndex).trim()
    const rawValue = trimmed.slice(eqIndex + 1)
    const value = parseDotEnvValue(rawValue)
    if (!key) continue

    // For Figma generator keys, .env should be authoritative to avoid stale shell overrides.
    if (FIGMA_ENV_KEYS.has(key)) {
      process.env[key] = value
      continue
    }

    if (process.env[key] == null || process.env[key] === '') {
      process.env[key] = value
    }
  }
}

function pickFirstNonEmpty(...values) {
  for (const value of values) {
    if (value != null && String(value).trim() !== '') {
      return String(value).trim()
    }
  }
  return undefined
}

function normalizeComparableName(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function parseFileKeyFromFigmaUrl(urlValue) {
  const raw = String(urlValue ?? '').trim()
  if (!raw) return undefined

  try {
    const parsed = new URL(raw)
    const segments = parsed.pathname.split('/').filter(Boolean)
    const rootIndex = segments.findIndex((seg) => seg === 'design' || seg === 'file' || seg === 'board')
    if (rootIndex >= 0) {
      const baseFileKey = segments[rootIndex + 1]
      const branchIndex = segments.findIndex((seg) => seg === 'branch')
      const branchKey = branchIndex >= 0 ? segments[branchIndex + 1] : undefined

      // For branch URLs, Figma API requests should use branch key.
      if (branchKey) return branchKey
      if (baseFileKey) return baseFileKey
    }
  } catch {
    // not a valid URL; fall through to undefined
  }

  return undefined
}

function inferComponentNameFromOutMetaPath(outMetaPath) {
  const base = path.basename(String(outMetaPath || ''), path.extname(String(outMetaPath || '')))
  if (!base) return undefined
  return base.replace(/\.figma\.generated$/i, '')
}

function pickFirstNonEmptyWithSource(entries) {
  for (const entry of entries) {
    const value = entry?.value
    if (value != null && String(value).trim() !== '') {
      return { value: String(value).trim(), source: entry.source }
    }
  }
  return { value: undefined, source: 'missing' }
}

function isPlaceholderValue(value) {
  if (value == null) return true
  const normalized = String(value).trim().toUpperCase()
  return normalized === '' || normalized.startsWith('YOUR_FIGMA_')
}

loadDotEnvFileIfPresent()

const defaults = {
  token: pickFirstNonEmptyWithSource([
    { source: 'env:FIGMA_TOKEN', value: process.env.FIGMA_TOKEN },
    { source: 'env:FIGMATOKEN', value: process.env.FIGMATOKEN },
    { source: 'env:FIGMA_ACCESS_TOKEN', value: process.env.FIGMA_ACCESS_TOKEN },
    { source: 'env:Figma_Access_Token', value: process.env.Figma_Access_Token },
  ]),
  // Optional overrides for output files:
  outMetaPath: process.env.FIGMA_OUT_META || 'src/components/Button.figma.generated.js',
}

const configPath = process.env.FIGMA_CONFIG || 'scripts/figma-docs.config.json'

function requestJson(url, token) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'X-Figma-Token': token,
            'Content-Type': 'application/json',
          },
        },
        (res) => {
          let raw = ''
          res.setEncoding('utf8')
          res.on('data', (chunk) => {
            raw += chunk
          })
          res.on('end', () => {
            try {
              const data = JSON.parse(raw)
              if (res.statusCode < 200 || res.statusCode >= 300) {
                const apiMessage = data?.err || raw
                if (res.statusCode === 403) {
                  reject(
                    new Error(
                      `Figma API 403: ${apiMessage}. ` +
                      `Token was detected but rejected by Figma; verify it is a valid, active personal access token ` +
                      `with file access and that it is stored without a Bearer prefix.`
                    )
                  )
                  return
                }
                reject(new Error(`Figma API ${res.statusCode}: ${apiMessage}`))
                return
              }
              resolve(data)
            } catch (err) {
              reject(new Error(`Invalid JSON from Figma API: ${err.message}`))
            }
          })
        }
      )
      .on('error', reject)
  })
}

function normalizeDescription(text) {
  if (!text) return ''
  return String(text).replace(/\r\n?/g, '\n').trim()
}

function escapeTemplateText(text) {
  return String(text ?? '').replace(/`/g, '\\`').trim()
}

function extractNodeDescription(nodePayload) {
  const node = nodePayload?.document || {}
  const componentSetsById = nodePayload?.componentSets || {}
  const componentsById = nodePayload?.components || {}

  const fromComponentSetRef = normalizeDescription(componentSetsById?.[node.componentSetId]?.description)
  if (fromComponentSetRef) return fromComponentSetRef

  const fromComponentRef = normalizeDescription(componentsById?.[node.componentId]?.description)
  if (fromComponentRef) return fromComponentRef

  const componentSets = Object.values(componentSetsById)
  for (const componentSet of componentSets) {
    const desc = normalizeDescription(componentSet?.description)
    if (desc) return desc
  }

  const components = Object.values(componentsById)
  for (const component of components) {
    const desc = normalizeDescription(component?.description)
    if (desc) return desc
  }

  const direct = normalizeDescription(node.description)
  if (direct) return direct

  return ''
}

function extractFigmaProps(nodePayload) {
  const node = nodePayload?.document || {}
  const defs = node.componentPropertyDefinitions || {}

  return Object.entries(defs).map(([name, def]) => ({
    name,
    type: def?.type || 'UNKNOWN',
    defaultValue: def?.defaultValue ?? null,
    description: normalizeDescription(def?.description || ''),
  }))
}

function normalizeVariantKey(raw) {
  return String(raw ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s+/g, ' ')
}

function extractVariantDescriptions(nodePayload) {
  const componentsById = nodePayload?.components || {}
  const variantDescriptions = {}

  for (const component of Object.values(componentsById)) {
    const description = normalizeDescription(component?.description)
    if (!description) continue

    const componentName = String(component?.name || '')
    const styleMatch = componentName.match(/(?:^|,)\s*Style\s*=\s*([^,]+)/i)
    if (!styleMatch?.[1]) continue

    const normalizedStyle = normalizeVariantKey(styleMatch[1])
    if (!normalizedStyle) continue

    // Keep first non-empty description per variant key for stability.
    if (!variantDescriptions[normalizedStyle]) {
      variantDescriptions[normalizedStyle] = description
    }
  }

  return variantDescriptions
}

function mapArgDescriptions(figmaProps) {
  const descriptions = {
    variant: 'Visual style variant from Figma.',
    btnType: 'Interaction pattern/type from Figma.',
    size: 'Component size variant from Figma.',
    disabled: 'Whether the button is disabled.',
    children: 'Visible text label.',
    className: 'Optional custom class name.',
    hasLeadingIcon: 'Enable leading icon slot.',
    leadingIconName: 'Google Material Symbol name for leading icon.',
    hasTrailingIcon: 'Enable trailing icon slot.',
    trailingIconName: 'Google Material Symbol name for trailing icon.',
  }

  for (const prop of figmaProps) {
    const key = prop.name.toLowerCase()
    if (key === 'variant') descriptions.variant = prop.description || descriptions.variant
    if (key === 'type') descriptions.btnType = prop.description || descriptions.btnType
    if (key === 'size') descriptions.size = prop.description || descriptions.size
    if (key === 'disabled') descriptions.disabled = prop.description || descriptions.disabled
    if (key.includes('leading')) descriptions.leadingIconName = prop.description || descriptions.leadingIconName
    if (key.includes('trailing')) descriptions.trailingIconName = prop.description || descriptions.trailingIconName
  }

  return descriptions
}

function createMetaModule(payload) {
  return `// AUTO-GENERATED FILE. DO NOT EDIT.
// Generated by scripts/generate-figma-docs.mjs

const figmaDocs = ${JSON.stringify(payload, null, 2)}

export default figmaDocs
`
}

async function readConfigTargets() {
  if (!existsSync(configPath)) return null

  const raw = await fs.readFile(path.resolve(configPath), 'utf8')
  const parsed = JSON.parse(raw)

  if (Array.isArray(parsed)) return parsed
  if (Array.isArray(parsed?.targets)) return parsed.targets

  throw new Error(`Invalid config shape in ${configPath}. Use an array or { "targets": [...] }`)
}

function getFallbackTargetFromEnv() {
  const fileUrlFromEnv = pickFirstNonEmpty(
    process.env.FIGMA_FILE_URL,
    process.env.FIGMAURL,
    process.env.FIGMA_URL,
    process.env.FIGMA_NODE_URL
  )
  const parsedFileKeyFromUrl = parseFileKeyFromFigmaUrl(fileUrlFromEnv)

  const fileKeyFromEnv = pickFirstNonEmptyWithSource([
    { source: 'env:FIGMA_FILE_KEY', value: process.env.FIGMA_FILE_KEY },
    { source: 'env:FIGMAFILEKEY', value: process.env.FIGMAFILEKEY },
    { source: 'env:FIGMA_FILEKEY', value: process.env.FIGMA_FILEKEY },
    { source: 'env:FIGMA_FILE_URL', value: parsedFileKeyFromUrl },
  ])
  const nodeIdFromEnv = pickFirstNonEmptyWithSource([
    { source: 'env:FIGMA_NODE_ID', value: process.env.FIGMA_NODE_ID },
    { source: 'env:FIGMANODE_ID', value: process.env.FIGMANODE_ID },
    { source: 'env:FIGMA_NODEID', value: process.env.FIGMA_NODEID },
  ])

  const outMetaPath = defaults.outMetaPath
  const componentName = pickFirstNonEmpty(
    process.env.FIGMA_COMPONENT_NAME,
    process.env.FIGMACOMPONENTNAME,
    inferComponentNameFromOutMetaPath(outMetaPath)
  )

  return {
    token: defaults.token.value,
    tokenSource: defaults.token.source,
    fileKey: fileKeyFromEnv.value,
    fileKeySource: fileKeyFromEnv.source,
    nodeId: nodeIdFromEnv.value,
    nodeIdSource: nodeIdFromEnv.source,
    componentName,
    componentNameSource: process.env.FIGMA_COMPONENT_NAME
      ? 'env:FIGMA_COMPONENT_NAME'
      : process.env.FIGMACOMPONENTNAME
      ? 'env:FIGMACOMPONENTNAME'
      : componentName
      ? 'inferred:outMetaPath'
      : 'missing',
    outMetaPath,
  }
}

function normalizeTargets(rawTargets) {
  const envFallback = getFallbackTargetFromEnv()
  if (!rawTargets?.length) return [envFallback]

  return rawTargets.map((target) => {
    const tokenFromConfig = pickFirstNonEmpty(target.token)
    const token = pickFirstNonEmpty(tokenFromConfig, envFallback.token)
    const tokenSource = tokenFromConfig ? 'config:target.token' : envFallback.tokenSource

    const usesFallbackFileKey = isPlaceholderValue(target.fileKey)
    const usesFallbackNodeId = isPlaceholderValue(target.nodeId)

    const configUrlFileKey = parseFileKeyFromFigmaUrl(target.fileUrl)
    const fileKey = usesFallbackFileKey
      ? pickFirstNonEmpty(configUrlFileKey, envFallback.fileKey)
      : String(target.fileKey).trim()
    const nodeId = usesFallbackNodeId ? envFallback.nodeId : String(target.nodeId).trim()
    const componentName = pickFirstNonEmpty(
      target.componentName,
      envFallback.componentName,
      inferComponentNameFromOutMetaPath(target.outMetaPath || defaults.outMetaPath)
    )

    return {
      token,
      tokenSource,
      fileKey,
      fileKeySource: usesFallbackFileKey
        ? configUrlFileKey
          ? 'config:target.fileUrl'
          : envFallback.fileKeySource
        : 'config:target.fileKey',
      nodeId,
      nodeIdSource: usesFallbackNodeId ? envFallback.nodeIdSource : 'config:target.nodeId',
      componentName,
      componentNameSource: target.componentName
        ? 'config:target.componentName'
        : envFallback.componentNameSource,
      outMetaPath: target.outMetaPath || defaults.outMetaPath,
    }
  })
}

function printTargetDiagnostics(target, index) {
  const tokenState = target.token ? `present (${target.tokenSource})` : `missing (${target.tokenSource || 'missing'})`
  const fileKeyState = target.fileKey ? `present (${target.fileKeySource})` : `missing (${target.fileKeySource || 'missing'})`
  const nodeIdState = target.nodeId ? `present (${target.nodeIdSource})` : `missing (${target.nodeIdSource || 'missing'})`
  const componentNameState = target.componentName
    ? `present (${target.componentNameSource || 'unknown'})`
    : `missing (${target.componentNameSource || 'missing'})`

  console.log(`[figma-docs] Target #${index + 1} preflight:`)
  console.log(`  - token: ${tokenState}`)
  console.log(`  - fileKey: ${fileKeyState}`)
  console.log(`  - nodeId: ${nodeIdState}`)
  console.log(`  - componentName: ${componentNameState}`)

  const normalizedNodeId = String(target.nodeId || '').trim()
  const isLikelyDemoNodeId = ['123:456', '0:1', '1:2'].includes(normalizedNodeId)
  const isNodeIdFromConfig = String(target.nodeIdSource || '').startsWith('config:')

  if (isNodeIdFromConfig && isLikelyDemoNodeId) {
    console.warn(
      `[figma-docs] Warning: target #${index + 1} is using a likely demo/default nodeId (${normalizedNodeId}) from config. ` +
      `If sync fails or returns unexpected content, set a real node via FIGMA_NODE_ID/FIGMANODE_ID or update scripts/figma-docs.config.json.`
    )
  }
}

function chooseComponentFromFile(filePayload, preferredComponentName) {
  const components = Object.values(filePayload?.components || {})
  if (!components.length) {
    throw new Error('No components were found in the Figma file; cannot auto-resolve nodeId.')
  }

  if (preferredComponentName) {
    const desired = normalizeComparableName(preferredComponentName)
    const exact = components.find((c) => normalizeComparableName(c?.name) === desired)
    if (exact) return exact

    const partial = components.filter((c) => normalizeComparableName(c?.name).includes(desired))
    if (partial.length === 1) return partial[0]
    if (partial.length > 1) {
      const sample = partial.slice(0, 5).map((c) => c.name).join(', ')
      throw new Error(
        `Multiple components matched componentName "${preferredComponentName}": ${sample}. ` +
          `Use a more specific FIGMA_COMPONENT_NAME/target.componentName.`
      )
    }
  }

  if (components.length === 1) return components[0]

  const preview = components.slice(0, 8).map((c) => c.name).join(', ')
  throw new Error(
    `nodeId was not provided and the file has multiple components. ` +
      `Set FIGMA_COMPONENT_NAME (or target.componentName) to choose one. ` +
      `Examples in this file: ${preview}`
  )
}

async function generateForTarget(target, index) {
  printTargetDiagnostics(target, index)

  if (!target.token || !target.fileKey) {
    throw new Error(
      `Target #${index + 1} missing required values (token/fileKey). ` +
      `Provide token via FIGMA_TOKEN/FIGMATOKEN/FIGMA_ACCESS_TOKEN (or target.token) and fileKey via ` +
      `FIGMA_FILE_KEY/FIGMAFILEKEY (or target config). nodeId is optional.`
    )
  }

  let resolvedNodeId = target.nodeId
  let resolvedComponentName = target.componentName

  if (!resolvedNodeId) {
    const fileUrl = `${FIGMA_API_BASE}/files/${target.fileKey}`
    const fileRes = await requestJson(fileUrl, target.token)
    const selectedComponent = chooseComponentFromFile(fileRes, target.componentName)
    resolvedNodeId = selectedComponent?.node_id || selectedComponent?.nodeId
    resolvedComponentName = selectedComponent?.name || resolvedComponentName

    if (!resolvedNodeId) {
      throw new Error(
        `Unable to resolve nodeId from selected component "${selectedComponent?.name || 'unknown'}". ` +
          `Provide FIGMA_NODE_ID/FIGMANODE_ID explicitly.`
      )
    }

    console.log(
      `[figma-docs] Target #${index + 1} auto-selected component "${resolvedComponentName}" -> nodeId ${resolvedNodeId}`
    )
  }

  const encodedNode = encodeURIComponent(resolvedNodeId)
  const nodeUrl = `${FIGMA_API_BASE}/files/${target.fileKey}/nodes?ids=${encodedNode}`
  const nodeRes = await requestJson(nodeUrl, target.token)

  const nodePayload = nodeRes?.nodes?.[resolvedNodeId]
  if (!nodePayload) {
    throw new Error(`Node ${resolvedNodeId} not found in Figma response for target #${index + 1}.`)
  }

  const figmaProps = extractFigmaProps(nodePayload)
  const variantDescriptions = extractVariantDescriptions(nodePayload)
  const componentDescription = extractNodeDescription(nodePayload)

  const componentName = nodePayload?.document?.name || 'Component'
  const payload = {
    generatedAt: new Date().toISOString(),
    nodeId: resolvedNodeId,
    componentName: resolvedComponentName || componentName,
    componentDescription: componentDescription || 'No Figma description found on this node.',
    storyDescription: `Synced from Figma node: ${escapeTemplateText(componentName)}`,
    figmaUrl: `https://www.figma.com/design/${target.fileKey}?node-id=${encodeURIComponent(resolvedNodeId.replace(':', '-'))}`,
    argDescriptions: mapArgDescriptions(figmaProps),
    variantDescriptions,
    figmaProperties: figmaProps,
  }

  const metaOut = path.resolve(target.outMetaPath)
  await fs.mkdir(path.dirname(metaOut), { recursive: true })

  await fs.writeFile(metaOut, createMetaModule(payload), 'utf8')

  console.log(`Generated (${index + 1}): ${metaOut}`)
}

async function main() {
  const rawTargets = await readConfigTargets()
  const targets = normalizeTargets(rawTargets)

  if (!rawTargets) {
    console.log(`No ${configPath} found. Falling back to single-target env mode.`)
  } else {
    console.log(`Loaded ${targets.length} target(s) from ${configPath}`)
  }

  for (let i = 0; i < targets.length; i += 1) {
    await generateForTarget(targets[i], i)
  }
}

main().catch((err) => {
  console.error('Failed to generate Figma docs:', err.message)
  process.exit(1)
})

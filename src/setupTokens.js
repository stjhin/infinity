// Runtime token injector: read src/variables.json and write CSS custom properties to :root
import vars from './variables.json'

function flattenTokens(obj, prefix = '') {
  const entries = {}
  for (const key of Object.keys(obj || {})) {
    const val = obj[key]
    if (val && typeof val === 'object' && 'value' in val) {
      entries[`${prefix}${key}`] = val.value
    } else if (val && typeof val === 'object') {
      Object.assign(entries, flattenTokens(val, `${prefix}${key}.`))
    }
  }
  return entries
}

function toCssVarName(tokenPath) {
  // convert 'global.text.black' -> '--global-text-black'
  return `--${tokenPath.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`
}

export default function applyTokens() {
  if (typeof document === 'undefined' || !vars) return
  const flat = flattenTokens(vars)
  const root = document.documentElement

  // Write every flattened token to :root as a CSS custom property.
  // Example: flat['global.text.black'] -> --global-text-black: #22272b
  Object.keys(flat).forEach((tokenPath) => {
    const cssName = toCssVarName(tokenPath)
    const value = flat[tokenPath]
    try {
      root.style.setProperty(cssName, value)
    } catch (e) {
      // ignore invalid values
      // console.warn('Failed to set token', cssName, value)
    }
  })
}

// Auto-apply when imported
applyTokens()

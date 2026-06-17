import variables from './variables.json'

/**
 * Safely read a design token value from variables.json using a dot-path.
 * Returns the token's `.value` if found, otherwise the fallback.
 *
 * @param {string} path  Dot-separated path in variables.json (e.g. "color.asx-purple.800")
 * @param {string} fallback  Fallback value if path not found
 * @returns {string}
 */
export function token(path, fallback) {
  try {
    return path.split('.').reduce((o, k) => (o ? o[k] : undefined), variables)?.value || fallback
  } catch (e) {
    return fallback
  }
}

/**
 * Map a semantic icon color name to the corresponding CSS custom property value.
 * Uses the --icon-* tokens defined in index.css :root.
 *
 * Valid names: white, black, grey, blue, brand, green, red, red-dark, yellow
 *
 * @param {string} name  Semantic color name (e.g. "red", "brand")
 * @param {string} fallback  Fallback if name not recognized (defaults to "var(--icon-black)")
 * @returns {string}  CSS var() expression or the fallback
 */
const ICON_COLOR_TOKENS = {
  white: 'var(--icon-white)',
  black: 'var(--icon-black)',
  grey: 'var(--icon-grey)',
  blue: 'var(--icon-blue)',
  brand: 'var(--icon-brand)',
  green: 'var(--icon-green)',
  red: 'var(--icon-red)',
  'red-dark': 'var(--icon-red-dark)',
  yellow: 'var(--icon-yellow)',
}

export function iconColor(name, fallback = 'var(--icon-black)') {
  if (!name) return fallback
  return ICON_COLOR_TOKENS[name] || fallback
}

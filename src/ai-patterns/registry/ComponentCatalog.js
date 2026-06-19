/**
 * Component Catalog — a security guardrail / allowlist that ensures AI-generated
 * UIs can only render approved components.
 *
 * Each AI-pattern component self-registers at module level via `registerComponent()`.
 * The `renderSafe()` function is the single entry-point for AI-driven rendering.
 *
 * @module ai-patterns/registry/ComponentCatalog
 */

import React from 'react'

/** @type {Map<string, React.ComponentType>} */
const catalog = new Map()

/**
 * Register a component in the allowlist.
 * Call this at module level in each component file.
 *
 * @param {string} name - canonical component name (e.g. "MessageBubble")
 * @param {React.ComponentType} component
 */
export function registerComponent(name, component) {
  if (catalog.has(name)) {
    console.warn(`[ComponentCatalog] "${name}" is already registered — overwriting.`)
  }
  catalog.set(name, component)
}

/**
 * Unregister a component (useful in tests or hot-reload scenarios).
 * @param {string} name
 */
export function unregisterComponent(name) {
  catalog.delete(name)
}

/**
 * Safely render a component by name. Returns null for unregistered names.
 * This is the security guardrail — only allowlisted components render.
 *
 * @param {string} name - component name
 * @param {object} [props] - React props to forward
 * @returns {React.ReactElement|null}
 */
export function renderSafe(name, props) {
  const Component = catalog.get(name)
  if (!Component) {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      console.warn(`[ComponentCatalog] Blocked render of unregistered component: "${name}"`)
    }
    return null
  }
  return React.createElement(Component, props || {})
}

/**
 * Check whether a component name is registered.
 * @param {string} name
 * @returns {boolean}
 */
export function isRegistered(name) {
  return catalog.has(name)
}

/**
 * Return all registered component names (useful for Storybook docs).
 * @returns {string[]}
 */
export function listRegistered() {
  return Array.from(catalog.keys()).sort()
}

/**
 * Clear the entire catalog (test teardown only).
 */
export function clearCatalog() {
  catalog.clear()
}

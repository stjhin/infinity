// Storybook configuration (ESM) for Vite. Converted from CommonJS to avoid
// the deprecation warning: "Using CommonJS in your main configuration file is deprecated with Vite." 
// If you prefer to keep a .js filename, set "type": "module" in package.json instead.
export default {
  // Use CSF stories plus autodocs.
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  features: {
    controls: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
}

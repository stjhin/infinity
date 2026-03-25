import '../src/index.css';
// Import runtime token injector so Storybook has the same CSS variables as the app
import '../src/setupTokens'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  docs: {
    // Keep docs previews inline under Storybook 10 autodocs.
    inlineStories: true,
  },

  options: {
    storySort: (a, b) => {
      const titleA = a.title || ''
      const titleB = b.title || ''

      if (titleA !== titleB) {
        return titleA.localeCompare(titleB)
      }

      const nameA = (a.name || '').toLowerCase()
      const nameB = (b.name || '').toLowerCase()

      if (nameA === 'docs' && nameB !== 'docs') return -1
      if (nameB === 'docs' && nameA !== 'docs') return 1

      return nameA.localeCompare(nameB)
    },
  },

  controls: {
    expanded: true,
    sort: 'none',
  },

  a11y: {
    // 'todo' - show a11y violations in the test UI only
    // 'error' - fail CI on a11y violations
    // 'off' - skip a11y checks entirely
    test: 'todo'
  }
};

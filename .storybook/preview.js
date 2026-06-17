import '../src/index.css';
import '../src/styles/colors.css';
import '../src/styles/typography.css';
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

      // Put Styles before Components in the sidebar
      const sectionA = titleA.split('/')[0]
      const sectionB = titleB.split('/')[0]
      const ORDER = { 'Styles': 0, 'Tokens': 0, 'Components': 1 }
      if (sectionA !== sectionB) {
        const rankA = ORDER[sectionA] ?? 2
        const rankB = ORDER[sectionB] ?? 2
        if (rankA !== rankB) return rankA - rankB
      }

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
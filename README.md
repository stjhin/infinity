# Infinity Design System (Storybook)

This repository contains a minimal Storybook-based design system boilerplate.

Quick start (Windows PowerShell):

```powershell
# install dependencies
npm install

# start Storybook (dev)
npm run storybook

# build static Storybook site
npm run build-storybook
```

Notes:
- This project uses React + Storybook (Vite builder). If you want the Storybook CLI to add plugins and recommendations automatically, run `npx storybook@latest init` after installing dependencies.
- Example component: `src/components/Button.jsx` with stories in `src/components/Button.stories.jsx`.

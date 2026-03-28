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

# refresh Google icon names used by Button controls
npm run generate:google-icons
```

## Google Icons source (Material Symbols)

- Icon picker options are generated from `https://fonts.google.com/metadata/icons`.
- Generated file: `src/data/googleIconNames.json`.
- If Google adds/removes icons, refresh the local list with:

```powershell
npm run generate:google-icons
```

- Commit the updated `src/data/googleIconNames.json` so Storybook controls stay in sync across machines/CI.

Notes:
- This project uses React + Storybook (Vite builder). If you want the Storybook CLI to add plugins and recommendations automatically, run `npx storybook@latest init` after installing dependencies.
- Example component: `src/components/Button.jsx` with stories in `src/components/Button.stories.jsx`.

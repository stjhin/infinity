# Infinity Design System

This repository contains a minimal Storybook-based design system.

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

# generate Figma-synced docs metadata
npm run generate:figma-docs
```

## Google Icons source (Material Symbols)

- Icon picker options are generated from `https://fonts.google.com/metadata/icons`.
- Generated file: `src/data/googleIconNames.json`.
- If Google adds/removes icons, refresh the local list with:

```powershell
npm run generate:google-icons
```

- Commit the updated `src/data/googleIconNames.json` so Storybook controls stay in sync across machines/CI.

## Figma → Storybook Docs pipeline

This repo includes a custom generator that fetches Figma API data and writes metadata consumed by Storybook stories/autodocs (for example `src/components/Button.figma.generated.js`).

Set these environment variables before running:

- `FIGMA_TOKEN` or `FIGMATOKEN` or `FIGMA_ACCESS_TOKEN` (personal access token)

Single-target mode (without config file) requires:

- `FIGMA_FILE_KEY` or `FIGMAFILEKEY` (Figma file key)
- Alternative: `FIGMA_FILE_URL` or `FIGMAURL` (full Figma file/design URL; file key is extracted automatically)
- Optional: `FIGMA_NODE_ID` or `FIGMANODE_ID` (node id like `123:456`)
- Optional: `FIGMA_COMPONENT_NAME` or `FIGMACOMPONENTNAME` (component name to auto-select when node id is omitted)

Run:

```powershell
npm run generate:figma-docs
```

### Multi-component mode (recommended)

- Edit `scripts/figma-docs.config.json` and add one entry per component in `targets`.
- Keep `FIGMA_TOKEN` in env; each target provides `fileKey` (or `fileUrl`) and can provide either `nodeId` or `componentName`.
- Run once to generate metadata for all configured components.

Example PowerShell run:

```powershell
$env:FIGMA_TOKEN="your_figma_token"
npm run generate:figma-docs
```

Optional overrides:

- `FIGMA_OUT_META` (default: `src/components/Button.figma.generated.js`)
- `FIGMA_CONFIG` (default: `scripts/figma-docs.config.json`)

Notes:

- This project uses React + Storybook (Vite builder). If you want the Storybook CLI to add plugins and recommendations automatically, run `npx storybook@latest init` after installing dependencies.
- Example component: `src/components/Button.jsx` with stories in `src/components/Button.stories.jsx`.

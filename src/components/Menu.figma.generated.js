// AUTO-GENERATED FILE. DO NOT EDIT.
// Generated from Figma node 6:1019

const figmaDocs = {
  generatedAt: new Date().toISOString(),
  nodeId: '6:1019',
  componentName: 'Menu',
  componentDescription:
    'A dropdown menu list for selecting options. Each item shows a checkbox, label, and optional subtitle. Supports Default, Hover, Selected, and Focus states per the Figma design system.',
  figmaUrl: 'https://www.figma.com/design/asvaeYj4SwE9iBsdlehuzf?node-id=6-1019',
  argDescriptions: {
    items: 'Array of menu items: [{ label, subtitle?, value }]',
    value: 'The currently selected value',
    onChange: 'Callback fired when a menu item is clicked: (value, item) => void',
    showCheckbox: 'Whether to show the checkbox on each item (default true)',
    showSubtitle: 'Whether to show the subtitle text on each item (default true)',
    className: 'Optional custom class name',
  },
  variantDescriptions: {
    default: 'Default state: white background, no border, unchecked checkbox.',
    hover: 'Hover state: light purple background (#DFD8FD).',
    selected: 'Selected state: white background, checkbox filled with brand purple (#5E4DB2) and white checkmark.',
    focus: 'Focus state: white background, blue focus border 2px (#0055CC).',
  },
  figmaProperties: [
    {
      name: 'Checkbox#6:48',
      type: 'BOOLEAN',
      defaultValue: true,
      description: 'Show/hide the checkbox on each menu item.',
    },
    {
      name: 'Subtitle#6:53',
      type: 'BOOLEAN',
      defaultValue: true,
      description: 'Show/hide the subtitle text on each menu item.',
    },
    {
      name: 'State',
      type: 'VARIANT',
      defaultValue: 'Default',
      description: 'Interaction state: Default, Hover, Selected, Focus.',
    },
  ],
}

export default figmaDocs

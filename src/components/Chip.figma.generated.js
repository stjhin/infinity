// AUTO-GENERATED FILE. DO NOT EDIT.
// Generated from Figma node 7:531

const figmaDocs = {
  generatedAt: new Date().toISOString(),
  nodeId: '7:531',
  componentName: 'Chip',
  componentDescription:
    'A compact chip/tag component for displaying labels, filters, or selections. Supports Filled and Outlined style variants with Enabled, Hover, Pressed, and Disabled states. Includes optional leading icon and removable cancel button.',
  figmaUrl: 'https://www.figma.com/design/asvaeYj4SwE9iBsdlehuzf?node-id=7-531',
  argDescriptions: {
    label: 'Text displayed on the chip.',
    state: 'Interaction state: enabled, hover, pressed, disabled.',
    variant: 'Style variant: filled (solid background) or outlined (border-only).',
    hasLeftIcon: 'Show/hide leading icon (Figma: Icon-L).',
    leftIconName: 'Google Material Symbol name for the leading icon.',
    hasCancel: 'Show/hide cancel/remove button (Figma: Cancel).',
    onCancel: 'Callback when the cancel button is clicked.',
    onClick: 'Callback when the chip is clicked.',
    disabled: 'Whether the chip is disabled.',
    className: 'Optional custom class name.',
  },
  variantDescriptions: {
    'enabled/filled': 'Enabled filled: brand purple background (#5E4DB2), white text and icons.',
    'enabled/outlined': 'Enabled outlined: white background, purple border and text (#5E4DB2).',
    'hover/filled': 'Hover filled: dark purple background (#352C63), white text.',
    'hover/outlined': 'Hover outlined: light purple background (#DFD8FD), purple border and text.',
    'pressed/filled': 'Pressed filled: darkest purple background (#2B273F), white text.',
    'pressed/outlined': 'Pressed outlined: light purple background (#DFD8FD), purple 2px border.',
    'disabled/filled': 'Disabled filled: gray background (#B6C2CF), muted.',
    'disabled/outlined': 'Disabled outlined: gray background (#B6C2CF), muted.',
  },
  figmaProperties: [
    {
      name: 'Cancel#2005:0',
      type: 'BOOLEAN',
      defaultValue: true,
      description: 'Show/hide the cancel (close) button on the right.',
    },
    {
      name: 'Icon-L#2005:9',
      type: 'BOOLEAN',
      defaultValue: true,
      description: 'Show/hide the leading icon on the left.',
    },
    {
      name: 'State',
      type: 'VARIANT',
      defaultValue: 'Enabled',
      description: 'Interaction state: Enabled, Hover, Pressed, Disabled.',
    },
    {
      name: 'Style',
      type: 'VARIANT',
      defaultValue: 'Filled',
      description: 'Visual style: Filled (solid background) or Outlined (border with transparent background).',
    },
  ],
}

export default figmaDocs

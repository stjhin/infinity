import React, { useState } from 'react'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import Menu from './Menu'
import { eventControl, propControl, slotControl } from '../storybook/controlGroups'
import figmaDocs from './Menu.figma.generated'

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: figmaDocs.figmaUrl,
    },
    docs: {
      description: {
        component: figmaDocs.componentDescription,
      },
      page: () => (
        <>
          <Title />
          <Description of="meta" />
          <Primary />
          <Controls />
          <Stories title="Variants" />
        </>
      ),
    },
  },
  argTypes: {
    showCheckbox: propControl({
      name: 'Show checkbox',
      description: figmaDocs.argDescriptions?.showCheckbox,
      control: { type: 'boolean' },
    }),
    showSubtitle: propControl({
      name: 'Show subtitle',
      description: figmaDocs.argDescriptions?.showSubtitle,
      control: { type: 'boolean' },
    }),
    onChange: eventControl({ control: false }),
  },
}

export default meta

const DEFAULT_ITEMS = [
  { label: 'Option 1', subtitle: 'This is a subtitle', value: 'opt1' },
  { label: 'Option 2', subtitle: 'Another subtitle here', value: 'opt2' },
  { label: 'Option 3', subtitle: 'Third option description', value: 'opt3' },
  { label: 'Option 4', value: 'opt4' },
]

function MenuWrapper({
  value: initialValue = null,
  onChange: storyOnChange,
  ...rest
}) {
  const [value, setValue] = useState(initialValue)

  return (
    <Menu
      {...rest}
      value={value}
      onChange={(newValue) => {
        setValue((prev) => (prev === newValue ? null : newValue))
        if (storyOnChange) storyOnChange(newValue)
      }}
    />
  )
}

export const Default = {
  render: (args) => <MenuWrapper {...args} />,
  args: {
    items: DEFAULT_ITEMS,
    showCheckbox: true,
    showSubtitle: true,
    value: null,
  },
}

export const WithSelection = {
  render: (args) => <MenuWrapper {...args} />,
  name: 'With selection',
  parameters: {
    docs: {
      description: {
        story: figmaDocs.variantDescriptions?.selected,
      },
    },
  },
  args: {
    items: DEFAULT_ITEMS,
    showCheckbox: true,
    showSubtitle: true,
    value: 'opt2',
  },
}

export const WithoutCheckbox = {
  render: (args) => <MenuWrapper {...args} />,
  name: 'Without checkbox',
  args: {
    items: DEFAULT_ITEMS.map((item) => ({ ...item })),
    showCheckbox: false,
    showSubtitle: true,
    value: null,
  },
}

export const WithoutSubtitles = {
  render: (args) => <MenuWrapper {...args} />,
  name: 'Without subtitles',
  args: {
    items: DEFAULT_ITEMS.map((item) => ({ ...item })),
    showCheckbox: true,
    showSubtitle: false,
    value: null,
  },
}

export const SingleItem = {
  render: (args) => <MenuWrapper {...args} />,
  name: 'Single item',
  args: {
    items: [{ label: 'Only option', subtitle: 'The one and only', value: 'single' }],
    showCheckbox: true,
    showSubtitle: true,
    value: null,
  },
}
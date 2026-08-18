import React from 'react'
import ActivityDrawer from './ActivityDrawer'
import { eventControl, propControl, slotControl } from '../../../storybook/controlGroups'
import figmaDocs from './ActivityDrawer.figma.generated'
import { SAMPLE_NOTIFICATION_ITEMS } from '../../sampleData'

const meta = {
  title: 'Notifications Patterns/Drawer/ActivityDrawer',
  component: ActivityDrawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: figmaDocs.componentDescription,
      },
    },
  },
  argTypes: {
    title: slotControl({
      name: 'Title',
      description: 'Drawer header title.',
      control: { type: 'text' },
    }),
    newCount: propControl({
      name: 'New count',
      description: 'Number shown in the "N New" header badge. Derived from unread items when omitted.',
      control: { type: 'number' },
    }),
    items: propControl({
      name: 'Items',
      description: 'Notification items: { id, title, time, body, read, iconName | avatarText, iconBg, iconColor }.',
      control: { type: 'object' },
    }),
    onMarkAllRead: eventControl({ control: false }),
    onClose: eventControl({ control: false }),
    onItemClick: eventControl({ control: false }),
    className: propControl({ name: 'Class name', control: { type: 'text' } }),
  },
}

export default meta

const renderDrawer = (args) => <ActivityDrawer {...args} />

const BASE_ARGS = {
  title: 'Notifications',
  items: SAMPLE_NOTIFICATION_ITEMS,
  className: '',
}

export const Default = {
  render: renderDrawer,
  name: 'Default',
  args: { ...BASE_ARGS },
}

export const AllRead = {
  render: renderDrawer,
  name: 'All read',
  args: {
    ...BASE_ARGS,
    items: SAMPLE_NOTIFICATION_ITEMS.map((item) => ({ ...item, read: true })),
  },
}

export const Empty = {
  render: renderDrawer,
  name: 'Empty',
  args: {
    ...BASE_ARGS,
    items: [],
  },
}
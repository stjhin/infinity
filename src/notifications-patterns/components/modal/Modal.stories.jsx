import React from 'react'
import Modal from './Modal'
import { eventControl, propControl, slotControl } from '../../../storybook/controlGroups'
import googleIconNames from '../../../data/googleIconNames.json'
import figmaDocs from './Modal.figma.generated'

const ICON_OPTIONS = ['', ...googleIconNames]

const meta = {
  title: 'Notifications Patterns/Modal/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: figmaDocs.componentDescription,
      },
    },
  },
  argTypes: {
    open: propControl({
      name: 'Open',
      description: 'Whether the modal is visible. Renders null when closed.',
      control: { type: 'boolean' },
    }),
    title: slotControl({
      name: 'Title',
      description: 'Bold dialog title.',
      control: { type: 'text' },
    }),
    children: slotControl({
      name: 'Message',
      description: 'Dialog body text.',
      control: { type: 'text' },
    }),
    confirmLabel: slotControl({
      name: 'Confirm label',
      description: 'Label for the confirm action button.',
      control: { type: 'text' },
    }),
    iconName: propControl({
      name: 'Icon',
      description: 'Google Material Symbol name for the status icon.',
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
    }),
    hasIcon: propControl({
      name: 'Has icon',
      description: 'Show/hide the status icon.',
      control: { type: 'boolean' },
    }),
    hasClose: propControl({
      name: 'Has close',
      description: 'Show/hide the close button.',
      control: { type: 'boolean' },
    }),
    backdropDismiss: propControl({
      name: 'Backdrop dismiss',
      description: 'Close the modal when the backdrop is clicked.',
      control: { type: 'boolean' },
    }),
    inline: propControl({
      name: 'Inline',
      description: 'Render without the fixed backdrop, inside a neutral preview surface (for docs and specimen sheets).',
      control: { type: 'boolean' },
    }),
    onConfirm: eventControl({ control: false }),
    onClose: eventControl({ control: false }),
    className: propControl({ name: 'Class name', control: { type: 'text' } }),
  },
}

export default meta

const renderModal = (args) => {
  const { children, iconName, ...rest } = args
  return (
    <Modal {...rest} iconName={(iconName || '').trim() || undefined}>
      {children}
    </Modal>
  )
}

const BASE_ARGS = {
  open: true,
  title: 'Delete Notification',
  children:
    'Are you absolutely sure you want to delete the Acme Production notification? This action is permanent and cannot be undone. All integration tokens will be immediately revoked.',
  confirmLabel: 'Confirm Delete',
  iconName: 'warning',
  hasIcon: true,
  hasClose: true,
  backdropDismiss: true,
  inline: false,
  className: '',
}

export const Default = {
  render: renderModal,
  name: 'Default',
  args: { ...BASE_ARGS },
}

export const Inline = {
  render: renderModal,
  name: 'Inline',
  args: { ...BASE_ARGS, inline: true },
}

export const WithoutIcon = {
  render: renderModal,
  name: 'Without icon',
  args: { ...BASE_ARGS, inline: true, hasIcon: false },
}

export const WithoutClose = {
  render: renderModal,
  name: 'Without close',
  args: { ...BASE_ARGS, inline: true, hasClose: false },
}

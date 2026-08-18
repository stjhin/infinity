import React from 'react'
import AlertBanner from './AlertBanner'
import { eventControl, propControl, slotControl } from '../../../storybook/controlGroups'
import googleIconNames from '../../../data/googleIconNames.json'
import figmaDocs from './AlertBanner.figma.generated'

const TYPE_OPTIONS = ['error', 'warning']
const ICON_OPTIONS = ['', ...googleIconNames]

const meta = {
  title: 'Notifications Patterns/Banner/AlertBanner',
  component: AlertBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: figmaDocs.componentDescription,
      },
    },
  },
  argTypes: {
    type: propControl({
      name: 'Type',
      description: 'Banner type from Figma: Error, Warning.',
      control: { type: 'radio' },
      options: TYPE_OPTIONS,
      labels: { error: 'Error', warning: 'Warning' },
    }),
    title: slotControl({
      name: 'Title',
      description: 'Bold title text.',
      control: { type: 'text' },
    }),
    children: slotControl({
      name: 'Message',
      description: 'Supporting message text.',
      control: { type: 'text' },
    }),
    iconName: propControl({
      name: 'Icon',
      description: 'Google Material Symbol name for the status icon. Defaults to the type icon (error/warning).',
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'Default' },
    }),
    hasClose: propControl({
      name: 'Has close',
      description: 'Show/hide the dismiss button.',
      control: { type: 'boolean' },
    }),
    dismissOnClick: propControl({
      name: 'Dismiss on click',
      description: 'Dismiss the banner when clicking anywhere on it (requires an onClose handler).',
      control: { type: 'boolean' },
    }),
    onClose: eventControl({ control: false }),
    className: propControl({ name: 'Class name', control: { type: 'text' } }),
  },
}

export default meta

const renderBanner = (args) => {
  const { children, iconName, ...rest } = args
  return (
    <AlertBanner {...rest} iconName={(iconName || '').trim() || undefined}>
      {children}
    </AlertBanner>
  )
}

const BASE_ARGS = {
  type: 'error',
  title: 'Billing update required',
  children: 'Your subscription has expired. Update your details to avoid service interruption.',
  iconName: '',
  hasClose: true,
  dismissOnClick: true,
  className: '',
}

export const Error = {
  render: renderBanner,
  name: 'Error',
  args: { ...BASE_ARGS },
}

export const Warning = {
  render: renderBanner,
  name: 'Warning',
  args: {
    ...BASE_ARGS,
    type: 'warning',
    title: 'Deprecation warning',
    children: 'API v1 endpoints will be sunset on October 1st. Migrate to API v2.',
  },
}

export const WithoutClose = {
  render: renderBanner,
  name: 'Without close',
  args: { ...BASE_ARGS, hasClose: false },
}

export const CloseButtonOnly = {
  render: renderBanner,
  name: 'Close button only',
  args: { ...BASE_ARGS, dismissOnClick: false },
}
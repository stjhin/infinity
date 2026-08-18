import React from 'react'
import Toast from './Toast'
import { eventControl, propControl, slotControl } from '../../../storybook/controlGroups'
import googleIconNames from '../../../data/googleIconNames.json'
import figmaDocs from './Toast.figma.generated'

const TYPE_OPTIONS = ['success', 'loading']
const ICON_OPTIONS = ['', ...googleIconNames]

const meta = {
  title: 'Notifications Patterns/Toast/Toast',
  component: Toast,
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
      description: 'Toast type from Figma: Success, Loading.',
      control: { type: 'radio' },
      options: TYPE_OPTIONS,
      labels: { success: 'Success', loading: 'Loading' },
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
      description: 'Google Material Symbol name for the success icon.',
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
    }),
    showSpinner: propControl({
      name: 'Show spinner',
      description: 'Show a progress spinner on the loading toast (Figma loading variant has no leading icon by default).',
      control: { type: 'boolean' },
    }),
    hasClose: propControl({
      name: 'Has close',
      description: 'Show/hide the dismiss button.',
      control: { type: 'boolean' },
    }),
    onClose: eventControl({ control: false }),
    className: propControl({ name: 'Class name', control: { type: 'text' } }),
  },
}

export default meta

const renderToast = (args) => {
  const { children, ...rest } = args
  return <Toast {...rest}>{children}</Toast>
}

const BASE_ARGS = {
  type: 'success',
  title: 'Changes published',
  children: 'Your production site is now live.',
  iconName: 'check',
  showSpinner: false,
  hasClose: true,
  className: '',
}

export const Success = {
  render: renderToast,
  name: 'Success',
  args: { ...BASE_ARGS },
}

export const Loading = {
  render: renderToast,
  name: 'Loading',
  args: {
    ...BASE_ARGS,
    type: 'loading',
    title: 'Uploading assets...',
    children: 'Copying 4 files (8.2 MB / 14 MB)',
  },
}

export const LoadingWithSpinner = {
  render: renderToast,
  name: 'Loading with spinner',
  args: {
    ...BASE_ARGS,
    type: 'loading',
    title: 'Uploading assets...',
    children: 'Copying 4 files (8.2 MB / 14 MB)',
    showSpinner: true,
  },
}

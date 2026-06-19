import React from 'react'
import MessageBubble from './MessageBubble'
import Button from '../../../components/Button'
import { propControl, slotControl } from '../../../storybook/controlGroups'

const meta = {
  title: 'AI Patterns/Message/MessageBubble',
  component: MessageBubble,
  tags: ['autodocs'],
  argTypes: {
    role: propControl({
      name: 'Role',
      control: { type: 'radio' },
      options: ['user', 'ai', 'system'],
    }),
    timestamp: propControl({ name: 'Timestamp', control: { type: 'text' } }),
    children: slotControl({ name: 'Content', control: { type: 'text' } }),
  },
}

export default meta

const ActionBar = (
  <>
    <Button size="small" variant="tertiary" onClick={() => {}}>
      <span className="material-symbols-rounded" style={{ fontSize: 14 }}>content_copy</span>
    </Button>
    <Button size="small" variant="tertiary" onClick={() => {}}>
      <span className="material-symbols-rounded" style={{ fontSize: 14 }}>thumb_up</span>
    </Button>
  </>
)

const AI_AVATAR = (
  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>smart_toy</span>
)

const USER_AVATAR = (
  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>person</span>
)

const SYSTEM_AVATAR = (
  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>info</span>
)

export const UserMessage = {
  args: {
    role: 'user',
    avatar: USER_AVATAR,
    timestamp: '10:32 AM',
    children: 'Can you explain how React hooks work?',
    actions: ActionBar,
  },
}

export const AIMessage = {
  args: {
    role: 'ai',
    avatar: AI_AVATAR,
    timestamp: '10:32 AM',
    children: 'React hooks are functions that let you use state and lifecycle features in functional components. The most common ones are useState, useEffect, and useContext.',
    actions: ActionBar,
  },
}

export const AIMessageLong = {
  args: {
    role: 'ai',
    avatar: AI_AVATAR,
    timestamp: '10:33 AM',
    children: `Here's a more detailed explanation:

useState lets you add state to functional components. You call it with an initial value and it returns an array with the current state and a function to update it.

useEffect lets you perform side effects — like fetching data, subscribing to events, or manipulating the DOM — after the component renders. You can control when it runs by passing a dependency array.

useContext lets you consume context values without wrapping your component in a Consumer. This makes it much cleaner to share global state like themes or user authentication.`,
    actions: ActionBar,
  },
}

export const SystemMessage = {
  args: {
    role: 'system',
    avatar: SYSTEM_AVATAR,
    timestamp: '10:31 AM',
    children: 'Conversation started. Model: DeepSeek V4 Pro. Context length: 128K tokens.',
  },
}

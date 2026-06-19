import React from 'react'
import ChatThread from './ChatThread'
import { propControl, eventControl } from '../../../storybook/controlGroups'

const SAMPLE_THREAD = {
  id: 'thread-1',
  title: 'Understanding React Hooks',
  createdAt: '2026-06-19T10:30:00Z',
  messages: [
    { id: '1', role: 'user', content: 'Can you explain how React hooks work?', timestamp: Date.now() - 60000 },
    { id: '2', role: 'ai', content: 'React hooks are functions that let you use state and lifecycle features in functional components. The most common ones are useState, useEffect, and useContext.', timestamp: Date.now() },
  ],
}

const THREAD_LONG_TITLE = {
  id: 'thread-2',
  title: 'Deep dive into TypeScript generics and advanced type patterns for React components',
  createdAt: '2026-06-18T15:00:00Z',
  messages: [
    { id: '3', role: 'user', content: 'Show me advanced TypeScript patterns for React.', timestamp: Date.now() - 120000 },
    { id: '4', role: 'ai', content: 'TypeScript generics allow you to create reusable components that work with a variety of types rather than a single one.', timestamp: Date.now() },
    { id: '5', role: 'user', content: 'Can you give me an example?', timestamp: Date.now() },
  ],
}

const meta = {
  title: 'AI Patterns/Chat/ChatThread',
  component: ChatThread,
  tags: ['autodocs'],
  argTypes: {
    isActive: propControl({ name: 'Active', control: { type: 'boolean' } }),
    onClick: eventControl(),
  },
}

export default meta

export const Default = {
  args: { thread: SAMPLE_THREAD, isActive: false },
}

export const Active = {
  args: { thread: SAMPLE_THREAD, isActive: true },
}

export const LongTitle = {
  args: { thread: THREAD_LONG_TITLE, isActive: false },
}

export const MultipleThreads = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', maxWidth: 300, padding: 16 }}>
      <ChatThread thread={SAMPLE_THREAD} isActive={true} />
      <ChatThread thread={THREAD_LONG_TITLE} isActive={false} />
      <ChatThread
        thread={{
          id: 'thread-3',
          title: 'Code review request',
          createdAt: '2026-06-17T09:00:00Z',
          messages: [
            { id: '6', role: 'user', content: 'Review my PR please.', timestamp: Date.now() },
          ],
        }}
        isActive={false}
      />
    </div>
  ),
}

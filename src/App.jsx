import React from 'react'
import Button from './components/Button'
import ChatContainer from './ai-patterns/components/chat/ChatContainer'
import { listModels } from './ai-patterns/registry/ModelRegistry'

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: 'Inter, system-ui, Arial' }}>
      <h1>Infinity Design System — Demo</h1>

      <section style={{ marginBottom: 32 }}>
        <h2>Core Components</h2>
        <p>Example Button component:</p>
        <Button>Click me</Button>
      </section>

      <section>
        <h2>AI Patterns — Chat Demo</h2>
        <ChatContainer
          headerTitle="Infinity AI Assistant"
          models={listModels()}
          persona={{
            name: 'Infinity Assistant',
            description: 'Your AI-powered design system companion.',
          }}
          quickReplies={[
            { label: 'Create a Button', icon: 'smart_button', onClick: () => {} },
            { label: 'Design tokens', icon: 'palette', onClick: () => {} },
            { label: 'Accessibility', icon: 'accessibility', onClick: () => {} },
          ]}
        />
      </section>
    </div>
  )
}

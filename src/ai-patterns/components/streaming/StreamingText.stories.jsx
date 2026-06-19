import React, { useState } from 'react'
import StreamingText from './StreamingText'
import Button from '../../../components/Button'
import { propControl, eventControl } from '../../../storybook/controlGroups'

const SAMPLE_TEXT =
  'This is a streaming text demonstration. Each character appears one at a time, simulating how an AI model progressively generates its response. The blinking cursor indicates that the response is still being generated.'

const meta = {
  title: 'AI Patterns/Streaming/StreamingText',
  component: StreamingText,
  tags: ['autodocs'],
  argTypes: {
    text: propControl({ name: 'Text', control: { type: 'text' } }),
    isStreaming: propControl({ name: 'Streaming', control: { type: 'boolean' } }),
    speed: propControl({ name: 'Speed (ms)', control: { type: 'number', min: 5, max: 200, step: 5 } }),
    onComplete: eventControl(),
  },
}

export default meta

export const Default = {
  render: () => {
    const [streaming, setStreaming] = useState(false)
    const [key, setKey] = useState(0)

    const start = () => {
      setKey((k) => k + 1)
      setStreaming(true)
    }

    return (
      <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <Button onClick={start} disabled={streaming}>
            Start Streaming
          </Button>
        </div>
        <StreamingText
          key={key}
          text={SAMPLE_TEXT}
          isStreaming={streaming}
          speed={25}
          onComplete={() => setStreaming(false)}
        />
      </div>
    )
  },
}

export const Static = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
      <StreamingText
        text={SAMPLE_TEXT}
        isStreaming={false}
      />
    </div>
  ),
}

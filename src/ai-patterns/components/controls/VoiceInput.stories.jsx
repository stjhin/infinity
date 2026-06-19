import React, { useState } from 'react'
import VoiceInput from './VoiceInput'
import Button from '../../../components/Button'
import { propControl, eventControl } from '../../../storybook/controlGroups'

const meta = {
  title: 'AI Patterns/Controls/VoiceInput',
  component: VoiceInput,
  tags: ['autodocs'],
  argTypes: {
    isOpen: propControl({ name: 'Open', control: { type: 'boolean' } }),
    onTranscript: eventControl(),
    onError: eventControl(),
    onClose: eventControl(),
  },
}

export default meta

export const Default = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
        <Button onClick={() => setOpen(true)} leadingIcon="mic">
          Start Voice Input
        </Button>
        <VoiceInput
          isOpen={open}
          onTranscript={(text) => {
            console.log('Transcript:', text)
            alert(`Transcript: ${text}`)
          }}
          onClose={() => setOpen(false)}
        />
      </div>
    )
  },
}

export const UnsupportedBrowser = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
      <p style={{ marginBottom: 12, color: 'var(--color-asx-mono-500)' }}>
        This story simulates an unsupported browser state.
        The actual VoiceInput component feature-detects at runtime.
      </p>
      <div className="ai-voice__content" style={{ animation: 'none', position: 'static' }}>
        <div className="ai-voice__unsupported">
          <span className="material-symbols-rounded" style={{ fontSize: 48 }}>mic_off</span>
          <p>Voice input is not supported in this browser.</p>
          <button type="button" className="ai-voice__close-btn">Close</button>
        </div>
      </div>
    </div>
  ),
}

import React, { useEffect, useCallback } from 'react'
import { useVoiceInput } from '../../hooks/useVoiceInput'
import './VoiceInput.css'

/**
 * Modal overlay for voice recording and transcription.
 *
 * @param {Object} props
 * @param {(transcript: string) => void} props.onTranscript
 * @param {(error: string) => void} [props.onError]
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {string} [props.className]
 */
export default function VoiceInput({
  onTranscript,
  onError,
  isOpen,
  onClose,
  className = '',
}) {
  const { isSupported, state, startRecording, stopRecording, transcript, error } =
    useVoiceInput()

  useEffect(() => {
    if (isOpen && isSupported) {
      startRecording()
    }
  }, [isOpen, isSupported, startRecording])

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript)
      onClose()
    }
  }, [transcript, onTranscript, onClose])

  useEffect(() => {
    if (error && onError) {
      onError(error)
    }
  }, [error, onError])

  const handleCancel = useCallback(() => {
    stopRecording()
    onClose()
  }, [stopRecording, onClose])

  const handleStop = useCallback(() => {
    stopRecording()
  }, [stopRecording])

  if (!isOpen) return null

  return (
    <div className={`ai-voice ${className}`.trim()} role="dialog" aria-label="Voice input">
      <div className="ai-voice__overlay" onClick={handleCancel} />
      <div className="ai-voice__content">
        {!isSupported ? (
          <div className="ai-voice__unsupported">
            <span className="material-symbols-rounded" style={{ fontSize: 48 }}>mic_off</span>
            <p>Voice input is not supported in this browser.</p>
            <button type="button" className="ai-voice__close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : state === 'error' ? (
          <div className="ai-voice__error">
            <span className="material-symbols-rounded" style={{ fontSize: 48 }}>error</span>
            <p>{error || 'An error occurred.'}</p>
            <button type="button" className="ai-voice__close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={`ai-voice__indicator ${state === 'listening' ? 'ai-voice__indicator--active' : ''}`}>
              <span className="material-symbols-rounded ai-voice__mic-icon">
                {state === 'listening' ? 'mic' : 'hourglass_top'}
              </span>
              {state === 'listening' && (
                <div className="ai-voice__waves" aria-hidden="true">
                  <span className="ai-voice__wave" />
                  <span className="ai-voice__wave" />
                  <span className="ai-voice__wave" />
                  <span className="ai-voice__wave" />
                  <span className="ai-voice__wave" />
                </div>
              )}
            </div>
            <p className="ai-voice__status">
              {state === 'listening' ? 'Listening...' : 'Transcribing...'}
            </p>
            <div className="ai-voice__actions">
              <button type="button" className="ai-voice__cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              {state === 'listening' && (
                <button type="button" className="ai-voice__stop-btn" onClick={handleStop}>
                  Stop
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

import { useState, useCallback, useRef } from 'react'

/**
 * Hook for voice recording using the MediaRecorder API.
 * Feature-detects availability and provides graceful degradation.
 *
 * @returns {{
 *   isSupported: boolean,
 *   state: import('../types').VoiceState,
 *   startRecording: () => Promise<void>,
 *   stopRecording: () => void,
 *   transcript: string|null,
 *   error: string|null,
 * }}
 */
export function useVoiceInput() {
  const [state, setState] = useState(/** @type {import('../types').VoiceState} */ ('idle'))
  const [transcript, setTranscript] = useState(null)
  const [error, setError] = useState(null)
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])

  const isSupported =
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== 'undefined'

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      setState('error')
      setError('Voice recording is not supported in this browser.')
      return
    }

    setError(null)
    setTranscript(null)
    chunksRef.current = []

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      recorder.onstop = () => {
        setState('transcribing')
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        // In production, send `blob` to a speech-to-text service.
        // For the demo, simulate a transcript after a short delay.
        setTimeout(() => {
          setTranscript('[Simulated transcript] This is a sample voice transcription.')
          setState('idle')
        }, 800)
      }

      recorder.onerror = () => {
        setState('error')
        setError('An error occurred during recording.')
      }

      recorder.start()
      setState('listening')
    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Microphone access denied.')
    }
  }, [isSupported])

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current
    const stream = streamRef.current

    if (recorder && recorder.state !== 'inactive') {
      recorder.stop()
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  return {
    isSupported,
    state,
    startRecording,
    stopRecording,
    transcript,
    error,
  }
}

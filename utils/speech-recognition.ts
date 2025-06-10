// This is a utility wrapper for the Web Speech API
export function setupSpeechRecognition() {
  // Check if browser supports speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    console.error("Speech recognition not supported in this browser")
    return null
  }

  const recognition = new SpeechRecognition()

  // Configure recognition
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = "en-US"

  return recognition
}

// Helper function to start speech recognition with callbacks
export function startRecognition(recognition: any, onResult: (transcript: string) => void, onEnd: () => void) {
  if (!recognition) return false

  recognition.onresult = (event: any) => {
    const transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join("")

    onResult(transcript)
  }

  recognition.onend = onEnd

  try {
    recognition.start()
    return true
  } catch (error) {
    console.error("Error starting speech recognition:", error)
    return false
  }
}

// Helper function to stop speech recognition
export function stopRecognition(recognition: any) {
  if (!recognition) return

  try {
    recognition.stop()
  } catch (error) {
    console.error("Error stopping speech recognition:", error)
  }
}

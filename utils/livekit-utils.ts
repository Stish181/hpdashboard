// Mock LiveKit utilities for demo purposes
export interface MockRoom {
  connected: boolean
  participants: string[]
}

// Function to create a mock room connection
export async function connectToRoom(url: string, token: string): Promise<MockRoom> {
  // Simulate connection delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log(`Mock connection to ${url} with token: ${token}`)

  return {
    connected: true,
    participants: ["Clara", "User"],
  }
}

// Function to simulate getting a LiveKit token
export async function getLiveKitToken(username: string): Promise<string> {
  console.log(`Getting mock LiveKit token for user: ${username}`)
  return `mock_token_${username}_${Date.now()}`
}

// Mock audio utilities
export function setupMockAudio() {
  return {
    startRecording: () => console.log("Mock: Started recording"),
    stopRecording: () => console.log("Mock: Stopped recording"),
    playAudio: (text: string) => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(utterance)
      }
    },
  }
}

import { Room, type RoomOptions } from "livekit-client"

// Default room options
const defaultRoomOptions: RoomOptions = {
  adaptiveStream: true,
  dynacast: true,
  publishDefaults: {
    simulcast: true,
    audioPreset: { maxBitrate: 128_000, maxSampleRate: 48000 },
  },
}

// Function to create and connect to a LiveKit room
export async function connectToRoom(
  url: string,
  token: string,
  options: RoomOptions = defaultRoomOptions,
): Promise<Room> {
  const room = new Room(options)

  try {
    await room.connect(url, token)
    console.log("Connected to LiveKit room")
    return room
  } catch (error) {
    console.error("Failed to connect to LiveKit room:", error)
    throw error
  }
}

// Function to get a LiveKit token from your backend
export async function getLiveKitToken(username: string): Promise<string> {
  // In a real implementation, you would fetch this from your backend
  // For demo purposes, we're returning a placeholder
  console.log(`Getting LiveKit token for user: ${username}`)
  return "DEMO_TOKEN"
}

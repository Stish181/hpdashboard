"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, X, Volume2, VolumeX } from "lucide-react"
import {
  Room,
  RoomEvent,
  type RemoteParticipant,
  type LocalParticipant,
  type RemoteTrackPublication,
  type LocalTrack,
} from "livekit-client"

interface VoiceAssistantProps {
  isOpen: boolean
  onClose: () => void
}

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState<string[]>([])
  const [response, setResponse] = useState("")
  const roomRef = useRef<Room | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Connect to LiveKit room
  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      connectToLiveKit()
    }

    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect()
        roomRef.current = null
      }
    }
  }, [isOpen])

  const connectToLiveKit = async () => {
    try {
      setIsConnecting(true)

      // In a real implementation, you would fetch this token from your server
      const token = "DEMO_TOKEN" // Replace with actual token from your backend

      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
        publishDefaults: {
          simulcast: true,
          audioPreset: { maxBitrate: 128_000, maxSampleRate: 48000 },
        },
      })

      room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)

      await room.connect("wss://your-livekit-server.com", token)
      console.log("Connected to LiveKit room")

      roomRef.current = room
      setIsConnected(true)
      setIsConnecting(false)

      // Simulate Clara's initial greeting
      setTimeout(() => {
        addMessage("Clara", "Hello! I'm Clara, your healthcare assistant. How can I help you today?")
      }, 1000)
    } catch (error) {
      console.error("Failed to connect to LiveKit:", error)
      setIsConnecting(false)
    }
  }

  const handleTrackSubscribed = (
    track: LocalTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant | LocalParticipant,
  ) => {
    if (track.kind === "audio" && audioRef.current) {
      track.attach(audioRef.current)
    }
  }

  const toggleMicrophone = async () => {
    if (!roomRef.current) return

    try {
      if (isMuted) {
        // Unmute microphone
        await roomRef.current.localParticipant.setMicrophoneEnabled(true)
        setIsMuted(false)
      } else {
        // Mute microphone
        await roomRef.current.localParticipant.setMicrophoneEnabled(false)
        setIsMuted(true)
      }
    } catch (error) {
      console.error("Error toggling microphone:", error)
    }
  }

  const startListening = async () => {
    if (!roomRef.current) return

    try {
      // Request microphone permissions and publish audio
      await roomRef.current.localParticipant.setMicrophoneEnabled(true)
      setIsListening(true)
      setIsMuted(false)

      // Simulate user speaking (in a real app, this would be captured from the microphone)
      setTimeout(() => {
        addMessage("You", "I've been having a headache for the past two days.")
        stopListening()

        // Simulate Clara's response
        setTimeout(() => {
          addMessage(
            "Clara",
            "I'm sorry to hear that. Could you tell me if you're experiencing any other symptoms like nausea, sensitivity to light, or blurred vision?",
          )
        }, 1500)
      }, 3000)
    } catch (error) {
      console.error("Error starting microphone:", error)
      setIsListening(false)
    }
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const addMessage = (sender: string, message: string) => {
    setTranscript((prev) => [...prev, `${sender}: ${message}`])
    if (sender === "Clara") {
      setResponse(message)
      // In a real implementation, you would use the Web Speech API to speak the response
      speakResponse(message)
    }
  }

  const speakResponse = (text: string) => {
    // In a real implementation, this would use the Web Speech API or stream audio from LiveKit
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <img src="/support-icon.png" alt="Clara" className="w-8 h-8 mr-2" />
            Clara Voice Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
            {transcript.map((message, index) => (
              <div key={index} className={`mb-3 ${message.startsWith("Clara:") ? "text-blue-700" : "text-gray-700"}`}>
                {message}
              </div>
            ))}
            {isListening && <div className="text-gray-500 italic">Listening...</div>}
            {isConnecting && <div className="text-center text-gray-500">Connecting to Clara...</div>}
          </div>

          <audio ref={audioRef} autoPlay />

          <div className="text-center">
            {isConnected ? (
              <div className="flex justify-center space-x-4">
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="lg"
                  className="rounded-full w-14 h-14 flex items-center justify-center"
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-14 h-14 flex items-center justify-center"
                  onClick={toggleMicrophone}
                >
                  {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
              </div>
            ) : (
              <Button disabled={isConnecting} onClick={connectToLiveKit}>
                {isConnecting ? "Connecting..." : "Connect to Clara"}
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-xs text-gray-500 text-center">
          Clara uses AI to provide healthcare guidance. For emergencies, please call 911.
        </CardFooter>
      </Card>
    </div>
  )
}

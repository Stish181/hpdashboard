"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, X, Volume2, VolumeX } from "lucide-react"

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
  const [isProcessing, setIsProcessing] = useState(false)
  const recognitionRef = useRef<any>(null)

  // Initialize speech recognition when component opens
  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      connectToVoiceAssistant()
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (error) {
          // Ignore errors when stopping
        }
      }
    }
  }, [isOpen])

  const connectToVoiceAssistant = async () => {
    try {
      setIsConnecting(true)

      // Check if browser supports speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-US"

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          addMessage("You", transcript)
          setIsListening(false)
          setIsProcessing(true)

          // Simulate Clara's response based on user input
          setTimeout(() => {
            generateClaraResponse(transcript)
            setIsProcessing(false)
          }, 1500)
        }

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
          setIsProcessing(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
      }

      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsConnected(true)
      setIsConnecting(false)

      // Clara's initial greeting
      setTimeout(() => {
        addMessage(
          "Clara",
          "Hello! I'm Clara, your healthcare assistant. How can I help you today? You can click the microphone button to speak with me.",
        )
      }, 500)
    } catch (error) {
      console.error("Failed to initialize voice assistant:", error)
      setIsConnecting(false)
      // Still allow the assistant to work in text mode
      setIsConnected(true)
      addMessage(
        "Clara",
        "Hello! I'm Clara, your healthcare assistant. Speech recognition isn't available, but I'm here to help you. How are you feeling today?",
      )
    }
  }

  const generateClaraResponse = (userInput: string) => {
    const input = userInput.toLowerCase()
    let response = ""

    if (input.includes("headache") || input.includes("head")) {
      response =
        "I'm sorry to hear about your headache. Can you tell me how long you've been experiencing this? Are you also having any nausea, sensitivity to light, or vision changes?"
    } else if (input.includes("fever") || input.includes("temperature")) {
      response =
        "A fever can be concerning. Have you taken your temperature? Are you experiencing any other symptoms like chills, body aches, or fatigue?"
    } else if (input.includes("cough") || input.includes("throat")) {
      response =
        "I understand you're having throat or cough issues. Is it a dry cough or are you bringing up mucus? Any difficulty swallowing or breathing?"
    } else if (input.includes("stomach") || input.includes("nausea") || input.includes("sick")) {
      response =
        "Stomach issues can be uncomfortable. Are you experiencing nausea, vomiting, or abdominal pain? When did these symptoms start?"
    } else if (input.includes("appointment") || input.includes("doctor")) {
      response =
        "I can help you find the right care. Based on your symptoms, would you like me to help you schedule an appointment with your primary care doctor or find an urgent care location?"
    } else if (input.includes("emergency") || input.includes("urgent")) {
      response =
        "If this is a medical emergency, please call 911 immediately. For urgent but non-emergency care, I can help you find the nearest urgent care center or emergency room."
    } else {
      response =
        "Thank you for sharing that with me. Can you tell me more about your symptoms? For example, when did they start and how severe are they on a scale of 1 to 10?"
    }

    addMessage("Clara", response)
    speakResponse(response)
  }

  const toggleMicrophone = () => {
    setIsMuted(!isMuted)
  }

  const startListening = async () => {
    if (!recognitionRef.current) {
      addMessage(
        "Clara",
        "Speech recognition isn't available in your browser. You can still type your symptoms or questions, and I'll help guide you to the right care.",
      )
      return
    }

    try {
      setIsListening(true)
      recognitionRef.current.start()
    } catch (error) {
      console.error("Error starting speech recognition:", error)
      setIsListening(false)
      addMessage(
        "Clara",
        "I'm having trouble with speech recognition. Can you try again or tell me how you're feeling?",
      )
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        // Ignore errors when stopping
      }
    }
    setIsListening(false)
  }

  const addMessage = (sender: string, message: string) => {
    setTranscript((prev) => [...prev, `${sender}: ${message}`])
  }

  const speakResponse = (text: string) => {
    if ("speechSynthesis" in window && !isMuted) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 0.8

      // Use a female voice if available
      const voices = window.speechSynthesis.getVoices()
      const femaleVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("female") ||
          voice.name.toLowerCase().includes("woman") ||
          voice.name.toLowerCase().includes("samantha") ||
          voice.name.toLowerCase().includes("karen"),
      )

      if (femaleVoice) {
        utterance.voice = femaleVoice
      }

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
                <div className={`p-2 rounded-lg ${message.startsWith("Clara:") ? "bg-blue-50" : "bg-white border"}`}>
                  {message}
                </div>
              </div>
            ))}
            {isListening && (
              <div className="text-center text-blue-600 italic animate-pulse">🎤 Listening... Speak now</div>
            )}
            {isProcessing && <div className="text-center text-gray-500 italic animate-pulse">Clara is thinking...</div>}
            {isConnecting && <div className="text-center text-gray-500">Connecting to Clara...</div>}
          </div>

          <div className="text-center">
            {isConnected ? (
              <div className="flex justify-center space-x-4">
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="lg"
                  className="rounded-full w-14 h-14 flex items-center justify-center"
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                >
                  {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </Button>
                <Button
                  variant={isMuted ? "destructive" : "outline"}
                  size="lg"
                  className="rounded-full w-14 h-14 flex items-center justify-center"
                  onClick={toggleMicrophone}
                >
                  {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
              </div>
            ) : (
              <Button disabled={isConnecting} onClick={connectToVoiceAssistant}>
                {isConnecting ? "Connecting..." : "Connect to Clara"}
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-500 text-center">
            {isListening ? "Speak clearly into your microphone" : "Click the microphone to start speaking"}
          </div>
        </CardContent>
        <CardFooter className="text-xs text-gray-500 text-center">
          Clara uses AI to provide healthcare guidance. For emergencies, please call 911.
        </CardFooter>
      </Card>
    </div>
  )
}

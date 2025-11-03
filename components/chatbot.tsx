'use client'

// AI Chatbot component with predefined responses
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

// Predefined Q&A pairs
const qaPairs: { [key: string]: string } = {
  hello: 'Hello! Welcome to FableCraft. How can I help you today?',
  hi: 'Hi there! How can I assist you with FableCraft?',
  help: 'I can help you with: browsing products, understanding our platform, artisan information, ordering process, and more. What would you like to know?',
  'what is fablecraft': 'FableCraft is a marketplace connecting artisans with customers worldwide. We showcase authentic handmade and cultural products with stories behind them.',
  'how to order': 'To order: 1) Browse products, 2) Add items to cart, 3) Go to checkout, 4) Complete payment. You can track your orders in the dashboard.',
  'become artisan': 'To become an artisan: Sign up with an artisan account, upload your products with stories, and start selling to customers worldwide!',
  'how to sell': 'Sign up as an artisan, create your profile, upload product images and stories, set prices, and manage orders through your dashboard.',
  payment: 'We support various payment methods including credit/debit cards. All transactions are secure and encrypted.',
  shipping: 'Shipping varies by artisan location and product. Details are shown at checkout. Most orders ship within 3-5 business days.',
  'return policy': 'Returns are accepted within 30 days of delivery. Items must be in original condition. Contact the artisan or our support team for returns.',
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m the FableCraft assistant. Ask me anything about our platform, products, or how to get started!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')

  const findBestMatch = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase()
    
    // Check for exact or partial matches
    for (const [key, value] of Object.entries(qaPairs)) {
      if (lowercaseMessage.includes(key)) {
        return value
      }
    }
    
    // Default response
    return "I'm not sure about that. You can ask me about: what is FableCraft, how to order, becoming an artisan, payment, shipping, or return policy. Or visit our Help Center for more information."
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBestMatch(input),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 500)

    setInput('')
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="icon"
              className="h-14 w-14 rounded-full shadow-lg"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96"
          >
            <Card className="shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary text-primary-foreground">
                <CardTitle className="text-lg">FableCraft Assistant</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 h-96 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex w-full space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button size="icon" onClick={handleSend}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


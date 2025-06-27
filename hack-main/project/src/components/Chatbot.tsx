import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

interface ChatbotProps {
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const mentalHealthResponses = {
  anxiety: {
    symptoms: [
      "Excessive worry",
      "Restlessness",
      "Difficulty concentrating",
      "Sleep problems"
    ],
    preventions: [
      "Practice deep breathing exercises",
      "Maintain a regular sleep schedule",
      "Exercise regularly",
      "Limit caffeine and alcohol"
    ]
  },
  depression: {
    symptoms: [
      "Persistent sadness",
      "Loss of interest",
      "Changes in appetite",
      "Fatigue"
    ],
    preventions: [
      "Stay connected with others",
      "Exercise regularly",
      "Maintain a routine",
      "Seek professional help"
    ]
  },
  stress: {
    symptoms: [
      "Tension headaches",
      "Irritability",
      "Difficulty sleeping",
      "Decreased motivation"
    ],
    preventions: [
      "Practice mindfulness",
      "Take regular breaks",
      "Exercise regularly",
      "Maintain work-life balance"
    ]
  }
};

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to listen and support you. How are you feeling today?",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeMessage = (message: string): string => {
    message = message.toLowerCase();
    
    if (message.includes('anxious') || message.includes('anxiety')) {
      return generateResponse('anxiety');
    } else if (message.includes('depress') || message.includes('sad')) {
      return generateResponse('depression');
    } else if (message.includes('stress') || message.includes('overwhelm')) {
      return generateResponse('stress');
    }
    
    return "I hear you. Would you like to tell me more about how you're feeling? I'm here to listen and provide support.";
  };

  const generateResponse = (condition: keyof typeof mentalHealthResponses): string => {
    const { symptoms, preventions } = mentalHealthResponses[condition];
    
    return `I understand you might be experiencing ${condition}. Here are some common symptoms:\n\n` +
           `${symptoms.map(s => `• ${s}`).join('\n')}\n\n` +
           `Here are some preventive measures that might help:\n\n` +
           `${preventions.map(p => `• ${p}`).join('\n')}\n\n` +
           `Remember, it's okay to seek professional help. Would you like to know more about any specific aspect?`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: analyzeMessage(input),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-semibold">AI Support Companion</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
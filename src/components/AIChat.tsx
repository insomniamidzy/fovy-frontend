import React, { useState, useEffect, useRef } from 'react';
import { LoadingDots } from './LoadingDots';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const AIChat: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: "Hi there! I'm your AIR Minder. How are you feeling about your freelance career today?",
    sender: 'ai',
    timestamp: new Date(),
  }]);

  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    try {
      const response = await axios.post('http://localhost:3001/ask', {
        message: inputValue,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('API error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden rounded-2xl glass-card-dark h-[500px] flex flex-col ${
        isVisible ? 'animate-scale-in' : 'opacity-0'
      }`}
    >
      <div className="flex items-center border-b border-slate-700/50 p-4 bg-slate-800/80">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900/30">
          <Bot className="h-5 w-5 text-blue-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-white">AIR Minder</p>
          <p className="text-xs text-gray-300">Self-Efficacy & Confidence Assistant</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`chat-bubble ${message.sender}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              {message.sender === 'ai' ? (
                <Bot className="h-5 w-5 mt-1 flex-shrink-0 text-blue-400" />
              ) : (
                <User className="h-5 w-5 mt-1 flex-shrink-0 text-white" />
              )}
              <div className="prose prose-invert max-w-full">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="leading-relaxed">{children}</p>
                    ),
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                    h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>,
                    ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-bubble ai">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 mt-1 flex-shrink-0 text-blue-400" />
              <LoadingDots />
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="border-t border-slate-700/50 p-4 bg-slate-800/80">
        <div className="flex gap-2">
          <Input
            placeholder="Write a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

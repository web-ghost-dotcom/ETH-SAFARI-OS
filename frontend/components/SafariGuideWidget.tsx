'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

const quickActions = [
    'Find a mentor for my project',
    'Help me form a team',
    'What are the best resources for Solidity?',
    'Review my funding proposal'
];

export default function SafariGuideWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<Array<{ role: string, content: string }>>([
        {
            role: 'assistant',
            content: 'Hello! I\'m SafariGuide, your AI assistant. How can I help you today?'
        }
    ]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        setChatHistory(prev => [...prev, { role: 'user', content: message }]);

        // Simulate AI response
        setTimeout(() => {
            setChatHistory(prev => [...prev, {
                role: 'assistant',
                content: `I understand you're asking about "${message}". Let me help you with that...`
            }]);
        }, 1000);

        setMessage('');
    };

    const handleQuickAction = (action: string) => {
        setMessage(action);
        handleSendMessage();
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#ff00ff] to-[#00d4ff] shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="bot"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            className="relative"
                        >
                            <Bot className="w-7 h-7 text-white" />
                            <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 bg-[#00d4ff] rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 left-6 md:left-auto md:bottom-28 md:right-6 z-50 md:w-96 h-[600px] max-h-[calc(100vh-80px)] bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#ff00ff]/20 to-[#00d4ff]/20 border-b border-white/10 p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff00ff] to-[#00d4ff] flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold flex items-center gap-2">
                                        SafariGuide AI
                                        <Sparkles className="w-4 h-4 text-[#00d4ff]" />
                                    </h3>
                                    <p className="text-white/60 text-sm">Your ETH Safari Assistant</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {chatHistory.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-[#ff00ff] to-[#00d4ff] text-white'
                                            : 'bg-white/5 text-white border border-white/10'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        {chatHistory.length === 1 && (
                            <div className="p-4 border-t border-white/10 space-y-2">
                                <p className="text-white/60 text-xs font-medium mb-2">Quick Actions:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {quickActions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuickAction(action)}
                                            className="text-xs p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-[#00d4ff]/50 transition-all text-left"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff00ff] to-[#00d4ff] flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

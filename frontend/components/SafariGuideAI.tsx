'use client';

import { motion } from 'framer-motion';
import { Sparkles, Send, Bot } from 'lucide-react';
import { useState } from 'react';

const aiFeatures = [
    {
        title: 'Team Recommendations',
        description: 'Get personalized builder and mentor matches',
        icon: '👥',
        color: '#ff00ff'
    },
    {
        title: 'Idea Brainstorming',
        description: 'Refine your project ideas with AI assistance',
        icon: '💡',
        color: '#00d4ff'
    },
    {
        title: 'Resource Access',
        description: 'Find tutorials, docs, and learning materials',
        icon: '📚',
        color: '#ff00ff'
    },
    {
        title: 'Submission Helper',
        description: 'Auto-complete hackathon and funding proposals',
        icon: '📝',
        color: '#00d4ff'
    }
];

const quickActions = [
    'Find a mentor for my DeFi project',
    'Help me form a team',
    'What are the best resources for learning Solidity?',
    'Review my funding proposal'
];

export default function SafariGuideAI() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<Array<{ role: string, content: string }>>([
        {
            role: 'assistant',
            content: 'Hello! I\'m SafariGuide, your AI assistant for ETH Safari OS. How can I help you today?'
        }
    ]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        setChatHistory([
            ...chatHistory,
            { role: 'user', content: message },
            {
                role: 'assistant',
                content: 'I\'m currently in demo mode. Full AI capabilities will be available soon! In the meantime, explore the features below.'
            }
        ]);
        setMessage('');
    };

    return (
        <section className="relative py-12 px-6 sm:px-12 lg:px-16 bg-black">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Bot className="w-12 h-12 text-[#ff00ff]" />
                        <h2 className="text-4xl sm:text-5xl font-bold text-white">
                            SafariGuide AI
                        </h2>
                    </div>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Your intelligent assistant for navigating the ETH Safari ecosystem
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Chat Interface */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                        >
                            {/* Chat Messages */}
                            <div className="h-96 overflow-y-auto mb-4 space-y-4">
                                {chatHistory.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.role === 'assistant' && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff00ff] to-[#00d4ff] flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-md p-4 rounded-2xl ${msg.role === 'user'
                                                ? 'bg-[#ff00ff]/20 border border-[#ff00ff]/30'
                                                : 'bg-white/5 border border-white/10'
                                                }`}
                                        >
                                            <p className="text-white/90">{msg.content}</p>
                                        </div>
                                        {msg.role === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#ff00ff] flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-sm font-bold">You</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <div className="mb-4">
                                <p className="text-sm text-white/60 mb-3">Quick actions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickActions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setMessage(action)}
                                            className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 hover:border-[#ff00ff]/50 hover:bg-[#ff00ff]/10 transition-all"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Input */}
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask SafariGuide anything..."
                                    className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#ff00ff] focus:outline-none"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="p-3 rounded-full bg-[#ff00ff] text-white hover:bg-[#ff00ff]/90 transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* AI Features */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-4">AI Capabilities</h3>
                            <div className="space-y-4">
                                {aiFeatures.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className="p-2 rounded-lg"
                                                style={{ backgroundColor: `${feature.color}20` }}
                                            >
                                                <Sparkles className="w-5 h-5" style={{ color: feature.color }} />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold mb-1">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-sm text-white/60">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-2xl border border-[#ff00ff]/30 bg-gradient-to-br from-[#ff00ff]/10 to-[#00d4ff]/10"
                        >
                            <h4 className="text-white font-bold mb-2">Coming Soon</h4>
                            <p className="text-sm text-white/60">
                                Full AI capabilities powered by GPT and trained on ETH Safari project corpus
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

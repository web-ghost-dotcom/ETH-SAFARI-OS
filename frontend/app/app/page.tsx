'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ArrowRight, Check, Loader } from 'lucide-react';
import Logo from '@/components/Logo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ConnectWallet() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter();

    const handleConnect = async () => {
        setIsConnecting(true);

        // Simulate wallet connection steps
        await new Promise(resolve => setTimeout(resolve, 1000));

        setShowSuccess(true);

        // Navigate to dashboard
        setTimeout(() => {
            router.push('/app/dashboard');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <div className="flex justify-center mb-6">
                        <Logo className="w-20 h-20" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Welcome to ETH Safari OS
                    </h1>
                    <p className="text-white/60">
                        Connect your wallet to access the platform
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-4"
                >
                    <button
                        onClick={handleConnect}
                        disabled={isConnecting || showSuccess}
                        className="w-full group relative px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:border-[#ff00ff]/50 transition-all disabled:opacity-50 overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {showSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center justify-center gap-3"
                                >
                                    <div className="p-2 rounded-full bg-green-500/20">
                                        <Check className="w-6 h-6 text-green-500" />
                                    </div>
                                    <span className="text-white font-semibold">Connected! Redirecting...</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="connect"
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-[#ff00ff]/20">
                                            {isConnecting ? (
                                                <Loader className="w-6 h-6 text-[#ff00ff] animate-spin" />
                                            ) : (
                                                <Wallet className="w-6 h-6 text-[#ff00ff]" />
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white font-semibold">
                                                {isConnecting ? 'Connecting...' : 'MetaMask'}
                                            </div>
                                            <div className="text-sm text-white/60">
                                                {isConnecting ? 'Approve in your wallet' : 'Connect with MetaMask'}
                                            </div>
                                        </div>
                                    </div>
                                    {!isConnecting && (
                                        <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#ff00ff] group-hover:translate-x-1 transition-all" />
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <button
                        disabled
                        className="w-full group relative px-6 py-4 bg-white/5 border border-white/10 rounded-2xl opacity-50 cursor-not-allowed"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-[#00d4ff]/20">
                                    <Wallet className="w-6 h-6 text-[#00d4ff]" />
                                </div>
                                <div className="text-left">
                                    <div className="text-white font-semibold">
                                        WalletConnect
                                    </div>
                                    <div className="text-sm text-white/60">
                                        Coming soon
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>

                    <button
                        disabled
                        className="w-full group relative px-6 py-4 bg-white/5 border border-white/10 rounded-2xl opacity-50 cursor-not-allowed"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-[#ff00ff]/20">
                                    <Wallet className="w-6 h-6 text-[#ff00ff]" />
                                </div>
                                <div className="text-left">
                                    <div className="text-white font-semibold">
                                        Coinbase Wallet
                                    </div>
                                    <div className="text-sm text-white/60">
                                        Coming soon
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8 text-center"
                >
                    <Link
                        href="/"
                        className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                        Back to home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

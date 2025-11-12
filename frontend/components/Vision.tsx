'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Globe, Repeat } from 'lucide-react';

export default function Vision() {
    return (
        <section className="relative py-32 px-6 sm:px-12 lg:px-16 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#ff00ff] rounded-full filter blur-[120px] opacity-20"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#00d4ff] rounded-full filter blur-[120px] opacity-20"
                />
            </div>

            <div className="relative max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Long-Term Vision
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        More than infrastructure — a cultural layer for builders across Africa
                    </p>
                </motion.div>

                {/* Main Vision Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative mb-16"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff]/20 via-transparent to-[#00d4ff]/20 rounded-3xl blur-2xl" />

                    <div className="relative p-12 sm:p-16 border border-white/10 rounded-3xl backdrop-blur-md bg-black/60">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                                    ETH Safari OS evolves into:
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: Shield, text: 'A knowledge base for builders', color: '#ff00ff' },
                                        { icon: Users, text: 'A mentorship space for developers', color: '#00d4ff' },
                                        { icon: Globe, text: 'A transparent ledger of African innovation', color: '#ff00ff' },
                                        { icon: Repeat, text: 'A regenerative funding loop', color: '#00d4ff' }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 0.6 }}
                                            className="flex items-center gap-4 group"
                                        >
                                            <div
                                                className="p-3 rounded-xl group-hover:scale-110 transition-transform"
                                                style={{ backgroundColor: `${item.color}20` }}
                                            >
                                                <item.icon className="w-6 h-6" style={{ color: item.color }} />
                                            </div>
                                            <span className="text-lg text-white/80">{item.text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#ff00ff]/30"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-8 rounded-full border-2 border-dashed border-[#00d4ff]/30"
                                />

                                <div className="relative z-10 p-12 text-center">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.05, 1],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                        }}
                                    >
                                        <div className="text-6xl font-bold mb-4">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00d4ff]">
                                                ∞
                                            </span>
                                        </div>
                                        <p className="text-white/80 font-semibold">
                                            Self-Sustaining
                                            <br />
                                            Ecosystem
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tagline Options */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {[
                        { text: 'Build. Belong. Become.', color: '#ff00ff' },
                        { text: 'Where builders become a movement', color: '#00d4ff' },
                    ].map((tagline, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="relative group cursor-pointer"
                        >
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                style={{ backgroundColor: `${tagline.color}40` }}
                            />

                            <div className="relative p-8 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-sm hover:border-white/20 transition-all text-center">
                                <p className="text-2xl font-bold text-white">
                                    &ldquo;{tagline.text}&rdquo;
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-[#ff00ff] to-[#00d4ff]">
                        <div className="px-12 py-8 bg-black rounded-3xl">
                            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                A living ecosystem
                            </p>
                            <p className="text-lg text-white/60">
                                Powered by AI · Sustained by community · Built for Africa
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

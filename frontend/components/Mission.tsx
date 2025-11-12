'use client';

import { motion } from 'framer-motion';

const principles = [
    {
        title: 'Community First',
        description: 'Empower collaboration and connection beyond hackathons',
        color: '#ff00ff'
    },
    {
        title: 'Transparency',
        description: 'On-chain reputation, impact tracking, and funding',
        color: '#00d4ff'
    },
    {
        title: 'Inclusivity',
        description: 'AI assistance for anyone to participate — regardless of skill level',
        color: '#ff00ff'
    },
    {
        title: 'Sustainability',
        description: 'Circular funding and governance that keeps the ecosystem alive',
        color: '#00d4ff'
    }
];

const stats = [
    { value: '1000+', label: 'Builders', color: '#ff00ff' },
    { value: '50+', label: 'Projects', color: '#00d4ff' },
    { value: '24/7', label: 'AI Support', color: '#ff00ff' },
    { value: '100%', label: 'On-Chain', color: '#00d4ff' }
];

export default function Mission() {
    return (
        <section className="relative py-32 px-6 sm:px-12 lg:px-16 bg-black">
            <div className="max-w-7xl mx-auto">
                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-32"
                >
                    <div className="inline-block mb-6">
                        <motion.div
                            animate={{
                                boxShadow: [
                                    '0 0 20px #ff00ff40',
                                    '0 0 40px #00d4ff40',
                                    '0 0 20px #ff00ff40'
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="px-6 py-2 rounded-full border border-[#ff00ff]/30 bg-black/40 backdrop-blur-md"
                        >
                            <span className="text-sm font-semibold text-white/90">Our Mission</span>
                        </motion.div>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 max-w-5xl mx-auto leading-tight">
                        Transform ETH Safari into a{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00d4ff]">
                            sustainable ecosystem
                        </span>
                        {' '}that empowers African builders
                    </h2>

                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        An AI-powered, community-governed platform creating lasting Web3 impact across Africa
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative group"
                        >
                            <div className="text-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.2
                                    }}
                                >
                                    <div
                                        className="text-5xl font-bold mb-2"
                                        style={{ color: stat.color }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-white/60 font-medium">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                                className="h-1 rounded-full mt-4 origin-left"
                                style={{ backgroundColor: stat.color }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Core Principles */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
                        Core Principles
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {principles.map((principle, index) => (
                            <motion.div
                                key={principle.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group relative"
                            >
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                    style={{ backgroundColor: `${principle.color}30` }}
                                />

                                <div className="relative p-8 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-sm hover:border-white/20 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                            style={{ backgroundColor: principle.color }}
                                        />
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">
                                                {principle.title}
                                            </h4>
                                            <p className="text-white/60">
                                                {principle.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

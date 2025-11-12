'use client';

import { motion } from 'framer-motion';
import { Users, Bot, TrendingUp, Coins } from 'lucide-react';

const layers = [
    {
        icon: Users,
        title: 'Community Hub',
        subtitle: 'The Social Layer',
        description: 'Connect, showcase, and collaborate with builders, mentors, and alumni across the ETH Safari network.',
        features: [
            'Decentralized identity with wallet & GitHub login',
            'Personal dashboards & project portfolios',
            'Team formation tools & idea boards',
            'Soulbound Reputation NFTs'
        ],
        color: '#ff00ff'
    },
    {
        icon: Bot,
        title: 'SafariGuide AI',
        subtitle: 'The Intelligence Layer',
        description: 'Your AI-powered assistant supporting participants at every level of the ecosystem.',
        features: [
            'Personalized team & mentor recommendations',
            'Hack idea brainstorming & refinement',
            'Access to tutorials & documentation',
            'Automated submission helper'
        ],
        color: '#00d4ff'
    },
    {
        icon: TrendingUp,
        title: 'Impact Tracker',
        subtitle: 'The Transparency Layer',
        description: 'Visualize and verify the growth of the ETH Safari ecosystem on-chain with real-time data.',
        features: [
            'Projects launched & milestones achieved',
            'On-chain activity tracking',
            'Community growth metrics',
            'IPFS/Ceramic-based storage'
        ],
        color: '#ff00ff'
    },
    {
        icon: Coins,
        title: 'Community Funding',
        subtitle: 'The Governance Layer',
        description: 'A decentralized funding mechanism that keeps the community growing sustainably.',
        features: [
            'Community DAO for micro-grants',
            'Proposal system for new ideas',
            'Reputation-based voting',
            'Transparent fund distribution'
        ],
        color: '#00d4ff'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0
    }
};

export default function CoreLayers() {
    return (
        <section className="relative py-32 px-6 sm:px-12 lg:px-16 bg-black">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Four Core Layers
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        A unified digital ecosystem that empowers the ETH Safari network to thrive year-round
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {layers.map((layer) => (
                        <motion.div
                            key={layer.title}
                            variants={itemVariants}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    boxShadow: `0 0 60px ${layer.color}40`
                                }}
                            />

                            <div className="relative p-8 sm:p-10 border border-white/10 rounded-3xl backdrop-blur-sm bg-black/40 hover:border-white/20 transition-colors duration-500">
                                <div className="flex items-start gap-4 mb-6">
                                    <div
                                        className="p-3 rounded-2xl"
                                        style={{ backgroundColor: `${layer.color}20` }}
                                    >
                                        <layer.icon
                                            className="w-8 h-8"
                                            style={{ color: layer.color }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            {layer.title}
                                        </h3>
                                        <p className="text-sm font-medium" style={{ color: layer.color }}>
                                            {layer.subtitle}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-white/70 mb-6 leading-relaxed">
                                    {layer.description}
                                </p>

                                <div className="space-y-3">
                                    {layer.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * idx }}
                                            className="flex items-start gap-3"
                                        >
                                            <div
                                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                style={{ backgroundColor: layer.color }}
                                            />
                                            <span className="text-sm text-white/60">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="h-1 rounded-full mt-8 origin-left"
                                    style={{ backgroundColor: layer.color }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

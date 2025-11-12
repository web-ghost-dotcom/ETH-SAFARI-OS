'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Join',
        description: 'Log in via wallet and GitHub — receive your Safari Soulbound NFT',
        color: '#ff00ff'
    },
    {
        number: '02',
        title: 'Discover',
        description: 'SafariGuide recommends collaborators, ideas, and tutorials',
        color: '#00d4ff'
    },
    {
        number: '03',
        title: 'Build',
        description: 'Form teams, create projects, record progress on-chain',
        color: '#ff00ff'
    },
    {
        number: '04',
        title: 'Track',
        description: 'Impact Tracker visualizes growth and community milestones',
        color: '#00d4ff'
    },
    {
        number: '05',
        title: 'Fund & Grow',
        description: 'DAO funds promising projects and events — restarting the cycle',
        color: '#ff00ff'
    }
];

export default function EcosystemFlow() {
    return (
        <section className="relative py-32 px-6 sm:px-12 lg:px-16 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff00ff] rounded-full filter blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d4ff] rounded-full filter blur-[100px]" />
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
                        Ecosystem Flow
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        An always-on engine of innovation and impact
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connection Lines */}
                    <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className="absolute w-full origin-top"
                                style={{
                                    top: `${(index / (steps.length - 1)) * 100}%`,
                                    height: index < steps.length - 1 ? `${100 / (steps.length - 1)}%` : '0',
                                    background: `linear-gradient(to bottom, ${step.color}, ${steps[index + 1]?.color || step.color})`
                                }}
                            />
                        ))}
                    </div>

                    {/* Steps */}
                    <div className="space-y-8 lg:space-y-16">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    } flex-col`}
                            >
                                {/* Content */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center`}>
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                        className="inline-block"
                                    >
                                        <span
                                            className="text-8xl font-bold opacity-20"
                                            style={{ color: step.color }}
                                        >
                                            {step.number}
                                        </span>
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg text-white/70 max-w-md mx-auto lg:mx-0">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Center Node */}
                                <div className="relative flex-shrink-0">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                                        className="relative z-10"
                                    >
                                        <div
                                            className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black"
                                            style={{ backgroundColor: step.color }}
                                        >
                                            <ArrowRight className="w-8 h-8 text-white" />
                                        </div>
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.5, 0, 0.5]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'easeInOut'
                                            }}
                                            className="absolute inset-0 rounded-full"
                                            style={{ backgroundColor: step.color }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Spacer */}
                                <div className="flex-1 hidden lg:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <p className="text-xl text-white/80 font-semibold">
                        This flow ensures ETH Safari becomes an always-on engine of innovation
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

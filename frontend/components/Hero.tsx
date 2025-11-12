'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ZebraScene from './ZebraScene';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 3}
                    />
                    <ZebraScene />
                </Canvas>
            </div>

            {/* Gradient Overlay - Enhanced for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 z-10" />

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-center py-20 pb-32">

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight drop-shadow-2xl"
                >
                    <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">ETH Safari</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] via-[#ff00ff] to-[#00d4ff] drop-shadow-[0_0_30px_rgba(255,0,255,0.5)]">
                        OS
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="backdrop-blur-sm bg-black/30 rounded-3xl p-6 sm:p-8 mb-8 max-w-4xl mx-auto border border-white/10"
                >
                    <p className="text-xl sm:text-2xl lg:text-3xl text-white mb-4 font-light">
                        The Living Network for Africa&apos;s Web3 Builders
                    </p>
                    <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
                        Transforming ETH Safari from an event into a sustainable, AI-powered,
                        and community-governed ecosystem that empowers African builders to create lasting Web3 impact.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a href="/app">
                        <button className="group relative px-8 py-4 bg-[#ff00ff] text-white font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#ff00ff]/50">
                            <span className="relative z-10 flex items-center gap-2">
                                Launch App
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-[#00d4ff] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </a>

                    <a href="#ecosystem">
                        <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
                            Learn More
                        </button>
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-12 mb-24 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm"
                >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-[#ff00ff] animate-pulse" />
                        <span className="text-white font-medium">Community-Governed</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
                        <span className="text-white font-medium">AI-Powered</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-[#ff00ff] animate-pulse" />
                        <span className="text-white font-medium">Always-On</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-3 px-6 py-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20">
                    <span className="text-white text-sm font-medium">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 rounded-full border-2 border-white/60 flex items-start justify-center p-2"
                    >
                        <div className="w-1.5 h-3 bg-gradient-to-b from-[#ff00ff] to-[#00d4ff] rounded-full" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

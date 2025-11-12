'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navItems = [
    { label: 'Mission', href: '#mission' },
    { label: 'Layers', href: '#layers' },
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Vision', href: '#vision' }
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-black/80 backdrop-blur-lg border-b border-white/10'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3"
                        >
                            <Logo className="w-10 h-10" />
                            <span className="text-2xl font-bold">
                                <span className="text-white">ETH Safari</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00d4ff]">
                                    {' '}OS
                                </span>
                            </span>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="text-white/70 hover:text-white transition-colors font-medium"
                                >
                                    {item.label}
                                </motion.a>
                            ))}

                            <a href="/app">
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4, duration: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-6 py-2 bg-[#ff00ff] text-white font-semibold rounded-full hover:bg-[#00d4ff] transition-colors"
                                >
                                    Launch App
                                </motion.button>
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    x: mobileMenuOpen ? 0 : '100%'
                }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-black md:hidden"
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl text-white/70 hover:text-white transition-colors font-medium"
                        >
                            {item.label}
                        </a>
                    ))}

                    <a href="/app">
                        <button className="px-8 py-3 bg-[#ff00ff] text-white font-semibold rounded-full">
                            Launch App
                        </button>
                    </a>
                </div>
            </motion.div>
        </>
    );
}

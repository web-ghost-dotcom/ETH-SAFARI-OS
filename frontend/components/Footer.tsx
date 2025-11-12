'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, MessageCircle, Mail } from 'lucide-react';
import Logo from './Logo';

const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: '#ff00ff' },
    { icon: Twitter, label: 'Twitter', href: '#', color: '#00d4ff' },
    { icon: MessageCircle, label: 'Discord', href: '#', color: '#ff00ff' },
    { icon: Mail, label: 'Email', href: '#', color: '#00d4ff' }
];

const footerLinks = [
    {
        title: 'Platform',
        links: ['Community Hub', 'SafariGuide AI', 'Impact Tracker', 'Funding DAO']
    },
    {
        title: 'Resources',
        links: ['Documentation', 'Tutorials', 'API Reference', 'GitHub']
    },
    {
        title: 'Community',
        links: ['Discord', 'Forum', 'Events', 'Blog']
    },
    {
        title: 'About',
        links: ['Mission', 'Team', 'Roadmap', 'Contact']
    }
];

export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Logo className="w-10 h-10" />
                            <h3 className="text-3xl font-bold">
                                <span className="text-white">ETH Safari</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00d4ff]">
                                    {' '}OS
                                </span>
                            </h3>
                        </div>
                        <p className="text-white/60 mb-6 max-w-md">
                            The Living Network for Africa&apos;s Web3 Builders. Building together, beyond the event.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="p-3 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all"
                                    style={{
                                        '--hover-color': social.color
                                    } as React.CSSProperties}
                                >
                                    <social.icon className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {footerLinks.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-white/60 hover:text-white transition-colors text-sm"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                    <p className="text-white/50 text-sm">
                        © 2025 ETH Safari OS. Built with ❤️ for Africa.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-white/50">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Code of Conduct</a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

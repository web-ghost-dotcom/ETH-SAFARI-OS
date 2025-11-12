'use client';

import { motion } from 'framer-motion';
import {
    User,
    Bell,
    Shield,
    Palette,
    Key,
    Github,
    Twitter,
    Linkedin,
    Save
} from 'lucide-react';
import { useState } from 'react';

const settingsSections = [
    {
        id: 'profile',
        title: 'Profile Settings',
        icon: User,
        color: '#ff00ff'
    },
    {
        id: 'notifications',
        title: 'Notifications',
        icon: Bell,
        color: '#00d4ff'
    },
    {
        id: 'privacy',
        title: 'Privacy & Security',
        icon: Shield,
        color: '#ff00ff'
    },
    {
        id: 'appearance',
        title: 'Appearance',
        icon: Palette,
        color: '#00d4ff'
    }
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('profile');
    const [formData, setFormData] = useState({
        displayName: 'Safari Builder',
        bio: 'Web3 developer passionate about building on Ethereum',
        email: 'builder@ethsafari.com',
        location: 'Nairobi, Kenya',
        website: 'https://myportfolio.com',
        github: 'safaribuilder',
        twitter: '@safaribuilder',
        linkedin: 'safaribuilder'
    });

    const [notifications, setNotifications] = useState({
        projectUpdates: true,
        teamInvites: true,
        fundingAlerts: true,
        mentorMessages: true,
        communityNews: false,
        weeklyDigest: true
    });

    const handleSave = () => {
        // Simulate save
        console.log('Saving settings...', formData, notifications);
    };

    const renderProfileSettings = () => (
        <div className="space-y-6">
            <div>
                <label className="text-white/60 text-sm font-medium mb-2 block">Display Name</label>
                <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                />
            </div>

            <div>
                <label className="text-white/60 text-sm font-medium mb-2 block">Bio</label>
                <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors resize-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-white/60 text-sm font-medium mb-2 block">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                    />
                </div>
                <div>
                    <label className="text-white/60 text-sm font-medium mb-2 block">Location</label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="text-white/60 text-sm font-medium mb-2 block">Website</label>
                <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                />
            </div>

            <div className="pt-4 border-t border-white/10">
                <h4 className="text-white font-semibold mb-4">Social Connections</h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-white/60" />
                        <input
                            type="text"
                            value={formData.github}
                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                            placeholder="GitHub username"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Twitter className="w-5 h-5 text-white/60" />
                        <input
                            type="text"
                            value={formData.twitter}
                            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                            placeholder="Twitter handle"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Linkedin className="w-5 h-5 text-white/60" />
                        <input
                            type="text"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            placeholder="LinkedIn username"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationSettings = () => (
        <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                        <h4 className="text-white font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-white/60 text-sm mt-1">
                            Get notified about {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                    </div>
                    <button
                        onClick={() => setNotifications({ ...notifications, [key]: !value })}
                        className={`relative w-14 h-8 rounded-full transition-colors ${value ? 'bg-gradient-to-r from-[#ff00ff] to-[#00d4ff]' : 'bg-white/10'
                            }`}
                    >
                        <motion.div
                            className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"
                            animate={{ x: value ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    </button>
                </div>
            ))}
        </div>
    );

    const renderPrivacySettings = () => (
        <div className="space-y-6">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start gap-4">
                    <Key className="w-6 h-6 text-[#ff00ff] mt-1" />
                    <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Wallet Address</h4>
                        <p className="text-white/60 text-sm mb-4">Your connected wallet address</p>
                        <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-white/80 border border-white/10">
                            0x742d...8f2A
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-[#00d4ff] mt-1" />
                    <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Soulbound NFT</h4>
                        <p className="text-white/60 text-sm mb-4">Your ETH Safari identity token</p>
                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#ff00ff] to-[#00d4ff] rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🦓</span>
                            </div>
                            <div>
                                <p className="text-white font-medium">Safari Builder #1234</p>
                                <p className="text-white/60 text-sm">Minted: Oct 15, 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                        <h4 className="text-white font-medium">Profile Visibility</h4>
                        <p className="text-white/60 text-sm">Who can see your profile</p>
                    </div>
                    <select className="bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff]/50">
                        <option>Everyone</option>
                        <option>Safari Members Only</option>
                        <option>Private</option>
                    </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                        <h4 className="text-white font-medium">Activity Status</h4>
                        <p className="text-white/60 text-sm">Show when you&apos;re active</p>
                    </div>
                    <select className="bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff]/50">
                        <option>Visible</option>
                        <option>Hidden</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderAppearanceSettings = () => (
        <div className="space-y-6">
            <div>
                <h4 className="text-white font-semibold mb-4">Theme</h4>
                <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 bg-white/5 border-2 border-[#ff00ff] rounded-xl hover:bg-white/10 transition-colors">
                        <div className="w-full h-20 bg-black rounded-lg mb-3"></div>
                        <p className="text-white font-medium">Dark</p>
                        <p className="text-white/60 text-xs">Current</p>
                    </button>
                    <button className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed">
                        <div className="w-full h-20 bg-white rounded-lg mb-3"></div>
                        <p className="text-white font-medium">Light</p>
                        <p className="text-white/60 text-xs">Coming Soon</p>
                    </button>
                    <button className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed">
                        <div className="w-full h-20 bg-gradient-to-br from-black via-[#ff00ff]/20 to-[#00d4ff]/20 rounded-lg mb-3"></div>
                        <p className="text-white font-medium">Auto</p>
                        <p className="text-white/60 text-xs">Coming Soon</p>
                    </button>
                </div>
            </div>

            <div>
                <h4 className="text-white font-semibold mb-4">Accent Color</h4>
                <div className="flex gap-3">
                    {['#ff00ff', '#00d4ff', '#00ff88', '#ffaa00', '#ff0066'].map((color) => (
                        <button
                            key={color}
                            className={`w-12 h-12 rounded-xl transition-transform hover:scale-110 ${color === '#ff00ff' ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''
                                }`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                    <h4 className="text-white font-medium">Animations</h4>
                    <p className="text-white/60 text-sm">Enable interface animations</p>
                </div>
                <button className="relative w-14 h-8 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#00d4ff]">
                    <motion.div
                        className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full"
                    />
                </button>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return renderProfileSettings();
            case 'notifications':
                return renderNotificationSettings();
            case 'privacy':
                return renderPrivacySettings();
            case 'appearance':
                return renderAppearanceSettings();
            default:
                return renderProfileSettings();
        }
    };

    return (
        <div className="min-h-screen py-6 md:py-12">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-white/60">Manage your account preferences and settings</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64 space-y-2">
                        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                            {settingsSections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeSection === section.id
                                            ? 'bg-white/10 text-white border border-white/20'
                                            : 'text-white/60 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: activeSection === section.id ? section.color : undefined }} />
                                        <span className="font-medium">{section.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 md:p-8"
                        >
                            {renderContent()}

                            {/* Save Button */}
                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-3 bg-gradient-to-r from-[#ff00ff] to-[#00d4ff] rounded-xl text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

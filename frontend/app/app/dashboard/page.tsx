'use client';

import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Coins,
    TrendingUp,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import Logo from '@/components/Logo';
import CommunityDashboard from '@/components/CommunityDashboard';
import BuilderNetwork from '@/components/BuilderNetwork';
import FundingGovernance from '@/components/FundingGovernance';
import ImpactTracker from '@/components/ImpactTracker';
import SettingsPage from '@/components/SettingsPage';
import SafariGuideWidget from '@/components/SafariGuideWidget';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    { label: 'Builders', icon: Users, id: 'builders' },
    { label: 'Funding', icon: Coins, id: 'funding' },
    { label: 'Impact', icon: TrendingUp, id: 'impact' }
];

export default function AppDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <CommunityDashboard />;
            case 'builders':
                return <BuilderNetwork />;
            case 'funding':
                return <FundingGovernance />;
            case 'impact':
                return <ImpactTracker />;
            case 'settings':
                return <SettingsPage />;
            default:
                return <CommunityDashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-black flex">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Logo className="w-8 h-8" />
                        <span className="text-xl font-bold text-white">ETH Safari OS</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 text-white"
                    >
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed lg:relative top-0 left-0 h-screen w-64 bg-black border-r border-white/10 z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="hidden lg:flex items-center gap-3 p-6 border-b border-white/10">
                        <Logo className="w-10 h-10" />
                        <div>
                            <div className="text-lg font-bold text-white">ETH Safari OS</div>
                            <div className="text-xs text-white/60">Builder Dashboard</div>
                        </div>
                    </div>

                    {/* Wallet Info */}
                    <div className="p-6 border-b border-white/10 mt-16 lg:mt-0">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-[#ff00ff]/20 to-[#00d4ff]/20 border border-white/10">
                            <div className="text-xs text-white/60 mb-1">Connected</div>
                            <div className="text-sm font-mono text-white font-semibold">
                                0x742d...4a9b
                            </div>
                            <div className="text-xs text-white/60 mt-2">
                                Reputation: <span className="text-[#ff00ff] font-semibold">950</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                                    ? 'bg-[#ff00ff]/20 text-white border border-[#ff00ff]/30'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-white/10 space-y-2">
                        <button
                            onClick={() => {
                                setActiveTab('settings');
                                setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings'
                                ? 'bg-[#ff00ff]/20 text-white border border-[#ff00ff]/30'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Settings className="w-5 h-5" />
                            <span className="font-medium">Settings</span>
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-red-500 hover:bg-red-500/10 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Disconnect</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 min-h-screen pt-16 lg:pt-0 overflow-y-auto">
                {renderContent()}
            </main>

            {/* Floating AI Assistant Widget */}
            <SafariGuideWidget />
        </div>
    );
}

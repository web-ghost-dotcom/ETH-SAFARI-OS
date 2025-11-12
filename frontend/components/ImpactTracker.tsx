'use client';

import { motion } from 'framer-motion';
import { TrendingUp, GitBranch, Users, Zap, ExternalLink } from 'lucide-react';

const projectMetrics = [
    {
        title: 'Projects Launched',
        value: '340',
        change: '+89%',
        trend: 'up',
        icon: GitBranch,
        color: '#ff00ff'
    },
    {
        title: 'On-Chain Deployments',
        value: '1,247',
        change: '+156%',
        trend: 'up',
        icon: Zap,
        color: '#00d4ff'
    },
    {
        title: 'Active Contributors',
        value: '2,500+',
        change: '+34%',
        trend: 'up',
        icon: Users,
        color: '#ff00ff'
    },
    {
        title: 'Total Interactions',
        value: '45.2K',
        change: '+203%',
        trend: 'up',
        icon: TrendingUp,
        color: '#00d4ff'
    }
];

const recentMilestones = [
    {
        project: 'AgriChain',
        milestone: 'Mainnet Launch',
        date: '2 days ago',
        impact: '500+ farmers onboarded',
        verified: true
    },
    {
        project: 'EduStream',
        milestone: 'Beta Testing Complete',
        date: '5 days ago',
        impact: '2,000+ students enrolled',
        verified: true
    },
    {
        project: 'HealthID',
        milestone: '10K Verified IDs',
        date: '1 week ago',
        impact: 'Deployed in 3 countries',
        verified: true
    },
    {
        project: 'PayFlow',
        milestone: 'Smart Contract Audit',
        date: '1 week ago',
        impact: 'Security certification received',
        verified: true
    }
];

const onChainActivity = [
    { chain: 'Ethereum', transactions: '12,456', color: '#627EEA' },
    { chain: 'Polygon', transactions: '8,923', color: '#8247E5' },
    { chain: 'Optimism', transactions: '5,671', color: '#FF0420' },
    { chain: 'Base', transactions: '4,234', color: '#0052FF' }
];

const communityGrowth = [
    { metric: 'New Members', value: '1,234', period: 'This Month' },
    { metric: 'Mentorship Sessions', value: '567', period: 'This Month' },
    { metric: 'Partnerships', value: '23', period: 'This Quarter' },
    { metric: 'Events Organized', value: '45', period: 'This Year' }
];

export default function ImpactTracker() {
    return (
        <section className="relative py-12 px-6 sm:px-12 lg:px-16 bg-black">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Impact Tracker
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Real-time visualization of ETH Safari ecosystem growth on-chain
                    </p>
                </motion.div>

                {/* Main Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {projectMetrics.map((metric, index) => (
                        <motion.div
                            key={metric.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="p-3 rounded-xl"
                                    style={{ backgroundColor: `${metric.color}20` }}
                                >
                                    <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                                </div>
                                <span
                                    className="text-sm font-semibold px-2 py-1 rounded-full"
                                    style={{
                                        backgroundColor: `${metric.color}20`,
                                        color: metric.color
                                    }}
                                >
                                    {metric.change}
                                </span>
                            </div>
                            <div className="text-sm text-white/60 mb-1">{metric.title}</div>
                            <div className="text-3xl font-bold text-white">{metric.value}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Recent Milestones */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-6">Recent Milestones</h3>
                            <div className="space-y-4">
                                {recentMilestones.map((milestone, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 rounded-xl border border-white/10 bg-black/40 hover:border-[#ff00ff]/30 transition-all group"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="text-white font-semibold">{milestone.project}</h4>
                                                <p className="text-sm text-[#ff00ff]">{milestone.milestone}</p>
                                            </div>
                                            {milestone.verified && (
                                                <div className="px-2 py-1 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] text-xs font-semibold">
                                                    Verified
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-white/60 mb-2">{milestone.impact}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/50">{milestone.date}</span>
                                            <button className="text-xs text-white/60 hover:text-[#ff00ff] transition-colors flex items-center gap-1">
                                                View Details <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* On-Chain Activity */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                            <h3 className="text-2xl font-bold text-white mb-6">On-Chain Activity</h3>
                            <div className="space-y-4">
                                {onChainActivity.map((chain, index) => (
                                    <motion.div
                                        key={chain.chain}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: chain.color }}
                                            />
                                            <span className="text-white font-medium">{chain.chain}</span>
                                        </div>
                                        <span className="text-white/60">{chain.transactions} tx</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-6">Community Growth</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {communityGrowth.map((item, index) => (
                                    <motion.div
                                        key={item.metric}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 rounded-xl border border-white/10 bg-black/40"
                                    >
                                        <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                                        <div className="text-sm text-white/60 mb-1">{item.metric}</div>
                                        <div className="text-xs text-white/50">{item.period}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Data Storage Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="p-6 rounded-2xl border border-[#ff00ff]/30 bg-gradient-to-br from-[#ff00ff]/10 to-[#00d4ff]/10"
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-[#ff00ff]/20">
                            <TrendingUp className="w-6 h-6 text-[#ff00ff]" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-2">Transparent & Verifiable</h4>
                            <p className="text-sm text-white/60">
                                All impact data is stored on IPFS/Ceramic for open, verifiable records.
                                Integrated with Lens and Farcaster for social reputation tracking.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

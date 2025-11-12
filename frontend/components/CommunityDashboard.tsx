'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, Award, Globe, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const stats = [
    {
        value: '2,500+',
        label: 'Active Builders',
        change: '+34%',
        icon: Users,
        color: '#ff00ff'
    },
    {
        value: '340',
        label: 'Projects Launched',
        change: '+89%',
        icon: TrendingUp,
        color: '#00d4ff'
    },
    {
        value: '1.2M',
        label: 'Community Contributions',
        change: '+156%',
        icon: Award,
        color: '#ff00ff'
    },
    {
        value: '15',
        label: 'African Countries',
        change: '+25%',
        icon: Globe,
        color: '#00d4ff'
    }
];

const recentProjects = [
    {
        name: 'AgriChain',
        category: 'DeFi',
        funding: '15,000 USDC',
        status: 'Active',
        progress: 85,
        team: 4,
        location: 'Kenya'
    },
    {
        name: 'EduStream',
        category: 'Education',
        funding: '12,500 USDC',
        status: 'Active',
        progress: 70,
        team: 3,
        location: 'Nigeria'
    },
    {
        name: 'HealthID',
        category: 'Identity',
        funding: '20,000 USDC',
        status: 'Completed',
        progress: 100,
        team: 5,
        location: 'South Africa'
    },
    {
        name: 'PayFlow',
        category: 'Payments',
        funding: '18,000 USDC',
        status: 'Active',
        progress: 60,
        team: 6,
        location: 'Ghana'
    }
];

const communityActivities = [
    {
        user: 'Amara Okafor',
        action: 'submitted',
        target: 'AgriChain',
        time: '2 hours ago',
        type: 'submission'
    },
    {
        user: 'Kwame Mensah',
        action: 'joined team',
        target: 'EduStream',
        time: '4 hours ago',
        type: 'team'
    },
    {
        user: 'Zara Ibrahim',
        action: 'completed milestone',
        target: 'HealthID Phase 2',
        time: '6 hours ago',
        type: 'milestone'
    },
    {
        user: 'Thierry Dubois',
        action: 'received funding',
        target: '10,000 USDC',
        time: '8 hours ago',
        type: 'funding'
    },
    {
        user: 'Nia Kamau',
        action: 'started mentoring',
        target: '3 new builders',
        time: '12 hours ago',
        type: 'mentorship'
    }
];

export default function CommunityDashboard() {
    const [selectedProject, setSelectedProject] = useState<typeof recentProjects[0] | null>(null);

    return (
        <section className="relative py-12 px-6 sm:px-12 lg:px-16 bg-black">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Dashboard
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Your ETH Safari overview and network insights
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="relative group"
                        >
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="p-3 rounded-xl"
                                        style={{ backgroundColor: `${stat.color}20` }}
                                    >
                                        <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                                    </div>
                                    <span
                                        className="text-sm font-semibold px-2 py-1 rounded-full"
                                        style={{
                                            backgroundColor: `${stat.color}20`,
                                            color: stat.color
                                        }}
                                    >
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/60">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Active Projects */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2"
                    >
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Active Projects
                            </h3>

                            <div className="space-y-4">
                                {recentProjects.map((project, index) => (
                                    <motion.div
                                        key={project.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setSelectedProject(project)}
                                        className="p-6 rounded-xl border border-white/10 bg-black/40 hover:border-white/20 transition-all group cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-lg font-bold text-white mb-1">
                                                    {project.name}
                                                </h4>
                                                <div className="flex items-center gap-3 text-sm text-white/60">
                                                    <span>{project.category}</span>
                                                    <span>•</span>
                                                    <span>{project.location}</span>
                                                    <span>•</span>
                                                    <span>{project.team} members</span>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Completed'
                                                ? 'bg-[#00d4ff]/20 text-[#00d4ff]'
                                                : 'bg-[#ff00ff]/20 text-[#ff00ff]'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </div>

                                        <div className="mb-3">
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="text-white/60">Progress</span>
                                                <span className="text-white font-semibold">{project.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${project.progress}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.3, duration: 1 }}
                                                    className="h-full rounded-full"
                                                    style={{
                                                        background: `linear-gradient(to right, #ff00ff, #00d4ff)`
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-white/60">Funding</span>
                                            <span className="text-sm font-semibold text-white">
                                                {project.funding}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Community Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Recent Activity
                            </h3>

                            <div className="space-y-4">
                                {communityActivities.map((activity, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0"
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                            style={{
                                                backgroundColor: index % 2 === 0 ? '#ff00ff' : '#00d4ff'
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white/90">
                                                <span className="font-semibold text-white">{activity.user}</span>
                                                {' '}<span className="text-white/60">{activity.action}</span>
                                                {' '}<span className="font-semibold text-white">{activity.target}</span>
                                            </p>
                                            <p className="text-xs text-white/50 mt-1">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <button className="w-full mt-6 px-4 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all text-sm font-medium">
                                View All Activity
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-2xl w-full mx-4 bg-black border border-white/20 rounded-2xl p-6 md:p-8"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                        {selectedProject.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <span>{selectedProject.category}</span>
                                        <span>•</span>
                                        <span>{selectedProject.location}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="text-white/60 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-white/80 mb-3">About the Project</h4>
                                    <p className="text-white/60 leading-relaxed">
                                        {selectedProject.category === 'DeFi' && 'A decentralized platform connecting farmers with transparent financial services and supply chain management on the blockchain.'}
                                        {selectedProject.category === 'Education' && 'An innovative learning platform providing accessible Web3 education to students across Africa through interactive courses and certifications.'}
                                        {selectedProject.category === 'Healthcare' && 'Building a secure, blockchain-based identity system for healthcare records, enabling patients to control their medical data.'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {selectedProject.progress}%
                                        </div>
                                        <div className="text-xs text-white/60">Progress</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-[#ff00ff] mb-1">
                                            {selectedProject.team}
                                        </div>
                                        <div className="text-xs text-white/60">Team Members</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-lg font-bold text-[#00d4ff] mb-1">
                                            {selectedProject.funding}
                                        </div>
                                        <div className="text-xs text-white/60">Funding</div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-white/80 mb-3">Key Milestones</h4>
                                    <div className="space-y-2">
                                        {['Smart Contract Development', 'MVP Launch', 'User Testing Phase', 'Public Beta'].map((milestone, idx) => (
                                            <div key={milestone} className="flex items-center gap-3 text-sm">
                                                <div className={`w-2 h-2 rounded-full ${idx < 2 ? 'bg-[#00d4ff]' : 'bg-white/20'}`} />
                                                <span className={idx < 2 ? 'text-white' : 'text-white/40'}>{milestone}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
                                    >
                                        Close
                                    </button>
                                    <button className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff00ff] to-[#00d4ff] text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                                        <ExternalLink className="w-5 h-5" />
                                        Visit Project
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

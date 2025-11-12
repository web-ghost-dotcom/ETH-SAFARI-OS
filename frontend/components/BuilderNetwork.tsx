'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, UserPlus, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

const builders = [
    {
        name: 'Amara Okafor',
        role: 'Full Stack Developer',
        location: 'Lagos, Nigeria',
        skills: ['Solidity', 'React', 'Node.js'],
        projects: 8,
        reputation: 950,
        available: true,
        avatar: 'AO'
    },
    {
        name: 'Kwame Mensah',
        role: 'Smart Contract Engineer',
        location: 'Accra, Ghana',
        skills: ['Solidity', 'Hardhat', 'Security'],
        projects: 12,
        reputation: 1240,
        available: false,
        avatar: 'KM'
    },
    {
        name: 'Zara Ibrahim',
        role: 'UI/UX Designer',
        location: 'Nairobi, Kenya',
        skills: ['Figma', 'React', 'Design Systems'],
        projects: 15,
        reputation: 1100,
        available: true,
        avatar: 'ZI'
    },
    {
        name: 'Thierry Dubois',
        role: 'Backend Developer',
        location: 'Kigali, Rwanda',
        skills: ['Python', 'GraphQL', 'IPFS'],
        projects: 6,
        reputation: 780,
        available: true,
        avatar: 'TD'
    },
    {
        name: 'Nia Kamau',
        role: 'Product Manager',
        location: 'Nairobi, Kenya',
        skills: ['Strategy', 'Web3', 'Community'],
        projects: 10,
        reputation: 890,
        available: false,
        avatar: 'NK'
    },
    {
        name: 'Ibrahim Diallo',
        role: 'Blockchain Architect',
        location: 'Dakar, Senegal',
        skills: ['Architecture', 'Solidity', 'DeFi'],
        projects: 20,
        reputation: 1560,
        available: true,
        avatar: 'ID'
    }
];

const mentors = [
    {
        name: 'Dr. Amaka Nwosu',
        expertise: 'DeFi Protocols',
        location: 'Lagos, Nigeria',
        experience: '8 years',
        mentees: 45,
        sessions: 120,
        rating: 4.9,
        avatar: 'AN'
    },
    {
        name: 'Kofi Asante',
        expertise: 'Smart Contract Security',
        location: 'Accra, Ghana',
        experience: '6 years',
        mentees: 38,
        sessions: 95,
        rating: 4.8,
        avatar: 'KA'
    },
    {
        name: 'Fatima Hassan',
        expertise: 'Product Strategy',
        location: 'Cairo, Egypt',
        experience: '10 years',
        mentees: 52,
        sessions: 140,
        rating: 5.0,
        avatar: 'FH'
    }
];

export default function BuilderNetwork() {
    const [selectedBuilder, setSelectedBuilder] = useState<typeof builders[0] | null>(null);
    const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);
    const [connections, setConnections] = useState<string[]>([]);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageRecipient, setMessageRecipient] = useState('');

    const handleConnect = (name: string) => {
        setConnections(prev => [...prev, name]);
        setSelectedBuilder(null);
        setSelectedMentor(null);
    };

    const handleSendMessage = (name: string) => {
        setMessageRecipient(name);
        setShowMessageModal(true);
        setSelectedBuilder(null);
        setSelectedMentor(null);
    };
    return (
        <section className="relative py-12 px-6 sm:px-12 lg:px-16 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Builder Network
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
                        Connect with talented builders and experienced mentors across Africa
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    placeholder="Search builders by name, skill, or location..."
                                    className="w-full pl-12 pr-4 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#ff00ff] focus:outline-none transition-colors"
                                />
                            </div>
                            <button className="p-4 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                                <Filter className="w-5 h-5 text-white/60" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Builders Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <h3 className="text-2xl font-bold text-white mb-8">
                        Active Builders
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {builders.map((builder, index) => (
                            <motion.div
                                key={builder.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all">
                                    {/* Avatar and Status */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff00ff] to-[#00d4ff] flex items-center justify-center text-white font-bold text-xl">
                                                {builder.avatar}
                                            </div>
                                            {builder.available && (
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00d4ff] rounded-full border-2 border-black" />
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-white mb-1">
                                                {builder.reputation}
                                            </div>
                                            <div className="text-xs text-white/60">
                                                Reputation
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <h4 className="text-lg font-bold text-white mb-1">
                                        {builder.name}
                                    </h4>
                                    <p className="text-sm text-white/60 mb-1">
                                        {builder.role}
                                    </p>
                                    <p className="text-xs text-white/50 mb-4">
                                        {builder.location}
                                    </p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {builder.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2 py-1 rounded-full bg-white/10 text-xs text-white/80"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <span className="text-sm text-white/60">
                                            {builder.projects} projects
                                        </span>
                                        {connections.includes(builder.name) ? (
                                            <button
                                                onClick={() => setSelectedBuilder(builder)}
                                                className="px-4 py-2 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] text-sm font-medium hover:bg-[#00d4ff]/30 transition-colors flex items-center gap-1"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                Message
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setSelectedBuilder(builder)}
                                                className="px-4 py-2 rounded-full bg-[#ff00ff]/20 text-[#ff00ff] text-sm font-medium hover:bg-[#ff00ff]/30 transition-colors flex items-center gap-1"
                                            >
                                                <UserPlus className="w-4 h-4" />
                                                Connect
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Mentors Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-2xl font-bold text-white mb-8">
                        Featured Mentors
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mentors.map((mentor, index) => (
                            <motion.div
                                key={mentor.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#00d4ff]/30 transition-all">
                                    {/* Avatar */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#ff00ff] flex items-center justify-center text-white font-bold text-xl">
                                            {mentor.avatar}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg font-bold text-[#00d4ff]">
                                                {mentor.rating}
                                            </span>
                                            <span className="text-sm text-white/60">/ 5</span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <h4 className="text-lg font-bold text-white mb-1">
                                        {mentor.name}
                                    </h4>
                                    <p className="text-sm text-[#00d4ff] mb-1">
                                        {mentor.expertise}
                                    </p>
                                    <p className="text-xs text-white/50 mb-4">
                                        {mentor.location} • {mentor.experience}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <div className="text-xl font-bold text-white">
                                                {mentor.mentees}
                                            </div>
                                            <div className="text-xs text-white/60">
                                                Mentees
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white">
                                                {mentor.sessions}
                                            </div>
                                            <div className="text-xs text-white/60">
                                                Sessions
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <button
                                        onClick={() => setSelectedMentor(mentor)}
                                        className="w-full px-4 py-2 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] text-sm font-medium hover:bg-[#00d4ff]/30 transition-colors"
                                    >
                                        Request Mentorship
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Builder/Mentor Detail Modal */}
            <AnimatePresence>
                {(selectedBuilder || selectedMentor) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
                        onClick={() => {
                            setSelectedBuilder(null);
                            setSelectedMentor(null);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-2xl w-full bg-black border border-white/20 rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
                        >
                            {selectedBuilder && (
                                <>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff00ff] to-[#00d4ff] flex items-center justify-center text-white font-bold text-2xl relative">
                                                {selectedBuilder.avatar}
                                                {selectedBuilder.available && (
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00d4ff] rounded-full border-2 border-black" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-1">
                                                    {selectedBuilder.name}
                                                </h3>
                                                <p className="text-white/60">{selectedBuilder.role}</p>
                                                <p className="text-sm text-white/50">{selectedBuilder.location}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedBuilder(null)}
                                            className="text-white/60 hover:text-white transition-colors"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-white/80 mb-2">Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedBuilder.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-3 py-1 rounded-full bg-white/10 text-sm text-white"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                                <div className="text-2xl font-bold text-white mb-1">
                                                    {selectedBuilder.projects}
                                                </div>
                                                <div className="text-sm text-white/60">Completed Projects</div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                                <div className="text-2xl font-bold text-[#ff00ff] mb-1">
                                                    {selectedBuilder.reputation}
                                                </div>
                                                <div className="text-sm text-white/60">Reputation Score</div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-white/80 mb-3">About</h4>
                                            <p className="text-white/60 leading-relaxed">
                                                Experienced {selectedBuilder.role.toLowerCase()} with a passion for building decentralized applications.
                                                Currently working on innovative Web3 solutions in the African ecosystem.
                                            </p>
                                        </div>

                                        {connections.includes(selectedBuilder.name) ? (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleSendMessage(selectedBuilder.name)}
                                                    className="flex-1 px-6 py-3 rounded-xl bg-[#00d4ff]/20 text-[#00d4ff] font-medium hover:bg-[#00d4ff]/30 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <MessageCircle className="w-5 h-5" />
                                                    Send Message
                                                </button>
                                                <button
                                                    onClick={() => setSelectedBuilder(null)}
                                                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white/60 font-medium hover:bg-white/10 transition-colors"
                                                >
                                                    View Projects
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleConnect(selectedBuilder.name)}
                                                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff00ff] to-[#00d4ff] text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                                >
                                                    <UserPlus className="w-5 h-5" />
                                                    Connect Now
                                                </button>
                                                <button
                                                    onClick={() => setSelectedBuilder(null)}
                                                    className="px-6 py-3 rounded-xl bg-white/5 text-white/60 font-medium hover:bg-white/10 transition-colors"
                                                >
                                                    View Projects
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {selectedMentor && (
                                <>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#ff00ff] flex items-center justify-center text-white font-bold text-2xl">
                                                {selectedMentor.avatar}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-1">
                                                    {selectedMentor.name}
                                                </h3>
                                                <p className="text-[#00d4ff] font-medium">{selectedMentor.expertise}</p>
                                                <p className="text-sm text-white/50">{selectedMentor.location}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedMentor(null)}
                                            className="text-white/60 hover:text-white transition-colors"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                                <div className="text-2xl font-bold text-white mb-1">
                                                    {selectedMentor.experience}
                                                </div>
                                                <div className="text-xs text-white/60">Experience</div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                                <div className="text-2xl font-bold text-white mb-1">
                                                    {selectedMentor.mentees}
                                                </div>
                                                <div className="text-xs text-white/60">Mentees</div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                                <div className="text-2xl font-bold text-[#00d4ff] mb-1">
                                                    {selectedMentor.rating}
                                                </div>
                                                <div className="text-xs text-white/60">Rating</div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-white/80 mb-3">About</h4>
                                            <p className="text-white/60 leading-relaxed mb-4">
                                                Seasoned Web3 professional specializing in {selectedMentor.expertise.toLowerCase()}.
                                                Passionate about nurturing the next generation of African blockchain developers through
                                                hands-on mentorship and practical guidance.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-white/80 mb-3">Mentorship Focus Areas</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {['Technical Skills', 'Career Growth', 'Project Strategy', 'Best Practices'].map((area) => (
                                                    <span
                                                        key={area}
                                                        className="px-3 py-1 rounded-full bg-[#00d4ff]/20 text-sm text-[#00d4ff]"
                                                    >
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleConnect(selectedMentor.name)}
                                            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#ff00ff] text-white font-semibold hover:scale-105 transition-transform"
                                        >
                                            Request Mentorship Session
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Message Modal */}
            <AnimatePresence>
                {showMessageModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowMessageModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-2xl w-full bg-black border border-white/20 rounded-2xl p-8"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Send Message</h3>
                                    <p className="text-white/60 text-sm mt-1">to {messageRecipient}</p>
                                </div>
                                <button
                                    onClick={() => setShowMessageModal(false)}
                                    className="text-white/60 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                setShowMessageModal(false);
                                // Add success feedback here
                            }} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="What would you like to discuss?"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        placeholder="Write your message..."
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00d4ff]/50 transition-colors resize-none"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowMessageModal(false)}
                                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#ff00ff] text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

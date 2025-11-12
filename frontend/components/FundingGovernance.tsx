'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock, Award, ThumbsUp, ThumbsDown, X, Check, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAquafier } from '@/lib/aquafier';
import VerificationBadge from './VerificationBadge';
import { useToast } from '@/hooks/useToast';

const activeProposals = [
    {
        id: 'PROP-001',
        title: 'Fund Regional Web3 Workshop Series',
        proposer: 'Amara Okafor',
        requestedAmount: '25,000 USDC',
        category: 'Education',
        votesFor: 1250,
        votesAgainst: 340,
        totalVotes: 1590,
        timeLeft: '5 days',
        status: 'Active',
        description: 'Organize monthly Web3 workshops across 5 African cities to onboard new developers into the ecosystem.',
        aquaTreeId: undefined as string | undefined,
        isSigned: false,
        signerCount: 0
    },
    {
        id: 'PROP-002',
        title: 'DeFi Security Audit Program',
        proposer: 'Kofi Asante',
        requestedAmount: '40,000 USDC',
        category: 'Security',
        votesFor: 980,
        votesAgainst: 120,
        totalVotes: 1100,
        timeLeft: '3 days',
        status: 'Active',
        description: 'Provide free security audits for early-stage DeFi projects built by ETH Safari alumni.',
        aquaTreeId: undefined as string | undefined,
        isSigned: false,
        signerCount: 0
    },
    {
        id: 'PROP-003',
        title: 'Open Source Toolkit Development',
        proposer: 'Zara Ibrahim',
        requestedAmount: '15,000 USDC',
        category: 'Infrastructure',
        votesFor: 1540,
        votesAgainst: 280,
        totalVotes: 1820,
        timeLeft: '7 days',
        status: 'Active',
        description: 'Build and maintain open-source tools specifically designed for African Web3 builders.',
        aquaTreeId: undefined as string | undefined,
        isSigned: false,
        signerCount: 0
    }
];

const fundedProjects = [
    {
        name: 'AgriChain',
        fundingRound: 'Round 1',
        amount: '30,000 USDC',
        date: 'Oct 2025',
        progress: 'Launched MVP',
        impact: '500+ farmers onboarded'
    },
    {
        name: 'EduStream',
        fundingRound: 'Round 2',
        amount: '45,000 USDC',
        date: 'Sep 2025',
        progress: 'Beta Testing',
        impact: '2,000+ students enrolled'
    },
    {
        name: 'HealthID',
        fundingRound: 'Round 1',
        amount: '50,000 USDC',
        date: 'Aug 2025',
        progress: 'Full Launch',
        impact: '10,000+ verified IDs'
    }
];

const treasuryStats = [
    { label: 'Total Treasury', value: '2.4M USDC', change: '+12%' },
    { label: 'Active Grants', value: '18', change: '+6' },
    { label: 'Total Funded', value: '1.2M USDC', change: '+34%' },
    { label: 'Community Members', value: '2,500+', change: '+156' }
];

export default function FundingGovernance() {
    const [proposals, setProposals] = useState(activeProposals);
    const [votingModal, setVotingModal] = useState<{ show: boolean; proposalId: string; type: 'for' | 'against' } | null>(null);
    const [votedProposals, setVotedProposals] = useState<Record<string, 'for' | 'against'>>({});
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [signingProposal, setSigningProposal] = useState<string | null>(null);
    const [verifyingProposal, setVerifyingProposal] = useState<string | null>(null);

    const { signProposal, verifyProposal, isAvailable } = useAquafier();
    const { addToast } = useToast();

    const handleSignProposal = async (proposalId: string) => {
        setSigningProposal(proposalId);
        const proposal = proposals.find(p => p.id === proposalId);
        if (!proposal) return;

        try {
            // Mock wallet address - in production, get from wallet connection
            const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

            const result = await signProposal(
                {
                    title: proposal.title,
                    description: proposal.description,
                    amount: proposal.requestedAmount,
                    category: proposal.category
                },
                walletAddress
            );

            if (result.success) {
                setProposals(prev => prev.map(p =>
                    p.id === proposalId
                        ? { ...p, aquaTreeId: result.aquaTreeId, isSigned: true, signerCount: 1 }
                        : p
                ));
                addToast('Proposal cryptographically signed!', 'success');
            } else {
                addToast(result.error || 'Failed to sign proposal', 'error');
            }
        } catch {
            addToast('An error occurred while signing', 'error');
        } finally {
            setSigningProposal(null);
        }
    };

    const handleVerifyProposal = async (proposalId: string) => {
        const proposal = proposals.find(p => p.id === proposalId);
        if (!proposal?.aquaTreeId) return;

        setVerifyingProposal(proposalId);
        try {
            const result = await verifyProposal(proposal.aquaTreeId);

            if (result.valid) {
                setProposals(prev => prev.map(p =>
                    p.id === proposalId
                        ? { ...p, signerCount: result.signers.length }
                        : p
                ));
                addToast(`Verified! Signed by ${result.signers.length} address(es)`, 'success');
            } else {
                addToast('Verification failed', 'error');
            }
        } catch {
            addToast('Verification error', 'error');
        } finally {
            setVerifyingProposal(null);
        }
    };

    const handleVote = (proposalId: string, voteType: 'for' | 'against') => {
        // Update the proposal votes
        setProposals(prev => prev.map(p => {
            if (p.id === proposalId) {
                return {
                    ...p,
                    votesFor: voteType === 'for' ? p.votesFor + 1 : p.votesFor,
                    votesAgainst: voteType === 'against' ? p.votesAgainst + 1 : p.votesAgainst,
                    totalVotes: p.totalVotes + 1
                };
            }
            return p;
        }));
        setVotedProposals(prev => ({ ...prev, [proposalId]: voteType }));
        setVotingModal(null);
    };
    return (
        <section className="relative py-12 px-6 sm:px-12 lg:px-16 bg-black">
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
                        Funding & Governance
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Community-driven funding and transparent decision making
                    </p>
                </motion.div>

                {/* Treasury Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {treasuryStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <span className="text-sm text-white/60">{stat.label}</span>
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#00d4ff]/20 text-[#00d4ff]">
                                    {stat.change}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-white">
                                {stat.value}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Active Proposals */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-white">
                            Active Proposals
                        </h3>
                        <button
                            onClick={() => setShowSubmitModal(true)}
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#00d4ff] text-white font-medium hover:scale-105 transition-transform"
                        >
                            Submit Proposal
                        </button>
                    </div>

                    <div className="space-y-6">
                        {proposals.map((proposal, index) => {
                            const hasVoted = votedProposals[proposal.id];
                            return (
                                <motion.div
                                    key={proposal.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                            {/* Left Content */}
                                            <div className="flex-1">
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                            <span className="text-sm font-mono text-white/50">
                                                                {proposal.id}
                                                            </span>
                                                            <span className="px-3 py-1 rounded-full bg-[#ff00ff]/20 text-[#ff00ff] text-xs font-semibold">
                                                                {proposal.category}
                                                            </span>
                                                            {proposal.isSigned && (
                                                                <VerificationBadge
                                                                    isVerified={true}
                                                                    signerCount={proposal.signerCount}
                                                                    showDetails={true}
                                                                    size="sm"
                                                                />
                                                            )}
                                                        </div>
                                                        <h4 className="text-xl font-bold text-white mb-2">
                                                            {proposal.title}
                                                        </h4>
                                                        <p className="text-sm text-white/60 mb-3">
                                                            {proposal.description}
                                                        </p>
                                                        <p className="text-sm text-white/50">
                                                            Proposed by <span className="text-white font-medium">{proposal.proposer}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Voting Progress */}
                                                <div className="mb-4">
                                                    <div className="flex items-center justify-between text-sm mb-2">
                                                        <span className="text-white/60">Voting Progress</span>
                                                        <span className="text-white font-semibold">
                                                            {proposal.totalVotes} votes
                                                        </span>
                                                    </div>
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full flex">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                                                                viewport={{ once: true }}
                                                                transition={{ delay: 0.3, duration: 1 }}
                                                                className="bg-[#00d4ff]"
                                                            />
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100}%` }}
                                                                viewport={{ once: true }}
                                                                transition={{ delay: 0.3, duration: 1 }}
                                                                className="bg-white/20"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="text-xs text-[#00d4ff]">
                                                            For: {proposal.votesFor}
                                                        </span>
                                                        <span className="text-xs text-white/40">
                                                            Against: {proposal.votesAgainst}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 text-sm">
                                                    <div className="flex items-center gap-2 text-white/60">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{proposal.timeLeft} left</span>
                                                    </div>
                                                    <div className="text-white font-semibold">
                                                        {proposal.requestedAmount}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Actions */}
                                            <div className="flex lg:flex-col gap-3">
                                                {/* Aquafier Sign/Verify Buttons */}
                                                {isAvailable && (
                                                    <div className="flex lg:flex-col gap-2 w-full">
                                                        {!proposal.isSigned ? (
                                                            <button
                                                                onClick={() => handleSignProposal(proposal.id)}
                                                                disabled={signingProposal === proposal.id}
                                                                className="flex-1 lg:flex-none px-4 py-2 rounded-full bg-[#ff00ff]/20 text-[#ff00ff] font-medium hover:bg-[#ff00ff]/30 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                                                            >
                                                                {signingProposal === proposal.id ? (
                                                                    <>Signing...</>
                                                                ) : (
                                                                    <>
                                                                        <Shield className="w-4 h-4" />
                                                                        Sign
                                                                    </>
                                                                )}
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleVerifyProposal(proposal.id)}
                                                                disabled={verifyingProposal === proposal.id}
                                                                className="flex-1 lg:flex-none px-4 py-2 rounded-full bg-white/5 text-white/80 font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                                                            >
                                                                {verifyingProposal === proposal.id ? (
                                                                    <>Verifying...</>
                                                                ) : (
                                                                    <>
                                                                        <Shield className="w-4 h-4" />
                                                                        Verify
                                                                    </>
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Voting Buttons */}
                                                {hasVoted ? (
                                                    <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                                                        <Check className="w-4 h-4 text-[#00d4ff]" />
                                                        <span className="text-white/80 text-sm">
                                                            Voted {hasVoted === 'for' ? 'For' : 'Against'}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => setVotingModal({ show: true, proposalId: proposal.id, type: 'for' })}
                                                            className="flex-1 lg:flex-none px-6 py-3 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] font-medium hover:bg-[#00d4ff]/30 transition-colors flex items-center justify-center gap-2"
                                                        >
                                                            <ThumbsUp className="w-4 h-4" />
                                                            Vote For
                                                        </button>
                                                        <button
                                                            onClick={() => setVotingModal({ show: true, proposalId: proposal.id, type: 'against' })}
                                                            className="flex-1 lg:flex-none px-6 py-3 rounded-full bg-white/5 text-white/60 font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                                        >
                                                            <ThumbsDown className="w-4 h-4" />
                                                            Vote Against
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Funded Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-2xl font-bold text-white mb-8">
                        Recently Funded Projects
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {fundedProjects.map((project, index) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#ff00ff]/30 transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">
                                                {project.name}
                                            </h4>
                                            <p className="text-sm text-white/60">
                                                {project.fundingRound}
                                            </p>
                                        </div>
                                        <Award className="w-6 h-6 text-[#ff00ff]" />
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-white/60">Amount</span>
                                            <span className="text-sm font-semibold text-white">
                                                {project.amount}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-white/60">Date</span>
                                            <span className="text-sm text-white/80">
                                                {project.date}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/10 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/60">Progress</span>
                                            <span className="text-xs font-semibold text-[#00d4ff]">
                                                {project.progress}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/60">Impact</span>
                                            <span className="text-xs font-semibold text-white">
                                                {project.impact}
                                            </span>
                                        </div>
                                    </div>

                                    <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium group">
                                        <span>View Details</span>
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Voting Confirmation Modal */}
            <AnimatePresence>
                {votingModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
                        onClick={() => setVotingModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-md w-full mx-4 bg-black border border-white/20 rounded-2xl p-6 md:p-8"
                        >
                            <div className="text-center mb-6">
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${votingModal.type === 'for' ? 'bg-[#00d4ff]/20' : 'bg-red-500/20'
                                    }`}>
                                    {votingModal.type === 'for' ? (
                                        <ThumbsUp className="w-8 h-8 text-[#00d4ff]" />
                                    ) : (
                                        <ThumbsDown className="w-8 h-8 text-red-500" />
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Confirm Your Vote
                                </h3>
                                <p className="text-white/60">
                                    You&apos;re about to vote <span className="font-semibold text-white">
                                        {votingModal.type === 'for' ? 'FOR' : 'AGAINST'}
                                    </span> this proposal
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setVotingModal(null)}
                                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleVote(votingModal.proposalId, votingModal.type)}
                                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${votingModal.type === 'for'
                                        ? 'bg-gradient-to-r from-[#00d4ff] to-[#ff00ff] text-white'
                                        : 'bg-red-500 text-white'
                                        }`}
                                >
                                    Confirm Vote
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Proposal Modal */}
            <AnimatePresence>
                {showSubmitModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
                        onClick={() => setShowSubmitModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-2xl w-full mx-4 bg-black border border-white/20 rounded-2xl p-6 md:p-8 my-8"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white">Submit New Proposal</h3>
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className="text-white/60 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => {
                                e.preventDefault();
                                setShowSubmitModal(false);
                                // Add success toast here
                            }}>
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Proposal Title
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter a clear, descriptive title"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Category
                                    </label>
                                    <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors">
                                        <option value="education">Education</option>
                                        <option value="infrastructure">Infrastructure</option>
                                        <option value="security">Security</option>
                                        <option value="research">Research</option>
                                        <option value="community">Community</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Requested Amount (USDC)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        placeholder="25000"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Provide detailed information about your proposal..."
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00d4ff]/50 transition-colors resize-none"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowSubmitModal(false)}
                                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff00ff] to-[#00d4ff] text-white font-semibold hover:scale-105 transition-transform"
                                    >
                                        Submit Proposal
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

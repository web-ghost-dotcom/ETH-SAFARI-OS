'use client';

import { CheckCircle2, Shield, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface VerificationBadgeProps {
    isVerified?: boolean;
    isLoading?: boolean;
    signerCount?: number;
    timestamp?: Date;
    size?: 'sm' | 'md' | 'lg';
    showDetails?: boolean;
}

export default function VerificationBadge({
    isVerified = false,
    isLoading = false,
    signerCount = 0,
    timestamp,
    size = 'md',
    showDetails = false
}: VerificationBadgeProps) {
    const sizeClasses = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5',
        lg: 'text-base px-4 py-2'
    };

    const iconSize = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    };

    if (isLoading) {
        return (
            <div className={`inline-flex items-center gap-1.5 rounded-full bg-gray-100 text-gray-600 ${sizeClasses[size]}`}>
                <Loader2 className={`${iconSize[size]} animate-spin`} />
                <span>Verifying...</span>
            </div>
        );
    }

    if (!isVerified) {
        return (
            <div className={`inline-flex items-center gap-1.5 rounded-full bg-gray-100 text-gray-500 ${sizeClasses[size]}`}>
                <Shield className={iconSize[size]} />
                <span>Unverified</span>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff00ff]/10 to-[#00d4ff]/10 border border-[#ff00ff]/20 text-[#ff00ff] ${sizeClasses[size]}`}
        >
            <CheckCircle2 className={iconSize[size]} />
            <span className="font-medium">Cryptographically Signed</span>
            {showDetails && signerCount > 0 && (
                <span className="text-xs opacity-80">
                    ({signerCount} {signerCount === 1 ? 'signer' : 'signers'})
                </span>
            )}
            {showDetails && timestamp && (
                <span className="text-xs opacity-70">
                    • {new Date(timestamp).toLocaleDateString()}
                </span>
            )}
        </motion.div>
    );
}

// Compact version for list items
export function VerificationIcon({ isVerified }: { isVerified: boolean }) {
    if (!isVerified) return null;

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
            <CheckCircle2 className="h-5 w-5 text-[#ff00ff]" />
        </motion.div>
    );
}

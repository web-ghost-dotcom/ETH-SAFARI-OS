// Aquafier SDK Integration for ETH Safari OS
// REST API client (works without installing aqua-js-sdk package)

const DEMO_MODE = process.env.NEXT_PUBLIC_AQUAFIER_DEMO_MODE === 'true';

export interface ProposalSignatureResult {
    success: boolean;
    aquaTreeId?: string;
    genesisHash?: string;
    error?: string;
}

export interface VerificationResult {
    valid: boolean;
    signers: string[];
    timestamp?: Date;
    error?: string;
}

export interface AquaTreeMetadata {
    type: string;
    [key: string]: string | number | boolean | null | undefined;
}

export class AquafierService {
    private backendUrl: string;

    constructor(backendUrl: string = process.env.NEXT_PUBLIC_AQUAFIER_API || 'http://localhost:3001') {
        this.backendUrl = backendUrl;
    }

    /**
     * Sign a funding proposal document
     */
    async signProposal(
        proposalData: {
            title: string;
            description: string;
            amount: string;
            category: string;
        },
        walletAddress: string
    ): Promise<ProposalSignatureResult> {
        // Demo mode - mock successful signing
        if (DEMO_MODE) {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
            return {
                success: true,
                aquaTreeId: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                genesisHash: `0x${Math.random().toString(16).substr(2, 64)}`
            };
        }

        try {
            // Convert proposal to JSON
            const proposalJson = JSON.stringify(proposalData, null, 2);
            const blob = new Blob([proposalJson], { type: 'application/json' });

            const formData = new FormData();
            formData.append('file', blob, `proposal-${Date.now()}.json`);
            formData.append('title', `Proposal: ${proposalData.title}`);
            formData.append('metadata', JSON.stringify({
                type: 'funding_proposal',
                category: proposalData.category,
                requestedAmount: proposalData.amount,
                submittedAt: new Date().toISOString(),
                submitter: walletAddress
            }));

            const response = await fetch(`${this.backendUrl}/api/files/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload proposal');
            }

            const result = await response.json();

            return {
                success: true,
                aquaTreeId: result.id,
                genesisHash: result.genesisHash
            };
        } catch (error) {
            console.error('Error signing proposal:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Verify a signed proposal
     */
    async verifyProposal(aquaTreeId: string): Promise<VerificationResult> {
        // Demo mode - mock successful verification
        if (DEMO_MODE) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
            const mockSigners = [
                '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
                '0x1234567890123456789012345678901234567890',
                '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
            ];
            const signerCount = Math.floor(Math.random() * 3) + 1; // 1-3 signers
            return {
                valid: true,
                signers: mockSigners.slice(0, signerCount),
                timestamp: new Date()
            };
        }

        try {
            const response = await fetch(`${this.backendUrl}/api/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ aquaTreeId })
            });

            if (!response.ok) {
                throw new Error('Failed to verify proposal');
            }

            const result = await response.json();

            return {
                valid: result.valid,
                signers: result.signers || [],
                timestamp: result.timestamp ? new Date(result.timestamp) : undefined
            };
        } catch (error) {
            console.error('Error verifying proposal:', error);
            return {
                valid: false,
                signers: [],
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Download proposal document
     */
    async downloadProposal(aquaTreeId: string): Promise<Record<string, unknown> | null> {
        try {
            const response = await fetch(`${this.backendUrl}/api/files/${aquaTreeId}`);

            if (!response.ok) {
                throw new Error('Failed to download proposal');
            }

            return await response.json() as Record<string, unknown>;
        } catch (error) {
            console.error('Error downloading proposal:', error);
            return null;
        }
    }

    /**
     * Sign builder credentials/certificates
     */
    async signCredential(
        builderAddress: string,
        credentialData: {
            type: 'project_completion' | 'mentorship' | 'skill_verification';
            title: string;
            description: string;
            metadata?: Record<string, string | number | boolean>;
        },
        issuerAddress: string
    ): Promise<ProposalSignatureResult> {
        // Demo mode - mock successful credential signing
        if (DEMO_MODE) {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
            return {
                success: true,
                aquaTreeId: `cred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                genesisHash: `0x${Math.random().toString(16).substr(2, 64)}`
            };
        }

        try {
            const credentialJson = JSON.stringify({
                ...credentialData,
                builderAddress,
                issuedAt: new Date().toISOString(),
                issuer: issuerAddress
            }, null, 2);

            const blob = new Blob([credentialJson], { type: 'application/json' });
            const formData = new FormData();
            formData.append('file', blob, `credential-${builderAddress}-${Date.now()}.json`);
            formData.append('title', `Credential: ${credentialData.title}`);
            formData.append('metadata', JSON.stringify({
                type: 'builder_credential',
                credentialType: credentialData.type,
                recipient: builderAddress,
                issuer: issuerAddress
            }));

            const response = await fetch(`${this.backendUrl}/api/files/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to sign credential');
            }

            const result = await response.json();

            return {
                success: true,
                aquaTreeId: result.id,
                genesisHash: result.genesisHash
            };
        } catch (error) {
            console.error('Error signing credential:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Get all signed documents for a wallet address
     */
    async getUserDocuments(walletAddress: string): Promise<Record<string, unknown>[]> {
        try {
            const response = await fetch(
                `${this.backendUrl}/api/files/user/${walletAddress}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch user documents');
            }

            return await response.json() as Record<string, unknown>[];
        } catch (error) {
            console.error('Error fetching user documents:', error);
            return [];
        }
    }

    /**
     * Check if Aquafier backend is available
     */
    async healthCheck(): Promise<boolean> {
        // In demo mode, always return true
        if (DEMO_MODE) {
            return true;
        }

        try {
            const response = await fetch(`${this.backendUrl}/health`);
            return response.ok;
        } catch (error) {
            console.error('Aquafier backend health check failed:', error);
            return false;
        }
    }
}

// Singleton instance
let aquafierInstance: AquafierService | null = null;

export function getAquafierService(): AquafierService {
    if (!aquafierInstance) {
        aquafierInstance = new AquafierService();
    }
    return aquafierInstance;
}

// Hook for React components
import { useState, useEffect } from 'react';

export function useAquafier() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [service] = useState(() => getAquafierService());

    useEffect(() => {
        service.healthCheck().then(setIsAvailable);
    }, [service]);

    return {
        service,
        isAvailable,
        signProposal: service.signProposal.bind(service),
        verifyProposal: service.verifyProposal.bind(service),
        signCredential: service.signCredential.bind(service),
        getUserDocuments: service.getUserDocuments.bind(service)
    };
}

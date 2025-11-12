# Aquafier-JS SDK Integration Guide for ETH Safari OS

## 📋 Overview

Aquafier-JS is a reference implementation of the Aqua Protocol for digital content signing, provenance verification, and integrity validation. This guide shows how to integrate it into the ETH Safari OS platform.

---

## 🎯 What is Aquafier-JS?

**Aquafier-JS enables:**
- ✅ Digital document signing & verification
- ✅ Content provenance tracking (who created, who modified)
- ✅ Cryptographic integrity validation
- ✅ Decentralized claims & attestations
- ✅ Multi-signature workflows
- ✅ Identity verification (wallet address, email, domain claims)

**Perfect for ETH Safari OS use cases:**
- Builder project documentation & verification
- Funding proposal submissions with cryptographic proof
- Mentor credentials & attestations
- Soulbound NFT metadata verification
- DAO governance document signing
- Team collaboration with verified contributions

---

## 🏗️ Architecture

### Components:
1. **API (Backend)** - Fastify + Prisma + PostgreSQL
2. **Web (Frontend)** - React + TypeScript + Vite
3. **SDK** - `aqua-js-sdk` npm package (v3.2.1-44)

### Directory Structure:
```
aquafier-js/
├── api/           # Backend API (Fastify server)
├── web/           # Frontend (React/Vite)
├── deployment/    # Docker compose files
├── e2e/           # Playwright tests
└── bruno/         # API collection
```

---

## 🚀 Installation Methods

### Method 1: Use as a Microservice (Recommended)

Run Aquafier-JS as a separate service alongside your ETH Safari OS frontend:

#### Step 1: Setup Environment
```bash
cd /Users/mac/Desktop/CODE/ETH-SAFARI-OS/aquafier-js/deployment
cp .env.sample .env
```

#### Step 2: Configure .env
```bash
# Database
DB_USER=aqua_user
DB_PASSWORD=your_secure_password
DB_NAME=aquafier_db

# Backend URL (API)
BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:5173

# Server Wallet (for claims)
SERVER_MNEMONIC="your twelve word mnemonic phrase here"

# CORS
ALLOWED_CORS=http://localhost:3000,http://localhost:5173

# Optional: S3 Storage
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_REGION=
# AWS_BUCKET=
```

#### Step 3: Run with Docker
```bash
# From aquafier-js directory
docker compose -f deployment/docker-compose-local.yml up -d

# Check logs
docker compose -f deployment/docker-compose-local.yml logs -f

# Services will be available at:
# - API: http://localhost:3001
# - Frontend: http://localhost:5173
```

---

### Method 2: Install SDK in Your Next.js App

Install the Aquafier SDK directly in your ETH Safari OS frontend:

#### Step 1: Install Package
```bash
cd /Users/mac/Desktop/CODE/ETH-SAFARI-OS/frontend
npm install aqua-js-sdk@3.2.1-44 ethers@6.15.0
```

#### Step 2: Install Required Dependencies
```bash
npm install axios jszip pdf-lib
```

---

## 💻 Usage Examples

### Example 1: Sign a Funding Proposal

```typescript
// frontend/lib/aquafier.ts
import Aquafier, { AquaTree, FileObject } from 'aqua-js-sdk/web';
import { ethers } from 'ethers';

export class AquafierService {
  private aquafier: Aquafier;
  
  constructor(backendUrl: string = 'http://localhost:3001') {
    this.aquafier = new Aquafier(backendUrl);
  }

  async signProposal(
    proposalFile: File,
    walletAddress: string,
    privateKey: string
  ) {
    try {
      // 1. Convert file to FileObject
      const fileObject: FileObject = {
        name: proposalFile.name,
        data: await proposalFile.arrayBuffer(),
        type: proposalFile.type
      };

      // 2. Create AquaTree (digital signature chain)
      const aquaTree = await this.aquafier.createAquaTree(
        fileObject,
        'Funding Proposal',
        { author: walletAddress }
      );

      // 3. Sign with wallet
      const signer = new ethers.Wallet(privateKey);
      const signedTree = await this.aquafier.signAquaTree(
        aquaTree,
        signer
      );

      // 4. Upload to backend
      const result = await this.aquafier.uploadAquaTree(signedTree);
      
      return {
        success: true,
        aquaTreeId: result.id,
        hash: result.genesisHash
      };
    } catch (error) {
      console.error('Error signing proposal:', error);
      throw error;
    }
  }

  async verifyProposal(aquaTreeId: string) {
    try {
      // Download and verify the signature chain
      const aquaTree = await this.aquafier.downloadAquaTree(aquaTreeId);
      const isValid = await this.aquafier.verifyAquaTree(aquaTree);
      
      return {
        valid: isValid,
        signers: aquaTree.revisions.map(r => r.signature.address),
        timestamp: aquaTree.genesisTime
      };
    } catch (error) {
      console.error('Error verifying proposal:', error);
      throw error;
    }
  }
}
```

### Example 2: Add to Funding Proposal Component

```typescript
// frontend/components/FundingGovernance.tsx
import { AquafierService } from '@/lib/aquafier';
import { useState } from 'react';

export default function FundingGovernance() {
  const [aquafier] = useState(() => new AquafierService());

  const handleSubmitProposal = async (formData: FormData) => {
    try {
      const file = formData.get('proposal') as File;
      const walletAddress = '0x...'; // From wallet connection
      const privateKey = 'xxx'; // From user's wallet
      
      // Sign the proposal with Aquafier
      const result = await aquafier.signProposal(
        file,
        walletAddress,
        privateKey
      );
      
      // Store aquaTreeId with proposal in your database
      await saveProposal({
        title: formData.get('title'),
        aquaTreeId: result.aquaTreeId,
        genesisHash: result.hash,
        submitter: walletAddress
      });
      
      toast.success('Proposal submitted and cryptographically signed!');
    } catch (error) {
      toast.error('Failed to sign proposal');
    }
  };

  return (
    // Your component JSX
  );
}
```

### Example 3: Verify Builder Credentials

```typescript
// frontend/lib/builderCredentials.ts
import { AquafierService } from '@/lib/aquafier';

export async function verifyBuilderCredentials(
  builderId: string,
  credentialId: string
) {
  const aquafier = new AquafierService();
  
  try {
    const verification = await aquafier.verifyProposal(credentialId);
    
    return {
      isVerified: verification.valid,
      attestors: verification.signers,
      verifiedAt: verification.timestamp,
      builderAddress: verification.signers[0] // Original creator
    };
  } catch (error) {
    return { isVerified: false, error: error.message };
  }
}
```

### Example 4: Team Collaboration Document

```typescript
// Multiple team members can sign the same document
export async function addTeamMemberSignature(
  aquaTreeId: string,
  memberWallet: string,
  privateKey: string
) {
  const aquafier = new AquafierService();
  
  // Download existing tree
  const existingTree = await aquafier.downloadAquaTree(aquaTreeId);
  
  // Add new signature
  const signer = new ethers.Wallet(privateKey);
  const updatedTree = await aquafier.addRevision(
    existingTree,
    signer,
    { role: 'Team Member', action: 'Co-signed' }
  );
  
  // Upload updated tree
  await aquafier.uploadAquaTree(updatedTree);
  
  return {
    totalSigners: updatedTree.revisions.length,
    latestSigner: memberWallet
  };
}
```

---

## 🔗 Integration Points in ETH Safari OS

### 1. **Funding Proposals** (High Priority)
- Sign proposals before submission
- Verify proposal authenticity
- Track proposal modifications
- Multi-sig DAO approvals

**Files to modify:**
- `frontend/components/FundingGovernance.tsx`
- Create `frontend/lib/aquafier.ts`
- Update proposal submission form

### 2. **Builder Profiles & Credentials**
- Verify GitHub/LinkedIn profiles
- Sign project completion certificates
- Mentor attestations
- Reputation proofs

**Files to modify:**
- `frontend/components/BuilderNetwork.tsx`
- `frontend/components/SettingsPage.tsx`

### 3. **Soulbound NFT Metadata**
- Sign NFT metadata
- Verify builder achievements
- Track contribution history

**Integration:**
- Add Aquafier signing to NFT minting flow
- Store aquaTreeId in NFT metadata

### 4. **Project Documentation**
- Version control for project docs
- Multi-party agreements
- Milestone verification

---

## 🌐 API Endpoints (if using microservice)

```typescript
// Example API client
const AQUAFIER_API = 'http://localhost:3001';

// Upload file
POST /api/files/upload
Content-Type: multipart/form-data

// Download AquaTree
GET /api/files/{aquaTreeId}

// Verify signature
POST /api/verify
Body: { aquaTreeId: string }

// Create claim
POST /api/claims/create
Body: { type: 'wallet' | 'email' | 'domain', ... }

// List user's files
GET /api/files/user/{walletAddress}
```

---

## 📦 Environment Setup

### For Development

```bash
# .env.local (ETH Safari OS Frontend)
NEXT_PUBLIC_AQUAFIER_API=http://localhost:3001
NEXT_PUBLIC_AQUAFIER_ENABLED=true

# .env (Aquafier Backend)
DATABASE_URL=postgresql://user:pass@localhost:5432/aquafier
SERVER_MNEMONIC="twelve word phrase..."
BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

### For Production

```bash
# Use separate domains
NEXT_PUBLIC_AQUAFIER_API=https://aqua-api.ethsafari.com
BACKEND_URL=https://aqua-api.ethsafari.com
FRONTEND_URL=https://app.ethsafari.com
```

---

## 🔐 Security Considerations

1. **Private Keys**: Never expose private keys in frontend
   - Use Web3 wallet signing (MetaMask)
   - Or secure key management service

2. **CORS**: Configure properly
   ```typescript
   ALLOWED_CORS=https://app.ethsafari.com,https://ethsafari.com
   ```

3. **Rate Limiting**: Backend has built-in rate limiting
   
4. **File Size**: Default limits apply (check backend config)

---

## 🧪 Testing

```bash
# Run Aquafier E2E tests
cd aquafier-js/e2e
npm install
npm run test

# Run API tests
cd aquafier-js/api
npm test
```

---

## 📊 Database Schema

Aquafier uses Prisma with PostgreSQL. Key tables:
- `files` - Stored AquaTrees
- `revisions` - Signature chain
- `claims` - Identity attestations
- `users` - User accounts

---

## 🎨 UI Components (Optional)

If you want to use Aquafier's UI components:

```typescript
// Copy components from aquafier-js/web/src/components
import { AquaTreeViewer } from '@/components/aqua/AquaTreeViewer';
import { SignatureCanvas } from '@/components/aqua/SignatureCanvas';
import { VerificationBadge } from '@/components/aqua/VerificationBadge';
```

---

## 🚦 Quick Start Checklist

- [ ] Run Aquafier backend with Docker
- [ ] Install `aqua-js-sdk` in frontend
- [ ] Create `AquafierService` wrapper
- [ ] Add to funding proposal flow
- [ ] Test document signing
- [ ] Implement verification UI
- [ ] Add to builder profiles
- [ ] Configure production environment

---

## 📚 Additional Resources

- **Aqua Protocol Docs**: [https://aqua-protocol.org](https://aqua-protocol.org)
- **GitHub Repo**: [https://github.com/inblockio/aquafier-js](https://github.com/inblockio/aquafier-js)
- **SDK Reference**: Check `node_modules/aqua-js-sdk/` after install
- **API Endpoints**: See `aquafier-js/bruno/` for full API collection

---

## 🤝 Support

For integration issues:
1. Check Aquafier-JS GitHub issues
2. Review e2e tests for usage examples
3. Examine web/src/pages for React patterns
4. Check API logs: `docker compose logs api`

---

## 💡 Next Steps

1. **Phase 1**: Run Aquafier locally, test signing
2. **Phase 2**: Integrate with funding proposals
3. **Phase 3**: Add builder credential verification
4. **Phase 4**: Implement for DAO governance
5. **Phase 5**: Production deployment

---

This integration will add **cryptographic proof and provenance** to all critical actions in ETH Safari OS, making it a truly verifiable and trustworthy platform! 🚀

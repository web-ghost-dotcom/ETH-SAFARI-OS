This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ETH Safari OS Frontend

A blockchain ecosystem platform featuring:
- Builder Network with credential verification
- Project showcase and collaboration
- DAO Governance with on-chain voting
- AI-powered SafariGuide assistant (Gemini API)
- Aquafier cryptographic signing integration

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
# Aquafier Demo Mode
NEXT_PUBLIC_AQUAFIER_DEMO_MODE=true

# Gemini API for SafariGuide AI (optional but recommended)
GEMINI_API_KEY=your-gemini-api-key-here
```

**Get a free Gemini API key:** https://makersuite.google.com/app/apikey

See [SAFARI_GUIDE_AI_SETUP.md](./SAFARI_GUIDE_AI_SETUP.md) for detailed AI setup instructions.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### SafariGuide AI Assistant
- **Powered by Google Gemini**: Advanced AI trained on ETH Safari ecosystem
- **ETH Safari Focused**: Only answers blockchain and platform-related questions
- **Real-time Chat**: Interactive conversation with context awareness
- **Team Matching**: Get personalized builder and mentor recommendations
- **Resource Discovery**: Find tutorials, docs, and learning materials

### Aquafier Integration
- **Cryptographic Signing**: Sign proposals and credentials on-chain
- **Verification System**: Verify signed documents with blockchain proof
- **Demo Mode**: Test functionality without backend deployment

## Project Structure

```
frontend/
├── app/                    # Next.js app router
│   ├── api/chat/          # Gemini AI API route
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── SafariGuideAI.tsx # AI chat interface
│   ├── BuilderNetwork.tsx # Builder profiles
│   ├── FundingGovernance.tsx # DAO governance
│   └── ...
├── lib/                   # Utilities
│   └── aquafier.ts       # Aquafier SDK integration
└── public/               # Static assets
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

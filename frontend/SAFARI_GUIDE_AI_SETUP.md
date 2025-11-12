# SafariGuide AI Setup

SafariGuide is an AI assistant powered by Google's Gemini API, specifically trained to help with ETH Safari OS and blockchain development.

## Features

The AI can help you with:
- **Team Recommendations**: Find builders and mentors with complementary skills
- **Idea Brainstorming**: Refine your Web3 project concepts
- **Resource Access**: Discover Solidity tutorials, smart contract docs, and learning materials
- **Submission Helper**: Auto-complete hackathon and funding proposals
- **Platform Navigation**: Learn about ETH Safari OS features and capabilities

## Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variable

Add your API key to `/frontend/.env.local`:

```bash
GEMINI_API_KEY=your-actual-api-key-here
```

### 3. Restart Development Server

```bash
cd frontend
npm run dev
```

### 4. Test the AI

1. Navigate to the homepage (http://localhost:3000)
2. Scroll down to the "SafariGuide AI" section
3. Try asking questions like:
   - "How can I find a mentor for my DeFi project?"
   - "What resources are available for learning Solidity?"
   - "Help me form a team for a hackathon"
   - "What are the funding opportunities on ETH Safari?"

## AI Behavior

SafariGuide is constrained to only answer questions about:
- ETH Safari OS platform features
- Blockchain development and Web3 technologies
- DAO governance and decentralized systems
- Team formation and collaboration
- Smart contract development (Solidity, Ethereum)
- Hackathons and blockchain competitions

If you ask about unrelated topics, it will politely redirect you back to ETH Safari-related questions.

## API Limits

The free Gemini API tier includes:
- 60 requests per minute
- 1,500 requests per day

For production use, consider upgrading to a paid plan.

## Troubleshooting

### "Gemini API key not configured" error
- Make sure you added `GEMINI_API_KEY` to `.env.local`
- Restart your development server after adding the key

### No response from AI
- Check your API key is valid
- Verify you haven't exceeded rate limits
- Check browser console for error messages

### AI gives generic responses
- The system prompt constrains responses to ETH Safari topics
- Try rephrasing your question to relate it to blockchain/Web3

## Security Note

⚠️ Never commit your `.env.local` file to git. It's already in `.gitignore` to prevent accidental exposure of your API key.

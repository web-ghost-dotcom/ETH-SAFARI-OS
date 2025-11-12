import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// System prompt to constrain AI to ETH Safari context
const SYSTEM_CONTEXT = `You are SafariGuide, an AI assistant for ETH Safari OS - a blockchain ecosystem platform for builders, projects, and DAO governance.

ETH Safari OS is a comprehensive platform that provides:
- Builder Network: Connect with 1000+ blockchain developers and mentors
- Project Showcase: Discover and collaborate on 50+ innovative Web3 projects
- DAO Governance: Participate in decentralized decision-making with on-chain voting
- Funding Opportunities: Access grants and resources for blockchain projects
- 24/7 AI Support: Get help with team formation, idea brainstorming, and submissions
- 100% On-Chain: All activities verified and recorded on blockchain
- Aquafier Integration: Cryptographic signing and verification for proposals and credentials

Key Features:
1. Team Recommendations: Match builders with complementary skills
2. Idea Brainstorming: Refine Web3 project concepts
3. Resource Access: Find Solidity tutorials, smart contract docs, and learning materials
4. Submission Helper: Auto-complete hackathon and funding proposals
5. Credential Verification: On-chain proof of builder achievements

You should ONLY answer questions related to:
- ETH Safari OS platform features and capabilities
- Blockchain development and Web3 technologies
- DAO governance and decentralized systems
- Team formation and collaboration for blockchain projects
- Funding and grants for Web3 projects
- Smart contract development (Solidity, Ethereum)
- Hackathons and blockchain competitions

If asked about topics unrelated to ETH Safari, blockchain, or Web3, politely redirect the conversation back to these topics.

RESPONSE GUIDELINES:
- Be helpful, concise, and professional
- Use simple paragraphs with blank lines between them for readability
- Use emojis SPARINGLY (maximum 1 per response)
- Keep responses under 200 words when possible
- Focus on actionable advice and platform features
- DO NOT use markdown formatting (no **, *, ##, etc.)
- Write in plain text with natural language
- Use bullet points with simple dashes (-) only when listing items`;

export async function POST(request: NextRequest) {
    try {
        const { message, chatHistory } = await request.json();

        if (!GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file.' },
                { status: 500 }
            );
        }

        // Initialize the Gemini AI
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: SYSTEM_CONTEXT,
        });

        // Build conversation history - skip the initial assistant greeting
        // Gemini requires first message to be from user, so we filter appropriately
        const history = chatHistory
            .filter((msg: { role: string, content: string }) => {
                // Skip the initial greeting message
                return msg.content !== 'Hello! I\'m SafariGuide, your AI assistant for ETH Safari OS. How can I help you today?';
            })
            .map((msg: { role: string, content: string }) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            }));

        // Ensure history starts with a user message or is empty
        while (history.length > 0 && history[0].role !== 'user') {
            history.shift();
        }

        // Start chat with history
        const chat = model.startChat({
            history,
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
        });

        // Send message and get response
        const result = await chat.sendMessage(message);
        const response = result.response;
        const aiResponse = response.text();

        return NextResponse.json({ response: aiResponse });

    } catch (error: unknown) {
        console.error('Chat API Error:', error);

        // Handle quota errors
        if (error instanceof Error && error.message.includes('quota')) {
            return NextResponse.json(
                { error: 'API quota exceeded. Please get a new API key from https://makersuite.google.com/app/apikey or wait 24 hours.' },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred while processing your request' },
            { status: 500 }
        );
    }
}

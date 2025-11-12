'use client';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Zebra Head Silhouette */}
            <g>
                {/* Main head shape */}
                <path
                    d="M50 20 C35 20 25 30 25 45 C25 50 26 55 28 58 L30 65 L35 70 L40 72 L50 75 L60 72 L65 70 L70 65 L72 58 C74 55 75 50 75 45 C75 30 65 20 50 20 Z"
                    fill="#ffffff"
                />

                {/* Zebra stripes */}
                <path
                    d="M45 25 C40 25 35 28 32 33 L68 33 C65 28 60 25 55 25 L45 25 Z"
                    fill="#000000"
                />
                <path
                    d="M30 40 L70 40 L68 45 L32 45 Z"
                    fill="#000000"
                />
                <path
                    d="M33 52 L67 52 L65 57 L35 57 Z"
                    fill="#000000"
                />

                {/* Ears with magenta accent */}
                <ellipse cx="35" cy="25" rx="5" ry="8" fill="#ff00ff" />
                <ellipse cx="65" cy="25" rx="5" ry="8" fill="#ff00ff" />

                {/* Horn (unicorn zebra style) */}
                <path
                    d="M50 15 L48 23 L52 23 Z"
                    fill="url(#hornGradient)"
                />

                {/* Eyes */}
                <circle cx="42" cy="42" r="2" fill="#ff00ff" />
                <circle cx="58" cy="42" r="2" fill="#00d4ff" />

                {/* Snout */}
                <path
                    d="M45 60 C45 62 47 64 50 64 C53 64 55 62 55 60 L50 58 Z"
                    fill="#000000"
                />
            </g>

            {/* OS Circuit Pattern */}
            <g opacity="0.6">
                <circle cx="20" cy="80" r="3" fill="#ff00ff" />
                <circle cx="80" cy="80" r="3" fill="#00d4ff" />
                <line x1="23" y1="80" x2="35" y2="75" stroke="#ff00ff" strokeWidth="1.5" />
                <line x1="77" y1="80" x2="65" y2="75" stroke="#00d4ff" strokeWidth="1.5" />
            </g>

            {/* Gradient Definition */}
            <defs>
                <linearGradient id="hornGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff00ff" />
                    <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
            </defs>
        </svg>
    );
}

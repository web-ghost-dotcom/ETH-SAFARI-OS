'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        info: <Info className="w-5 h-5 text-[#00d4ff]" />
    };

    const colors = {
        success: 'border-green-500/50',
        error: 'border-red-500/50',
        info: 'border-[#00d4ff]/50'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-[100] w-[calc(100%-2rem)] sm:min-w-[300px] max-w-md bg-black/90 backdrop-blur-xl border ${colors[type]} rounded-xl shadow-2xl`}
        >
            <div className="flex items-center gap-3 p-4">
                {icons[type]}
                <p className="flex-1 text-white text-sm font-medium">{message}</p>
                <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}

export function ToastContainer({ toasts, removeToast }: {
    toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
    removeToast: (id: string) => void;
}) {
    return (
        <AnimatePresence>
            {toasts.map((toast, index) => (
                <div key={toast.id} style={{ top: `${24 + index * 80}px` }} className="absolute">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                </div>
            ))}
        </AnimatePresence>
    );
}

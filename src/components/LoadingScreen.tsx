// src/components/LoadingScreen.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface LoadingScreenProps {
  messages: string[];
}

export default function LoadingScreen({ messages }: LoadingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="min-h-screen bg-[#0A061E] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-semibold text-center mb-12">
        Tudo pronto! Aguarde um momento enquanto processamos seus dados...
      </h1>

      <div className="w-full max-w-md mb-12">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </div>
      </div>

      <motion.p
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-lg text-gray-300 text-center mb-16"
      >
        {messages[currentMessageIndex]}
      </motion.p>

      <div className="bg-[#1A1130] rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-5 h-5 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <p className="text-center text-gray-200 mb-4">
          "É a solução mais fácil para perda de peso que já experimentei. As sessões noturnas melhoraram muito a qualidade do meu sono e reduziram significativamente meu estresse."
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          <span>Usuário verificado</span>
        </div>
      </div>
    </div>
  );
}

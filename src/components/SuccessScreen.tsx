import { motion } from 'framer-motion';
import { Brain, Star } from 'lucide-react';

export default function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0A061E] text-white flex flex-col items-center justify-center p-8"
    >
      <div className="w-full max-w-2xl text-center space-y-8">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mx-auto w-24 h-24 text-purple-500"
        >
          <Brain className="w-full h-full" />
        </motion.div>

        <h1 className="text-4xl font-bold">Seu programa está pronto!</h1>
        
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
          ))}
        </div>

        <div className="bg-gray-800/30 p-6 rounded-lg">
          <p className="italic text-xl text-gray-300">
            "É a solução de perda de peso mais fácil que já experimentei. 
            As sessões noturnas melhoraram muito a qualidade do meu sono e 
            reduziram significativamente meu estresse."
          </p>
        </div>

        <p className="text-gray-300">
          Enviamos um email com instruções para acessar seu programa personalizado.
          Por favor, verifique sua caixa de entrada.
        </p>
      </div>
    </motion.div>
  );
}
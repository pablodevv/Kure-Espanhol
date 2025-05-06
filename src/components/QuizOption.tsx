import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizOptionProps {
  label: string;
  emoji?: string;
  onClick: () => void;
}

export default function QuizOption({ label, emoji, onClick }: QuizOptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={onClick}
      className="w-full p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 
                 flex items-center justify-between text-left transition-colors"
    >
      <div className="flex items-center gap-3">
        {emoji && <span className="text-2xl">{emoji}</span>}
        <span>{label}</span>
      </div>
      <ArrowRight className="w-5 h-5" />
    </motion.button>
  );
}
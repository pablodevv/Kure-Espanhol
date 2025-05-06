import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InfoPageProps {
  title: string;
  children: ReactNode;
  image?: string;
  onContinue: () => void;
}

export default function InfoPage({ title, children, image, onContinue }: InfoPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto p-8"
    >
      {image && (
        <div className="flex-1">
          <img src={image} alt="" className="w-full max-w-md mx-auto rounded-lg mb-6 md:mb-0" />
        </div>
      )}
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl font-semibold mb-6">{title}</h2>
        <div className="space-y-4 text-gray-300">
          {children}
        </div>
        <button
          onClick={onContinue}
          className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500
                           hover:opacity-90 transition-opacity text-white font-medium"
        >
          Entendi
        </button>
      </div>
    </motion.div>
  );
}

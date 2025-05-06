import { ArrowLeft } from 'lucide-react';
import { useQuizStore } from '../store/quiz';

interface QuizProgressProps {
  onBack?: () => void;
}

export default function QuizProgress({ onBack }: QuizProgressProps) {
  const { currentStep, totalSteps } = useQuizStore();
  
  return (
    <div className="flex items-center gap-4 mb-12">
      <button 
        onClick={onBack}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className="w-full bg-gray-800 h-1 rounded-full">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <span className="text-gray-400 min-w-[4rem]">
        {currentStep} de {totalSteps}
      </span>
    </div>
  );
}
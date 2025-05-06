import { useState } from 'react';
import { motion } from 'framer-motion';

interface NumberInputProps {
  label: string;
  subtitle: string;
  value: number | null;
  onChange: (value: number) => void;
  onNext: () => void;
  unit: string;
  min?: number;
  max?: number;
  errorMessage?: string;
  validateFn?: (value: number) => boolean;
}

export default function NumberInput({
  label,
  subtitle,
  value,
  onChange,
  onNext,
  unit,
  min,
  max,
  errorMessage = 'Por favor, insira um valor válido',
  validateFn,
}: NumberInputProps) {
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState(value?.toString() || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Permite apenas números e um único ponto decimal
    if (!/^\d*\.?\d*$/.test(newValue) && newValue !== '') {
      return;
    }

    setInputValue(newValue);
    setError('');

    if (newValue === '') {
      onChange(0);
      return;
    }

    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue || inputValue === '') {
      setError(errorMessage);
      return;
    }

    const numValue = parseFloat(inputValue);

    if (isNaN(numValue)) {
      setError(errorMessage);
      return;
    }

    if (min !== undefined && numValue < min) {
      setError(`O valor deve ser maior que ${min}`);
      return;
    }

    if (max !== undefined && numValue > max) {
      setError(`O valor deve ser menor que ${max}`);
      return;
    }

    if (validateFn && !validateFn(numValue)) {
      setError(errorMessage);
      return;
    }

    setError('');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto text-center space-y-6"
    >
      <h2 className="text-3xl font-semibold">{label}</h2>
      <p className="text-gray-300">{subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full p-4 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 
                     border border-gray-700 focus:border-purple-500 focus:outline-none"
            placeholder={`Digite seu ${label.toLowerCase()}`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {unit}
          </span>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full p-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                   hover:opacity-90 transition-opacity"
        >
          Próximo
        </button>
      </form>
    </motion.div>
  );
}

import { useState } from 'react';
import { Lock } from 'lucide-react';

interface EmailCollectionProps {
  onSubmit: (email: string) => void;
}

export default function EmailCollection({ onSubmit }: EmailCollectionProps) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreed) {
      onSubmit(email);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A061E] text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">
            Seu programa está pronto.
          </h1>
          <p className="text-gray-300">
            Desbloqueie o acesso ao programa personalizado inserindo seu email.
            Junte-se à comunidade Kure que atingiu seu peso ideal, com uma taxa de sucesso superior a 90%.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#1A1130] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              className="h-4 w-4 mt-1 rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-[#1A1130]"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label className="ml-2 text-sm text-gray-300">
              Eu gostaria de receber um email sobre meu relatório de dados corporais e concordo com a{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Política de Privacidade
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={!email || !agreed}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock className="w-5 h-5" />
            <span>Desbloquear meu programa</span>
          </button>
        </form>
      </div>
    </div>
  );
}

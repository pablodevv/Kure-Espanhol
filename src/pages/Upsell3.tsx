import { useEffect, useState } from "react"
import { Button } from '../components/Button';
import { CheckCircle, Brain, TimerReset } from "lucide-react"
import { useNavigate } from "react-router-dom"



export default function UpsellMenteBlindada() {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutos
  const navigate = useNavigate()



  
useEffect(() => {
  // Rola a página para o topo sempre que ela for renderizada
  window.scrollTo(0, 0);
}, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  const handleAccept = () => {
    window.location.href = "https://pay.kirvano.com/3ecc476b-077e-4c6c-8fcd-3528821e2dc6" // substitua pelo seu link real
  }

  const handleDecline = () => {
    navigate("/downsell2")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 md:p-12 text-center space-y-6 border border-gray-200 dark:border-gray-800">
        <div className="flex justify-center items-center gap-2 text-indigo-600 text-sm font-semibold uppercase tracking-wide">
          <Brain className="w-5 h-5" />
          Oferta complementar exclusiva
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Seu corpo está mudando… <span className="text-indigo-500">sua mente também precisa!</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Adicione o <strong>Pacote Mente Blindada</strong> com sessões poderosas para dominar sua mente e manter resultados duradouros.
        </p>

        <div className="text-center bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 font-semibold px-4 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
          <TimerReset className="w-5 h-5" />
          Oferta por tempo limitado: <span className="ml-1 font-bold">{formatTime(timeLeft)}</span>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 md:p-6 space-y-4 text-left text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
            <div>
              <p className="font-semibold">Sessão para Ansiedade</p>
              <p className="text-sm">Alivie a ansiedade e acalme sua mente antes de dormir.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
            <div>
              <p className="font-semibold">Sessão para Autoestima</p>
              <p className="text-sm">Fortaleça sua confiança e amor-próprio dia após dia.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
            <div>
              <p className="font-semibold">Sessão para Foco</p>
              <p className="text-sm">Mantenha sua mente centrada e produtiva durante o dia.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
            <div>
              <p className="font-semibold">Sessão para Procrastinação</p>
              <p className="text-sm">Supere bloqueios mentais e comece a agir de verdade.</p>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Valor individual: R$ 9,90 cada. Pacote completo hoje por apenas <span className="font-bold text-indigo-600 dark:text-indigo-300">R$ 19,90</span>
            </p>
          </div>
        </div>

        <Button
          onClick={handleAccept}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm md:text-lg font-semibold py-4 rounded-xl shadow-xl transition-all"
        >
          SIM! Quero blindar minha mente por R$ 19,90 🧠
        </Button>

        <button
          onClick={handleDecline}
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline mt-2"
        >
          Não preciso proteger minha mente agora
        </button>

        <div className="text-xs text-gray-400 pt-6">
          Garantia total de reembolso em 7 dias. Seu risco é zero.
        </div>

        {/* Prova Social */}
        <div className="mt-6 border border-green-500 rounded-xl p-4 bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Garantia incondicional de 7 dias: se não sentir resultado, devolvemos 100% do seu dinheiro.
        </div>
      </div>
    </div>
  )
}

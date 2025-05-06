import { useEffect, useState } from "react"
import { Button } from '../components/Button';
import { Flame, Gift, TimerReset, CheckCircle, UserCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"




export default function DownsellRenovacao3Meses() {
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
    window.location.href = "https://pay.kirvano.com/3720103f-8426-4c7c-8ae7-c0b4f45ea75e"
  }

  const handleDecline = () => {
    navigate("/upsell3")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 md:p-12 text-center space-y-6 border border-gray-200 dark:border-gray-800">
        <div className="flex justify-center items-center gap-2 text-red-600 text-sm font-semibold uppercase tracking-wide">
          <Flame className="w-5 h-5" />
          Última Chance Especial
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Continue Eliminando Peso e Ansiedade por <span className="text-red-500">+3 Meses</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Entendemos que 6 meses pode ser muito agora. Que tal <strong>renovar por mais 3 meses</strong> com <strong>um bônus surpresa</strong> e manter seu progresso garantido?
        </p>

        <div className="text-center bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 font-semibold px-4 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
          <TimerReset className="w-5 h-5" />
          Oferta disponível por tempo limitado: <span className="ml-1 font-bold">{formatTime(timeLeft)}</span> — aproveite antes que expire!
        </div>

        <div className="text-sm text-red-500 font-semibold">
          Acesso com desconto + bônus secreto liberado somente agora
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 md:p-6 space-y-4 text-left text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
            <div>
              <p className="font-semibold">Renovação de 3 Meses</p>
              <p className="text-sm">Continue sua jornada de forma leve, sem compromissos longos.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
            <div>
              <p className="font-semibold">Desconto Exclusivo</p>
              <p className="text-sm">
                De <span className="line-through text-gray-400">R$ 39,90</span> por apenas <span className="text-green-600 font-bold text-lg">R$ 28,90</span> hoje.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Gift className="text-purple-500 w-6 h-6 mt-1" />
            <div>
              <p className="font-semibold">Bônus Surpresa</p>
              <p className="text-sm">Uma recompensa secreta que vai te surpreender (liberada após o pagamento).</p>
            </div>
          </div>
        </div>

        <div className="text-xs uppercase text-green-600 font-bold tracking-wide">
          ⭐ Oferta mais aproveitada pelos alunos
        </div>

        <Button
          onClick={handleAccept}
          className="w-full bg-red-500 hover:bg-red-600 text-white text-sm md:text-lg font-semibold py-4 rounded-xl shadow-xl transition-all"
        >
          SIM! Quero continuar por mais 3 meses 🔒 <br />
          <span className="text-xs font-normal">e desbloquear o bônus surpresa</span>
        </Button>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Aproveite essa oportunidade para manter seus resultados sem precisar começar do zero depois.
        </p>

        <button
          onClick={handleDecline}
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline mt-2"
        >
          Não quero manter meu progresso agora
        </button>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-left space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <UserCircle2 className="w-6 h-6 text-gray-400" />
            <div>
              <p className="font-semibold">Marcos A. • MG</p>
              <p>“Achei incrível poder continuar com um plano menor e ainda receber um bônus! Valeu muito a pena.”</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-400 pt-6">
          Garantia de reembolso total em até 7 dias. Sem risco. Só resultado.
        </div>
      </div>
    </div>
  )
}

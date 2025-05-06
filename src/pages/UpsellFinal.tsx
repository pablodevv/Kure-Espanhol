import { useEffect, useState } from "react"
import { Button } from '../components/Button'
import { BookOpenText, CheckCircle, MessageCircle, Star, TimerReset } from "lucide-react"
import { useNavigate } from "react-router-dom"



export default function UpsellSeteTecnicas() {
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
    window.location.href = "https://pay.kirvano.com/612a858a-f115-4dc3-9492-0df68971a759" // substitua pelo link real
  }

  const handleDecline = () => {
    navigate("/obrigado")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 md:p-12 text-center space-y-6 border border-gray-200 dark:border-gray-800">
        <div className="flex justify-center items-center gap-2 text-pink-600 text-sm font-semibold uppercase tracking-wide">
          <BookOpenText className="w-5 h-5" />
          Oferta final exclusiva
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Descubra as <span className="text-pink-500">7 Técnicas de Autossabotagem</span> que impedem seu emagrecimento
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Leitura rápida, direta ao ponto, com estratégias mentais para eliminar hábitos destrutivos, procrastinação e autoengano.
        </p>

        <div className="text-center bg-pink-100 dark:bg-pink-800 text-pink-800 dark:text-pink-100 font-semibold px-4 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
          <TimerReset className="w-5 h-5" />
          Oferta disponível por tempo limitado: <span className="ml-1 font-bold">{formatTime(timeLeft)}</span>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 md:p-6 space-y-4 text-left text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
            <div>
              <p className="font-semibold">Identifique os sabotadores mentais</p>
              <p className="text-sm">Entenda o que está travando seu progresso e como se livrar disso.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
            <div>
              <p className="font-semibold">Ferramentas práticas de reprogramação</p>
              <p className="text-sm">Aplicação imediata para mudar seus padrões emocionais e comportamentais.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
            <div>
              <p className="font-semibold">E-book visual, rápido e objetivo</p>
              <p className="text-sm">Ideal para quem quer resultado sem enrolação.</p>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Valor normal: R$ 27. Hoje, acesso imediato por apenas <span className="font-bold text-pink-600 dark:text-pink-300">R$ 7,90</span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleAccept}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white text-sm md:text-lg font-semibold py-4 rounded-xl shadow-xl transition-all"
          >
            SIM! Quero o eBook por R$ 7,90 📘
          </Button>

          <button
            onClick={handleDecline}
            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline mt-2"
          >
            Não, quero finalizar sem essa oferta
          </button>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="text-left text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-3">
              <MessageCircle className="text-yellow-400 w-5 h-5 mt-1" />
              <div>
                <p className="italic">"Achei que fosse só mais um ebook… mas me identifiquei com TODAS as técnicas. Incrível como a gente se sabota sem perceber."</p>
                <p className="text-xs mt-1">— Vanessa M., SP</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="text-yellow-400 w-5 h-5 mt-1" />
              <div>
                <p className="italic">"Simples, direto e transformador. Esse material deveria vir antes de qualquer dieta."</p>
                <p className="text-xs mt-1">— Rafael L., RJ</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="text-yellow-400 w-5 h-5 mt-1" />
              <div>
                <p className="italic">"Só com o que aprendi no tópico 3 já entendi porque eu sempre travava. Vale cada centavo."</p>
                <p className="text-xs mt-1">— Julia S., MG</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-1 text-yellow-400">
            <Star className="w-5 h-5" />
            <Star className="w-5 h-5" />
            <Star className="w-5 h-5" />
            <Star className="w-5 h-5" />
            <Star className="w-5 h-5" />
          </div>
          <p className="text-xs text-gray-400 text-center">Garantia incondicional de 7 dias. Seu risco é zero.</p>
        </div>
      </div>
    </div>
  )
}

import { Smile, CheckCircle } from "lucide-react"

export default function AgradecimentoFinal() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 md:p-12 text-center space-y-6 border border-gray-200 dark:border-gray-800">

        <div className="flex justify-center items-center gap-2 text-green-600 text-sm font-semibold uppercase tracking-wide">
          <CheckCircle className="w-5 h-5" />
          Compra Confirmada
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Parabéns! Sua jornada continua 💫
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Tudo certo com sua sessão. Agora é hora de focar em você, cuidar da sua mente e transformar seus resultados com o Kure.
        </p>

        <div className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 text-md font-medium px-6 py-4 rounded-xl shadow-md">
          A equipe do Kure vai te chamar no <strong>WhatsApp</strong> com seu acesso assim que seu app personalizado estiver pronto 💚
        </div>

        <div className="text-sm text-gray-400 pt-6">
          Fique atento às suas mensagens — qualquer dúvida, estamos por aqui!
        </div>

        <div className="text-xs text-gray-500">
          Suporte: suporte@kura.app
        </div>
      </div>
    </div>
  )
}

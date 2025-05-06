import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Star, Lock as LockOpen } from 'lucide-react';
import { useQuizStore } from '../store/quiz';
import QuizProgress from '../components/QuizProgress';
import QuizOption from '../components/QuizOption';
import InfoPage from '../components/InfoPage';
import NumberInput from '../components/NumberInput';
import SuccessScreen from '../components/SuccessScreen';
import InfoPageWithIllustration from '../components/InfoPageWithIllustration';

function LoadingScreen({ messages, onComplete }: { messages: string[]; onComplete: () => void }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    const timer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, [messages, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 min-h-screen bg-[#0A061E] text-white flex flex-col items-center justify-center p-4 z-50"
    >
      <h1 className="text-3xl font-semibold text-center mb-12">
        Tudo pronto! Aguarde um momento enquanto processamos seus dados...
      </h1>

      <div className="w-full max-w-md mb-12">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-lg text-gray-300 text-center mb-16"
        >
          {messages[currentMessageIndex]}
        </motion.p>
      </AnimatePresence>

      <div className="bg-[#1A1130] rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-5 h-5 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <p className="text-center text-gray-200 mb-4">
          "É a solução mais fácil para perda de peso que já experimentei. As sessões noturnas melhoraram muito a qualidade do meu sono e reduziram significativamente meu estresse."
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          <span>Usuário verificado</span>
        </div>
      </div>
    </motion.div>
  );
}

function EmailCollection({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreed) {
      onSubmit(email);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 min-h-screen bg-[#0A061E] text-white flex flex-col items-center justify-center p-4 z-50"
    >
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
            <LockOpen className="w-5 h-5" />
            <span>Desbloquear meu programa</span>
          </button>
        </form>
      </div>
    </motion.div>
  );
}

const questions = [
  {
    id: 'outcome',
    title: 'Qual resultado positivo da perda de peso você mais espera?',
    options: [
      { label: 'Aumento da autoestima', emoji: '🌟' },
      { label: 'Maior facilidade de movimento', emoji: '🏃‍♂️' },
      { label: 'Melhor aparência', emoji: '✨' },
      { label: 'Aumento da longevidade', emoji: '🌱' },
      { label: 'Outro', emoji: '➕' }
    ]
  },
  {
    id: 'previous_attempts',
    title: 'Você já tentou perder peso antes?',
    options: [
      { label: 'Sim, mas só tive sucesso por um tempo limitado', emoji: '😕' },
      { label: 'Tentei, mas não consegui alcançar meu peso ideal', emoji: '😔' },
      { label: 'Ainda não', emoji: '😬' }
    ]
  },
  {
    type: 'info',
    id: 'root_cause',
    image: "https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finfo_1_main.26296a6a.png&w=3840&q=75",
    title: 'Dessa vez, vai ser diferente. Estamos mirando na causa raiz.',
    content: (
  <>
    <p style={{ color: '#c4afff' }}>Já ouviu o ditado "Está tudo na sua cabeça?" ou "Seu intestino é seu segundo cérebro"?</p>
    <p className="mt-4">
      Comer por estresse, reações intestinais incomuns ou borboletas no estômago quando nervoso são todos sinais da conexão intestino-cérebro.
    </p>
    <p className="mt-4" style={{ color: '#c4afff' }}>
      A mente subconsciente influenciando a má comunicação entre o intestino e o cérebro é o fator chave que causa o sobrepeso e faz más escolhas alimentares*.
    </p>
    <p className="mt-4">
      Mais de 50.000 usuários começam o curso de auto-hipnose Kure todos os meses, reequilibrando com sucesso sua conexão intestino-cérebro eliminando padrões de pensamento negativos e superando obstáculos subconscientes.
    </p>
    <blockquote className="mt-6 border-l-4 border-purple-500 pl-4 italic">
      "Fiquei chocada com a eficácia desse aplicativo de hipnose." - Elena, usando o app Kure desde 2024.
    </blockquote>
    <p className="mt-8 text-sm text-gray-400">
          *Fonte: *Nutrients. Fevereiro de 2021; 13(2): 584.
        </p>
  </>
)
    
  },
  {
    id: 'referral',
    title: 'Você foi indicado ao Kure por um nutricionista ou psicólogo TCC?',
    subtitle: 'A hipnose é um método cientificamente comprovado para resolver problemas relacionados à nutrição e questões psicológicas.',
    options: [
      { label: 'Sim', emoji: '👍' },
      { label: 'Não', emoji: '👎' }
    ]
  },
  {
    id: 'weight_cause',
    title: 'Qual você acha que é a principal causa do seu ganho de peso atual?',
    options: [
      { label: 'Alimentação não saudável', emoji: '🍔' },
      { label: 'Maus hábitos alimentares', emoji: '😐' },
      { label: 'Falta de força de vontade', emoji: '😔' },
      { label: 'Menopausa', emoji: '👵' },
      { label: 'Gravidez', emoji: '🤰' },
      { label: 'Relacionado ao estresse', emoji: '😰' },
      { label: 'Produtos farmacêuticos', emoji: '💊' },
      { label: 'Outro', emoji: '🤔' }
    ]
  },
  {
    id: 'struggle_duration',
    title: 'Há quanto tempo você está lutando com essa situação?',
    options: [
      { label: '0-6 meses', emoji: '😐' },
      { label: '6-12 meses', emoji: '🙁' },
      { label: '1-5 anos', emoji: '😪' },
      { label: '5+ anos', emoji: '😭' }
    ]
  },
  {
    id: 'physical_symptom',
    title: 'Qual sintoma físico do excesso de peso mais te afeta?',
    options: [
      { label: 'Falta de ar', emoji: '😮‍💨' },
      { label: 'Ronco', emoji: '😪' },
      { label: 'Mobilidade reduzida', emoji: '🚶' },
      { label: 'Dor física', emoji: '😳' },
      { label: 'Não tenho certeza', emoji: '🤔' }
    ]
  },
  {
    id: 'life_impact',
    title: 'Existem outros aspectos da sua vida que foram impactados negativamente pelo seu peso?',
    subtitle: 'Selecione o que mais te afeta.',
    options: [
      { label: 'Tensão constante', emoji: '😣' },
      { label: 'Libido reduzida', emoji: '💔' },
      { label: 'Desafios em formar conexões românticas', emoji: '👥' },
      { label: 'Dificuldades de socialização', emoji: '👯‍♀️' },
      { label: 'Não tenho certeza', emoji: '🤔' }
    ]
  },
  {
    type: 'info',
    id: 'transformation',
    title: 'A transformação do corpo começa na mente',
    content: (
  <>
    <p>Métodos tradicionais como dietas ou exercícios frequentemente falham em criar resultados duradouros. O aplicativo Kure identifica a causa raiz subconsciente do ganho de peso e a elimina. <span style={{ color: '#c4afff' }}>É a solução de perda de peso mais eficiente.</span></p>
    <p className="mt-4">Complete o quiz e receba seu programa personalizado de hipnoterapia de 21 dias:</p>
  </>
),
    image: "https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finfo_2_main.53943ace.png&w=3840&q=75",
    showRating: true
  },
  {
    id: 'eating_habits',
    title: 'Com qual dos seguintes hábitos alimentares você mais se identifica?',
    subtitle: 'A hipnose Kure focará na remoção desse hábito alimentar não saudável.',
    options: [
      { label: 'Alimentação irregular', emoji: '⏰' },
      { label: 'Compulsão alimentar / beliscar constantemente', emoji: '🍪' },
      { label: 'Porções muito grandes de comida', emoji: '🍽️' },
      { label: 'Vício em açúcar', emoji: '🍫' },
      { label: 'Não sei cozinhar de forma saudável e saborosa', emoji: '👩‍🍳' },
      { label: 'Outro', emoji: '🤔' }
    ]
  },
  {
    id: 'food_craving',
    title: 'Qual desejo por comida você mais gostaria de parar?',
    subtitle: 'A hipnose Kure focará no bloqueio desse desejo por comida.',
    options: [
      { label: 'Doces / chocolate', emoji: '🍫' },
      { label: 'Salgadinhos', emoji: '🥨' },
      { label: 'Produtos lácteos', emoji: '🧀' },
      { label: 'Fast food', emoji: '🍔' },
      { label: 'Bebidas açucaradas', emoji: '🥤' },
      { label: 'Outro', emoji: '🤔' }
    ]
  },
  {
    id: 'internal_belief',
    title: 'Qual crença interna mais te impede de perder peso?',
    subtitle: 'A hipnose Kure vai te libertar dessa limitação mental',
    options: [
      { label: 'Me falta força de vontade', emoji: '😩' },
      { label: 'Sinto que DEVO limpar o prato', emoji: '🍽️' },
      { label: 'Qual o sentido? Se eu tentar, vou falhar', emoji: '😔' },
      { label: 'Sempre fui assim', emoji: '🙄' },
      { label: 'Sinto que não mereço melhorar', emoji: '😞' },
      { label: 'Não tenho certeza', emoji: '🤔' }
    ]
  },
  {
    id: 'hypnosis_knowledge',
    title: 'Você já ouviu falar sobre hipnose ajudando pessoas a mudarem seu comportamento?',
    options: [
      { label: 'Sim', emoji: '✅' },
      { label: 'Não tenho certeza', emoji: '🤔' }
    ]
  },
  {
    type: 'info',
    id: 'how_it_works',
    title: 'Como o Kure vai te ajudar?',
    content: (
      <>
        <p>Nossas sessões de hipnose personalizadas vão remover as principais razões por trás do seu ganho de peso.</p>
        <ul className="space-y-2 mt-4">
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Sem mais desejos por comida
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Bloqueio de maus hábitos alimentares
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Remoção de crenças limitantes
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Reparo da conexão intestino-cérebro
          </li>
        </ul>
        <p className="mt-4">
          Simplesmente abra o aplicativo Kure e ouça uma sessão relaxante de hipnose antes de dormir.
        </p>
        <p className="mt-4">
          <span style={{ color: '#c4afff' }}>É quase como perder peso enquanto dorme.</span>
        </p>
        <p className="mt-4">
          Estudos de pesquisa médica e dados de usuários Kure sugerem que a hipnose é perfeitamente segura e permite que você alcance melhores e duradouros resultados de perda de peso*.
        </p>
        <p className="mt-8 text-sm text-gray-400">
          *Fonte: Journal of Integrative Medicine Volume 19, Issue 1, Janeiro de 2021, Páginas 1-5.
        </p>
      </>
    ),
    image: "https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finfo_3_main_mobile.db09b2e6.png&w=1920&q=75"
  },
  {
    id: 'activity_level',
    title: 'Qual é seu nível atual de atividade física?',
    subtitle: 'Responda as últimas perguntas para ver quão rapidamente você pode atingir seus objetivos de peso.',
    options: [
      {
        label: 'Sedentário ou menos',
        subtitle: 'Trabalho no escritório e muito pouco ou nenhum exercício semanal.',
        emoji: '😐'
      },
      {
        label: 'Levemente ativo',
        subtitle: 'Trabalho no escritório e exercício uma vez por semana',
        emoji: '🚶'
      },
      {
        label: 'Moderadamente ativo',
        subtitle: 'Trabalho ativo ou exercício diário',
        emoji: '🧘‍♀️'
      },
      {
        label: 'Muito ativo',
        subtitle: 'Trabalho ativo e/ou 1 hora de exercício diário',
        emoji: '🏃'
      },
      {
        label: 'Extremamente ativo',
        subtitle: '3-5 treinos por semana',
        emoji: '🏋️'
      }
    ]
  },
  {
    type: 'number',
    id: 'height',
    title: 'Qual é sua altura?',
    subtitle: 'Será usado para calcular seu IMC e previsão de perda de peso.',
    unit: 'cm',
    min: 120,
    errorMessage: 'Infelizmente, este produto não é adequado para usuários abaixo de 120 cm'
  },
  {
    type: 'number',
    id: 'weight',
    title: 'Quanto você pesa?',
    subtitle: 'Será usado para calcular seu IMC e previsão de perda de peso.',
    unit: 'kg',
    min: 40,
    errorMessage: 'Por favor, insira um valor maior'
  },
  {
    type: 'number',
    id: 'target_weight',
    title: 'Qual é seu peso desejado?',
    subtitle: 'Isso nos ajudará a personalizar um programa específico para você. Mais de 90% dos usuários Kure atingem seu peso desejado.',
    unit: 'kg',
    errorMessage: 'O peso desejado deve ser menor que seu peso atual'
  },
  {
    type: 'number',
    id: 'age',
    title: 'Qual é sua idade?',
    subtitle: 'A idade nos ajuda nos cálculos metabólicos e personaliza as sugestões do seu programa.',
    unit: 'anos',
    min: 18,
    max: 100,
    errorMessage: 'Por favor, insira uma idade válida entre 18 e 100 anos'
  },
  {
    id: 'reward',
    title: 'Imagine alcançar seu objetivo. Como você vai se recompensar?',
    subtitle: 'Durante momentos desafiadores, lembre-se dessa recompensa como motivação para continuar.',
    options: [
      { label: 'Vou fazer um dia de SPA', emoji: '💆' },
      { label: 'Vou contribuir para caridade', emoji: '💖' },
      { label: 'Vou mudar de emprego ou fazer algo igualmente significativo', emoji: '✨' },
      { label: 'Vou finalmente fazer aquela viagem linda que sempre sonhei', emoji: '🌴' }
    ]
  }
];

export default function Quiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [processingAnswers, setProcessingAnswers] = useState(false);
  const [showEmailCollection, setShowEmailCollection] = useState(false);

  const {
    setAnswer,
    setHeight,
    setWeight,
    setTargetWeight,
    setAge,
    weight: currentWeight,
    setEmail
  } = useQuizStore();

  const currentValue = useQuizStore((state: any) => {
    const current = questions[currentQuestion];
    return current?.type === 'number' ? state[current.id] : null;
  });

  const handleAnswer = (answer: string) => {
    const current = questions[currentQuestion];

    if (current.type === 'info') {
      setCurrentQuestion(prev => prev + 1);
      return;
    }

    setAnswer(current.id, answer);

    if (currentQuestion === questions.length - 1) {
      setProcessingAnswers(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

const SKIP_EMAIL_SCREEN = true;
  
  const handleLoadingComplete = () => {
    setProcessingAnswers(false);
    if (SKIP_EMAIL_SCREEN) {
    navigate('/summary');
  } else {
    setShowEmailCollection(true);
  }
  };

  const handleNumberInput = (value: number) => {
    const current = questions[currentQuestion];
    if (isNaN(value)) return;
    
    switch (current.id) {
      case 'height':
        setHeight(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'target_weight':
        setTargetWeight(value);
        break;
      case 'age':
        setAge(value);
        break;
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const handleEmailSubmit = (email: string) => {
    setEmail(email);
    navigate('/summary');
  };

  if (showSuccess) {
    return <SuccessScreen />;
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="relative min-h-screen bg-[#0A061E]">
      <AnimatePresence mode="wait">
        {processingAnswers && (
          <LoadingScreen
            messages={[
              "Analisando suas respostas...",
              "Calculando sua previsão de perda de peso...",
              "Criando seu programa personalizado de hipnose..."
            ]}
            onComplete={handleLoadingComplete}
          />
        )}
        {showEmailCollection && (
          <EmailCollection onSubmit={handleEmailSubmit} />
        )}
        {!processingAnswers && !showEmailCollection && currentQ && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-[#0A061E] text-white"
          >
            <div className="max-w-4xl mx-auto px-4 py-8">
              <QuizProgress onBack={handleBack} />
              
              {currentQ.type === 'info' ? (
                <InfoPageWithIllustration
                  title={currentQ.title}
                  image={currentQ.image}
                  showRating={currentQ.showRating}
                  onContinue={() => handleAnswer('')}
                >
                  {currentQ.content}
                </InfoPageWithIllustration>
              ) : currentQ.type === 'number' ? (
                <NumberInput
                  key={`${currentQ.id}-${currentQuestion}`}
                  label={currentQ.title}
                  subtitle={currentQ.subtitle}
                  value={currentValue}
                  onChange={handleNumberInput}
                  onNext={() => handleAnswer('')}
                  unit={currentQ.unit}
                  min={currentQ.min}
                  max={currentQ.max}
                  errorMessage={currentQ.errorMessage}
                  validateFn={currentQ.id === 'target_weight' ? (value: number) => value < currentWeight : undefined}
                />
              ) : (
                <motion.div
                  key={currentQ.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center gap-8"
                >
                  <h2 className="text-3xl font-semibold text-center">
                    {currentQ.title}
                  </h2>

                  {currentQ.subtitle && (
                    <p className="text-gray-400 text-center max-w-2xl">
                      {currentQ.subtitle}
                    </p>
                  )}

                  <div className="w-full max-w-2xl space-y-4">
                    {currentQ.options?.map((option, index) => (
                      <QuizOption
                        key={index}
                        label={option.label}
                        emoji={option.emoji}
                        subtitle={option.subtitle}
                        onClick={() => handleAnswer(option.label)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

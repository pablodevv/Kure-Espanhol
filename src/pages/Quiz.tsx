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
    ¡Todo listo! Espera un momento mientras procesamos tus datos...
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
      "Es la solución más fácil para perder peso que he probado. Las sesiones nocturnas han mejorado mucho la calidad de mi sueño y han reducido significativamente mi estrés."
    </p>
    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-current"
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span>Usuario verificado</span>
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
        Tu programa está listo.
      </h1>
      
      <p className="text-gray-300">
        Desbloquea el acceso a tu programa personalizado ingresando tu correo electrónico. 
        Únete a la comunidad Kure que ha alcanzado su peso ideal, con una tasa de éxito superior al 90%.
      </p>
        
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="email"
          required
          className="w-full px-4 py-3 rounded-lg bg-[#1A1130] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          placeholder="Correo electrónico"
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
          Me gustaría recibir un correo electrónico sobre mi informe de datos corporales y acepto la{' '}
          <a href="#" className="text-purple-400 hover:text-purple-300">
            Política de Privacidad
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
        <span>Desbloquear mi programa</span>
      </button>
    </form>
  </div>
</motion.div>

  );
}

const questions = [
  {
    id: 'outcome',
    title: '¿Qué resultado positivo de la pérdida de peso esperas más?',
    options: [
      { label: 'Aumento de la autoestima', emoji: '🌟' },
      { label: 'Mayor facilidad de movimiento', emoji: '🏃‍♂️' },
      { label: 'Mejor apariencia', emoji: '✨' },
      { label: 'Mayor longevidad', emoji: '🌱' },
      { label: 'Otro', emoji: '➕' }
    ]
  },
  {
    id: 'previous_attempts',
    title: '¿Ya has intentado perder peso antes?',
    options: [
      { label: 'Sí, pero solo tuve éxito por un tiempo limitado', emoji: '😕' },
      { label: 'Lo intenté, pero no logré alcanzar mi peso ideal', emoji: '😔' },
      { label: 'Aún no', emoji: '😬' }
    ]
  },
  {
    type: 'info',
    id: 'root_cause',
    image: "https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finfo_1_main.26296a6a.png&w=3840&q=75",
    title: 'Esta vez será diferente. Estamos enfocándonos en la causa raíz.',
    content: (
  <>
    <p style={{ color: '#c4afff' }}>¿Has escuchado el dicho "Todo está en tu cabeza?" o "Tu intestino es tu segundo cerebro"?</p>
    <p className="mt-4">
      Comer por estrés, reacciones intestinales inusuales o mariposas en el estómago cuando estás nervioso son señales de la conexión intestino-cerebro.
    </p>
    <p className="mt-4" style={{ color: '#c4afff' }}>
      La mente subconsciente que influye en la mala comunicación entre el intestino y el cerebro es el factor clave que causa el sobrepeso y provoca malas elecciones alimentarias*.
    </p>
    <p className="mt-4">
      Más de 50,000 usuarios comienzan el curso de auto-hipnosis Kure cada mes, reequilibrando con éxito su conexión intestino-cerebro eliminando patrones de pensamiento negativos y superando obstáculos subconscientes.
    </p>
    <blockquote className="mt-6 border-l-4 border-purple-500 pl-4 italic">
      "Quedé sorprendida con la efectividad de esta aplicación de hipnosis." - Elena, usando la app Kure desde 2024.
    </blockquote>
    <p className="mt-8 text-sm text-gray-400">
          *Fuente: *Nutrients. Febrero de 2021; 13(2): 584.
        </p>
  </>
)
    
  },
  {
    id: 'referral',
    title: '¿Fuiste recomendado a Kure por un nutricionista o psicólogo TCC?',
    subtitle: 'La hipnosis es un método científicamente comprobado para resolver problemas relacionados con la nutrición y cuestiones psicológicas.',
    options: [
      { label: 'Sí', emoji: '👍' },
      { label: 'No', emoji: '👎' }
    ]
  },
  {
    id: 'weight_cause',
    title: '¿Cuál crees que es la principal causa de tu aumento de peso actual?',
    options: [
      { label: 'Alimentación poco saludable', emoji: '🍔' },
      { label: 'Malos hábitos alimenticios', emoji: '😐' },
      { label: 'Falta de fuerza de voluntad', emoji: '😔' },
      { label: 'Menopausia', emoji: '👵' },
      { label: 'Embarazo', emoji: '🤰' },
      { label: 'Relacionado al estrés', emoji: '😰' },
      { label: 'Medicamentos', emoji: '💊' },
      { label: 'Otro', emoji: '🤔' }
    ]
  },
  {
    id: 'struggle_duration',
    title: '¿Cuánto tiempo llevas luchando con esta situación?',
    options: [
      { label: '0-6 meses', emoji: '😐' },
      { label: '6-12 meses', emoji: '🙁' },
      { label: '1-5 años', emoji: '😪' },
      { label: '5+ años', emoji: '😭' }
    ]
  },
  {
    id: 'physical_symptom',
    title: '¿Qué síntoma físico del sobrepeso te afecta más?',
    options: [
      { label: 'Falta de aire', emoji: '😮‍💨' },
      { label: 'Ronquidos', emoji: '😪' },
      { label: 'Movilidad reducida', emoji: '🚶' },
      { label: 'Dolor físico', emoji: '😳' },
      { label: 'No estoy seguro/a', emoji: '🤔' }
    ]
  },
  {
    id: 'life_impact',
    title: '¿Hay otros aspectos de tu vida que se han visto impactados negativamente por tu peso?',
    subtitle: 'Selecciona lo que más te afecta.',
    options: [
      { label: 'Tensión constante', emoji: '😣' },
      { label: 'Libido reducida', emoji: '💔' },
      { label: 'Desafíos para formar relaciones románticas', emoji: '👥' },
      { label: 'Dificultades para socializar', emoji: '👯‍♀️' },
      { label: 'No estoy seguro/a', emoji: '🤔' }
    ]
  },
  {
    type: 'info',
    id: 'transformation',
    title: 'La transformación corporal comienza en la mente',
    content: (
  <>
    <p>Los métodos tradicionales como dietas o ejercicios suelen fallar en generar resultados duraderos. La aplicación Kure identifica la causa raíz subconsciente del aumento de peso y la elimina. <span style={{ color: '#c4afff' }}>Es la solución de pérdida de peso más eficiente.</span></p>
    <p className="mt-4">Completa el quiz y recibe tu programa personalizado de auto-hipnosis de 21 días:</p>
  </>
),
    image: "https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finfo_2_main.53943ace.png&w=3840&q=75",
    showRating: true
  },
  {
    id: 'eating_habits',
    title: '¿Con cuál de los siguientes hábitos alimenticios te identificas más?',
    subtitle: 'La hipnosis Kure se enfocará en eliminar este hábito alimenticio no saludable.',
    options: [
      { label: 'Comida irregular', emoji: '⏰' },
      { label: 'Comer compulsivamente / picoteo constante', emoji: '🍪' },
      { label: 'Porciones muy grandes de comida', emoji: '🍽️' },
      { label: 'Adicción al azúcar', emoji: '🍫' },
      { label: 'No sé cocinar de manera saludable y sabrosa', emoji: '👩‍🍳' },
      { label: 'Otro', emoji: '🤔' }
    ]
  },
  {
    id: 'food_craving',
    title: '¿Qué antojo de comida te gustaría eliminar?',
    subtitle: 'La hipnosis Kure se enfocará en bloquear este antojo.',
    options: [
      { label: 'Dulces / chocolate', emoji: '🍫' },
      { label: 'Comida salada', emoji: '🥨' },
      { label: 'Productos lácteos', emoji: '🧀' },
      { label: 'Comida rápida', emoji: '🍔' },
      { label: 'Bebidas azucaradas', emoji: '🥤' },
      { label: 'Otro', emoji: '🤔' }
    ]
  },
  {
    id: 'internal_belief',
    title: '¿Qué creencia interna más te impide perder peso?',
    subtitle: 'La hipnosis Kure te liberará de esta limitación mental',
    options: [
      { label: 'Me falta fuerza de voluntad', emoji: '😩' },
      { label: 'Siento que DEBO limpiar el plato', emoji: '🍽️' },
      { label: '¿Cuál es el sentido? Si intento, fracasaré', emoji: '😔' },
      { label: 'Siempre he sido así', emoji: '🙄' },
      { label: 'Siento que no merezco mejorar', emoji: '😞' },
      { label: 'No estoy seguro/a', emoji: '🤔' }
    ]
  },
  {
    id: 'hypnosis_knowledge',
    title: '¿Has oído hablar de la hipnosis ayudando a las personas a cambiar su comportamiento?',
    options: [
      { label: 'Sí', emoji: '✅' },
      { label: 'No estoy seguro/a', emoji: '🤔' }
    ]
  },




  
  {
    type: 'info',
    id: 'how_it_works',
    title: '¿Cómo Kure te ayudará?',
    content: (
      <>
        <p>Sesiones de hipnosis personalizadas para eliminar las principales razones detrás de tu aumento de peso.</p>
        <ul className="space-y-2 mt-4">
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Sin más antojos por comida
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Bloqueo de malos hábitos alimenticios
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Eliminación de creencias limitantes
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500">✓</span>
            Reparación de la conexión intestino-cerebro
          </li>
        </ul>
        <p className="mt-4">
          Simplemente abre la app Kure y escucha una sesión relajante de hipnosis antes de dormir.
        </p>
        <p className="mt-4">
          <span style={{ color: '#c4afff' }}>Es casi como perder peso mientras duermes.</span>
        </p>
        <p className="mt-4">
          Estudios de investigación médica y datos de usuarios de Kure sugieren que la hipnosis es completamente segura y te permite lograr resultados duraderos en la pérdida de peso*.
        </p>
        <p className="mt-8 text-sm text-gray-400">
          *Fuente: Journal of Integrative Medicine Volume 19, Issue 1, enero de 2021, Páginas 1-5.
        </p>
      </>
    ),
    image: "https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finfo_3_main_mobile.db09b2e6.png&w=1920&q=75"
  },
  {
    id: 'activity_level',
    title: '¿Cuál es tu nivel actual de actividad física?',
    subtitle: 'Responde las últimas preguntas para ver qué tan rápido puedes alcanzar tus objetivos de peso.',
    options: [
      {
        label: 'Sedentario o menos',
        subtitle: 'Trabajo en oficina y poco o ningún ejercicio semanal.',
        emoji: '😐'
      },
      {
        label: 'Levemente activo',
        subtitle: 'Trabajo en oficina y hago ejercicio una vez por semana',
        emoji: '🚶'
      },
      {
        label: 'Moderadamente activo',
        subtitle: 'Trabajo activo o hago ejercicio diario',
        emoji: '🧘‍♀️'
      },
      {
        label: 'Muy activo',
        subtitle: 'Trabajo activo y/o una hora de ejercicio diario',
        emoji: '🏃'
      },
      {
        label: 'Extremadamente activo',
        subtitle: '3-5 entrenamientos por semana',
        emoji: '🏋️'
      }
    ]
  },
  {
    type: 'number',
    id: 'height',
    title: '¿Cuál es tu altura?',
    subtitle: 'Será utilizado para calcular tu IMC y la predicción de pérdida de peso.',
    unit: 'cm',
    min: 120,
    errorMessage: 'Lamentablemente, este producto no es adecuado para usuarios menores de 120 cm.'
  },
  {
    type: 'number',
    id: 'weight',
    title: '¿Cuánto pesas?',
    subtitle: 'Será utilizado para calcular tu IMC y la predicción de pérdida de peso.',
    unit: 'kg',
    min: 40,
    errorMessage: 'Por favor, ingresa un valor mayor.'
  },
  {
    type: 'number',
    id: 'target_weight',
    title: '¿Cuál es tu peso deseado?',
    subtitle: 'Esto nos ayudará a personalizar un programa específico para ti. Más del 90% de los usuarios de Kure alcanzan su peso deseado.',
    unit: 'kg',
    errorMessage: 'El peso deseado debe ser menor que tu peso actual.'
  },
  {
    type: 'number',
    id: 'age',
    title: '¿Cuál es tu edad?',
    subtitle: 'La edad nos ayuda en los cálculos metabólicos y personaliza las sugerencias de tu programa.',
    unit: 'años',
    min: 18,
    max: 100,
    errorMessage: 'Por favor, ingresa una edad válida entre 18 y 100 años.'
  },
  {
    id: 'reward',
    title: 'Imagina alcanzar tu objetivo. ¿Cómo te recompensarás?',
    subtitle: 'En momentos difíciles, recuerda esta recompensa como motivación para seguir adelante.',
    options: [
      { label: 'Me haré un día de SPA', emoji: '💆' },
      { label: 'Voy a contribuir a la caridad', emoji: '💖' },
      { label: 'Cambiaré de trabajo o haré algo igualmente significativo', emoji: '✨' },
      { label: 'Finalmente haré ese viaje hermoso que siempre soñé', emoji: '🌴' }
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
              "Analizando tus respuestas...",
              "Calculando tu predicción de pérdida de peso...",
              "Creando tu programa personalizado de hipnosis..."
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

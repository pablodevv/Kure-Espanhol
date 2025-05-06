import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Gauge, Star, Check, Cookie, UtensilsCrossed, Frown, Brain } from 'lucide-react';
import { useQuizStore } from '../store/quiz';

const generateChartData = (startWeight: number, targetWeight: number) => {
  const difference = startWeight - targetWeight;
  const step = difference / 4;

  return [
    { week: 'Começo', kure: startWeight, other: startWeight },
    { week: 'Semana 2', kure: startWeight - step, other: startWeight - (step * 0.5) },
    { week: 'Semana 4', kure: startWeight - (step * 2), other: startWeight - (step * 0.7) },
    { week: 'Semana 8', kure: targetWeight, other: startWeight - step },
  ];
};

const weeklyPlan = [
  {
    week: 'Semana 1',
    title: 'Iniciando transformação profunda da mente',
    description: 'Mudando a percepção'
  },
  {
    week: 'Semana 2',
    title: 'Bloqueando desejos por comida',
    description: 'Controle de compulsão'
  },
  {
    week: 'Semana 3',
    title: 'Melhorando hábitos alimentares',
    description: 'Novos padrões'
  },
  {
    week: 'Semana 4',
    title: 'Removendo crenças internas tóxicas',
    description: 'Libertação mental'
  },
  {
    week: 'Semana 5 em diante',
    title: 'Reforçando a transformação mental',
    description: 'Resultados duradouros'
  }
];

const testimonials = [
  {
    date: '27 Jun 2024',
    rating: 5,
    text: 'O Kure transformou minha nutrição de uma maneira que eu não poderia imaginar. Recomendo para qualquer pessoa que busca um "hack" efetivo e duradouro para perda de peso.',
    author: 'João K.',
    verified: true
  },
  {
    date: '24 Jun 2024',
    rating: 5,
    text: 'Super satisfeita. Me livrei do vício em açúcar. As sessões antes de dormir se tornaram meu ritual noturno de relaxamento e pensamento positivo.',
    author: 'Laura S.',
    verified: true
  },
  {
    date: '19 Jun 2024',
    rating: 5,
    text: 'Experiência fenomenal. A hipnose do Kure desbloqueou uma nova versão de mim. Manter uma nutrição saudável agora é natural.',
    author: 'Eliza D.',
    verified: true
  }
];

export default function Summary() {
  const navigate = useNavigate();
  const { weight, targetWeight, answers } = useQuizStore();
  const weightLoss = weight && targetWeight ? weight - targetWeight : 0;
  const data = generateChartData(weight || 79, targetWeight || 72);

  return (
    <div className="min-h-screen bg-[#0A061E] text-white">
      {/* Header */}
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-start items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8" />
            <span className="text-2xl font-semibold">kure</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Mobile First: Prediction Section */}
          <div className="lg:hidden bg-[#1A1632] rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4" style={{ textAlign: 'center' }}>Sua previsão de perda de peso com o Kure</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="week" stroke="#fff" />
                  <YAxis
                    stroke="#fff"
                    domain={[Math.min(targetWeight, 50), Math.max(weight, 80)]}
                    ticks={[50, 55, 60, 65, 70, 75, 80]}
                  />
                  <Line
                    type="monotone"
                    dataKey="kure"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="other"
                    stroke="#4B5563"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-purple-500"></div>
                <b><span className="text-sm">Seu progresso usando Kure</span></b>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-gray-500 border-dashed"></div>
               <b><span className="text-sm">Outros apps de perda de peso</span></b>
              </div>
            </div>
            
          </div>

          <div>
            <h1 className="font-bold mb-6" style={{ fontSize: '2.2rem' }}>
  Com base em suas respostas,
  você pode alcançar <span className="text-purple-400">85% do<br />
  seu objetivo em 1 mês</span>
</h1>
            <p className="text-gray-400 mb-8 lg:mb-0">
              Aqui está o que prevemos com base em 24.000+ usuários com IMC e hábitos alimentares semelhantes.
            </p>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-12 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
            >
              Começar agora
            </button>
          </div>

          {/* Desktop Prediction Section */}
          <div className="hidden lg:block bg-[#1A1632] rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Sua previsão de perda de peso com o Kure</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="week" stroke="#fff" />
                  <YAxis
                    stroke="#fff"
                    domain={[Math.min(targetWeight, 50), Math.max(weight, 80)]}
                    ticks={[50, 55, 60, 65, 70, 75, 80]}
                  />
                  <Line
                    type="monotone"
                    dataKey="kure"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="other"
                    stroke="#4B5563"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-purple-500"></div>
                <span className="text-sm">Seu progresso usando Kure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-gray-500 border-dashed"></div>
                <span className="text-sm">Outros apps de perda de peso</span>
              </div>
            </div>
            
          </div>
        </motion.div>
        
      </div>

      {/* Weekly Plan Section */}
      <div className="bg-[#1A1632] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6">
            Seu plano de perda de peso com hipnoterapia
          </h2>

          <div className="flex justify-center gap-12 mb-12">
            <div className="text-center">
              <Gauge className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="text-lg">Peso desejado - {targetWeight} kg</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-lg">Probabilidade de sucesso - 96%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Weekly Timeline */}
            <div className="space-y-8">
              {weeklyPlan.map((week, index) => (
                <div key={week.week} className="flex items-start gap-4">
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === weeklyPlan.length - 1 ? 'bg-green-500' : 'bg-purple-500'
                    }`}>
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    {index < weeklyPlan.length - 1 && (
                      <div className="absolute top-8 left-4 w-0.5 h-16 bg-purple-500/30" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-medium">{week.week}</h3>
                    <h4 className="text-xl font-semibold">{week.title}</h4>
                    <p className="text-gray-400">{week.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Preview */}
           
<div className="space-y-8">
  <div className="bg-[#0A061E] p-6 rounded-xl">
    <div className="flex items-center gap-4 mb-4">
      <Cookie className="w-6 h-6 text-purple-400" />
      <div>
        <h4 className="font-semibold">Desejos por comida bloqueados</h4>
        <p className="text-gray-400">{answers?.food_craving || 'Doces / chocolate'}</p> {/* Use 'food_craving' */}
      </div>
    </div>
    <div className="flex items-center gap-4 mb-4">
      <UtensilsCrossed className="w-6 h-6 text-purple-400" />
      <div>
        <h4 className="font-semibold">Hábitos alimentares interrompidos</h4>
        <p className="text-gray-400">{answers?.eating_habits || 'Alimentação irregular'}</p> {/* Use 'eating_habits' */}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Frown className="w-6 h-6 text-purple-400" />
      <div>
        <h4 className="font-semibold">Crença interna tóxica removida</h4>
        <p className="text-gray-400">{answers?.internal_belief || 'Sinto que DEVO limpar o prato'}</p> {/* Use 'internal_belief' */}
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>

      {/* Expert Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

           <div>
            <img
              src="https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmargot-promise.64216275.png&w=3840&q=75"
              alt="Especialista em perda de peso"
              className="rounded-2xl w-full"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-bold mb-8">Especialistas por trás do seu plano</h2>
            <p className="text-gray-400 mb-6">
              Ao criar o Kure, nosso objetivo era oferecer assistência a pessoas que se sentem inseguras
              sobre progredir em direção aos seus objetivos corporais, especialmente após experimentar
              repetidos contratempos.
            </p>
            <p className="text-gray-400 mb-6">
              Com base em nossa experiência trabalhando com milhares de clientes, entendemos que o fator
              crucial que distingue tentativas bem-sucedidas das malsucedidas está em nossa mentalidade.
              A hipnoterapia é o método perfeito para abordar esse problema.
            </p>
            <p className="text-gray-400 mb-8">
              O poder de nossos pensamentos e a forte conexão entre nosso intestino e mente são as chaves
              para alcançar sucesso nas transformações corporais e nutricionais.
            </p>
            <div className="mb-8">
              <h4 className="font-semibold">Michele Rocha</h4>
              <p className="text-purple-400">Fundadora</p>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-12 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
            >
              Começar agora
            </button>
          </div>
         
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-[#1A1632] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-1 mb-2">
              <div className="text-2xl text-yellow-400">{'★'.repeat(5)}</div>
              <span className="ml-2 text-lg">4.6 / 5 (1000+ avaliações)</span>
            </div>
            <h2 className="text-4xl font-bold">O que nossos usuários dizem sobre o Kure?</h2>
          </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0A061E] p-6 rounded-xl"
              >
                <p className="text-sm text-gray-400 mb-2">{testimonial.date}</p>
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="mb-4">{testimonial.text}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={
                        index === 0
                          ? 'https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonials_thumbnail_1.69412d07.png&w=256&q=75'
                          : index === 1
                          ? 'https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonials_thumbnail_2.fff1b24f.png&w=256&q=75'
                          : 'https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestimonials_thumbnail_3.5bb2725f.png&w=256&q=75'
                      }
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    {testimonial.verified && (
                      <p className="text-xs text-gray-400">USUÁRIO VERIFICADO</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/checkout')}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-12 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
            >
              Começar agora
            </button>
          </div>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <p>© 2025 Kure. Todos os direitos reservados.</p>
          <p>Aviso: Os resultados podem variar de pessoa para pessoa</p>
        </div>
      </footer>
    </div>
  );
}

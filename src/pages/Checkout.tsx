import { useState, useEffect } from 'react';
import { CheckCircle, Gift, Shield, Star, X, HelpCircle, Activity, Smile, Frown, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate do react-router-dom

interface Plan {
  id: '7-day' | '1-month' | '3-month';
  title: string;
  price: number;
  originalPrice: number;
  pricePerDay: number;
  originalPricePerDay: number;
  popular?: boolean;
  hasGift?: boolean;
  link: string; // Adicione a propriedade 'link'
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const plans: Plan[] = [
  {
    id: '7-day',
    title: 'Plan de 7 dias',
    price: 9.59,
    originalPrice: 19.18,
    pricePerDay: 1.37,
    originalPricePerDay: 2.74,
    link: 'https://pay.hotmart.com/A77093528G?off=2lt5cjo1', 
  },
  {
    id: '1-month',
    title: 'Plan de 1 mês',
    price: 19.29,
    originalPrice: 38.58,
    pricePerDay: 0.64,
    originalPricePerDay: 1.28,
    popular: true,
    link: 'https://pay.hotmart.com/A77093528G?off=4fwr3k7w', 
  },
  {
    id: '3-month',
    title: 'Plan de 3 meses',
    price: 28.59,
    originalPrice: 57.19,
    pricePerDay: 0.31,
    originalPricePerDay: 0.63,
    hasGift: true,
    link: 'https://pay.hotmart.com/A77093528G?off=fjl5kp9h', 
  },
];

const features = [
  'App digital desarrollada por expertos en hipnosis, neurociencia y adicción alimentaria',
  'Introducción a las sesiones de hipnosis',
  'Sesiones diarias personalizadas de hipnoterapia antes de dormir',
  'Programa especial de 21 días para pérdida de peso acelerada',
  'Soporte al cliente 24/7',
  'Garantía de privacidad y seguridad',
  'Seguimiento del progreso'
];

const reviews = [
  {
    name: 'Júlia R.',
    date: '27 Jun 2024',
    text: 'Kure cambió mi cuerpo de maneras que nunca imaginé. ¡Lo recomiendo a todas las chicas que buscan algo diferente que realmente funcione!',
    image: 'https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcustomer_item_1.82f0a538.png&w=750&q=75',
    stars: 5
  },
  {
    name: 'José S.',
    date: '24 Jun 2024',
    text: 'Finalmente dejé de comer compulsivamente y comencé a hacer ejercicio. Kure fue lo único que funcionó para mí.',
    image: 'https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcustomer_item_2.309d2518.png&w=750&q=75',
    stars: 5
  },
  {
    name: 'Simone G.',
    date: '19 Jun 2024',
    text: 'Experiencia fenomenal. La app Kure es la principal razón detrás de mi cambio. Ser saludable ahora es tan fácil, viene de forma natural.',
    image: 'https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcustomer_item_3.6d5340ab.png&w=750&q=75',
    stars: 5
  }
];

const comparisonItems = [
  {
    label: 'Tasa de éxito',
    kure: { icon: Star, text: 'Más del 90%', color: 'text-green-400' },
    alternative: { icon: HelpCircle, text: 'Ampliamente impredecible', color: 'text-gray-500' }
  },
  {
    label: 'Precio',
    kure: { icon: CheckCircle, text: 'US$ 19.29*', color: 'text-green-400' },
    alternative: { icon: X, text: 'US$ 30–100 por consulta**', color: 'text-gray-500' }
  },
  {
    label: 'Enfoque en la causa raíz',
    kure: { icon: CheckCircle, text: 'Sí', color: 'text-green-400' },
    alternative: { icon: X, text: 'No', color: 'text-gray-500' }
  },
  {
    label: 'Impacto duradero',
    kure: { icon: CheckCircle, text: 'Sí', color: 'text-green-400' },
    alternative: { icon: X, text: 'No', color: 'text-gray-500' }
  },
  {
    label: 'Bajo esfuerzo necesario',
    kure: { icon: Shield, text: 'Ninguno', color: 'text-green-400' },
    alternative: { icon: Activity, text: 'Medio a alto', color: 'text-gray-500' }
  },
  {
    label: 'Experiencia del usuario',
    kure: { icon: Smile, text: 'Basado en el placer', color: 'text-green-400' },
    alternative: { icon: Frown, text: 'Basado en el sufrimiento', color: 'text-gray-500' }
  }
];


export default function Checkout() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedPlan, setSelectedPlan] = useState<Plan['id']>('1-month');
  const [selectedPlanBottom, setSelectedPlanBottom] = useState<Plan['id']>('1-month');
  
  const [timeLeft, setTimeLeft] = useState({ minutes: 15, seconds: 0 });
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
  {
    question: '¿Qué pasa después de hacer mi pedido?',
    answer: '¡Después de tu compra, comenzamos de inmediato! Usamos tus respuestas del cuestionario para crear un programa totalmente personalizado según tus necesidades específicas.',
    isOpen: false
  },
  {
    question: '¿Cómo cancelo o pido soporte?',
    answer: 'Las cancelaciones se gestionan directamente con Apple siguiendo estas instrucciones. Si aún tienes dudas, escríbenos a soporte@kureapp.com.br y te ayudaremos con gusto.',
    isOpen: false
  },
  {
    question: '¿Es segura la auto-hipnosis?',
    answer: '¡Sí! La autohipnosis es un método científicamente validado y completamente seguro. Todas las sesiones fueron desarrolladas por especialistas y siguen protocolos comprobados para lograr resultados profundos con total seguridad.',
    isOpen: false
  },
  {
    question: '¿El pago es único o es una suscripción?',
    answer: 'El pago es único, sin cargos futuros ni costos ocultos. Pagas solo una vez por el plan elegido (7 días, 1 mes o 3 meses) y tienes acceso completo al programa. No es una suscripción.',
    isOpen: false
  },
  {
    question: '¿Es segura la compra?',
    answer: '¡Totalmente! Usamos plataformas de pago 100 % seguras, con cifrado avanzado, igual que las grandes tiendas en línea. Además, tienes una garantía de reembolso total si decides que Kure no es para ti, te devolvemos tu dinero.',
    isOpen: false
  },
  {
    question: '¿Necesito conocimientos técnicos para usar Kure?',
    answer: '¡Para nada! La app está diseñada para que cualquier persona pueda usarla fácilmente. Con unos pocos clics, comienzas tu transformación.',
    isOpen: false
  },
  {
    question: '¿Qué pasa si me duermo durante la sesión?',
    answer: 'Es completamente normal y seguro quedarse dormida durante una sesión. De hecho, es una señal de que entraste en un estado profundo de relajación, donde la hipnosis es más efectiva. Si quieres repetir la sesión, puedes hacerlo fácilmente en la app de Kure.',
    isOpen: false
  }
]);


  const navigate = useNavigate(); // Inicialize useNavigate

  

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeOfDayMessage = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "esta mañana";
  if (hour >= 12 && hour < 18) return "esta tarde";
  return "esta noche";
};


  const formatTime = (num: number) => num.toString().padStart(2, '0');

const handleGetTopPlan = () => {
  const plan = plans.find(p => p.id === selectedPlan);
  if (plan?.link) {
    window.location.href = plan.link;
  } else {
    console.error('No se encontró el enlace del plan superior');
  }
};

const handleGetBottomPlan = () => {
  const plan = plans.find(p => p.id === selectedPlanBottom);
  if (plan?.link) {
    window.location.href = plan.link;
  } else {
    console.error('No se encontró el enlace del plan inferior');
  }
};




  const toggleFAQ = (index: number) => {
    setFaqItems(prev => prev.map((item, i) => ({
      ...item,
      isOpen: i === index ? !item.isOpen : false
    })));
  };

  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans-section');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPlansSection = (isBottom: boolean = false) => (
  <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto" id={isBottom ? "plans-section-bottom" : "plans-section"}>
    <div>
      <h2 className="text-xl mb-6 text-left">Selecciona tu plan:</h2>
      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => {
              if (isBottom) {
                setSelectedPlanBottom(plan.id);
                setCheckoutLink(plan.link);
              } else {
                setSelectedPlan(plan.id);
                setCheckoutLink(plan.link);
              }
            }}
            className={`bg-white rounded-xl p-6 relative cursor-pointer ${
              (isBottom ? selectedPlanBottom : selectedPlan) === plan.id ? 'ring-2 ring-purple-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-6 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
                Más popular
              </div>
            )}
            <div className="flex justify-between items-center text-gray-900">
              <div>
                <input
                  type="radio"
                  name={isBottom ? "plan-bottom" : "plan"}
                  id={`${plan.id}${isBottom ? '-bottom' : ''}`}
                  checked={(isBottom ? selectedPlanBottom : selectedPlan) === plan.id}
                  onChange={() => {
                    if (isBottom) {
                      setSelectedPlanBottom(plan.id);
                      setCheckoutLink(plan.link);
                    } else {
                      setSelectedPlan(plan.id);
                      setCheckoutLink(plan.link);
                    }
                  }}
                  className="mr-3 accent-purple-500"
                />
                <label htmlFor={`${plan.id}${isBottom ? '-bottom' : ''}`}>{plan.title}</label>
                <div className="mt-1">
                  <span className="line-through text-gray-500">US$ {plan.originalPrice}</span>{' '}
                  <span className="font-bold">US$ {plan.price}</span>
                </div>
              </div>
              <div className="text-right">
                <div>
                  <span className="line-through text-gray-500">US$ {plan.originalPricePerDay}</span>
                </div>
                <div>
                  <span className="font-bold">US$ {plan.pricePerDay}</span>
                  <span className="text-gray-500 text-sm">/día</span>
                </div>
              </div>
            </div>
            {plan.hasGift && (
              <div className="mt-4 w-full bg-gradient-to-r from-purple-500 to-teal-400 text-white rounded-full px-4 py-2 flex items-center justify-center">
                <Gift className="w-4 h-4 mr-2" />
                ¡Recibe un regalo secreto!
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="gradient"
        size="lg"
        className="w-full mt-6"
        onClick={isBottom ? handleGetBottomPlan : handleGetTopPlan}
      >
        Obtener mi plan
      </Button>
    



        <div className="text-center mt-4">
  <p className="text-sm mb-4">Pago seguro garantizado</p>
  <div className="flex justify-center items-center gap-4">
    <img
      src="https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsafe_checkout_brands.63412609.png&w=2048&q=75"
      alt="Medios de pago"
      className="h-8"
    />
  </div>
</div>

</div>

<div>
  <h2 className="text-xl mb-6 text-left">Todos los planes incluyen:</h2>
  <ul className="space-y-4 text-left">
    {features.map((feature, index) => (
      <li key={index} className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
        <span>{feature}</span>
      </li>
    ))}
  </ul>

  <br />
  <h2 className="text-xl mb-6 text-left">Si eliges el plan de 3 meses:</h2>

  <div className="mt-8 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-6">
    <div className="flex gap-4">
      <Gift className="w-12 h-12 text-purple-400" />
      <div>
        <h3 className="text-xl mb-2">Regalo secreto</h3>
        <p className="text-gray-300">
          El equipo de Kure quiere apoyarte en tu relación con la comida y en tu transformación, así que preparamos una sorpresa especial para ti.
        </p>
      </div>
    </div>
  </div>

  <div className="mt-8 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-6">
    <div className="flex gap-4">
      <Shield className="w-12 h-12 text-purple-400" />
      <div>
        <h3 className="text-xl mb-2">Garantía sin riesgo</h3>
        <p className="text-gray-300">
          Si no ves resultados ponte en contacto con nuestro equipo de soporte y te reembolsaremos tu plan en cualquier momento, sin hacer preguntas.
        </p>
      </div>
    </div>
  </div>
</div>

    </div>
  );

  return (
  <div className="min-h-screen bg-[#0F0A3C] text-white pt-16">
    <div className="fixed top-0 w-full py-4 text-center z-50" style={{ backgroundColor: '#ce5561' }}>
      <p>
        ¡Comienza tu primera sesión {getTimeOfDayMessage()}!<br />Tu descuento termina en:{' '}
        <span className="font-bold">
          {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </span>
      </p>
    </div>

    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5" />
        <p>Más de 345.000 programas vendidos.</p>
      </div>
      <h1 className="text-4xl font-serif mb-12 text-center max-w-2xl mx-auto">
        Obtén sesiones personalizadas de hipnoterapia para tu éxito en la pérdida de peso.
      </h1>

      {renderPlansSection()}

      <section className="mt-20 bg-[#0A0729] py-16 rounded-2xl">
        <h2 className="text-3xl mb-4 text-center">Kure App vs Alternativas</h2>
        <p className="mb-12 text-center max-w-3xl mx-auto">
          La mayoría ya ha probado métodos para bajar de peso basados en dietas o ejercicios.
          El enfoque de Kure es superior en todos los aspectos.
        </p>

        <div className="max-w-4xl mx-auto bg-[#1B1464] rounded-xl p-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <img src="https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.580966eb.png&w=640&q=75" alt="Logo de Kure" className="mx-auto mb-4" />
            </div>
            <div className="text-center">
              <h3 className="text-xl">Dietas o ejercicio</h3>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            {comparisonItems.map((item, index) => (
              <div key={index} className="grid grid-cols-[1fr_2fr_2fr] gap-8 py-4 border-b border-gray-700">
                <div className="text-white">{item.label}</div>
                <div className="flex items-center gap-2">
                  <item.kure.icon className={`w-6 h-6 ${item.kure.color}`} />
                  <span>{item.kure.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  <item.alternative.icon className={`w-6 h-6 ${item.alternative.color}`} />
                  <span>{item.alternative.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm text-gray-400">
            <p>** Precio promedio de personal trainer en Chile: US$ 25–60 por sesión.</p>
            <p className="ml-4">Precio promedio de nutricionista: US$ 30–80 por consulta.</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button variant="gradient" size="lg" onClick={scrollToPlans}>
            ¡Comprar ahora!
          </Button>
        </div>
      </section>
   


       <section className="mt-20">
  <div className="flex items-center justify-center gap-2 mb-8">
    <div className="flex">
      {[1, 2, 3, 4, 5].map(n => (
        <Star key={n} className="w-6 h-6 text-yellow-400 fill-current" />
      ))}
    </div>
    <span>4.6 / 5 (1000+ evaluaciones)</span>
  </div>

  <h2 className="text-3xl mb-12 text-center">
    Por qué los <span className="text-purple-400">clientes</span> aman la app <span className="text-purple-400">Kure</span>
  </h2>

  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {reviews.map((review, index) => (
      <div key={index} className="bg-[#1B1464] rounded-xl p-6">
        <div className="flex mb-2">
          {[...Array(review.stars)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-sm text-gray-300 mb-4">{review.date}</p>
        <img src={review.image} alt="Antes y Después" className="w-full rounded-lg mb-4" />
        <p className="mb-4">{review.text}</p>
        <div className="flex items-center gap-2">
          <span className="font-medium">{review.name}</span>
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-gray-300">USUARIO VERIFICADO</span>
        </div>
      </div>
    ))}
  </div>

  <div className="text-center mt-8">
    <Button variant="gradient" size="lg" onClick={scrollToPlans}>
      ¡Comprar ahora!
    </Button>
  </div>
</section>

<section className="mt-20 bg-[#1B1464] rounded-xl p-8 max-w-6xl mx-auto">
  <div className="grid md:grid-cols-2 gap-8 items-center">
    <div>
      <h2 className="text-3xl mb-4">
        Elige el plan de 3 meses y recibe un regalo SECRETO de US$ 19.99
      </h2>
      <p className="text-gray-300">
        El equipo de Kure quiere apoyar tu relación con la comida y tu transformación, ¡así que recibe esta sorpresa GRATIS!
      </p>
    </div>
    <div className="flex justify-center">
      <Gift className="w-32 h-32 text-purple-400" />
    </div>
  </div>
</section>

<section className="mt-20">
  <div className="flex items-center justify-center gap-2 mb-4">
    <CheckCircle className="w-5 h-5" />
    <p>Más de 345.000 programas vendidos.</p>
  </div>

  <h1 className="text-4xl font-serif mb-12 text-center max-w-2xl mx-auto">
    Obtén sesiones personalizadas de hipnoterapia para tu éxito en la pérdida de peso.
  </h1>

  {renderPlansSection(true)}
</section>

<section className="mt-20 bg-[#1B1464] rounded-xl p-8 max-w-6xl mx-auto">
  <div className="grid md:grid-cols-2 gap-8 items-center">
    <div>
      <h2 className="text-3xl mb-4">
        ¡Tu primera sesión Kure puede comenzar {getTimeOfDayMessage()}!
      </h2>

      <Button variant="gradient" size="lg" onClick={scrollToPlans}>
        ¡Comprar ahora!
      </Button>
    </div>
    <div className="flex justify-center">
      <img src="https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffirst_session_image.757e34fc.png&w=3840&q=75" alt="Mujer relajándose con auriculares" className="rounded-lg" />
    </div>
  </div>
</section>


        <section className="mt-20 max-w-4xl mx-auto">
  <h2 className="text-3xl mb-8 text-center">Lo que más nos preguntan:</h2>
  <div className="space-y-4">
    {faqItems.map((item, index) => (
      <div key={index} className="bg-[#1B1464] rounded-xl">
        <button
          className="w-full px-6 py-4 flex items-center justify-between text-left"
          onClick={() => toggleFAQ(index)}
        >
          <h3 className="text-xl">{item.question}</h3>
          {item.isOpen ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </button>
        {item.isOpen && (
          <div className="px-6 pb-4">
            <p className="text-gray-300">{item.answer}</p>
          </div>
        )}
      </div>
    ))}
  </div>
</section>

<footer className="mt-20 py-8 border-t border-gray-800">
  <div className="max-w-6xl mx-auto text-center">
    <p className="text-gray-400">© 2025 Kure App. Todos los derechos reservados.</p>
  </div>
</footer>

      </div>
    </div>
  );
}

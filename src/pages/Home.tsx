import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { useQuizStore } from '../store/quiz';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const setGender = useQuizStore((state) => state.setGender);

  const handleGenderSelect = (gender: string) => {
    setGender(gender);
    navigate('/quiz');
  };

  const defaultLocale = 'es-CL';
  let currentLocale: string = localStorage.getItem('locale') || defaultLocale;

  function setLocale(newLocale: string): void {
    currentLocale = newLocale;
    localStorage.setItem('locale', newLocale);
    console.log(`Idioma cambiado a: ${currentLocale}`);
  }

  useEffect(() => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A061E] text-white flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="flex justify-center" style={{ marginTop: '-20px', marginBottom: '10px' }}>
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8" />
            <span className="text-2xl font-semibold">kure</span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-8">
          <img
            src="https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome_hero_image_mobile.303035ac.png&w=1920&q=75"
            alt="Cerebro con audífonos"
            className="w-50 h-50 object-cover mb-8" style={{ marginBottom: '0' }}
          />

          <h1 className="text-4xl font-semibold mb-4" style={{ fontSize: '35px', width: '350px', marginBottom: '0' }}>
            Banda Gástrica Virtual con Hipnoterapia
          </h1>
          <b style={{ marginBottom: '0', color: 'white' }}><p className="text-gray-400 mb-8" style={{ marginBottom: '0', color: 'white' }}>
            Sin ejercicios ni dietas extremas: solo 15 minutos al día para empezar a ver resultados reales
          </p></b>

          <div className="flex flex-col gap-4 w-full max-w-md">
            <b style={{ marginBottom: '0' }}><p className="text-lg mb-4" style={{ marginBottom: '0' }}>Empieza eligiendo tu género:</p></b>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleGenderSelect('male')}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 transition-opacity" style={{ height: '60px' }}
              >
                Masculino
              </button>
              <button
                onClick={() => handleGenderSelect('female')}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 transition-opacity" style={{ height: '60px' }}
              >
                Femenino
              </button>
            </div>
          </div>

          <p className="text-gray-400 mb-8" style={{ marginBottom: '0', color: 'white' }}>
            ¡98% de satisfacción!* basado en entrevistas reales
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" style={{ marginTop: '0' }}>
            <div className="p-6 border border-gray-800 rounded-lg" style={{ marginBottom: '-20px' }}>
              <b style={{ marginBottom: '-20px' }}><p className="text-sm italic mb-4" style={{ marginBottom: '-20px' }}>
                "71% más de peso perdido con hipnosis"
              </p></b>
              <img src="https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome_card_1.cff37dae.png&w=256&q=75" alt="Logo MNT" className="h-8" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '30px' }} />
            </div>
            <div className="p-6 border border-gray-800 rounded-lg" style={{ marginBottom: '-20px' }}>
              <b style={{ marginBottom: '-20px' }}><p className="text-sm italic mb-4" style={{ marginBottom: '-20px' }}>
                "La hipnoterapia ofrece ventajas frente a otros métodos de pérdida de peso"
              </p></b>
              <img src="https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome_card_2.61ead2ab.png&w=256&q=75" alt="Logo Healthline" className="h-8" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '30px' }} />
            </div>
            <div className="p-6 border border-gray-800 rounded-lg" style={{ marginBottom: '-20px' }}>
              <b style={{ marginBottom: '-20px' }}><p className="text-sm italic mb-4" style={{ marginBottom: '-20px' }}>
                "La hipnoterapia ha sido un secreto bien guardado para perder peso"
              </p></b>
              <img src="https://kureapp.health/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome_card_3.35cd9929.png&w=256&q=75" alt="Logo Oprah" className="h-8" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '30px' }} />
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-gray-800 mt-16 py-6">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            <span>kure</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Opiniones</a>
            <a href="#" className="hover:text-white">Gestionar Suscripción</a>
            <a href="#" className="hover:text-white">Contacto</a>
            <a href="#" className="hover:text-white">Política de Privacidad</a>
            <a href="#" className="hover:text-white">Términos y Condiciones</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { create } from 'zustand';

interface QuizState {
  currentStep: number;
  totalSteps: number;
  gender: string | null;
  answers: Record<string, any>;
  loading: boolean;
  height: number | null;
  weight: number | null;
  targetWeight: number | null;
  age: number | null;
  email: string | null;
  setGender: (gender: string) => void;
  setAnswer: (question: string, answer: any) => void;
  nextStep: () => void;
  previousStep: () => void;
  setLoading: (loading: boolean) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  setTargetWeight: (weight: number) => void;
  setAge: (age: number) => void;
  setEmail: (email: string) => void;
  resetQuiz: () => void;
}

const initialState = {
  currentStep: 1,
  totalSteps: 20,
  gender: null,
  answers: {},
  loading: false,
  height: null,
  weight: null,
  targetWeight: null, // Inicializado como null
  age: null,
  email: null,
};

export const useQuizStore = create<QuizState>((set) => ({
  ...initialState,
  setGender: (gender) => set({ gender }),
  setAnswer: (question, answer) =>
    set((state) => ({
      answers: { ...state.answers, [question]: answer },
      currentStep: state.currentStep + 1
    })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setLoading: (loading) => set({ loading }),
  setHeight: (height) => set({ height }),
  setWeight: (weight) => set({ weight }),
  setTargetWeight: (weight) => set({ targetWeight: weight }),
  setAge: (age) => set({ age }),
  setEmail: (email) => set({ email }),
  resetQuiz: () => set(initialState),
}));


import React, { useState, useEffect } from 'react';
import { SurveyData } from '../types';

interface SurveyFormProps {
  onSubmit: (data: SurveyData) => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SurveyData>({
    classLevel: '',
    gender: '',
    definition: '',
    reasons: [],
    knowsHarm: '',
    seenUsers: '',
    actionIfOffered: '',
    schoolInfoSufficient: '',
    preventionIdea: '',
    everSmoked: '',
    offeredCigarettes: '',
    offeredDrugs: '',
    offerEnvironment: '',
    futureImpact: '',
    helpAvoid: '',
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (name: keyof SurveyData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => {
      const newReasons = prev.reasons.includes(value)
        ? prev.reasons.filter(r => r !== value)
        : [...prev.reasons, value];
      return { ...prev, reasons: newReasons };
    });
  };

  const nextStep = () => {
    if (currentStep < 14) setCurrentStep(prev => prev + 1);
    else onSubmit(formData);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const steps = [
    {
      id: "classLevel",
      question: "1. Сіз қай сыныпта оқисыз?",
      type: "choice",
      options: ["9-сынып", "10-сынып"]
    },
    {
      id: "gender",
      question: "2. Жынысыңыз қандай?",
      type: "choice",
      options: ["Ер", "Қыз", "Айтқым келмейді"]
    },
    {
      id: "definition",
      question: "3. «Нашақорлық» деген сөзді қалай түсінесіз?",
      type: "text",
      placeholder: "Өз ойыңызды жазыңыз..."
    },
    {
      id: "reasons",
      question: "4. Жасөспірімдер не себепті есірткіге әуестенуі мүмкін?",
      type: "multi",
      options: ['Қызығушылық', 'Достардың әсері', 'Отбасылық қиындықтар', 'Стресс', 'Білмеймін', 'Басқа себеп']
    },
    {
      id: "knowsHarm",
      question: "5. Есірткінің адам денсаулығына зиян екенін білесіз бе?",
      type: "choice",
      options: ["Иә", "Жоқ", "Толық білмеймін"]
    },
    {
      id: "seenUsers",
      question: "6. Ортаңызда есірткі қолданатын адамдарды көрдіңіз бе?",
      type: "choice",
      options: ["Иә", "Жоқ", "Айтқым келмейді"]
    },
    {
      id: "actionIfOffered",
      question: "7. Егер сізге есірткі ұсынылса, не істер едіңіз?",
      type: "choice",
      options: ['Бас тартамын', 'Үлкендерге айтамын', 'Достарыммен ақылдасамын', 'Білмеймін']
    },
    {
      id: "schoolInfoSufficient",
      question: "8. Мектепте алдын алу туралы ақпарат жеткілікті ме?",
      type: "choice",
      options: ["Иә", "Жоқ", "Жартылай"]
    },
    {
      id: "preventionIdea",
      question: "9. Нашақорлықтың алдын алу үшін не істеу керек деп ойлайсыз?",
      type: "text",
      placeholder: "Сіздің ұсынысыңыз..."
    },
    {
      id: "everSmoked",
      question: "10. Сіз темекі шегіп көрдіңіз бе?",
      type: "choice",
      options: ["Иә", "Жоқ"]
    },
    {
      id: "offeredCigarettes",
      question: "11. Сізге темекі шегіп көруді бұрын біреу ұсынды ма?",
      type: "choice",
      options: ["Иә", "Жоқ", "Есімде жоқ"]
    },
    {
      id: "offeredDrugs",
      question: "12. Сізге есірткі немесе тыйым салынған заттар ұсынылды ма?",
      type: "choice",
      options: ["Иә", "Жоқ", "Айтқым келмейді"]
    },
    {
      id: "offerEnvironment",
      question: "13. Мұндай ұсыныстар көбіне қай ортада кездеседі?",
      type: "choice",
      options: ["Достар арасында", "Көшеде", "Әлеуметтік желіде", "Мектептен тыс ортада", "Кездеспейді"]
    },
    {
      id: "futureImpact",
      question: "14. Зиянды әдеттер адамның болашағына әсер ете ме?",
      type: "choice",
      options: ["Иә, қатты әсер етеді", "Аздап әсер етеді", "Әсер етпейді"]
    },
    {
      id: "helpAvoid",
      question: "15. Зиянды әдеттерден сақтану үшін не көмектеседі?",
      type: "text",
      placeholder: "Өз пікіріңіз..."
    }
  ];

  const currentQ = steps[currentStep];

  const canProceed = () => {
    const val = formData[currentQ.id as keyof SurveyData];
    if (currentQ.type === 'choice') return val !== '';
    if (currentQ.type === 'multi') return (val as string[]).length > 0;
    return true; // text can be optional
  };

  return (
    <div className="p-8 md:p-12 flex flex-col min-h-[550px] animate-in fade-in slide-in-from-bottom-8 duration-500">
      
      {/* Прогресс-бар */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">
            Сұрақ {currentStep + 1} / 15
          </span>
          <span className="text-xs font-bold text-gray-300">
            {Math.round(((currentStep + 1) / 15) * 100)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / 15) * 100}%` }}
          />
        </div>
      </div>

      {/* Сұрақ мәтіні */}
      <div className="flex-1 space-y-8">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
          {currentQ.question}
        </h2>

        {/* Жауап нұсқалары */}
        <div className="space-y-3">
          {currentQ.type === 'choice' && currentQ.options?.map(opt => (
            <button
              key={opt}
              onClick={() => {
                handleChange(currentQ.id as keyof SurveyData, opt);
                setTimeout(nextStep, 300); // Авто-өту
              }}
              className={`w-full p-5 text-left rounded-2xl border-2 transition-all font-bold text-lg flex items-center justify-between group ${formData[currentQ.id as keyof SurveyData] === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-indigo-200 text-gray-600'}`}
            >
              {opt}
              <i className={`fa-solid fa-circle-check transition-opacity ${formData[currentQ.id as keyof SurveyData] === opt ? 'opacity-100' : 'opacity-0 group-hover:opacity-20'}`}></i>
            </button>
          ))}

          {currentQ.type === 'multi' && currentQ.options?.map(opt => (
            <button
              key={opt}
              onClick={() => handleCheckboxChange(opt)}
              className={`w-full p-4 text-left rounded-2xl border-2 transition-all font-bold flex items-center space-x-4 ${formData.reasons.includes(opt) ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-gray-100 text-gray-500'}`}
            >
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.reasons.includes(opt) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-200'}`}>
                {formData.reasons.includes(opt) && <i className="fa-solid fa-check text-white text-xs"></i>}
              </div>
              <span>{opt}</span>
            </button>
          ))}

          {currentQ.type === 'text' && (
            <textarea
              autoFocus
              value={formData[currentQ.id as keyof SurveyData] as string}
              onChange={(e) => handleChange(currentQ.id as keyof SurveyData, e.target.value)}
              className="w-full p-6 border-2 border-gray-100 rounded-[2rem] focus:border-indigo-400 focus:ring-8 focus:ring-indigo-50 outline-none h-40 transition-all text-lg font-medium"
              placeholder={currentQ.placeholder}
            />
          )}
        </div>
      </div>

      {/* Навигация */}
      <div className="mt-12 flex items-center space-x-4">
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="p-5 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        )}
        <button
          onClick={nextStep}
          disabled={!canProceed()}
          className={`flex-1 py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 ${canProceed() ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
        >
          {currentStep === 14 ? 'ЖІБЕРУ' : 'КЕЛЕСІ'}
        </button>
      </div>
    </div>
  );
};

export default SurveyForm;

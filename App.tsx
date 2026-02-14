
import React, { useState } from 'react';
import { SurveyData, SurveyStep } from './types';
import SurveyForm from './components/SurveyForm';
import ResultView from './components/ResultView';

// Сіз берген нақты сілтеме орнатылды:
const FORMSPREE_URL = 'https://formspree.io/f/xdalggqk';

const App: React.FC = () => {
  const [step, setStep] = useState<SurveyStep>(SurveyStep.START);
  const [surveyResults, setSurveyResults] = useState<SurveyData | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleStart = () => setStep(SurveyStep.FORM);

  const handleSubmit = async (data: SurveyData) => {
    setIsSending(true);
    setSurveyResults(data);
    setStep(SurveyStep.SUBMITTING);
    
    try {
      // Деректерді жіберу (пайдаланушыға көрсетілмейді)
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Сауалнама нәтижесі: ${data.classLevel} (${data.gender})`,
          сыныбы: data.classLevel,
          жынысы: data.gender,
          анықтамасы: data.definition,
          себептері: data.reasons.join(", "),
          зиян_екенін_біле_ме: data.knowsHarm,
          ортасында_көрді_ме: data.seenUsers,
          ұсынылса_не_істейді: data.actionIfOffered,
          мектептегі_ақпарат: data.schoolInfoSufficient,
          алдын_алу_ұсынысы: data.preventionIdea,
          темекі_шегіп_көрді_ме: data.everSmoked,
          темекі_ұсынылды_ма: data.offeredCigarettes,
          есірткі_ұсынылды_ма: data.offeredDrugs,
          ұсыныс_ортасы: data.offerEnvironment,
          болашаққа_әсері: data.futureImpact,
          сақтану_үшін_көмек: data.helpAvoid
        }),
      });
      
      // Талдаудың визуалды әсері үшін азғантай кідіріс
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      // Қате болса да, оқушыға білдірмейміз, тек консольге жазамыз
      console.warn("Silent submission error:", error);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsSending(false);
      setStep(SurveyStep.RESULT);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center justify-center p-4 text-slate-900">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-white relative">
        
        {step === SurveyStep.START && (
          <div className="p-12 text-center space-y-10 animate-in fade-in zoom-in duration-700">
            <div className="relative inline-block">
              <div className="w-28 h-28 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl transition-transform hover:scale-105 duration-500">
                <i className="fa-solid fa-file-shield text-5xl"></i>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-gray-900 leading-tight">
                Анонимді сауалнама
              </h1>
              <p className="text-gray-500 text-lg font-medium">
                15 сұрақ • 3 минут • 100% Құпия
              </p>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl rounded-2xl transition-all shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] active:scale-95 flex items-center justify-center"
            >
              БАСТАУ <i className="fa-solid fa-arrow-right ml-3"></i>
            </button>
            
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Сіздің жеке басыңыз құпия сақталады
            </p>
          </div>
        )}

        {step === SurveyStep.FORM && (
          <SurveyForm onSubmit={handleSubmit} />
        )}

        {step === SurveyStep.SUBMITTING && (
          <div className="p-24 text-center space-y-8 flex flex-col items-center justify-center min-h-[500px]">
            <div className="w-24 h-24 border-8 border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-gray-800">Деректер өңделуде</h2>
              <p className="text-gray-500 font-medium">AI талдау жасап жатыр, күте тұрыңыз...</p>
            </div>
          </div>
        )}

        {step === SurveyStep.RESULT && surveyResults && (
          <ResultView data={surveyResults} onReset={() => setStep(SurveyStep.START)} />
        )}
      </div>
    </div>
  );
};

export default App;

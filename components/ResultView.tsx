
import React, { useEffect, useState } from 'react';
import { SurveyData } from '../types';
import { getAIInsight } from '../services/geminiService';

interface ResultViewProps {
  data: SurveyData;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ data, onReset }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      const text = await getAIInsight(data);
      setInsight(text);
      setLoading(false);
    };
    fetchInsight();
  }, [data]);

  return (
    <div className="p-10 text-center animate-in fade-in duration-1000">
      <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-100">
        <i className="fa-solid fa-check-double text-4xl"></i>
      </div>
      
      <div className="mb-10 space-y-3">
        <h2 className="text-3xl font-black text-gray-900 leading-tight">Рақмет, сауалнама аяқталды!</h2>
        <p className="text-gray-500 font-medium">
          Сіздің пікіріңіз біздің зерттеуіміз үшін өте маңызды.
        </p>
      </div>

      <div className="text-left bg-indigo-900 rounded-[2.5rem] p-8 text-white mb-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
        
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300 mb-6 flex items-center">
          <i className="fa-solid fa-sparkles mr-2"></i>
          Gemini AI Психолог кеңесі
        </h3>
        
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-indigo-800 rounded w-3/4"></div>
            <div className="h-4 bg-indigo-800 rounded w-full"></div>
            <div className="h-32 bg-indigo-800/50 rounded-3xl w-full"></div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <p className="text-indigo-50 leading-relaxed text-base italic">
              "{insight}"
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={onReset}
          className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-lg active:scale-95"
        >
          ЖАҢА САУАЛНАМА БАСТАУ
        </button>
        <button 
          onClick={() => window.print()}
          className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors"
        >
          Нәтижені басып шығару (PDF)
        </button>
      </div>
    </div>
  );
};

export default ResultView;

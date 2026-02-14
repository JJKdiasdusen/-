
import { GoogleGenAI } from "@google/genai";
import { SurveyData } from "../types";

export const getAIInsight = async (data: SurveyData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Сен - жасөспірімдерге арналған психолог және салауатты өмір салты маманысың. 
    Төмендегі сауалнама жауаптарына сүйеніп, қолданушыға (9-10 сынып оқушысы) қысқаша, жігерлендіретін және пайдалы кеңес жаз. 
    Жауап тек қазақ тілінде болуы керек. 
    
    Сауалнама мәліметтері (15 сұрақ бойынша):
    1. Сыныбы: ${data.classLevel}
    2. Жынысы: ${data.gender}
    3. Нашақорлық түсінігі: ${data.definition}
    4. Себептері: ${data.reasons.join(", ")}
    5. Зияны туралы білімі: ${data.knowsHarm}
    6. Ортасында көрді ме: ${data.seenUsers}
    7. Ұсынылса не істейді: ${data.actionIfOffered}
    8. Мектеп ақпараты: ${data.schoolInfoSufficient}
    9. Алдын алу ұсынысы: ${data.preventionIdea}
    10. Темекі шегіп көрді ме: ${data.everSmoked}
    11. Темекі ұсынылды ма: ${data.offeredCigarettes}
    12. Есірткі ұсынылды ма: ${data.offeredDrugs}
    13. Ұсыныс ортасы: ${data.offerEnvironment}
    14. Болашаққа әсері туралы ойы: ${data.futureImpact}
    15. Сақтануға не көмектеседі: ${data.helpAvoid}
    
    Жауабыңда:
    - Қолданушыға ашық жауаптары үшін алғыс айт.
    - Оның ұстанымына (мысалы, бас тартуға дайындығына) қолдау көрсет.
    - Психологиялық тұрғыдан 2-3 нақты кеңес бер (мысалы, "жоқ" деп айту дағдысы немесе стресспен күресу).
    - Жарқын болашақ тіле.
    Жауапты мейірімді, заманауи жасөспірім тілінде (бірақ сыпайы) жаз. Markdown қолданба.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Кешіріңіз, қазіргі уақытта кеңес алу мүмкін емес.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Техникалық қателік орын алды. Бірақ сенің салауатты өмір салтын таңдағаның өте маңызды!";
  }
};

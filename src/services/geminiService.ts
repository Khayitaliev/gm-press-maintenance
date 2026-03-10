import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const getAIResponse = async (prompt: string, history: any[] = []) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: 'user', parts: [{ text: `Siz UzAuto Motors Press 3 bo'limi uchun texnik yordamchisiz. Maintenance xodimlariga o'zbek tilida texnik maslahatlar bering. Muammo: ${prompt}` }] }
      ],
      config: {
        systemInstruction: "Siz professional texnik muhandissiz. Javoblaringiz aniq, qisqa va o'zbek tilida bo'lsin.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Kechirasiz, AI bilan bog'lanishda xatolik yuz berdi.";
  }
};

export const speakText = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Using a clear voice
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
      await audio.play();
    }
  } catch (error) {
    console.error("TTS Error:", error);
  }
};

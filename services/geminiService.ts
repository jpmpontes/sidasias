
import { GoogleGenAI, Type } from "@google/genai";
import { IATool, ToolCategory, PricingType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const discoverNewTools = async (): Promise<{tools: IATool[], sources: any[]}> => {
  const prompt = `
    Aja como um CISO. Encontre 10 ferramentas de IA para Segurança da Informação (Ataque ou Defesa) que são populares ou novas.
    Retorne uma lista JSON seguindo exatamente este formato para cada item:
    {
      "name": "Nome da Ferramenta",
      "category": "Ataque" | "Defesa" | "Geral/Pesquisa",
      "description": "Explicação técnica em português",
      "url": "https://link-da-ferramenta.com",
      "pricing": "Grátis" | "Pago" | "Freemium" | "Open Source",
      "features": ["feature 1", "feature 2"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              category: { type: Type.STRING },
              description: { type: Type.STRING },
              url: { type: Type.STRING },
              pricing: { type: Type.STRING },
              features: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "category", "description", "url", "pricing", "features"]
          }
        }
      }
    });

    const toolsData = JSON.parse(response.text || '[]');
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const processedTools: IATool[] = toolsData.map((t: any, index: number) => ({
      ...t,
      id: `ai-${Date.now()}-${index}`,
      addedAt: new Date().toLocaleDateString('pt-BR')
    }));

    return { tools: processedTools, sources };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

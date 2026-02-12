
import { GoogleGenAI, Type } from "@google/genai";
import { IATool, ToolCategory, PricingType } from "../types";

// Note: A API key é injetada automaticamente do ambiente
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const discoverNewTools = async (): Promise<{tools: IATool[], sources: any[]}> => {
  const prompt = `
    Aja como um CISO e pesquisador de Segurança da Informação. 
    Encontre 10 ferramentas de Inteligência Artificial para InfoSec que sejam RECENTES ou que receberam atualizações importantes de IA nos últimos meses.
    Divida entre Ataque (Offensive Security), Defesa (SOC, EDR, AppSec) e Geral (Pesquisa, Forense, Criptografia).
    
    Retorne uma lista JSON seguindo exatamente este formato para cada item:
    {
      "name": "Nome exato da ferramenta",
      "category": "Ataque" | "Defesa" | "Geral/Pesquisa",
      "description": "Explicação técnica detalhada do que a ferramenta faz em português",
      "url": "https://link-oficial-ou-github.com",
      "pricing": "Grátis" | "Pago" | "Freemium" | "Open Source",
      "priceDetails": "Detalhes sobre valores se disponíveis, ou 'Sob consulta'",
      "features": ["feature principal 1", "feature principal 2", "feature 3"]
    }
    
    Seja específico e evite ferramentas generalistas como 'ChatGPT' a menos que tenham uma versão focada em segurança.
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
              priceDetails: { type: Type.STRING },
              features: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "category", "description", "url", "pricing", "features"]
          }
        }
      }
    });

    const text = response.text || '[]';
    const toolsData = JSON.parse(text);
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const processedTools: IATool[] = toolsData.map((t: any, index: number) => ({
      ...t,
      id: `ai-${Date.now()}-${index}`,
      addedAt: new Date().toISOString().split('T')[0]
    }));

    return { tools: processedTools, sources };
  } catch (error) {
    console.error("Error discovering tools:", error);
    throw error;
  }
};

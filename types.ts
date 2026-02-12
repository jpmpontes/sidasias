
export enum ToolCategory {
  ATTACK = 'Ataque',
  DEFENSE = 'Defesa',
  GENERAL = 'Geral/Pesquisa'
}

export enum PricingType {
  FREE = 'Grátis',
  PAID = 'Pago',
  FREEMIUM = 'Freemium',
  OPEN_SOURCE = 'Open Source'
}

export interface IATool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  url: string;
  pricing: PricingType;
  priceDetails?: string;
  addedAt: string;
  features: string[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

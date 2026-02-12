
import { ToolCategory, PricingType, IATool } from './types.ts';

export const INITIAL_TOOLS: IATool[] = [
  {
    id: '1',
    name: 'PentestGPT',
    category: ToolCategory.ATTACK,
    description: 'Framework interativo que utiliza LLMs para guiar testes de invasão, sugerindo vetores de ataque e analisando outputs de ferramentas.',
    url: 'https://github.com/GreyD0ne/PentestGPT',
    pricing: PricingType.OPEN_SOURCE,
    addedAt: '2023-10-01',
    features: ['Pentest estruturado', 'Sugestão de Exploit']
  },
  {
    id: '2',
    name: 'Microsoft Copilot for Security',
    category: ToolCategory.DEFENSE,
    description: 'IA generativa que ajuda defensores a responder a incidentes na velocidade da IA, integrando-se nativamente com Sentinel e Defender.',
    url: 'https://www.microsoft.com/en-us/security/business/ai-machine-learning/microsoft-copilot-for-security',
    pricing: PricingType.PAID,
    priceDetails: 'Modelo por SCU',
    addedAt: '2024-01-15',
    features: ['Geração de relatórios SOC', 'Threat Hunting']
  },
  {
    id: '3',
    name: 'CrowdStrike Charlotte AI',
    category: ToolCategory.DEFENSE,
    description: 'IA que permite interagir com dados do Falcon via linguagem natural, democratizando a busca por ameaças.',
    url: 'https://www.crowdstrike.com/platform/charlotte-ai/',
    pricing: PricingType.PAID,
    addedAt: '2023-09-12',
    features: ['Consultas em linguagem natural', 'Asset Discovery']
  },
  {
    id: '4',
    name: 'SentinelOne Purple AI',
    category: ToolCategory.DEFENSE,
    description: 'Assistente de IA que unifica a detecção, resposta e caça a ameaças em toda a plataforma Singularity.',
    url: 'https://www.sentinelone.com/platform/purple-ai/',
    pricing: PricingType.PAID,
    addedAt: '2024-03-01',
    features: ['Semantic Search', 'Remediação automatizada']
  },
  {
    id: '5',
    name: 'Snyk Code AI',
    category: ToolCategory.DEFENSE,
    description: 'Mecanismo de SAST que usa IA treinada em código real para encontrar falhas e sugerir patches automáticos.',
    url: 'https://snyk.io/product/snyk-code/',
    pricing: PricingType.FREEMIUM,
    addedAt: '2023-11-05',
    features: ['Auto-fix', 'Integração com IDE']
  },
  {
    id: '6',
    name: 'WormGPT',
    category: ToolCategory.ATTACK,
    description: 'IA baseada em GPT sem restrições éticas, usada para criação de campanhas de phishing e malware avançado.',
    url: 'https://wormgpt.ai/',
    pricing: PricingType.PAID,
    addedAt: '2023-07-15',
    features: ['Malware Creation', 'Advanced Phishing']
  },
  {
    id: '7',
    name: 'VirusTotal Code Insight',
    category: ToolCategory.GENERAL,
    description: 'Utiliza LLMs para desconstruir e explicar o que scripts suspeitos (PowerShell, JS) realmente fazem.',
    url: 'https://www.virustotal.com/',
    pricing: PricingType.FREEMIUM,
    addedAt: '2023-04-20',
    features: ['Explicação de scripts', 'IOC Extraction']
  },
  {
    id: '8',
    name: 'Recorded Future AI',
    category: ToolCategory.GENERAL,
    description: 'Utiliza IA para analisar dados da surface e dark web, fornecendo inteligência de ameaças em tempo real.',
    url: 'https://www.recordedfuture.com/platform/ai',
    pricing: PricingType.PAID,
    addedAt: '2023-12-05',
    features: ['Threat Intelligence', 'Dark Web Monitoring']
  }
];


import { ToolCategory, PricingType, IATool } from './types';

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
  },
  {
    id: '9',
    name: 'Darktrace HEAL',
    category: ToolCategory.DEFENSE,
    description: 'IA de auto-aprendizagem que simula ataques e ajuda na recuperação de sistemas após incidentes.',
    url: 'https://darktrace.com/products/heal',
    pricing: PricingType.PAID,
    addedAt: '2023-11-01',
    features: ['Auto-remediação', 'Cyber Resilience']
  },
  {
    id: '10',
    name: 'Checkmarx AI Guided Remediation',
    category: ToolCategory.DEFENSE,
    description: 'Guia desenvolvedores na correção de falhas de segurança fornecendo exemplos de código e explicações contextuais.',
    url: 'https://checkmarx.com/',
    pricing: PricingType.PAID,
    addedAt: '2023-08-20',
    features: ['AppSec assistida', 'Filtro de falsos positivos']
  },
  {
    id: '11',
    name: 'Wiz AI-SPM',
    category: ToolCategory.DEFENSE,
    description: 'IA para Postura de Segurança em Nuvem (CSPM) que prioriza riscos baseada em probabilidade de exploração.',
    url: 'https://www.wiz.io/solutions/ai-spm',
    pricing: PricingType.PAID,
    addedAt: '2024-02-15',
    features: ['Cloud Security', 'Priorização de riscos']
  },
  {
    id: '12',
    name: 'Tessian',
    category: ToolCategory.DEFENSE,
    description: 'Segurança de e-mail que usa IA para prevenir exfiltração de dados acidental e ataques de phishing direcionados.',
    url: 'https://www.tessian.com/',
    pricing: PricingType.PAID,
    addedAt: '2023-05-01',
    features: ['Email Security', 'DLP']
  },
  {
    id: '13',
    name: 'Hadra AI',
    category: ToolCategory.ATTACK,
    description: 'Ferramenta de enumeração inteligente que usa IA para identificar vulnerabilidades de injeção de prompt em outras IAs.',
    url: 'https://github.com/hadra-ai',
    pricing: PricingType.OPEN_SOURCE,
    addedAt: '2024-04-05',
    features: ['AI Red Teaming', 'Prompt Injection Testing']
  },
  {
    id: '14',
    name: 'Vectra AI',
    category: ToolCategory.DEFENSE,
    description: 'Deteção e Resposta de Rede (NDR) que utiliza IA para rastrear o movimento lateral de atacantes.',
    url: 'https://www.vectra.ai/',
    pricing: PricingType.PAID,
    addedAt: '2023-09-01',
    features: ['Network Detection', 'Lateral Movement Tracking']
  },
  {
    id: '15',
    name: 'Ironscales',
    category: ToolCategory.DEFENSE,
    description: 'Combina IA com feedback humano para detectar e remover e-mails de phishing avançados de forma automática.',
    url: 'https://ironscales.com/',
    pricing: PricingType.PAID,
    addedAt: '2023-07-20',
    features: ['Phishing remediation', 'Huma-AI']
  }
];

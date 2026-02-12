
import { ToolCategory, PricingType, IATool } from './types';

export const INITIAL_TOOLS: IATool[] = [
  {
    id: '1',
    name: 'PentestGPT',
    category: ToolCategory.ATTACK,
    description: 'Framework interativo que utiliza LLMs para guiar testes de invasão, sugerindo vetores de ataque e analisando outputs de ferramentas como Nmap e Burp.',
    url: 'https://github.com/GreyD0ne/PentestGPT',
    pricing: PricingType.OPEN_SOURCE,
    addedAt: '2023-10-01',
    features: ['Pentest estruturado', 'Análise de contexto', 'Sugestão de Exploit']
  },
  {
    id: '2',
    name: 'Microsoft Copilot for Security',
    category: ToolCategory.DEFENSE,
    description: 'Plataforma de IA generativa que ajuda defensores a responder a incidentes na velocidade da IA, integrando-se nativamente com Sentinel e Defender.',
    url: 'https://www.microsoft.com/en-us/security/business/ai-machine-learning/microsoft-copilot-for-security',
    pricing: PricingType.PAID,
    priceDetails: 'Modelo por SCU',
    addedAt: '2024-01-15',
    features: ['Geração de relatórios SOC', 'Análise de scripts maliciosos', 'Threat Hunting']
  },
  {
    id: '3',
    name: 'CrowdStrike Charlotte AI',
    category: ToolCategory.DEFENSE,
    description: 'IA da CrowdStrike que permite interagir com dados do Falcon via linguagem natural, democratizando a busca por ameaças.',
    url: 'https://www.crowdstrike.com/platform/charlotte-ai/',
    pricing: PricingType.PAID,
    addedAt: '2023-09-12',
    features: ['Consultas em linguagem natural', 'Automação de workflows', 'Asset Discovery']
  },
  {
    id: '4',
    name: 'SentinelOne Purple AI',
    category: ToolCategory.DEFENSE,
    description: 'Assistente de IA que unifica a detecção, resposta e caça a ameaças em toda a plataforma Singularity.',
    url: 'https://www.sentinelone.com/platform/purple-ai/',
    pricing: PricingType.PAID,
    addedAt: '2024-03-01',
    features: ['Semantic Search', 'Análise de alertas', 'Remediação automatizada']
  },
  {
    id: '5',
    name: 'Snyk Code AI',
    category: ToolCategory.DEFENSE,
    description: 'Mecanismo de SAST (Static Analysis Security Testing) que usa IA treinada em código real para encontrar falhas e sugerir patches.',
    url: 'https://snyk.io/product/snyk-code/',
    pricing: PricingType.FREEMIUM,
    addedAt: '2023-11-05',
    features: ['Auto-fix', 'Scanning em tempo real', 'Integração com IDE']
  },
  {
    id: '6',
    name: 'WormGPT',
    category: ToolCategory.ATTACK,
    description: 'Ferramenta baseada em GPT sem restrições éticas, frequentemente associada a atividades de cybercrime e phishing avançado.',
    url: 'https://wormgpt.ai/',
    pricing: PricingType.PAID,
    addedAt: '2023-07-15',
    features: ['Criação de malware', 'E-mails de phishing persuasivos']
  },
  {
    id: '7',
    name: 'VirusTotal Code Insight',
    category: ToolCategory.GENERAL,
    description: 'Funcionalidade que utiliza LLMs para desconstruir e explicar o que um código suspeito (como PowerShell ou JS) realmente faz.',
    url: 'https://www.virustotal.com/',
    pricing: PricingType.FREEMIUM,
    addedAt: '2023-04-20',
    features: ['Explicação de scripts', 'Análise estática assistida']
  },
  {
    id: '8',
    name: 'Google Gemini for Security',
    category: ToolCategory.DEFENSE,
    description: 'Modelo especializado em segurança que processa bilhões de eventos de log no Chronicle para detectar ameaças furtivas.',
    url: 'https://cloud.google.com/security/ai',
    pricing: PricingType.PAID,
    addedAt: '2024-05-10',
    features: ['Análise massiva de logs', 'Playbooks de resposta']
  },
  {
    id: '9',
    name: 'Recorded Future AI',
    category: ToolCategory.GENERAL,
    description: 'Utiliza IA para analisar dados da surface, deep e dark web, fornecendo inteligência de ameaças acionável em tempo real.',
    url: 'https://www.recordedfuture.com/platform/ai',
    pricing: PricingType.PAID,
    addedAt: '2023-12-05',
    features: ['Threat Intelligence', 'Brand Protection', 'Vulnerability Prioritization']
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
    features: ['Cloud Security', 'Priorização de riscos', 'Análise de grafos']
  },
  {
    id: '12',
    name: 'Tessian',
    category: ToolCategory.DEFENSE,
    description: 'Segurança de e-mail que usa IA para prevenir exfiltração de dados acidental e ataques de phishing direcionados.',
    url: 'https://www.tessian.com/',
    pricing: PricingType.PAID,
    addedAt: '2023-05-01',
    features: ['Email Security', 'Data Loss Prevention', 'Phishing defense']
  },
  {
    id: '13',
    name: 'Darktrace HEAL',
    category: ToolCategory.DEFENSE,
    description: 'Sistema de IA que permite às empresas simular ataques e curar-se de incidentes em andamento.',
    url: 'https://darktrace.com/products/heal',
    pricing: PricingType.PAID,
    addedAt: '2023-11-01',
    features: ['Auto-remediação', 'Recuperação de desastres']
  },
  {
    id: '14',
    name: 'Abnormal Security',
    category: ToolCategory.DEFENSE,
    description: 'Plataforma de segurança de e-mail que utiliza IA comportamental para detectar ataques BEC (Business Email Compromise).',
    url: 'https://abnormalsecurity.com/',
    pricing: PricingType.PAID,
    addedAt: '2023-06-10',
    features: ['Behavioral AI', 'BEC Prevention', 'Supply Chain Defense']
  },
  {
    id: '15',
    name: 'Aqua Security AI Support',
    category: ToolCategory.DEFENSE,
    description: 'Focada em segurança de containers e cloud-native, utiliza IA para analisar infraestrutura como código (IaC).',
    url: 'https://www.aquasec.com/',
    pricing: PricingType.FREEMIUM,
    addedAt: '2024-01-20',
    features: ['Container Security', 'IaC Analysis']
  },
  {
    id: '16',
    name: 'Expanse (Palo Alto Networks)',
    category: ToolCategory.GENERAL,
    description: 'Monitoramento contínuo da superfície de ataque externa usando IA para descobrir ativos expostos desconhecidos.',
    url: 'https://www.paloaltonetworks.com/cortex/cortex-xpanse',
    pricing: PricingType.PAID,
    addedAt: '2023-03-15',
    features: ['Attack Surface Management', 'Asset Inventory']
  },
  {
    id: '17',
    name: 'Hadra AI',
    category: ToolCategory.ATTACK,
    description: 'Ferramenta de enumeração inteligente que usa IA para identificar vulnerabilidades de injeção de prompt em outras IAs.',
    url: 'https://github.com/hadra-ai',
    pricing: PricingType.OPEN_SOURCE,
    addedAt: '2024-04-05',
    features: ['Prompt Injection Testing', 'AI Red Teaming']
  },
  {
    id: '18',
    name: 'Vectra AI',
    category: ToolCategory.DEFENSE,
    description: 'Deteção e Resposta de Rede (NDR) que utiliza IA para rastrear o movimento lateral de atacantes dentro da rede.',
    url: 'https://www.vectra.ai/',
    pricing: PricingType.PAID,
    addedAt: '2023-09-01',
    features: ['Network Detection', 'Lateral Movement Tracking']
  },
  {
    id: '19',
    name: 'Ironscales AI-Powered Email Security',
    category: ToolCategory.DEFENSE,
    description: 'Combina IA com feedback humano (Huma-AI) para detectar e remover e-mails de phishing avançados.',
    url: 'https://ironscales.com/',
    pricing: PricingType.PAID,
    addedAt: '2023-07-20',
    features: ['Phishing remediation', 'Human-in-the-loop']
  },
  {
    id: '20',
    name: 'Lacework AI',
    category: ToolCategory.DEFENSE,
    description: 'Segurança de nuvem orientada por dados que usa IA para reduzir o ruído de alertas em até 100x.',
    url: 'https://www.lacework.com/',
    pricing: PricingType.PAID,
    addedAt: '2023-12-15',
    features: ['Cloud Compliance', 'Anomaly Detection']
  }
];

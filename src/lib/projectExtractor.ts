/**
 * projectExtractor.ts
 *
 * Extracts structured project data from a free-text description.
 * Currently uses heuristic pattern matching — ready to plug a real LLM API
 * (OpenAI, Claude, Gemini) by replacing the `callLLMExtraction` function.
 */

import type { ProjectExtraction, ClarificationQuestion } from '../types';

// ─── Heuristic keyword banks ────────────────────────────────────────────────────

const SECTOR_KEYWORDS: Record<string, string[]> = {
  'SaaS / Logiciel': ['saas', 'logiciel', 'software', 'abonnement', 'b2b', 'entreprise', 'crm', 'erp', 'dashboard', 'api'],
  'E-commerce': ['boutique', 'e-commerce', 'vente', 'produit', 'panier', 'shopify', 'marketplace achats'],
  'FoodTech': ['food', 'restaurant', 'repas', 'livraison', 'nourriture', 'foodtech', 'food truck', 'cuisine'],
  'HealthTech': ['santé', 'médecin', 'patient', 'health', 'médical', 'clinique', 'bien-être', 'sport', 'nutrition'],
  'EdTech': ['éducation', 'formation', 'apprentissage', 'cours', 'etudiant', 'enseignant', 'edtech', 'école'],
  'FinTech': ['fintech', 'paiement', 'banque', 'finance', 'investissement', 'crédit', 'assurance', 'comptabilité'],
  'Marketplace': ['marketplace', 'plateforme', 'mise en relation', 'acheteur', 'vendeur', 'prestataire'],
  'Intelligence Artificielle': ['ia', 'intelligence artificielle', 'machine learning', 'gpt', 'llm', 'ai', 'automation'],
  'Mobilité': ['transport', 'mobilité', 'véhicule', 'trajet', 'covoiturage', 'scooter', 'vélo'],
  'PropTech': ['immobilier', 'proptech', 'location', 'appartement', 'maison', 'bien immobilier'],
};

const MODEL_KEYWORDS: Record<string, string[]> = {
  'Abonnement (SaaS)': ['abonnement', 'mensuel', 'annuel', 'subscription', 'plan', 'premium'],
  'Commission / Marketplace': ['commission', '%', 'pourcentage', 'transaction', 'prise'],
  'Freemium': ['freemium', 'gratuit', 'version gratuite', 'fonctionnalités premium'],
  'Licences': ['licence', 'license', 'white label'],
  'Publicité': ['publicité', 'pub', 'ads', 'affichage'],
  'À la consommation': ['pay per use', 'à la demande', 'usage', 'consommation'],
};

// ─── Main extraction function ───────────────────────────────────────────────────

export async function extractProjectData(
  description: string,
  projectName: string,
  industry: string,
  fileNames: string[]
): Promise<{ extraction: ProjectExtraction; questions: ClarificationQuestion[]; confidence: number }> {
  // Simulate async LLM call delay (replace with real API call)
  await simulateDelay(1800);

  const lowerDesc = description.toLowerCase();

  // ── Detect sector ────────────────────────────────────────────────────────────
  let detectedSector = industry || 'Autre';
  if (!industry) {
    for (const [sector, keywords] of Object.entries(SECTOR_KEYWORDS)) {
      if (keywords.some(k => lowerDesc.includes(k))) {
        detectedSector = sector;
        break;
      }
    }
  }

  // ── Detect business model ────────────────────────────────────────────────────
  let detectedModel = '';
  for (const [model, keywords] of Object.entries(MODEL_KEYWORDS)) {
    if (keywords.some(k => lowerDesc.includes(k))) {
      detectedModel = model;
      break;
    }
  }

  // ── Extract target audience ──────────────────────────────────────────────────
  const ciblePatterns = [
    /(?:cible|clientèle|utilisateurs?|clients?|pour les?|destiné aux?|s'adresse aux?)[:\s]+([^.!?\n]{10,80})/i,
    /(?:public cible|audience)[:\s]+([^.!?\n]{10,80})/i,
    /\b(entrepreneurs?|PME|startups?|étudiants?|professionnels?|particuliers?|entreprises?)[^.!?]{0,40}/i,
  ];
  let cible = '';
  for (const pattern of ciblePatterns) {
    const m = description.match(pattern);
    if (m) { cible = m[1].trim(); break; }
  }

  // ── Extract problem ──────────────────────────────────────────────────────────
  const problemePatterns = [
    /(?:problème|problématique|défi|difficulté|souffrent de|manque de|besoin de)[:\s]+([^.!?\n]{15,150})/i,
    /(?:le problème(?: actuel)?)[:\s]+([^.!?\n]{15,150})/i,
  ];
  let problematique = '';
  for (const pattern of problemePatterns) {
    const m = description.match(pattern);
    if (m) { problematique = m[1].trim(); break; }
  }
  if (!problematique) {
    // Take first 2 sentences as problem context
    const sentences = description.split(/[.!?]/);
    problematique = sentences.slice(0, 2).join('. ').trim();
  }

  // ── Extract value proposition ────────────────────────────────────────────────
  const valeurPatterns = [
    /(?:solution|ma solution|notre solution|proposition de valeur|valeur ajoutée|différenciation)[:\s]+([^.!?\n]{15,150})/i,
    /(?:permet(?:tre)?|offre|propose|apporte)[:\s]+([^.!?\n]{15,150})/i,
  ];
  let propositionValeur = '';
  for (const pattern of valeurPatterns) {
    const m = description.match(pattern);
    if (m) { propositionValeur = m[1].trim(); break; }
  }

  // ── Extract features ─────────────────────────────────────────────────────────
  const fonctionnalites: string[] = [];
  const featurePatterns = [
    /(?:fonctionnalités?|features?|modules?)[:\s]+([^]+?)(?:\n\n|\.|(?=\n[A-Z]))/i,
    /[-•*]\s+([^•*\n]+)/g,
  ];

  // Try bullet point extraction
  const bulletMatches = [...description.matchAll(/[-•*]\s+([^\n•*]{5,100})/g)];
  if (bulletMatches.length > 0) {
    bulletMatches.slice(0, 6).forEach(m => fonctionnalites.push(m[1].trim()));
  }

  // Fallback: extract action verbs + object
  if (fonctionnalites.length === 0) {
    const verbPatterns = [
      /\b(carte interactive|notifications?|tableau de bord|analytics?|reporting|authentification|messagerie|paiement|recherche avancée|filtres?|recommandations?|IA|chatbot|API|intégration)\b/gi,
    ];
    for (const p of verbPatterns) {
      const matches = [...description.matchAll(p)];
      matches.forEach(m => {
        if (!fonctionnalites.includes(m[0])) fonctionnalites.push(m[0]);
      });
    }
  }

  // Always add at least generic features
  if (fonctionnalites.length === 0) {
    fonctionnalites.push('Inscription et authentification utilisateur', 'Tableau de bord principal', 'Gestion du profil');
  }

  // ── Build search keywords ────────────────────────────────────────────────────
  const keywords: string[] = [];
  if (detectedSector !== 'Autre') keywords.push(detectedSector.toLowerCase());

  // Extract nouns as keywords
  const nounMatches = description.match(/\b([A-ZÀ-Ÿa-zà-ÿ]{5,}(?:\s[A-ZÀ-Ÿa-zà-ÿ]{5,})?)\b/g) || [];
  const stopWords = new Set(['pour', 'avec', 'dans', 'cette', 'notre', 'votre', 'leurs', 'comme', 'aussi', 'plus', 'mais', 'même', 'bien', 'tous', 'avoir', 'faire', 'être', 'nous', 'vous', 'cela', 'donc', 'ainsi']);
  nounMatches.slice(0, 50).forEach(w => {
    const lower = w.toLowerCase();
    if (!stopWords.has(lower) && lower.length > 5 && !keywords.includes(lower)) {
      keywords.push(lower);
    }
  });

  // Add sector-specific competitor search terms
  const competitorTerms: Record<string, string[]> = {
    'FoodTech': ['food delivery app', 'food truck locator app', 'restaurant finder'],
    'HealthTech': ['health tracking app', 'telemedicine platform', 'wellness app'],
    'EdTech': ['online learning platform', 'e-learning SaaS', 'course marketplace'],
    'FinTech': ['payment startup', 'fintech app', 'neobank'],
    'Marketplace': ['peer to peer marketplace', 'service marketplace platform'],
    'SaaS / Logiciel': ['B2B SaaS tool', 'productivity software', 'workflow automation'],
  };
  const sectorTerms = competitorTerms[detectedSector] || [`${detectedSector} startup`, `${detectedSector} app`];
  keywords.push(...sectorTerms.slice(0, 3));

  const extraction: ProjectExtraction = {
    titre_projet: projectName || deriveTitle(description),
    problematique: problematique || 'Non clairement définie',
    cible: cible || '',
    proposition_valeur: propositionValeur || '',
    fonctionnalites: [...new Set(fonctionnalites)].slice(0, 8),
    modele_economique: detectedModel || '',
    secteur: detectedSector,
    mots_cles_recherche: [...new Set(keywords)].slice(0, 10),
  };

  // ── Compute confidence & questions ───────────────────────────────────────────
  const { questions, confidence } = generateQuestions(extraction, description);

  return { extraction, questions, confidence };
}

// ─── Derive a project title from description ────────────────────────────────────

function deriveTitle(description: string): string {
  const m = description.match(/^["""«]?([A-ZÀ-Ÿa-zà-ÿ\s]{3,30})["""»]?/);
  return m ? m[1].trim() : 'Mon Projet';
}

// ─── Generate clarification questions based on missing data ────────────────────

export function generateQuestions(
  extraction: ProjectExtraction,
  description: string
): { questions: ClarificationQuestion[]; confidence: number } {
  const questions: ClarificationQuestion[] = [];
  let confidence = 100;

  // Check each field for vagueness
  if (!extraction.cible || extraction.cible.length < 20) {
    confidence -= 25;
    questions.push({
      id: 'q_cible',
      question: 'Qui est exactement votre public cible ? (âge, profession, localisation, taille d\'entreprise...)',
      placeholder: 'Ex : Entrepreneurs de 25-40 ans, basés en France, avec une PME de 5-50 employés',
      category: 'cible',
    });
  }

  if (!extraction.modele_economique) {
    confidence -= 20;
    questions.push({
      id: 'q_modele',
      question: 'Quel est votre modèle économique envisagé ? Comment allez-vous générer des revenus ?',
      placeholder: 'Ex : Abonnement mensuel à 29€, commission de 5% sur les transactions, freemium...',
      category: 'modele',
    });
  }

  if (!extraction.proposition_valeur || extraction.proposition_valeur.length < 20) {
    confidence -= 20;
    questions.push({
      id: 'q_valeur',
      question: 'Quelle est votre proposition de valeur unique ? Pourquoi les utilisateurs vous choisiront-ils plutôt qu\'un concurrent ?',
      placeholder: 'Ex : Seule solution qui combine X et Y, 10x plus rapide que la méthode actuelle...',
      category: 'valeur',
    });
  }

  if (extraction.fonctionnalites.length < 3) {
    confidence -= 15;
    questions.push({
      id: 'q_fonctionnalites',
      question: 'Quelles sont les fonctionnalités clés de votre solution ? Listez les 3-5 principales.',
      placeholder: 'Ex : 1) Carte temps réel, 2) Notifications push, 3) Système de réservation...',
      category: 'fonctionnalites',
    });
  }

  const hasCompetitorMention = /concurrent|compétiteur|comme [A-Z]|similaire à/.test(description);
  if (!hasCompetitorMention && questions.length < 4) {
    confidence -= 10;
    questions.push({
      id: 'q_concurrents',
      question: 'Connaissez-vous des concurrents directs ou des solutions alternatives existantes ?',
      placeholder: 'Ex : Uber Eats, Deliveroo, les apps de food trucks locales...',
      category: 'problematique',
    });
  }

  return { questions: questions.slice(0, 5), confidence: Math.max(confidence, 20) };
}

// ─── Enrich extraction with user's clarification answers ───────────────────────

export function enrichExtractionWithAnswers(
  extraction: ProjectExtraction,
  answers: Record<string, string>
): ProjectExtraction {
  const enriched = { ...extraction };

  if (answers.q_cible) enriched.cible = answers.q_cible;
  if (answers.q_modele) enriched.modele_economique = answers.q_modele;
  if (answers.q_valeur) enriched.proposition_valeur = answers.q_valeur;
  if (answers.q_fonctionnalites) {
    const additional = answers.q_fonctionnalites
      .split(/[,\n]/)
      .map(s => s.replace(/^\d+[.)]\s*/, '').trim())
      .filter(Boolean);
    enriched.fonctionnalites = [...new Set([...enriched.fonctionnalites, ...additional])].slice(0, 8);
  }

  return enriched;
}

// ─── Simulate LLM delay ─────────────────────────────────────────────────────────

function simulateDelay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

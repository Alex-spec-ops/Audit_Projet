import type { ProjectExtraction, CompetitiveAnalysis, CritiqueData } from '../types';
import { ScoreAnalysisResult } from './scoreAnalyzer';

export async function generateBrutalCritique(
  extraction: ProjectExtraction,
  competition: CompetitiveAnalysis,
  scoring: ScoreAnalysisResult
): Promise<CritiqueData> {
  // Simuler un délai d'appel API LLM
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulation de la réponse du Mentor Brutal
  return {
    faiblesses_majeures: [
      `Votre avantage concurrentiel dans le secteur ${extraction.secteur || 'actuel'} est trop faible ou inexistant.`,
      `Le modèle économique (${extraction.modele_economique || 'prévu'}) sera très difficile à imposer à votre cible : ${extraction.cible || 'les utilisateurs'}.`,
      `Vous ciblez une audience complexe sans budget marketing suffisant : l'acquisition va être votre principal goulot d'étranglement.`,
      `Votre périmètre est trop large : se concentrer sur ${extraction.fonctionnalites.slice(0, 2).join(' et ')} prendra déjà des mois de développement.`
    ],
    menaces_reelles: [
      `Les acteurs majeurs du secteur ${extraction.secteur || ''} intègrent déjà des briques similaires gratuitement.`,
      `La cible (${extraction.cible || 'visée'}) est très volatile et difficile à fidéliser sans un budget d'acquisition colossal.`,
      `Le temps de développement pour la fonctionnalité "${extraction.fonctionnalites[0] || 'principale'}" risque d'épuiser votre trésorerie avant le lancement.`,
      `Des solutions alternatives gratuites (Excel, Notion, WhatsApp) sont suffisantes pour 80% des besoins de vos clients potentiels.`
    ],
    scenarios_echec: [
      `90% de probabilité d'échec par 'Défaut de marché' : le problème "${extraction.problematique || 'identifié'}" n'est pas assez douloureux pour déclencher un acte d'achat.`,
      `Le CAC (Coût d'Acquisition Client) sera supérieur à la LTV (Life Time Value). Sans levée de fonds massive, votre croissance s'arrêtera au mois 3.`,
      `Un concurrent direct (ou indirect) copie votre proposition de valeur ("${extraction.proposition_valeur || 'concept'}") en quelques semaines grâce à sa base utilisateurs existante.`
    ],
    actions_correctrices: [
      `Arrêtez tout développement : passez les 14 prochains jours à pré-vendre la solution à ${extraction.cible || 'votre cible'} avec un simple prototype ou une landing page.`,
      `Réévaluez votre monétisation : le modèle "${extraction.modele_economique || 'actuel'}" est risqué. Envisagez un service pur B2B ciblé.`,
      `Réduisez drastiquement le périmètre de la V1. Gardez uniquement la fonctionnalité "${extraction.fonctionnalites[0] || 'core'}" et devenez indispensable dessus.`
    ],
    verdict_final: `Un beau concept sur le papier, mais un cauchemar d'exécution. Si vous ne pivotez pas vers un modèle hyper-spécialisé pour résoudre le point de douleur critique de "${extraction.cible || 'votre cible'}", vous allez vous épuiser à créer un produit "nice-to-have" pour des clients qui ne paieront pas.`
  };
}

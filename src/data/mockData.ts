import type { AuditResult } from '../types';

export const mockAuditResult: AuditResult = {
  id: 'audit-demo-001',
  projectName: 'FoodConnect',
  industry: 'FoodTech',
  globalScore: 72,
  scoreLevel: 'good',
  executiveSummary:
    'FoodConnect présente un potentiel réel sur un marché en croissance structurelle. ' +
    'Le concept est pertinent et la demande consommateurs est validée. ' +
    'Cependant, la concurrence est forte et sous-estimée, et le modèle économique ' +
    'repose sur des hypothèses fragiles qui doivent être testées avant tout développement.',

  critique: {
    whatIsWrong: [
      'Aucun avantage concurrentiel clairement défini face aux acteurs existants (Uber Eats, Too Good To Go, Google Maps)',
      'Le modèle par commission est inadapté — les marges food trucks sont de 15-20%, dont vous ne pouvez pas prendre 10-15%',
      'Pas de stratégie d\'acquisition client B2C documentée — le CAC risque d\'exploser sans budget marketing significatif',
      'La stack technologique (géolocalisation temps réel + gestion stock + paiements) est trop ambitieuse pour une V1',
      'Aucune mention de partenariats avec des food parks, marchés alimentaires ou organisateurs d\'événements existants',
      'Le problème "œuf et poule" (utilisateurs ↔ food trucks) n\'est pas traité dans le go-to-market',
    ],
    realThreats: [
      'Uber Eats et Deliveroo lancent des offres spécifiques food trucks dans 5 villes françaises en 2024',
      'Too Good To Go couvre déjà 35% des food trucks premium avec 6M d\'utilisateurs actifs en France',
      'Google Maps intègre nativement les positions et horaires des food trucks depuis janvier 2024 — gratuitement',
      'Le marché des food trucks stagne à +2% en 2023, pendant que les restaurants fantômes explosent (+40%)',
      'Les food trucks affichent un taux de fermeture de 65% après 2 ans — votre base de fournisseurs est très volatile',
      'La réglementation sur les zones de stationnement évolue (loi mobilité 2024) et complexifie la géolocalisation précise',
    ],
    whyItCanFail: [
      'Problème du œuf et de la poule non résolu : sans food trucks attractifs, pas d\'utilisateurs — sans utilisateurs, pas de food trucks',
      'Cycle de vente B2B (convaincre les food trucks) long (3-6 mois) et coûteux face à un déploiement B2C pur',
      'Burn rate élevé prévisible : coût d\'acquisition food truck × turnover élevé (65% en 2 ans) = puits sans fond',
      'Difficile de se différencier de Google Maps qui est gratuit, omniprésent et améliore constamment sa couverture food trucks',
      'La monétisation est repoussée à plus tard, mais les investisseurs et la trésorerie ne peuvent pas attendre indéfiniment',
    ],
    whatToChangeNow: [
      'Pivotez vers un abonnement mensuel fixe (49€/mois) pour les food trucks — plus prévisible et adapté à leurs marges',
      'Réduisez la scope V1 à une seule ville — Paris 10e-11e-20e — et dominez ce micro-marché avant de vous étendre',
      'Signez 5 accords exclusifs avec des food parks et marchés alimentaires pour garantir la densité d\'offre au lancement',
      'Testez l\'hypothèse avec une landing page + 50 food trucks AVANT de coder quoi que ce soit',
      'Recrutez un co-fondateur avec une expérience opérationnelle en restauration pour crédibiliser la proposition B2B',
    ],
  },

  scoreBreakdown: [
    {
      id: 'innovation',
      name: 'Innovation',
      score: 75,
      maxScore: 100,
      justification: 'Le concept est pertinent mais pas révolutionnaire. La différenciation reste floue face aux solutions existantes.',
      details:
        'La géolocalisation temps réel des food trucks est un bon angle, mais facile à copier par des acteurs mieux financés. ' +
        'L\'ajout de fonctionnalités communautaires (avis spécialisés, événements, abonnements "coup de cœur") pourrait créer un avantage défendable. ' +
        'Score pénalisé par le manque d\'une innovation de rupture identifiable.',
    },
    {
      id: 'market',
      name: 'Marché cible',
      score: 85,
      maxScore: 100,
      justification: 'Marché food trucks : 2.3Mds€ en France avec une croissance de 8%/an. Demande consommateurs solide.',
      details:
        'Le TAM est clairement validé. Le marché est fragmenté et sous-digitalisé, notamment hors des grandes métropoles. ' +
        'L\'appétit des consommateurs pour l\'alimentation locale, artisanale et diversifiée est en hausse constante (+22% depuis 2021). ' +
        'Frein principal : la volatilité des food trucks (fermetures, changements de zones) complique la rétention.',
    },
    {
      id: 'technical',
      name: 'Faisabilité tech',
      score: 78,
      maxScore: 100,
      justification: 'Stack technologique standard mais la complexité opérationnelle temps réel est sous-estimée.',
      details:
        'Géolocalisation, notifications push, paiement intégré — techniquement faisable avec React Native + Node.js + PostGIS. ' +
        'Les APIs de mapping (Google Maps, Mapbox) ont des coûts cachés significatifs à grande échelle. ' +
        'La synchronisation temps réel des positions (food trucks mobiles) requiert une architecture robuste (WebSocket / SSE). ' +
        'Score pénalisé par la complexité de la V1 envisagée — trop large pour une équipe early-stage.',
    },
    {
      id: 'business',
      name: 'Modèle économique',
      score: 62,
      maxScore: 100,
      justification: 'Le modèle par commission est fragile. Les marges food trucks ne supportent pas des prélèvements additionnels.',
      details:
        'Un modèle SaaS à abonnement fixe (49-99€/mois par food truck) serait nettement plus adapté au secteur. ' +
        'Le LTV/CAC projeté n\'est pas documenté dans le dossier. ' +
        'La rentabilité à 36 mois reste une hypothèse sans validation des chiffres d\'acquisition réels. ' +
        'Une piste intéressante : la monétisation B2B événementielle (mise en relation food trucks ↔ événements, mariages, festivals).',
    },
    {
      id: 'team',
      name: 'Équipe',
      score: 55,
      maxScore: 100,
      justification: 'L\'expertise tech est présente mais l\'expérience opérationnelle restauration est manquante.',
      details:
        'Un profil commercial B2B expérimenté et un expert en restauration/food service sont absents. ' +
        'Ces deux profils sont critiques pour convaincre les food trucks (B2B) et structurer les partenariats événementiels. ' +
        'Recommandation : identifier un co-fondateur "terrain" issu du secteur restauration avant de lancer.',
    },
    {
      id: 'competition',
      name: 'Concurrence',
      score: 40,
      maxScore: 100,
      justification: 'Environnement concurrentiel dense avec des acteurs bien financés et des géants qui s\'imposent.',
      details:
        'Le vrai concurrent dangereux est Google Maps — gratuit, universel, et avec une couverture food trucks croissante. ' +
        'Too Good To Go bénéficie d\'un positionnement éthique fort difficile à contrecarrer. ' +
        'Uber Eats a les moyens de copier n\'importe quelle fonctionnalité réussie en 3 mois. ' +
        'L\'angle de différenciation doit être très spécifique et défendable (communauté, fidélité, données analytiques B2B).',
    },
    {
      id: 'timing',
      name: 'Timing de marché',
      score: 75,
      maxScore: 100,
      justification: 'Post-COVID, le marché alimentation locale est en plein renouveau. Le timing est favorable.',
      details:
        'L\'appétit pour les alternatives aux grandes chaînes est historiquement fort. ' +
        'Les food trucks connaissent un renouveau urbain avec de nouveaux profils (chefs étoilés, concepts premium). ' +
        'La digitalisation du secteur est encore largement incomplète — fenêtre d\'opportunité réelle. ' +
        'Il faut aller vite : Google et les grandes plateformes investissent activement ce segment.',
    },
  ],

  competitors: [
    {
      id: 'comp-1',
      name: 'Too Good To Go',
      website: 'toogoodtogo.com',
      strengths: ['6M utilisateurs actifs', 'Positionnement anti-gaspi fort', 'Brand éthique reconnue'],
      threatLevel: 'high',
      description: 'Leader européen de la réduction du gaspillage alimentaire. Couvre une large proportion des food trucks haut de gamme avec un modèle communautaire très engageant.',
      userCount: '6M utilisateurs FR',
    },
    {
      id: 'comp-2',
      name: 'Uber Eats',
      website: 'ubereats.com',
      strengths: ['Notoriété massive', 'Réseau de livraison', 'Budget illimité pour copier'],
      threatLevel: 'high',
      description: 'Déploiement actif d\'une offre food trucks dans les grandes villes françaises depuis Q3 2023. Capable de reproduire votre concept en quelques mois avec des ressources infinies.',
      fundingAmount: 'NASDAQ : UBER',
    },
    {
      id: 'comp-3',
      name: 'Google Maps',
      website: 'maps.google.com',
      strengths: ['3Mds d\'utilisateurs', 'Données temps réel', 'Gratuit et omniprésent'],
      threatLevel: 'high',
      description: 'Intègre nativement les positions et horaires des food trucks depuis 2024. Le concurrent le plus difficile à battre : universel, gratuit, et en amélioration constante.',
      userCount: '3Mds users / mois',
    },
    {
      id: 'comp-4',
      name: 'Roadtrip.fr',
      website: 'roadtrip.fr',
      strengths: ['Focus France', 'Partenariats événementiels', 'App native'],
      threatLevel: 'medium',
      description: 'Startup française spécialisée dans la mise en relation food trucks ↔ événements. Levée de fonds seed réussie, positionnement B2B événementiel clair.',
      fundingAmount: '1.2M€ (Seed)',
    },
    {
      id: 'comp-5',
      name: 'Street Food Finder',
      website: 'streetfoodfinder.com',
      strengths: ['Spécialisé food trucks', 'Base de données complète', 'SEO très fort'],
      threatLevel: 'medium',
      description: 'Répertoire nord-américain de food trucks en expansion en Europe. 800K visites/mois et une communauté engagée. Pas encore dominant en France.',
      userCount: '800K visites/mois',
    },
  ],

  roadmap: [
    {
      id: 0,
      name: 'Validation',
      duration: '4-6 semaines',
      icon: '🔍',
      isCurrentPhase: true,
      objectives: [
        'Interviewer 50 food trucks sur leurs besoins et willingness to pay',
        'Créer une landing page et tester 3 messages différents (A/B)',
        'Valider le pricing avec 10 pré-inscriptions payantes',
        'Cartographier les 5 concurrents directs et identifier les failles',
      ],
      details:
        'La phase de validation est la plus critique et la moins coûteuse. Ne pas coder une ligne avant d\'avoir des preuves tangibles d\'intérêt commercial. ' +
        'Outils no-code recommandés : Notion pour le CRM, Typeform pour les interviews, Carrd pour la landing page. ' +
        'Objectif KPI : 10 pré-inscriptions à 49€/mois (= 490€ MRR prouvé) avant de passer à la phase suivante.',
    },
    {
      id: 1,
      name: 'MVP',
      duration: '8-12 semaines',
      icon: '🛠️',
      isCurrentPhase: false,
      objectives: [
        'Développer l\'app mobile (React Native) — carte interactive + profils',
        'Backend : API géolocalisation + notifications push',
        'Onboarding food truck : 15 minutes maximum',
        'Lancement beta privée avec 20 food trucks partenaires',
      ],
      details:
        'Scope MVP strict : carte interactive avec positions live + profils food trucks + notifications "ouvert maintenant". ' +
        'Pas de paiement intégré en V1 — les transactions se font directement sur place. ' +
        'Stack recommandée : React Native (Expo) + Node.js/Express + PostgreSQL/PostGIS + Mapbox. ' +
        'Budget estimé : 15-25K€ si développement externalisé, 0€ si fondateurs tech.',
    },
    {
      id: 2,
      name: 'Alpha Paris',
      duration: '4-6 semaines',
      icon: '🚀',
      isCurrentPhase: false,
      objectives: [
        'Lancer exclusivement sur Paris 10e-11e-20e (concentration food trucks)',
        'Atteindre 100 food trucks partenaires actifs',
        'Atteindre 2 000 utilisateurs actifs hebdomadaires',
        'Mesurer et optimiser la rétention D7 et D30',
      ],
      details:
        'Lancement géographiquement contraint pour maximiser la densité et la valeur perçue. ' +
        'Programme ambassadeurs : les 10 premiers food trucks reçoivent 6 mois gratuits en échange de feedback et de recommandations. ' +
        'Métriques clés à suivre : DAU/MAU ratio, fréquence de consultation, sessions par food truck, NPS utilisateur.',
    },
    {
      id: 3,
      name: 'Croissance',
      duration: '3-6 mois',
      icon: '📈',
      isCurrentPhase: false,
      objectives: [
        'Expansion Lyon, Bordeaux, Marseille',
        'Atteindre 500 food trucks et 15K utilisateurs actifs',
        'Lancer le modèle d\'abonnement Pro à 49€/mois',
        'Lever une pré-seed de 200-500K€',
      ],
      details:
        'Expansion ville par ville, pas simultanée. Chaque nouvelle ville nécessite un minimum de 30 food trucks pour être "vivante". ' +
        'Programme referral B2B : les food trucks qui recommandent d\'autres food trucks reçoivent 1 mois gratuit. ' +
        'Objectif levée : 500K€ à 2M€ de valorisation pour financer 12 mois de croissance.',
    },
    {
      id: 4,
      name: 'Monétisation',
      duration: '6-12 mois',
      icon: '💰',
      isCurrentPhase: false,
      objectives: [
        'Lancer FoodConnect Pro : analytics + agenda événements (99€/mois)',
        'Marketplace B2B événements : food trucks ↔ mariages, festivals, corporate',
        'Fonctionnalités prédictives (météo, événements locaux, heatmaps)',
        'Objectif : 50K€ ARR',
      ],
      details:
        'Pivot vers un modèle SaaS multicouche : Freemium (présence basique) → Pro (analytics + événements) → Enterprise (multi-food truck, franchise). ' +
        'La marketplace événementielle est le levier de croissance le plus prometteur : un seul événement peut générer 1-5K€ pour un food truck. ' +
        'Partenariats avec Eventbrite, OpenAgenda, les mairies pour accéder aux calendriers événementiels.',
    },
    {
      id: 5,
      name: 'Scale',
      duration: '12+ mois',
      icon: '🌍',
      isCurrentPhase: false,
      objectives: [
        'Expansion Belgique, Espagne, Italie (marchés food trucks matures)',
        'Lever une Seed de 1.5-3M€',
        'Développer une offre franchise / food park management',
        'Objectif : 500K€ ARR',
      ],
      details:
        'L\'expansion internationale nécessite une localisation marché par marché (réglementation, langue, habitudes). ' +
        'Priorité aux villes avec une forte culture street food : Barcelone, Milan, Bruxelles, Amsterdam. ' +
        'Envisager un partenariat stratégique avec un acteur horeca (Sysco, Metro) pour accélérer l\'acquisition B2B.',
    },
  ],

  recommendations: [
    {
      id: 'rec-1',
      action: 'Interviewer 10 food trucks cette semaine pour valider le problème et le pricing',
      priority: 'urgent',
      completed: false,
      category: 'Validation',
    },
    {
      id: 'rec-2',
      action: 'Créer une landing page avec 3 propositions de valeur et mesurer les conversions',
      priority: 'urgent',
      completed: false,
      category: 'Marketing',
    },
    {
      id: 'rec-3',
      action: 'Analyser en profondeur Google Maps Food Trucks pour identifier vos vraies différenciations',
      priority: 'urgent',
      completed: false,
      category: 'Stratégie',
    },
    {
      id: 'rec-4',
      action: 'Définir votre modèle de revenu final — abonnement fixe recommandé à 49€/mois',
      priority: 'important',
      completed: false,
      category: 'Business Model',
    },
    {
      id: 'rec-5',
      action: 'Identifier et approcher un co-fondateur avec expertise restauration ou food service',
      priority: 'important',
      completed: false,
      category: 'Équipe',
    },
  ],

  auditDate: new Date().toISOString(),
};

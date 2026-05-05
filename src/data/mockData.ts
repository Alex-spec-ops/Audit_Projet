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
    faiblesses_majeures: [
      "Votre avantage concurrentiel est inexistant : la géolocalisation n'est pas un moat, c'est une feature de Google Maps.",
      "Le modèle de commission à 10-15% détruira la marge nette (déjà famélique) de vos clients food trucks, ils ne l'accepteront jamais.",
      "Vous ciblez simultanément le B2B (food trucks) et le B2C (consommateurs) avec 0 budget marketing : l'acquisition va vous tuer.",
      "Votre MVP est trop lourd : paiements, géolocalisation live, avis... Vous allez coder pendant 8 mois avant d'avoir parlé à un seul client."
    ],
    menaces_reelles: [
      "Uber Eats déploie actuellement des équipes de vente dédiées aux food trucks sur 5 métropoles françaises.",
      "Google Maps a intégré nativement les food trucks dans son algorithme de découverte de proximité, gratuitement.",
      "Loi Mobilité (2024) : les réglementations municipales sur le stationnement deviennent imprévisibles, ce qui rendra vos données de position obsolètes en permanence.",
      "Le turnover des food trucks est massif (65% de faillites après 2 ans) : votre base de clients va fondre organiquement."
    ],
    scenarios_echec: [
      "90% de probabilité d'échec par 'Effet de Réseau Vide' : Les food trucks refusent de payer sans voir de clients, et les clients désinstallent l'app en voyant qu'il n'y a que 2 trucks référencés.",
      "Le CAC côté consommateur B2C en food/delivery est de 45€ à 80€. Sans levée de fonds (Series A de 5M+), votre croissance s'arrêtera au mois 3.",
      "Google Maps déploie un bouton 'Réserver/Commander' pour les food trucks : vous perdez votre proposition de valeur B2C du jour au lendemain."
    ],
    actions_correctrices: [
      "Arrêtez tout développement : passez les 14 prochains jours à essayer de vendre un abonnement manuel de 49€/mois à 10 food trucks avec un simple Google Form.",
      "Changez de modèle de monétisation : passez sur un SaaS pur B2B (logiciel de caisse, planning d'emplacements) et oubliez la commission.",
      "Réduisez le périmètre de la V1 à 2 arrondissements parisiens ou à un seul événement majeur, devenez indispensable localement avant de voir grand."
    ],
    verdict_final: "Un beau rêve B2C, mais un cauchemar B2B. Si vous ne pivotez pas vers un modèle SaaS dédié aux propriétaires dès maintenant, vous allez vous épuiser à créer un Google Maps en moins bien pour des clients qui ne paieront pas."
  },

  scoreBreakdown: [
    {
      id: 'pertinence_probleme',
      name: 'Pertinence du problème',
      score: 17,
      maxScore: 20,
      justification: 'Le marché des food trucks est en croissance (+8%/an) et très fragmenté, créant un vrai besoin de centralisation.',
      details: 'Le TAM est validé (2.3Mds€ en France). L\'appétit des consommateurs pour la street food locale est en hausse de 22% depuis 2021.'
    },
    {
      id: 'differenciation',
      name: 'Différenciation',
      score: 11,
      maxScore: 20,
      justification: 'Le concept de géolocalisation est basique. La différenciation face à Google Maps ou Uber Eats reste très floue à ce stade.',
      details: 'Aucun avantage défendable clair n\'est défini. Il faudra créer un effet de réseau fort ou un angle communautaire unique.'
    },
    {
      id: 'faisabilite_technique',
      name: 'Faisabilité technique',
      score: 12,
      maxScore: 15,
      justification: 'Stack technique standard (React Native + Node.js) mais la gestion temps réel des positions est complexe.',
      details: 'Les APIs de mapping (Google Maps/Mapbox) ont des coûts cachés significatifs. Le tracking live en mobilité pose souvent des soucis de batterie/précision.'
    },
    {
      id: 'viabilite_economique',
      name: 'Viabilité économique',
      score: 8,
      maxScore: 15,
      justification: 'Le modèle par commission est inadapté car les marges des food trucks sont déjà très faibles (15-20%).',
      details: 'Un abonnement fixe (ex: 49€/mois) serait plus viable. Le LTV/CAC actuel est impossible à calculer sans tester l\'acquisition B2B.'
    },
    {
      id: 'timing_marche',
      name: 'Timing marché',
      score: 8,
      maxScore: 10,
      justification: 'Excellent momentum post-COVID pour l\'alimentation locale et les alternatives aux fast-foods traditionnels.',
      details: 'La digitalisation du secteur HORECA s\'accélère, mais la fenêtre se referme vite avec l\'arrivée des géants de la tech.'
    },
    {
      id: 'barrieres_concurrentielles',
      name: 'Barrières concurrentielles',
      score: 6,
      maxScore: 10,
      justification: 'Très facile à copier pour un acteur établi. Le succès dépendra uniquement de l\'exécution et de l\'acquisition locale rapide.',
      details: 'L\'effet de réseau ("œuf et poule") sera le seul vrai moat. Dominer une seule ville d\'abord est critique.'
    },
    {
      id: 'scalabilite',
      name: 'Scalabilité',
      score: 10,
      maxScore: 10,
      justification: 'Une fois la tech développée, le coût marginal par nouvel utilisateur ou food truck est quasi nul.',
      details: 'Le modèle logiciel permet une expansion internationale rapide si le go-to-market est standardisé ville par ville.'
    }
  ],

  competitors: [
    {
      id: 'comp-1',
      name: 'Too Good To Go',
      website: 'toogoodtogo.com',
      description: 'Leader européen de la réduction du gaspillage alimentaire. Couvre une large proportion des food trucks haut de gamme avec un modèle communautaire très engageant.',
      propositionValeur: 'Sauvez des repas délicieux à petit prix tout en luttant contre le gaspillage.',
      fonctionnalitesCles: ['Réservation de paniers surprises', 'Paiement in-app', 'Géolocalisation', 'Avis utilisateurs'],
      strengths: ['6M utilisateurs actifs FR', 'Positionnement éthique fort', 'Notoriété de marque'],
      weaknesses: ['Paniers surprises (pas le choix du plat)', 'Horaires de collecte imposés', 'Forte commission (25%)'],
      pricing: 'Commission (environ 1€ + 25% par panier)',
      traction: '6M users actifs FR, présent dans 17 pays',
      positioning: 'Anti-gaspi / Mass market',
      type: 'indirect',
      threatLevel: 'high',
      userCount: '6M utilisateurs FR',
    },
    {
      id: 'comp-2',
      name: 'Uber Eats',
      website: 'ubereats.com',
      description: 'Déploiement actif d\'une offre food trucks dans les grandes villes françaises. Capable de reproduire votre concept en quelques mois.',
      propositionValeur: 'Faites-vous livrer les meilleurs food trucks locaux en moins de 30 minutes.',
      fonctionnalitesCles: ['Livraison à domicile', 'Tracking livreur temps réel', 'Recommandations algorithmiques'],
      strengths: ['Réseau de livreurs massif', 'Habitude d\'usage des consommateurs', 'Budget illimité'],
      weaknesses: ['Commissions exorbitantes (30%)', 'Modèle de livraison inadapté à la street food', 'Relation B2B souvent tendue'],
      pricing: 'Commission 30% + frais de livraison',
      traction: 'Leader de la livraison en France',
      positioning: 'Livraison express premium',
      type: 'indirect',
      threatLevel: 'high',
      fundingAmount: 'NASDAQ : UBER',
    },
    {
      id: 'comp-3',
      name: 'Google Maps',
      website: 'maps.google.com',
      description: 'Intègre nativement les positions et horaires des food trucks depuis 2024. Le concurrent le plus difficile à battre : universel et gratuit.',
      propositionValeur: 'Trouvez tout ce qui est autour de vous, y compris les food trucks ouverts.',
      fonctionnalitesCles: ['Itinéraire', 'Avis', 'Horaires d\'affluence', 'Photos'],
      strengths: ['100% gratuit', 'Déjà installé sur tous les téléphones', 'Données temps réel (via trafic/affluence)'],
      weaknesses: ['Pas spécialisé food', 'Interface B2B complexe pour les propriétaires', 'Mise à jour des horaires souvent fausse'],
      pricing: 'Gratuit',
      traction: 'Utilisé par 99% des possesseurs de smartphones',
      positioning: 'Généraliste / Utilitaire',
      type: 'alternative',
      threatLevel: 'high',
      userCount: '3Mds users / mois',
    },
    {
      id: 'comp-4',
      name: 'Roadtrip.fr',
      website: 'roadtrip.fr',
      description: 'Startup française spécialisée dans la mise en relation food trucks ↔ événements (privatisation).',
      propositionValeur: 'Trouvez et réservez le food truck idéal pour votre événement en 3 clics.',
      fonctionnalitesCles: ['Demande de devis multi-trucks', 'Paiement sécurisé', 'Catalogue filtrable'],
      strengths: ['Focus B2B événementiel très rentable', 'Offre France entière', 'Processus de résa fluide'],
      weaknesses: ['Pas de géolocalisation live pour le B2C daily', 'Volume de transactions plus faible'],
      pricing: 'Abonnement pro + commission sur privatisation',
      traction: '1.2M€ levés, 800+ trucks partenaires',
      positioning: 'B2B / Événementiel',
      type: 'direct',
      threatLevel: 'medium',
      fundingAmount: '1.2M€ (Seed)',
    },
    {
      id: 'comp-5',
      name: 'Street Food Finder',
      website: 'streetfoodfinder.com',
      description: 'Répertoire nord-américain de food trucks en expansion en Europe. Base de données très solide.',
      propositionValeur: 'Le guide complet de la street food, mis à jour par la communauté.',
      fonctionnalitesCles: ['Carte interactive', 'Favoris', 'Agenda des trucks', 'Avis'],
      strengths: ['Spécialisé 100% food trucks', 'SEO très puissant', 'Effet de réseau communautaire'],
      weaknesses: ['UX/UI datée (style 2015)', 'Monétisation floue', 'Faible pénétration en France pour l\'instant'],
      pricing: 'Gratuit (modèle pub / freemium B2B)',
      traction: '800K visites/mois (majoritairement US)',
      positioning: 'Annuaire communautaire',
      type: 'direct',
      threatLevel: 'medium',
      userCount: '800K visites/mois',
    },
  ],

  landscape: {
    saturation_marche: 'moyen',
    saturation_justification: 'Le marché de la street food est en pleine structuration. Les géants (Google Maps, Uber Eats) occupent le terrain généraliste, mais il n\'y a pas d\'application B2C spécialisée dominante en Europe qui fidélise spécifiquement sur le segment food truck quotidien.',
    barrieres_entree: [
      'Garder les données des food trucks à jour en temps réel (forte volatilité)',
      'Coût d\'acquisition utilisateur vs panier moyen très faible',
      'Atteindre une "masse critique" dans une zone géographique précise (problème œuf/poule)'
    ],
    opportunites: [
      'Pivoter vers la privatisation B2B (mariages, CE d\'entreprises) beaucoup plus lucrative',
      'Créer un système de fidélité croisé ("Street Food Pass") entre plusieurs trucks',
      'Proposer un vrai outil SaaS métier aux propriétaires (caisse, gestion stock) plutôt qu\'un simple annuaire B2C'
    ],
    tendances: [
      'Premiumisation : les food trucks montent en gamme (Chefs étoilés, produits locaux)',
      'Développement des "Food Courts" et "Halles" sédentarisant en partie le marché',
      'Les consommateurs exigent de plus en plus de transparence (origine, bilan carbone)'
    ]
  },

  // Score 72 > 70 → Roadmap agressive
  roadmap: {
    budget_estime: '45 000 – 120 000 € sur 18 mois (bootstrappable avec 2 fondateurs tech)',
    jalons_critiques: [
      'Semaine 4 : 10 pré-inscriptions payantes obtenues → GO phase 1',
      'Mois 5 : 20 food trucks actifs + rétention D30 > 40% → GO lancement public',
      'Mois 8 : 100 trucks + 5 000 users actifs → décision levée de fonds',
      'Mois 12 : 10 000€ MRR atteint → GO expansion internationale',
    ],
    phases: [
      {
        id: 0,
        name: 'Validation',
        duration: 'Semaines 1-4',
        icon: '🔍',
        isCurrentPhase: true,
        objectifs: [
          'Interviewer 30 food trucks pour valider le problème n°1 et le willingness to pay',
          'Tester 3 messages de valeur distincts via une landing page Carrd',
          'Obtenir 10 pré-inscriptions à 49€/mois (preuve de demande réelle)',
          'Identifier les 3 failles exploitables chez Google Maps et Uber Eats',
        ],
        livrables: [
          'Grille d\'interview et synthèse des 30 entretiens',
          'Landing page A/B testée avec taux de conversion par variante',
          'Liste de 10 pré-inscrits avec contrat moral signé',
          'Matrice concurrentielle annotée (forces/failles)',
        ],
        ressources: {
          budget: '500 – 2 000 €',
          personnes: '1-2 fondateurs',
          temps: '4 semaines à 100%',
        },
        kpis: [
          '10 pré-inscriptions à ≥ 49€/mois',
          'Taux de réponse interviews > 60%',
          'Taux de conversion landing page > 3%',
          'NPS intention d\'achat > 7/10 sur 30 interviewés',
        ],
        risques: [
          'Les food trucks refusent de payer → pivoter vers modèle freemium B2B',
          'Toutes les variantes de landing page échouent → retravailler la proposition de valeur',
          'Marché trop fragmenté géographiquement → restreindre à 1 arrondissement pilote',
        ],
        goNogo: 'GO si 10 pré-inscriptions payantes obtenues. STOP si < 5 après 4 semaines.',
      },
      {
        id: 1,
        name: 'Pré-dev',
        duration: 'Mois 1-2',
        icon: '📐',
        isCurrentPhase: false,
        objectifs: [
          'Rédiger les spécifications fonctionnelles du MVP (3 features max)',
          'Choisir et valider la stack technique définitive',
          'Produire les wireframes des 5 écrans critiques',
          'Mettre en place l\'infrastructure cloud et les outils de dev',
        ],
        livrables: [
          'Cahier des charges fonctionnel (10-15 pages max)',
          'Décision de stack documentée avec justification des choix',
          'Wireframes Figma validés avec 5 utilisateurs potentiels',
          'Repo GitHub + CI/CD + environnement staging opérationnel',
        ],
        ressources: {
          budget: '1 000 – 5 000 €',
          personnes: '1 dev + 1 product',
          temps: '8 semaines',
        },
        kpis: [
          'Specs validées par au moins 3 pre-inscrits',
          'Architecture technique approuvée (pas de dette dès le départ)',
          'Design system de base établi (couleurs, typographie, composants)',
          'Environnement de dev fonctionnel en < 30 min pour un nouveau dev',
        ],
        risques: [
          'Feature creep — se limiter strictement à 3 fonctionnalités core',
          'Choix technique trop complexe pour une équipe réduite → favoriser simplicité',
          'Wireframes rejetés → itérer rapidement (max 2 cycles de révision)',
        ],
        goNogo: 'GO si specs finalisées et stack décidée dans les 8 semaines.',
      },
      {
        id: 2,
        name: 'MVP',
        duration: 'Mois 3-5',
        icon: '🛠️',
        isCurrentPhase: false,
        objectifs: [
          'Livrer 3 features core : carte live, profil truck, notification "ouvert maintenant"',
          'Onboarding food truck autonome en moins de 15 minutes',
          'Lancer beta privée avec les 10 pré-inscrits de la phase 0',
          'Atteindre un NPS bêta > 7/10 avant lancement public',
        ],
        livrables: [
          'App mobile iOS + Android (React Native / Expo) déployée',
          'Backend API REST + WebSocket pour positions live',
          'Dashboard food truck (profil, horaires, position)',
          'Rapport de test bêta avec insights utilisateurs',
        ],
        ressources: {
          budget: '15 000 – 30 000 €',
          personnes: '1-2 devs + 1 product',
          temps: '12 semaines',
        },
        kpis: [
          '20 food trucks actifs en beta',
          'Rétention D7 > 50% côté consommateurs',
          'Onboarding truck < 15 min (mesuré sur 10 sessions)',
          'NPS bêta > 7/10',
        ],
        risques: [
          'Tracking GPS en temps réel trop coûteux en API Mapbox → plafonner les requêtes',
          'Performance dégradée sur Android entrée de gamme → tests sur appareils réels',
          'Aucun truck ne met à jour sa position → gamification / notifications automatiques',
        ],
        goNogo: 'GO si NPS > 7 et rétention D7 > 50%. PIVOT si usage < attendu après 6 semaines de bêta.',
      },
      {
        id: 3,
        name: 'Early Adopters',
        duration: 'Mois 6-8',
        icon: '🚀',
        isCurrentPhase: false,
        objectifs: [
          'Acquérir les 100 premiers food trucks payants (49€/mois)',
          'Atteindre 5 000 utilisateurs actifs hebdomadaires sur Paris',
          'Mettre en place une boucle de feedback bi-hebdomadaire',
          'Itérer sur le produit avec 2 releases majeures basées sur le feedback',
        ],
        livrables: [
          'Programme ambassadeurs food trucks (6 mois gratuits contre feedback)',
          'Canaux d\'acquisition activés : partenariats événements, SEO local, TikTok',
          'Dashboard analytics interne (churn, DAU, position updates/jour)',
          'Changelog public et newsletter bi-mensuelle',
        ],
        ressources: {
          budget: '5 000 – 15 000 €',
          personnes: '2 fondateurs + 1 growth freelance',
          temps: '3 mois',
        },
        kpis: [
          '100 trucks payants à 49€/mois = 4 900€ MRR',
          '5 000 WAU (weekly active users)',
          'Churn mensuel trucks < 5%',
          'CAC < 100€ côté truck, < 5€ côté consommateur',
        ],
        risques: [
          'Acquisition trop lente → tester des canaux offline (salons, marchés)',
          'Churn élevé → audit qualité des profils trucks (données incomplètes)',
          'Mauvaise densité géographique → concentrer sur 3 arrondissements max',
        ],
        goNogo: 'GO si 100 trucks payants et churn < 5% à fin mois 8.',
      },
      {
        id: 4,
        name: 'Croissance',
        duration: 'Mois 9-12',
        icon: '📈',
        isCurrentPhase: false,
        objectifs: [
          'Scaler l\'infrastructure pour supporter 10x le trafic actuel',
          'Optimiser le funnel de conversion trucks (essai → payant)',
          'Lancer FoodConnect Pro à 99€/mois (analytics + événements)',
          'Expansion à Lyon et Bordeaux avec playbook réplicable',
        ],
        livrables: [
          'Architecture cloud scalable (auto-scaling, CDN, monitoring)',
          'Funnel d\'onboarding optimisé (A/B testé, taux de conversion +30%)',
          'Module analytics trucks : heatmaps, affluence prévisionnelle, météo',
          'Playbook de lancement ville documenté (90 jours, checklists)',
        ],
        ressources: {
          budget: '15 000 – 40 000 €',
          personnes: '2 devs + 1 growth + 1 sales B2B',
          temps: '4 mois',
        },
        kpis: [
          '500 trucks actifs (toutes villes)',
          '10 000€ MRR (mix Starter + Pro)',
          'Temps de chargement carte < 1.5s (P95)',
          'Taux d\'essai → payant > 25%',
        ],
        risques: [
          'Scalabilité technique insuffisante lors des pics (heure du déjeuner)',
          'Concurrence agressive d\'Uber Eats sur le segment trucks',
          'Burn rate trop élevé → rallonger la runway avant d\'embaucher',
        ],
        goNogo: 'GO levée de fonds si 10K€ MRR et croissance MoM > 15%.',
      },
      {
        id: 5,
        name: 'Scale',
        duration: 'Mois 13-18',
        icon: '🌍',
        isCurrentPhase: false,
        objectifs: [
          'Lever une Seed de 1-2M€ ou atteindre la profitabilité en bootstrapping',
          'Expansion Belgique + Espagne (marchés food trucks matures)',
          'Automatiser l\'acquisition B2B (SEO programmatique, intégrations)',
          'Construire l\'équipe cœur : Head of Sales, Head of Growth, CTO',
        ],
        livrables: [
          'Pitch deck et data room pour levée de fonds (ou P&L positif)',
          'Version localisée de l\'app (FR/EN/ES/NL)',
          'Pipeline d\'acquisition automatisé (SEO local x 50 villes)',
          'OKRs trimestriels et reporting investisseurs',
        ],
        ressources: {
          budget: '200 000 – 500 000 € (post-levée)',
          personnes: '6-10 personnes',
          temps: '6 mois',
        },
        kpis: [
          '2 000 trucks payants (3 pays)',
          '50 000€ MRR ou ARR > 500K€',
          'LTV/CAC > 3x',
          'NPS produit global > 8/10',
        ],
        risques: [
          'Levée de fonds échoue → recentrer sur profitabilité bootstrappée',
          'Expansion internationale sous-estimée culturellement → partenaire local obligatoire',
          'Équipe trop petite pour gérer 3 marchés → prioriser 1 pays à la fois',
        ],
        goNogo: 'SCALE si LTV/CAC > 3x et MRR croît > 10% MoM. PIVOT business model sinon.',
      },
    ],
  },

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

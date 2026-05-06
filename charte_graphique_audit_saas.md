# Charte Graphique — SaaS Audit Concurrentiel IA

**Slogan principal** : *"Pas de mensonge, que la réalité"*

---

## 1. Identité de Marque

### Nom du Projet
**VeritAudit** *(proposition)*

### Positionnement
Un SaaS d'audit concurrentiel basé sur l'IA qui analyse les projets avec une transparence brutale. Aucun enjolivement, aucune complaisance — uniquement des insights concrets basés sur des données réelles et une comparaison objective avec le marché.

### Valeurs Fondamentales
- **Transparence absolue** : Dire la vérité, même quand elle dérange
- **Rigueur analytique** : Score sur 100 basé sur des critères objectifs
- **Efficacité** : Interface directe, sans fioritures inutiles
- **Professionnalisme** : Design carré, structuré, sérieux

---

## 2. Palette de Couleurs

### Couleurs Principales

```css
/* Fond principal */
--color-background: #FFFFFF;

/* Surface / Cartes */
--color-surface: #FFFFFF;
--color-surface-elevated: #F8F9FA;

/* Accent principal (Rouge vérité) */
--color-primary: #E63946;
--color-primary-hover: #DC2F3C;
--color-primary-muted: #E6394615;

/* Accent secondaire (Jaune critique) */
--color-warning: #F4A261;
--color-warning-muted: #F4A26115;

/* Succès (Vert validation) */
--color-success: #2A9D8F;
--color-success-muted: #2A9D8F15;
```

### Couleurs de Texte

```css
--text-primary: #0F172A;
--text-secondary: #475569;
--text-tertiary: #94A3B8;
--text-disabled: #CBD5E1;
```

### Couleurs de Bordures

```css
--border-default: #E2E8F0;
--border-strong: #CBD5E1;
--border-accent: #E63946;
```

### Couleurs Sémantiques (Score)

```css
/* Score 0-30 : Critique */
--score-critical: #DC2626;

/* Score 31-50 : Faible */
--score-low: #F59E0B;

/* Score 51-70 : Moyen */
--score-medium: #3B82F6;

/* Score 71-85 : Bon */
--score-good: #10B981;

/* Score 86-100 : Excellent */
--score-excellent: #06B6D4;
```

---

## 3. Typographie

### Familles de Polices

```css
/* Titres et Headers - Style libre et impactant */
--font-display: 'Cabinet Grotesk', 'Switzer', 'DM Sans', -apple-system, sans-serif;
font-weight: 800;

/* Corps de texte - Lecture fluide */
--font-body: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
font-weight: 400;

/* Données et Métriques - Clarté numérique */
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
font-weight: 600;

/* Alternative titres si Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Inter:wght@400;500;600;700&display=swap');
```

### Échelle Typographique

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.5rem;     /* 40px */
--text-5xl: 3.5rem;     /* 56px */
```

### Hauteurs de Ligne

```css
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## 6. Hiérarchie Visuelle & Espacement

### Principe du Design Aéré

Le fond blanc permet une respiration maximale du contenu. Utilisez généreusement l'espace blanc pour :
- Séparer les sections importantes
- Créer une hiérarchie claire
- Faciliter la lecture et la compréhension
- Donner un aspect premium et professionnel

### Règles d'Espacement Vertical

```css
/* Entre sections majeures */
.section-spacing { margin-bottom: var(--space-20); }

/* Entre blocs de contenu */
.block-spacing { margin-bottom: var(--space-12); }

/* Entre éléments liés */
.element-spacing { margin-bottom: var(--space-6); }

/* Entre lignes de texte */
.text-spacing { margin-bottom: var(--space-4); }
```

### Container & Marges

```css
.container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.hero-section {
  padding: var(--space-20) var(--space-6);
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%);
}

.content-section {
  padding: var(--space-16) var(--space-6);
}
```

---

## 7. Espacements & Grille

### Système d'Espacement (8px base)

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

### Conteneur

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

---

## 8. Composants UI

### Bordures (Carrées uniquement)

```css
/* AUCUN border-radius - Tout est carré */
--radius-none: 0px;

/* Bordures */
--border-width-thin: 1px;
--border-width-default: 2px;
--border-width-thick: 3px;
```

### Ombres

```css
/* Ombres carrées et marquées - version fond clair */
--shadow-sm: 4px 4px 0px rgba(15, 23, 42, 0.08);
--shadow-md: 6px 6px 0px rgba(15, 23, 42, 0.12);
--shadow-lg: 8px 8px 0px rgba(15, 23, 42, 0.15);
--shadow-xl: 12px 12px 0px rgba(15, 23, 42, 0.18);

/* Ombres accentuées avec couleur primaire */
--shadow-primary-sm: 4px 4px 0px rgba(230, 57, 70, 0.15);
--shadow-primary-md: 6px 6px 0px rgba(230, 57, 70, 0.2);
--shadow-primary-lg: 8px 8px 0px rgba(230, 57, 70, 0.25);
```

### Boutons

#### Bouton Principal (CTA)
```css
.btn-primary {
  background: var(--color-primary);
  color: #FFFFFF;
  border: 2px solid var(--color-primary);
  padding: 14px 32px;
  font-family: var(--font-display);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 4px 0px rgba(15, 23, 42, 0.15);
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px rgba(15, 23, 42, 0.2);
  background: var(--color-primary-hover);
}

.btn-primary:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px rgba(15, 23, 42, 0.15);
}
```

#### Bouton Secondaire
```css
.btn-secondary {
  background: #FFFFFF;
  color: var(--text-primary);
  border: 2px solid var(--border-strong);
  padding: 14px 32px;
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: 4px 4px 0px rgba(230, 57, 70, 0.1);
  transform: translate(-2px, -2px);
}
```

### Cartes

```css
.card {
  background: var(--color-surface);
  border: 2px solid var(--border-default);
  padding: var(--space-8);
  position: relative;
  transition: all 0.3s ease;
}

.card-elevated {
  border: 2px solid var(--border-strong);
  box-shadow: var(--shadow-md);
}

.card-accent {
  border-left: 4px solid var(--color-primary);
  border-top: 2px solid var(--border-default);
  border-right: 2px solid var(--border-default);
  border-bottom: 2px solid var(--border-default);
}
```

### Inputs / Formulaires

```css
.input {
  background: #FFFFFF;
  border: 2px solid var(--border-default);
  color: var(--text-primary);
  padding: 14px 18px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  transition: all 0.2s;
}

.input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-muted);
}

.input::placeholder {
  color: var(--text-tertiary);
}

.textarea {
  background: #FFFFFF;
  border: 2px solid var(--border-default);
  color: var(--text-primary);
  padding: 14px 18px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  min-height: 120px;
  resize: vertical;
}
```

### Badges de Score

```css
.score-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 2px solid;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: var(--text-2xl);
  min-width: 80px;
}

.score-critical { 
  border-color: var(--score-critical);
  color: var(--score-critical);
  background: rgba(220, 38, 38, 0.1);
}

.score-excellent { 
  border-color: var(--score-excellent);
  color: var(--score-excellent);
  background: rgba(6, 182, 212, 0.1);
}
```

### Section Critique

```css
.critique-section {
  background: #FEF2F2;
  border: 2px solid var(--color-primary);
  border-left: 4px solid var(--color-primary);
  padding: var(--space-8);
  padding-top: var(--space-12);
  position: relative;
}

.critique-section::before {
  content: "PAS DE MENSONGE, QUE LA RÉALITÉ";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-primary);
  color: #FFFFFF;
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 800;
  letter-spacing: 0.15em;
}

.critique-section .content {
  margin-top: var(--space-4);
  color: var(--text-primary);
  line-height: var(--leading-relaxed);
  font-size: var(--text-base);
}

.critique-section .content strong {
  color: var(--color-primary);
  font-weight: 700;
}
```

---

## 9. Iconographie

### Style d'Icônes
- **Type** : Lignes géométriques carrées (style Lucide avec angles droits)
- **Épaisseur** : 2px
- **Taille standard** : 24x24px
- **Palette** : Même que les couleurs de texte

### Icônes Principales

| Fonction | Icône | Usage |
|----------|-------|-------|
| Audit | 🔍 | Analyse et recherche |
| Score | 📊 | Affichage des métriques |
| Critique | ⚠️ | Section d'avertissement |
| Upload | 📤 | Import de fichiers |
| Comparaison | ⚖️ | Analyse concurrentielle |
| Validation | ✓ | Succès / Confirmation |
| Erreur | ✕ | Échec / Problème |

---

## 10. Animations & Transitions

### Durées

```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
```

### Courbes de Bézier

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Effets Micro-interactions

```css
/* Hover sur cartes */
.card-interactive:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px rgba(230, 57, 70, 0.2);
  border-color: var(--color-primary);
}

/* Loading state */
@keyframes pulse-square {
  0%, 100% { 
    opacity: 1; 
    border-color: var(--border-default);
  }
  50% { 
    opacity: 0.6; 
    border-color: var(--color-primary);
  }
}

.loading {
  animation: pulse-square 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Skeleton loader */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 0%,
    var(--color-surface-elevated) 50%,
    var(--color-surface) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 11. Layout & Structure

### Navigation

```
┌─────────────────────────────────────────────┐
│  LOGO    Tableau de bord │ Audits │ Docs   │ [Compte] 
└─────────────────────────────────────────────┘
```

- Hauteur : 72px
- Fond : `#FFFFFF`
- Bordure inférieure : 2px solid `var(--border-default)`
- Items espacés avec `gap: var(--space-10)`
- Logo en gras avec accent rouge
- Items de navigation en `font-weight: 600`

### Page d'Audit (Structure)

```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  NOUVEAU PROJET                     │   │
│  │  [Décrivez votre idée...]           │   │
│  │                                      │   │
│  │  [📤 Importer des fichiers]         │   │
│  │                                      │   │
│  │  [ LANCER L'AUDIT ]                 │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

### Résultats d'Audit

```
┌──────────────────────────────────────────────┐
│  ┌──────────┐                                │
│  │   78/100 │  Votre Projet                  │
│  └──────────┘                                │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ ⚠️  PAS DE MENSONGE, QUE LA RÉALITÉ   │ │
│  ├────────────────────────────────────────┤ │
│  │                                        │ │
│  │  Critique détaillée du projet...      │ │
│  │                                        │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  CONCURRENTS IDENTIFIÉS                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Projet A │  │ Projet B │  │ Projet C │  │
│  │  92/100  │  │  85/100  │  │  71/100  │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└──────────────────────────────────────────────┘
```

---

## 12. Responsive Design

### Breakpoints

```css
--breakpoint-sm: 640px;   /* Mobile large */
--breakpoint-md: 768px;   /* Tablette */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

### Règles Mobile-First

- Sur mobile : Stack vertical, boutons pleine largeur
- Sur tablette : Grid 2 colonnes pour les cartes
- Sur desktop : Grid 3-4 colonnes, layout asymétrique possible

---

## 13. Accessibilité (A11y)

### Contrastes
- Ratio minimum : **4.5:1** pour le texte normal (validé avec fond blanc)
- Ratio minimum : **3:1** pour le texte large (>18px)
- Texte principal (#0F172A) sur fond blanc = ratio 14.8:1 ✓
- Texte secondaire (#475569) sur fond blanc = ratio 7.2:1 ✓

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--color-primary-muted);
}
```

### États Interactifs
- Tous les boutons doivent avoir des états `:hover`, `:focus`, `:active`
- Les éléments interactifs doivent avoir une taille minimale de 44x44px (tactile)

---

## 14. Voix & Ton

### Principes Rédactionnels

**Direct et sans détour**
- ✅ "Votre projet manque de différenciation"
- ❌ "Il serait peut-être judicieux de considérer..."

**Factuel, chiffré**
- ✅ "12 concurrents directs identifiés"
- ❌ "Quelques concurrents dans votre domaine"

**Honnête mais professionnel**
- ✅ "Cette fonctionnalité existe déjà chez 8 concurrents"
- ❌ "Votre idée est nulle"

### Exemples de Copies

**Hero Section**
> Votre idée face à la réalité du marché.
> Audit concurrentiel IA. Pas de mensonge, que des faits.

**CTA Principal**
> LANCER L'AUDIT

**Section Critique**
> ⚠️ PAS DE MENSONGE, QUE LA RÉALITÉ
> Votre projet présente 3 faiblesses majeures identifiées par l'analyse...

**Score**
> 64/100 — Potentiel moyen
> 7 points d'amélioration critique identifiés

---

## 15. Assets & Ressources

### Logos
- Format : SVG (vectoriel)
- Versions : Logo complet, Logo icône seule, Logo texte seul
- Couleurs : Version lumière (sur fond sombre), Version sombre (sur fond clair)

### Exports Design
- Maquettes Figma/Sketch en format carré strict
- Composants réutilisables en bibliothèque
- Guide de style Storybook pour développeurs

### Code
```css
/* Fichier : design-tokens.css */
:root {
  /* Import direct de toutes les variables ci-dessus */
}
```

---

## 16. Do's & Don'ts

### ✅ À FAIRE

- Utiliser des bordures carrées UNIQUEMENT (border-radius: 0)
- Employer des ombres carrées décalées (box-shadow avec offset)
- Maximiser l'utilisation de l'espace blanc entre les sections
- Privilégier les typographies sans-serif modernes et lisibles
- Utiliser le rouge (primary) avec parcimonie mais impact
- Structurer l'information avec une hiérarchie claire et aérée
- Afficher les scores de manière visible et sans ambiguïté
- Mettre en avant la section critique avec le slogan sur fond rouge
- Utiliser des contrastes élevés pour la lisibilité
- Garder un design épuré et professionnel

### ❌ À ÉVITER

- Aucun arrondi (border-radius > 0)
- Éviter les fonds gris ou sombres (rester sur fond blanc)
- Ne pas atténuer les critiques négatives
- Éviter les couleurs pastel excessivement douces
- Ne pas surcharger d'animations distrayantes
- Éviter les illustrations décoratives non fonctionnelles
- Ne jamais masquer l'information derrière des euphémismes
- Éviter les textures de fond qui réduisent la lisibilité
- Ne pas utiliser trop de couleurs différentes (3-4 max)

---

## 17. Checklist d'Implémentation

### Phase Design
- [ ] Définir les maquettes desktop / tablette / mobile
- [ ] Créer les composants UI en HTML/CSS statique
- [ ] Valider les contrastes et l'accessibilité
- [ ] Tester les états interactifs (hover, focus, active)

### Phase Développement
- [ ] Implémenter le design system en CSS/Tailwind
- [ ] Créer les composants React/Vue avec props
- [ ] Intégrer les animations et transitions
- [ ] Tester responsive sur vrais devices

### Phase QA
- [ ] Validation W3C (HTML/CSS)
- [ ] Tests accessibilité (WCAG 2.1 AA)
- [ ] Tests multi-navigateurs (Chrome, Firefox, Safari)
- [ ] Tests performance (Lighthouse score > 90)

---

## Conclusion

Cette charte graphique établit une identité visuelle forte, moderne et professionnelle avec un design épuré sur fond blanc. L'absence totale de border-radius, les ombres carrées décalées, et la typographie libre créent une esthétique contemporaine et accessible — en parfaite harmonie avec la promesse du produit : **"Pas de mensonge, que la réalité"**.

Le fond blanc offre une base neutre et professionnelle qui permet aux éléments importants (scores, critiques, données) de se démarquer clairement. L'utilisation généreuse de l'espace blanc renforce la hiérarchie visuelle et facilite la lecture.

L'interface incarne la clarté et la transparence : structurée, lisible, et visuellement percutante sans être agressive.

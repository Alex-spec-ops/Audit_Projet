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
--color-background: #0A0E14;

/* Surface / Cartes */
--color-surface: #151921;
--color-surface-elevated: #1C2128;

/* Accent principal (Rouge vérité) */
--color-primary: #E63946;
--color-primary-hover: #DC2F3C;
--color-primary-muted: #E6394620;

/* Accent secondaire (Jaune critique) */
--color-warning: #F4A261;
--color-warning-muted: #F4A26120;

/* Succès (Vert validation) */
--color-success: #2A9D8F;
--color-success-muted: #2A9D8F20;
```

### Couleurs de Texte

```css
--text-primary: #FFFFFF;
--text-secondary: #9CA3AF;
--text-tertiary: #6B7280;
--text-disabled: #4B5563;
```

### Couleurs de Bordures

```css
--border-default: #2D3541;
--border-strong: #3F4753;
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
/* Titres et Headers */
--font-display: 'Space Mono', 'Courier New', monospace;
font-weight: 700;

/* Corps de texte */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
font-weight: 400;

/* Données et Métriques */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
font-weight: 500;
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
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
```

### Hauteurs de Ligne

```css
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## 4. Espacements & Grille

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

## 5. Composants UI

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
/* Ombres carrées et marquées */
--shadow-sm: 4px 4px 0px rgba(230, 57, 70, 0.15);
--shadow-md: 6px 6px 0px rgba(230, 57, 70, 0.2);
--shadow-lg: 8px 8px 0px rgba(230, 57, 70, 0.25);
--shadow-xl: 12px 12px 0px rgba(230, 57, 70, 0.3);

/* Ombres pour surfaces sombres */
--shadow-dark-sm: 4px 4px 0px rgba(0, 0, 0, 0.4);
--shadow-dark-md: 6px 6px 0px rgba(0, 0, 0, 0.5);
```

### Boutons

#### Bouton Principal (CTA)
```css
.btn-primary {
  background: var(--color-primary);
  color: var(--text-primary);
  border: 2px solid var(--color-primary);
  padding: 12px 24px;
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.4);
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.4);
}

.btn-primary:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.4);
}
```

#### Bouton Secondaire
```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-strong);
  padding: 12px 24px;
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
```

### Cartes

```css
.card {
  background: var(--color-surface);
  border: 2px solid var(--border-default);
  padding: var(--space-6);
  position: relative;
}

.card-elevated {
  border: 2px solid var(--border-strong);
  box-shadow: var(--shadow-dark-md);
}

.card-accent {
  border-left: 4px solid var(--color-primary);
}
```

### Inputs / Formulaires

```css
.input {
  background: var(--color-surface-elevated);
  border: 2px solid var(--border-default);
  color: var(--text-primary);
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  transition: border-color 0.2s;
}

.input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-muted);
}

.input::placeholder {
  color: var(--text-tertiary);
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
  background: var(--color-surface-elevated);
  border-left: 4px solid var(--color-primary);
  padding: var(--space-6);
  position: relative;
}

.critique-section::before {
  content: "PAS DE MENSONGE, QUE LA RÉALITÉ";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-primary);
  color: var(--text-primary);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.1em;
}

.critique-section .content {
  margin-top: var(--space-8);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}
```

---

## 6. Iconographie

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

## 7. Animations & Transitions

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
  box-shadow: 6px 6px 0px rgba(230, 57, 70, 0.25);
  border-color: var(--color-primary);
}

/* Loading state */
@keyframes pulse-square {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse-square 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## 8. Layout & Structure

### Navigation

```
┌─────────────────────────────────────────────┐
│  LOGO    Tableau de bord │ Audits │ Docs   │ [Compte] 
└─────────────────────────────────────────────┘
```

- Hauteur : 64px
- Fond : `var(--color-surface)`
- Bordure inférieure : 2px solid `var(--border-strong)`
- Items espacés avec `gap: var(--space-8)`

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

## 9. Responsive Design

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

## 10. Accessibilité (A11y)

### Contrastes
- Ratio minimum : **4.5:1** pour le texte normal
- Ratio minimum : **3:1** pour le texte large (>18px)

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### États Interactifs
- Tous les boutons doivent avoir des états `:hover`, `:focus`, `:active`
- Les éléments interactifs doivent avoir une taille minimale de 44x44px (tactile)

---

## 11. Voix & Ton

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

## 12. Assets & Ressources

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

## 13. Do's & Don'ts

### ✅ À FAIRE

- Utiliser des bordures carrées UNIQUEMENT (border-radius: 0)
- Employer des ombres carrées décalées (box-shadow avec offset)
- Privilégier les typographies monospace pour les données
- Utiliser le rouge (primary) avec parcimonie mais impact
- Structurer l'information de manière hiérarchique claire
- Afficher les scores de manière visible et sans ambiguïté
- Mettre en avant la section critique avec le slogan

### ❌ À ÉVITER

- Aucun arrondi (border-radius > 0)
- Éviter les dégradés "doux" et les effets de flou
- Ne pas atténuer les critiques négatives
- Éviter les couleurs pastel ou douces
- Ne pas surcharger d'animations distrayantes
- Éviter les illustrations décoratives non fonctionnelles
- Ne jamais masquer l'information derrière des euphémismes

---

## 14. Checklist d'Implémentation

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

Cette charte graphique établit une identité visuelle forte, géométrique et sans compromis. L'absence totale de border-radius, les ombres carrées décalées, et la palette sombre avec un rouge accent créent une esthétique professionnelle, technique et directe — en parfaite harmonie avec la promesse du produit : **"Pas de mensonge, que la réalité"**.

L'interface doit incarner la rigueur de l'audit : structurée, factuelle, et visuellement impactante.

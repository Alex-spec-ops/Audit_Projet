import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText, Upload, X, ChevronDown, ArrowRight, ArrowLeft,
  Lightbulb, Clock, Paperclip,
} from 'lucide-react';
import { INDUSTRIES } from '../design-tokens';
import type { InputMode } from '../types';

const PLACEHOLDER_TEXT = `Exemple :
"Je veux créer une application mobile qui connecte les food trucks avec leurs clients potentiels. Le problème actuel : les clients ne savent pas où sont les food trucks, et les food trucks ont du mal à se faire connaître. Ma solution : une carte interactive en temps réel avec notifications 'ouvert maintenant'.

Cible principale : les actifs 25-45 ans en zone urbaine qui cherchent des déjeuners rapides et originaux.

Modèle économique : commission de 5% sur les commandes + abonnement premium pour les food trucks (fonctionnalités analytics)."`;

const MAX_CHARS = 3000;
const ACCEPTED_TYPES = ['.pdf', '.docx', '.pptx', '.doc', '.ppt'];
const MAX_FILE_MB = 10;

function ProgressBar({ step }: { step: number }) {
  const labels = ['Description', 'Extraction IA', 'Analyse', 'Résultats'];
  return (
    <div className="flex items-center gap-2 text-sm" aria-label={`Étape ${step} sur 4`}>
      {[1, 2, 3, 4].map(s => (
        <div key={s} className="flex items-center gap-1.5">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
              ${s === step ? 'bg-primary-600 text-white shadow-glow-blue' : s < step ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'}`}
          >
            {s}
          </div>
          {s < 4 && <div className={`h-0.5 w-5 transition-colors duration-300 ${s < step ? 'bg-primary-400' : 'bg-slate-200'}`} />}
        </div>
      ))}
      <span className="ml-2 text-slate-500 text-xs hidden sm:block">{labels[step - 1]}</span>
    </div>
  );
}


interface FileBadgeProps {
  file: File;
  onRemove: () => void;
}

function FileBadge({ file, onRemove }: FileBadgeProps) {
  const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
  return (
    <div className="flex items-center gap-3 p-3 bg-primary-50 border border-primary-200 rounded-xl">
      <Paperclip size={16} className="text-primary-600 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
        <p className="text-xs text-slate-500">{sizeMB} MB</p>
      </div>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-primary-100 rounded-lg transition-colors"
        aria-label="Supprimer le fichier"
      >
        <X size={14} className="text-slate-400" />
      </button>
    </div>
  );
}

export default function Submit() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<InputMode>('text');
  const [description, setDescription] = useState('');
  const [projectName, setProjectName] = useState('');
  const [industry, setIndustry] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const valid: File[] = [];
    for (const f of incoming) {
      const ext = '.' + f.name.split('.').pop()?.toLowerCase();
      if (!ACCEPTED_TYPES.includes(ext)) {
        setError(`Format non accepté : ${f.name}. Utilisez PDF, DOCX ou PPTX.`);
        continue;
      }
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        setError(`Fichier trop lourd : ${f.name} (max ${MAX_FILE_MB} MB).`);
        continue;
      }
      valid.push(f);
    }
    if (valid.length) {
      setFiles(prev => [...prev, ...valid].slice(0, 3));
      setError('');
    }
  }, []);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const canSubmit =
    (mode === 'text' && description.trim().length >= 50) ||
    (mode === 'file' && files.length > 0);

  const handleSubmit = () => {
    if (!canSubmit) return;
    localStorage.setItem(
      'auditSubmission',
      JSON.stringify({ description, projectName, industry, fileNames: files.map(f => f.name) })
    );
    navigate('/extract', { state: { projectName: projectName || 'Mon Projet' } });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={18} className="text-slate-400" />
            <div className="w-7 h-7 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white text-xs font-black">
              ◈
            </div>
            <span className="font-bold text-slate-800 hidden sm:block">ProjectAudit.ai</span>
          </Link>
          <ProgressBar step={1} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-black text-slate-900">Décrivez votre projet</h1>
          <p className="mt-2 text-slate-500 leading-relaxed">
            Plus vous êtes précis, plus l'audit sera pertinent et actionnable.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
          {(['text', 'file'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                ${mode === m ? 'bg-white text-slate-900 shadow-card' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {m === 'text' ? <><FileText size={15} /> Décrire par texte</> : <><Upload size={15} /> Importer un fichier</>}
            </button>
          ))}
        </div>

        {/* Text input */}
        {mode === 'text' && (
          <div className="space-y-2 animate-fade-in">
            <div className="relative">
              <textarea
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value.slice(0, MAX_CHARS))}
                placeholder={PLACEHOLDER_TEXT}
                rows={12}
                className="input-field resize-none leading-relaxed font-sans text-sm"
                aria-label="Description du projet"
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-mono bg-white px-2 py-1 rounded">
                {description.length}/{MAX_CHARS}
              </div>
            </div>

            {/* Writing tips */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
              <Lightbulb size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-700 space-y-1">
                <p className="font-semibold">Pour un audit optimal, incluez :</p>
                <ul className="space-y-0.5 text-amber-600">
                  {[
                    'Le problème que vous résolvez et pour qui',
                    'Votre proposition de valeur unique',
                    'Votre modèle économique envisagé',
                    'Vos concurrents que vous connaissez déjà',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-0.5">·</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {description.length > 0 && description.length < 50 && (
              <p className="text-xs text-red-500">
                Décrivez votre projet en au moins 50 caractères pour obtenir un audit pertinent.
              </p>
            )}
          </div>
        )}

        {/* File upload */}
        {mode === 'file' && (
          <div className="space-y-4 animate-fade-in">
            <div
              onDrop={onDrop}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
                ${dragging ? 'border-primary-400 bg-primary-50 scale-[1.01]' : 'border-slate-300 hover:border-primary-300 hover:bg-primary-50/30'}`}
              role="button"
              aria-label="Zone de dépôt de fichiers"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ACCEPTED_TYPES.join(',')}
                onChange={e => handleFiles(e.target.files)}
                className="hidden"
                aria-hidden
              />
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload size={28} className="text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700">
                    {dragging ? 'Déposez vos fichiers ici' : 'Glissez-déposez vos fichiers'}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    ou <span className="text-primary-600 font-medium">cliquez pour sélectionner</span>
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  PDF, DOCX, PPTX · Max {MAX_FILE_MB} MB · Jusqu'à 3 fichiers
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-start gap-2">
                <X size={16} className="flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((f, i) => (
                  <FileBadge
                    key={i}
                    file={f}
                    onRemove={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Optional fields */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="project-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Nom du projet <span className="text-slate-400 font-normal">(optionnel)</span>
            </label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              placeholder="Ex : FoodConnect, HealthMate..."
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Secteur d'activité <span className="text-slate-400 font-normal">(optionnel)</span>
            </label>
            <div className="relative">
              <select
                id="industry"
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="input-field appearance-none pr-10 cursor-pointer"
              >
                <option value="">Sélectionner un secteur...</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock size={16} className="text-slate-400" />
            <span>Analyse en <strong className="text-slate-700">~2-3 minutes</strong> · Gratuit · Sans inscription</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`group inline-flex items-center gap-3 px-8 py-4 text-white font-bold rounded-xl transition-all duration-200
              ${canSubmit
                ? 'bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-glow-blue cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            aria-disabled={!canSubmit}
          >
            Lancer l'audit
            <ArrowRight size={18} className={`${canSubmit ? 'group-hover:translate-x-1' : ''} transition-transform`} />
          </button>
        </div>

        {!canSubmit && (
          <p className="text-xs text-center text-slate-400">
            {mode === 'text'
              ? `Décrivez votre projet en au moins 50 caractères (${Math.max(0, 50 - description.length)} restants)`
              : 'Ajoutez au moins un fichier pour continuer'}
          </p>
        )}
      </main>
    </div>
  );
}

import React from 'react';
import { Globe } from 'lucide-react';
import { useI18n } from './i18n';

export default function Header() {
  const { lang, setLang, t } = useI18n();

  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="text-blue-600" />
          <div>
            <div className="font-semibold text-lg">{t('title')}</div>
            <div className="text-xs text-slate-500">{t('tagline')}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="lang" className="text-sm text-slate-600">Lang</label>
          <select
            id="lang"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import Essentials from './components/Essentials';
import Explorer from './components/Explorer';
import { I18nProvider } from './components/i18n';

export default function App() {
  const [lang, setLang] = useState('en');
  const [query, setQuery] = useState({
    destination: 'Paris',
    checkin: '',
    checkout: '',
    adults: 2,
  });

  return (
    <I18nProvider lang={lang} setLang={setLang}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <SearchPanel query={query} setQuery={setQuery} />
          <Essentials query={query} />
          <Explorer query={query} />
        </main>
        <footer className="text-center py-8 text-sm text-slate-500">
          <p>Built for travelers. Data from Open-Meteo and Wikivoyage. External links to official providers.</p>
        </footer>
      </div>
    </I18nProvider>
  );
}

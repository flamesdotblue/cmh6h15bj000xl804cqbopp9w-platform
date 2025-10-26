import React, { useEffect, useMemo, useState } from 'react';
import { Cloud, MapPin, Utensils } from 'lucide-react';
import { useI18n } from './i18n';

async function geocodeCity(name, lang = 'en') {
  if (!name) return null;
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=${lang}&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;
  const c = data.results[0];
  return { lat: c.latitude, lon: c.longitude, name: c.name, country: c.country, timezone: c.timezone };
}

async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather failed');
  return res.json();
}

async function fetchWikivoyageSections(title, sections = ['See', 'Eat']) {
  const searchUrl = `https://en.wikivoyage.org/w/api.php?action=opensearch&search=${encodeURIComponent(title)}&limit=1&namespace=0&format=json&origin=*`;
  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) throw new Error('Wikivoyage search failed');
  const searchData = await searchRes.json();
  const pageTitle = searchData?.[1]?.[0];
  if (!pageTitle) return { sections: {} };

  const sectRes = await fetch(`https://en.wikivoyage.org/w/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&prop=sections&format=json&origin=*`);
  const sectData = await sectRes.json();
  const idxMap = {};
  for (const name of sections) {
    const found = sectData?.parse?.sections?.find((s) => s.line?.toLowerCase() === name.toLowerCase());
    if (found) idxMap[name] = found.index;
  }

  const out = {};
  for (const name of sections) {
    if (!idxMap[name]) continue;
    const htmlRes = await fetch(`https://en.wikivoyage.org/w/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&section=${idxMap[name]}&prop=text&format=json&origin=*`);
    const htmlData = await htmlRes.json();
    const html = htmlData?.parse?.text?.['*'] ?? '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const items = Array.from(tmp.querySelectorAll('li'))
      .map((li) => li.textContent?.replace(/\s+/g, ' ').trim())
      .filter(Boolean);
    out[name] = items.slice(0, 6);
  }

  return { title: pageTitle, sections: out };
}

export default function Explorer({ query }) {
  const { t, lang } = useI18n();
  const [geo, setGeo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [wiki, setWiki] = useState({ title: '', sections: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const destination = query.destination;

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError('');
      setWeather(null);
      try {
        const g = await geocodeCity(destination, lang);
        if (cancelled) return;
        setGeo(g);
        if (g) {
          const w = await fetchWeather(g.lat, g.lon);
          if (!cancelled) setWeather(w);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      let _ = false; // placeholder to satisfy some linters
      cancelled = true;
    };
  }, [destination, lang]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const data = await fetchWikivoyageSections(destination, ['See', 'Eat']);
        if (!cancelled) setWiki(data);
      } catch (e) {
        if (!cancelled) setWiki({ title: '', sections: {} });
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [destination]);

  const daily = useMemo(() => weather?.daily, [weather]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 border rounded-xl p-4 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <Cloud className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold">{t('weather')}</h3>
        </div>
        {loading && <div className="text-sm text-slate-500">{t('loading')}</div>}
        {!loading && !geo && <div className="text-sm text-slate-500">{t('noResults')}</div>}
        {!loading && geo && (
          <div>
            <div className="text-sm text-slate-600 mb-3">{geo.name}{geo.country ? `, ${geo.country}` : ''}</div>
            {daily ? (
              <div className="grid grid-cols-3 gap-2">
                {daily.time.slice(0, 3).map((d, i) => (
                  <div key={d} className="border rounded-lg p-3 text-center">
                    <div className="text-xs text-slate-500">{new Date(d).toLocaleDateString()}</div>
                    <div className="text-lg font-semibold">{Math.round(daily.temperature_2m_max[i])}°</div>
                    <div className="text-xs text-slate-500">min {Math.round(daily.temperature_2m_min[i])}°</div>
                    <div className="text-xs text-blue-700 mt-1">💧{Math.round(daily.precipitation_sum[i] || 0)}mm</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-500">{t('loading')}</div>
            )}
          </div>
        )}
        {error && <div className="text-xs text-rose-600 mt-2">{error}</div>}
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-slate-600" />
            <h3 className="font-semibold">{t('bestPlaces')}</h3>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            {wiki.sections?.See?.length ? (
              wiki.sections.See.map((item, idx) => (
                <li key={idx} className="text-slate-700">{item}</li>
              ))
            ) : (
              <li className="text-slate-500">{t('noResults')}</li>
            )}
          </ul>
        </div>
        <div className="border rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Utensils className="w-5 h-5 text-slate-600" />
            <h3 className="font-semibold">{t('bestRestaurants')}</h3>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            {wiki.sections?.Eat?.length ? (
              wiki.sections.Eat.map((item, idx) => (
                <li key={idx} className="text-slate-700">{item}</li>
              ))
            ) : (
              <li className="text-slate-500">{t('noResults')}</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

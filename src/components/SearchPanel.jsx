import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Search, Users } from 'lucide-react';
import { useI18n } from './i18n';

export default function SearchPanel({ query, setQuery }) {
  const { t } = useI18n();
  const [destination, setDestination] = useState(query.destination);
  const [checkin, setCheckin] = useState(query.checkin);
  const [checkout, setCheckout] = useState(query.checkout);
  const [adults, setAdults] = useState(query.adults);

  useEffect(() => {
    setDestination(query.destination);
    setCheckin(query.checkin);
    setCheckout(query.checkout);
    setAdults(query.adults);
  }, [query]);

  return (
    <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="md:col-span-2">
          <label className="text-xs text-slate-500 block mb-1">{t('destination')}</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Tokyo"
              className="w-full outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">{t('checkin')}</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className="w-full outline-none" />
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">{t('checkout')}</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className="w-full outline-none" />
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">{t('adults')}</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Users className="w-4 h-4 text-slate-400" />
            <input
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full outline-none"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setQuery({ destination: destination.trim() || 'Paris', checkin, checkout, adults })}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Search className="w-4 h-4" /> {t('search')}
        </button>
      </div>
    </section>
  );
}

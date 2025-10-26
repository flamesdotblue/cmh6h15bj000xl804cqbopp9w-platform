import React, { useMemo } from 'react';
import { Plane, Hotel, Home, Train, ExternalLink } from 'lucide-react';
import { useI18n } from './i18n';

function buildLinks({ destination, checkin, checkout, adults }) {
  const city = encodeURIComponent(destination || '');
  const checkinStr = checkin || '';
  const checkoutStr = checkout || '';
  const adultsNum = adults || 2;

  return {
    flights: `https://www.google.com/travel/flights?q=${encodeURIComponent(`flights to ${destination} ${checkinStr ? 'on ' + checkinStr : ''}`)}`,
    hotels: `https://www.booking.com/searchresults.html?ss=${city}&checkin=${checkinStr}&checkout=${checkoutStr}&group_adults=${adultsNum}`,
    airbnb: `https://www.airbnb.com/s/${city}/homes?checkin=${checkinStr}&checkout=${checkoutStr}&adults=${adultsNum}`,
    transit: `https://www.google.com/maps/search/${encodeURIComponent(`public transport in ${destination}`)}`,
    rideshare: `https://m.uber.com/looking?search=${city}`,
    citySearch: `https://www.google.com/search?q=${encodeURIComponent(destination + ' public transport')}`,
  };
}

export default function Essentials({ query }) {
  const { t } = useI18n();
  const links = useMemo(() => buildLinks(query), [query]);

  const cards = [
    { key: 'flights', title: t('flights'), href: links.flights, icon: Plane, color: 'bg-blue-50 text-blue-700' },
    { key: 'hotels', title: t('hotels'), href: links.hotels, icon: Hotel, color: 'bg-emerald-50 text-emerald-700' },
    { key: 'airbnb', title: t('airbnb'), href: links.airbnb, icon: Home, color: 'bg-rose-50 text-rose-700' },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('essentials')}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ key, title, href, icon: Icon, color }) => (
          <a key={key} href={href} target="_blank" rel="noreferrer" className="group">
            <div className={`border rounded-xl p-4 flex items-center justify-between ${color} transition hover:shadow` }>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/70">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">{title}</div>
                  <div className="text-xs opacity-70">{t('open')} →</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-3 border rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Train className="w-5 h-5 text-slate-600" />
            <h3 className="font-semibold">{t('localTransport')}</h3>
          </div>
          <div className="text-sm text-slate-600 mb-3">
            {t('getAround')}
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800" href={links.transit} target="_blank" rel="noreferrer">Google Maps Transit</a>
            <a className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800" href={links.rideshare} target="_blank" rel="noreferrer">Uber</a>
            <a className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800" href={links.citySearch} target="_blank" rel="noreferrer">{t('viewMore')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

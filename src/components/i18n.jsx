import React, { createContext, useContext } from 'react';

const translations = {
  en: {
    title: 'GlobeGuide',
    tagline: 'Authentic travel essentials in your language',
    destination: 'Destination city',
    checkin: 'Check-in',
    checkout: 'Check-out',
    adults: 'Adults',
    search: 'Search',
    essentials: 'Essentials',
    flights: 'Flights',
    hotels: 'Hotels',
    airbnb: 'Airbnb',
    localTransport: 'Local transportation',
    open: 'Open',
    explorer: 'Local insights',
    weather: 'Weather forecast',
    bestPlaces: 'Best places to visit',
    bestRestaurants: 'Best restaurants',
    getAround: 'Get around',
    viewMore: 'View more',
    loading: 'Loading...',
    noResults: 'No results found',
  },
  es: {
    title: 'GlobeGuide',
    tagline: 'Esenciales de viaje auténticos en tu idioma',
    destination: 'Ciudad de destino',
    checkin: 'Entrada',
    checkout: 'Salida',
    adults: 'Adultos',
    search: 'Buscar',
    essentials: 'Esenciales',
    flights: 'Vuelos',
    hotels: 'Hoteles',
    airbnb: 'Airbnb',
    localTransport: 'Transporte local',
    open: 'Abrir',
    explorer: 'Guía local',
    weather: 'Pronóstico del tiempo',
    bestPlaces: 'Mejores lugares para visitar',
    bestRestaurants: 'Mejores restaurantes',
    getAround: 'Cómo moverse',
    viewMore: 'Ver más',
    loading: 'Cargando...',
    noResults: 'No se encontraron resultados',
  },
  fr: {
    title: 'GlobeGuide',
    tagline: 'Essentiels de voyage authentiques dans votre langue',
    destination: 'Ville de destination',
    checkin: 'Arrivée',
    checkout: 'Départ',
    adults: 'Adultes',
    search: 'Rechercher',
    essentials: 'Essentiels',
    flights: 'Vols',
    hotels: 'Hôtels',
    airbnb: 'Airbnb',
    localTransport: 'Transports locaux',
    open: 'Ouvrir',
    explorer: 'Aperçus locaux',
    weather: 'Prévisions météo',
    bestPlaces: 'Meilleurs lieux à visiter',
    bestRestaurants: 'Meilleurs restaurants',
    getAround: 'Se déplacer',
    viewMore: 'Voir plus',
    loading: 'Chargement...',
    noResults: 'Aucun résultat',
  },
  hi: {
    title: 'GlobeGuide',
    tagline: 'आपकी भाषा में प्रामाणिक यात्रा जानकारी',
    destination: 'गंतव्य शहर',
    checkin: 'चेक-इन',
    checkout: 'चेक-आउट',
    adults: 'वयस्क',
    search: 'खोजें',
    essentials: 'जरूरी',
    flights: 'उड़ानें',
    hotels: 'होटल',
    airbnb: 'एयरबीएनबी',
    localTransport: 'स्थानीय परिवहन',
    open: 'खोलें',
    explorer: 'स्थानीय जानकारी',
    weather: 'मौसम पूर्वानुमान',
    bestPlaces: 'घूमने की जगहें',
    bestRestaurants: 'सबसे अच्छे रेस्तरां',
    getAround: 'कैसे घूमें',
    viewMore: 'और देखें',
    loading: 'लोड हो रहा है...',
    noResults: 'कोई परिणाम नहीं मिला',
  },
};

const I18nContext = createContext({ lang: 'en', t: (k) => k, setLang: () => {} });

export function I18nProvider({ lang, setLang, children }) {
  const t = (key) => translations[lang]?.[key] ?? translations.en[key] ?? key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

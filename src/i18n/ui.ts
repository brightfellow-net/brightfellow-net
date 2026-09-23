export const langs = ['id', 'en'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'id';

export const langMeta = {
  id: { name: 'Bahasa Indonesia', short: 'ID', ogLocale: 'id_ID' },
  en: { name: 'English', short: 'EN', ogLocale: 'en_US' },
} as const;

export function getLang(url: URL): Lang {
  return /^\/en(\/|$)/.test(url.pathname) ? 'en' : 'id';
}

/** Path without the language prefix, e.g. /en/tools/ -> /tools/ */
export function stripLang(pathname: string): string {
  return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
}

/** Localized path for a language-neutral path like /tools/ */
export function localize(lang: Lang, path: string): string {
  return lang === defaultLang ? path : `/${lang}${path}`;
}

export const ui = {
  id: {
    skip: 'Langsung ke isi',
    home: 'Beranda',
    menu: 'Menu',
    close: 'Tutup',
    nav: 'Navigasi utama',
    tools: 'Alat',
    allTools: 'Semua alat',
    community: 'Komunitas',
    hosting: 'Hosting',
    openSource: 'Open source',
    privacy: 'Privasi',
    contact: 'Kontak',
    otherLang: 'English',
    language: 'Bahasa',
    toDark: 'Ganti ke mode gelap',
    toLight: 'Ganti ke mode terang',
    status: { pilot: 'Uji coba', available: 'Tersedia', 'coming-soon': 'Segera hadir' },
    viewCode: 'Lihat kode di GitHub',
    contactUs: 'Hubungi kami',
    footerTagline: 'Alat sederhana dan terbuka, dibuat bersama komunitas.',
    footerAbout: 'Tentang',
    footerLicense: 'Situs ini open-source dengan lisensi Apache-2.0, tanpa pelacak dan tanpa cookie.',
    footerSource: 'Kode situs ini',
  },
  en: {
    skip: 'Skip to content',
    home: 'Home',
    menu: 'Menu',
    close: 'Close',
    nav: 'Main navigation',
    tools: 'Tools',
    allTools: 'All tools',
    community: 'Community',
    hosting: 'Hosting',
    openSource: 'Open source',
    privacy: 'Privacy',
    contact: 'Contact',
    otherLang: 'Bahasa Indonesia',
    language: 'Language',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
    status: { pilot: 'Pilot', available: 'Available', 'coming-soon': 'Coming soon' },
    viewCode: 'See the code on GitHub',
    contactUs: 'Contact us',
    footerTagline: 'Simple, open tools, built together with communities.',
    footerAbout: 'About',
    footerLicense: 'This site is open source under the Apache-2.0 license, with no trackers and no cookies.',
    footerSource: 'Source for this site',
  },
} as const;

/** Top-level links after the Tools menu. Add Consultation or Donate here later. */
export const primaryNav = [
  { key: 'community', path: '/community/' },
  { key: 'hosting', path: '/hosting/' },
  { key: 'openSource', path: '/open-source/' },
  { key: 'contact', path: '/contact/' },
] as const;

/** "About" column in the footer. Add Consultation or Donate here later. */
export const footerNav = [
  { key: 'community', path: '/community/' },
  { key: 'hosting', path: '/hosting/' },
  { key: 'openSource', path: '/open-source/' },
  { key: 'privacy', path: '/privacy/' },
  { key: 'contact', path: '/contact/' },
] as const;

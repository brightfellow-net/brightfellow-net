export const site = {
  name: 'Brightfellow',
  url: 'https://brightfellow.net',
  email: 'hutomo@brightfellow.net',
  github: 'https://github.com/brightfellow-net',
  repo: 'https://github.com/brightfellow-net/brightfellow-net',
};

export const mailto = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

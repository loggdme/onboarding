import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

import discoverMovies from '../locales/de/discover_movies.json' with {
  type: 'json',
};
import movieDetails from '../locales/de/movie_details.json' with {
  type: 'json',
};
import sortOptions from '../locales/de/sort_options.json' with { type: 'json' };

export const initializeI18n = () => {
  i18n
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        return import(`../locales/${language}/${namespace}.json`);
      })
    )
    .init({
      lng: 'en',
      fallbackLng: 'en',
      supportedLngs: ['de', 'en'],
      ns: ['discover_movies', 'movie_details', 'sort_options'],
      defaultNS: false,
      interpolation: { escapeValue: false },
    });
};

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      discover_movies: typeof discoverMovies;
      movie_details: typeof movieDetails;
      sort_options: typeof sortOptions;
    };
  }
}

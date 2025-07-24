import { useTranslation } from 'react-i18next';

export const DiscoverMoviesHeader = () => {
  const { t } = useTranslation('discover_movies');

  return (
    <div className="mb-5 flex items-center justify-between px-2">
      <div>
        <h1 className="font-bold text-3xl">{t('title')}</h1>
        <p className="text-md text-muted-foreground">{t('description')}</p>
      </div>
    </div>
  );
};

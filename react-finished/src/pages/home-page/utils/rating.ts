import { config } from '$/config';

export const getRatingColorClassName = (rating: number) => {
  if (rating >= config.discoverMoviePage.ratingThresholds.good) {
    return 'stroke-emerald-500';
  }

  if (rating >= config.discoverMoviePage.ratingThresholds.okay) {
    return 'stroke-yellow-500';
  }

  return 'stroke-red-500';
};

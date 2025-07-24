import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '$/app';

import '$/styles/fonts.css';
import '$/styles/theme.css';

import '@total-typescript/ts-reset';

import { initializeI18n } from '$/lib/i18n';

initializeI18n();

createRoot(document.querySelector('#root') as Element).render(
  <StrictMode>
    <App />
  </StrictMode>
);

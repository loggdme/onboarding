import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://onboarding.myloggd.com',
  integrations: [
    starlight({
      title: 'Loggd Onboarding',
      customCss: ['./src/styles/custom.css'],
      logo: {
        src: './src/assets/logo.jpeg',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/loggdme/onboarding',
        },
      ],
      sidebar: [
        {
          label: 'All Onboardings',
          link: '/onboardings/',
        },
        {
          label: 'General Onboarding',
          items: [{ label: 'Loggd', link: '/general/loggd/' }],
        },
        {
          label: "Technological Concepts",
          items: [
            { label: 'Single Page Applications', link: '/concepts/spa' },
          ],
        },
        {
          label: 'React Onboarding',
          items: [
            { label: 'Getting Started', link: '/react/getting-started/' },
            { label: 'Checklist', link: '/react/checklist/' },
          ],
        },
      ],
    }),
  ],
});

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'; 
import alpinejs from "@astrojs/alpinejs";
import netlify from '@astrojs/netlify'; // <-- tilføjet

export default defineConfig({
  output: 'static', // <-- vigtigt for statisk site
  adapter: netlify(), // <-- tilføjet adapter
  vite: {  
    plugins: [tailwindcss()],
  },
  integrations: [alpinejs()],
});

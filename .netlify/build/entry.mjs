import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_D87DX2x8.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/about.astro.mjs');
const _page1 = () => import('./pages/bulletin.astro.mjs');
const _page2 = () => import('./pages/contact.astro.mjs');
const _page3 = () => import('./pages/decemberisterne.astro.mjs');
const _page4 = () => import('./pages/eliyahmesayer.astro.mjs');
const _page5 = () => import('./pages/foodchain.astro.mjs');
const _page6 = () => import('./pages/form_1.astro.mjs');
const _page7 = () => import('./pages/form_2.astro.mjs');
const _page8 = () => import('./pages/form_3.astro.mjs');
const _page9 = () => import('./pages/icepleasure.astro.mjs');
const _page10 = () => import('./pages/koloristerne.astro.mjs');
const _page11 = () => import('./pages/login.astro.mjs');
const _page12 = () => import('./pages/majorworks.astro.mjs');
const _page13 = () => import('./pages/restaurant.astro.mjs');
const _page14 = () => import('./pages/sløyfe.astro.mjs');
const _page15 = () => import('./pages/social.astro.mjs');
const _page16 = () => import('./pages/thisandthats.astro.mjs');
const _page17 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/about.astro", _page0],
    ["src/pages/bulletin.astro", _page1],
    ["src/pages/contact.astro", _page2],
    ["src/pages/decemberisterne.astro", _page3],
    ["src/pages/eliyahmesayer.astro", _page4],
    ["src/pages/foodchain.astro", _page5],
    ["src/pages/form_1.astro", _page6],
    ["src/pages/form_2.astro", _page7],
    ["src/pages/form_3.astro", _page8],
    ["src/pages/icepleasure.astro", _page9],
    ["src/pages/koloristerne.astro", _page10],
    ["src/pages/login.astro", _page11],
    ["src/pages/majorworks.astro", _page12],
    ["src/pages/restaurant.astro", _page13],
    ["src/pages/sløyfe.astro", _page14],
    ["src/pages/social.astro", _page15],
    ["src/pages/thisandthats.astro", _page16],
    ["src/pages/index.astro", _page17]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "1968e33e-68d8-422c-b8c4-6b99a24c5f03"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

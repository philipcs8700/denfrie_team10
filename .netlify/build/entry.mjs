import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_2lOdJW7X.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/cafe.astro.mjs');
const _page1 = () => import('./pages/form_1.astro.mjs');
const _page2 = () => import('./pages/form_2.astro.mjs');
const _page3 = () => import('./pages/form_3.astro.mjs');
const _page4 = () => import('./pages/listeform.astro.mjs');
const _page5 = () => import('./pages/login.astro.mjs');
const _page6 = () => import('./pages/singleview.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/cafe.astro", _page0],
    ["src/pages/form_1.astro", _page1],
    ["src/pages/form_2.astro", _page2],
    ["src/pages/form_3.astro", _page3],
    ["src/pages/listeform.astro", _page4],
    ["src/pages/login.astro", _page5],
    ["src/pages/singleview.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "6fdeea37-0452-41d1-92b0-0acb5aed9a55"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

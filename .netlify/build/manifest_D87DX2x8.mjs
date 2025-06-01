import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_DkhgH6On.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/","cacheDir":"file:///Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/node_modules/.astro/","outDir":"file:///Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/dist/","srcDir":"file:///Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/","publicDir":"file:///Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/public/","buildClientDir":"file:///Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/dist/","buildServerDir":"file:///Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"bulletin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/bulletin","isIndex":false,"type":"page","pattern":"^\\/bulletin\\/?$","segments":[[{"content":"bulletin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/bulletin.astro","pathname":"/bulletin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"decemberisterne/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/decemberisterne","isIndex":false,"type":"page","pattern":"^\\/decemberisterne\\/?$","segments":[[{"content":"decemberisterne","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/decemberisterne.astro","pathname":"/decemberisterne","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"eliyahmesayer/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/eliyahmesayer","isIndex":false,"type":"page","pattern":"^\\/eliyahmesayer\\/?$","segments":[[{"content":"eliyahmesayer","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/eliyahmesayer.astro","pathname":"/eliyahmesayer","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"foodchain/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/foodchain","isIndex":false,"type":"page","pattern":"^\\/foodchain\\/?$","segments":[[{"content":"foodchain","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/foodchain.astro","pathname":"/foodchain","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"form_1/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/form_1","isIndex":false,"type":"page","pattern":"^\\/form_1\\/?$","segments":[[{"content":"form_1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/form_1.astro","pathname":"/form_1","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"form_2/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/form_2","isIndex":false,"type":"page","pattern":"^\\/form_2\\/?$","segments":[[{"content":"form_2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/form_2.astro","pathname":"/form_2","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"form_3/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/form_3","isIndex":false,"type":"page","pattern":"^\\/form_3\\/?$","segments":[[{"content":"form_3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/form_3.astro","pathname":"/form_3","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"icepleasure/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/icepleasure","isIndex":false,"type":"page","pattern":"^\\/icepleasure\\/?$","segments":[[{"content":"icepleasure","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/icepleasure.astro","pathname":"/icepleasure","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"koloristerne/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/koloristerne","isIndex":false,"type":"page","pattern":"^\\/koloristerne\\/?$","segments":[[{"content":"koloristerne","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/koloristerne.astro","pathname":"/koloristerne","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"majorworks/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/majorworks","isIndex":false,"type":"page","pattern":"^\\/majorworks\\/?$","segments":[[{"content":"majorworks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/majorworks.astro","pathname":"/majorworks","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"restaurant/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/restaurant","isIndex":false,"type":"page","pattern":"^\\/restaurant\\/?$","segments":[[{"content":"restaurant","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/restaurant.astro","pathname":"/restaurant","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"sl%C3%B8yfe/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sløyfe","isIndex":false,"type":"page","pattern":"^\\/sløyfe\\/?$","segments":[[{"content":"sløyfe","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sløyfe.astro","pathname":"/sløyfe","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"social/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/social","isIndex":false,"type":"page","pattern":"^\\/social\\/?$","segments":[[{"content":"social","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/social.astro","pathname":"/social","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"thisandthats/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/thisandthats","isIndex":false,"type":"page","pattern":"^\\/thisandthats\\/?$","segments":[[{"content":"thisandthats","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/thisandthats.astro","pathname":"/thisandthats","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/bulletin.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/decemberisterne.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/eliyahmesayer.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/foodchain.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/form_1.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/form_2.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/form_3.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/icepleasure.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/koloristerne.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/majorworks.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/restaurant.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/sløyfe.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/social.astro",{"propagation":"none","containsHead":true}],["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/thisandthats.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/bulletin@_@astro":"pages/bulletin.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/decemberisterne@_@astro":"pages/decemberisterne.astro.mjs","\u0000@astro-page:src/pages/eliyahmesayer@_@astro":"pages/eliyahmesayer.astro.mjs","\u0000@astro-page:src/pages/foodchain@_@astro":"pages/foodchain.astro.mjs","\u0000@astro-page:src/pages/form_1@_@astro":"pages/form_1.astro.mjs","\u0000@astro-page:src/pages/form_2@_@astro":"pages/form_2.astro.mjs","\u0000@astro-page:src/pages/form_3@_@astro":"pages/form_3.astro.mjs","\u0000@astro-page:src/pages/icepleasure@_@astro":"pages/icepleasure.astro.mjs","\u0000@astro-page:src/pages/koloristerne@_@astro":"pages/koloristerne.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/majorworks@_@astro":"pages/majorworks.astro.mjs","\u0000@astro-page:src/pages/restaurant@_@astro":"pages/restaurant.astro.mjs","\u0000@astro-page:src/pages/sløyfe@_@astro":"pages/sløyfe.astro.mjs","\u0000@astro-page:src/pages/social@_@astro":"pages/social.astro.mjs","\u0000@astro-page:src/pages/thisandthats@_@astro":"pages/thisandthats.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D87DX2x8.mjs","/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.DMCSUevT.js","astro:scripts/page.js":"_astro/page.BCFd37Sx.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const t=\"team10\";if(localStorage.getItem(\"accessGranted\")===\"true\")return;prompt(\"Indtast kode:\")===t?localStorage.setItem(\"accessGranted\",\"true\"):document.body.innerHTML=\"<h1>Adgang nægtet</h1>\"});"]],"assets":["/_astro/bulletin.CPeGOI6Y.css","/_headers","/_redirects.rtf","/about.webp","/applepay.png","/arskort.webp","/bulletin.webp","/cafe.webp","/claudia-lomoschitz.webp","/decemberisterne.webp","/eau_pernice.webp","/eliyahmesayer.webp","/eva_mag.webp","/favicon.ico","/favicon.svg","/fb.webp","/foodchain.webp","/footer_bg.png","/googlepay.png","/hero.svg","/hero_bg.png","/hyphea.webp","/icepleasure.webp","/img1_10.webp","/img1_9.webp","/insta.webp","/koloristerne.webp","/leo.webp","/logo.jpg","/logo.png","/logo_silhouette.png","/majorworks.webp","/mastercard.png","/paypal.png","/rasmus_rohling.webp","/robots.rtf","/senim.webp","/sløyfe.webp","/therestaurant.webp","/thisandthats.webp","/visa.png","/_astro/page.BCFd37Sx.js","/_astro/page.BCFd37Sx.js","/about/index.html","/bulletin/index.html","/contact/index.html","/decemberisterne/index.html","/eliyahmesayer/index.html","/foodchain/index.html","/form_1/index.html","/form_2/index.html","/form_3/index.html","/icepleasure/index.html","/koloristerne/index.html","/login/index.html","/majorworks/index.html","/restaurant/index.html","/sl%C3%B8yfe/index.html","/social/index.html","/thisandthats/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"2+ASq4zoDIj02JyQ+udrgqMkSIHBSOioFkLB8f6uus8=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/philipcreamer/Desktop/denfrie_web_git/denfrie_team10/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };

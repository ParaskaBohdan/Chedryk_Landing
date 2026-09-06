import { useEffect } from 'react';
import { SITE_URL, BUSINESS } from '../seo/siteConfig';

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// Only one page at a time carries a breadcrumb trail, so a single script
// tag (rather than one per page) is upserted and torn down with the route.
function upsertBreadcrumbJsonLd(trail) {
  const id = 'breadcrumb-jsonld';
  let script = document.getElementById(id);
  if (!trail || trail.length === 0) {
    script?.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`
    }))
  });
}

// Keeps <title>, description, canonical and Open Graph/Twitter tags in sync
// with the current route of this client-rendered SPA.
export default function useSeo({ title, description, path, image, noindex = false, skip = false, breadcrumb }) {
  useEffect(() => {
    if (skip) return;
    const url = `${SITE_URL}${path}`;
    const ogImage = image || BUSINESS.image;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertLink('canonical', url);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', BUSINESS.name);
    upsertMeta('property', 'og:locale', 'uk_UA');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertBreadcrumbJsonLd(breadcrumb);
    return () => upsertBreadcrumbJsonLd(null);
  }, [title, description, path, image, noindex, skip, breadcrumb]);
}

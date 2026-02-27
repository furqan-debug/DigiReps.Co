// Lazy-load contentful to avoid its internal debug module calling localStorage
// during server-side module evaluation (SSR).
let deliveryClient = null;
let previewClient = null;

export function getClient(preview = false) {
  if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
    console.warn("Contentful space ID not set");
    return {
      getEntries: async () => ({ items: [] }),
      getEntry: async () => null,
      getAsset: async () => null,
    };
  }

  // Require contentful lazily so its debug/browser module never runs at import time
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('contentful');

  if (preview) {
    if (!previewClient) {
      previewClient = createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN,
        host: 'preview.contentful.com',
      });
    }
    return previewClient;
  }

  if (!deliveryClient) {
    deliveryClient = createClient({
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
    });
  }
  return deliveryClient;
}

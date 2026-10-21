import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { strapiApi, SiteImage } from '../services/strapi';

/**
 * Editor-replaceable images. Each image on the site has a slot key (e.g. "home.hero");
 * if an editor uploaded a picture for that slot in Strapi (Content Manager → Site Image)
 * it is used, otherwise the bundled default is shown. Slot keys are listed in
 * cms/src/site-image-slots.js; add new ones there too.
 */
type Resolve = (key: string, fallbackSrc: string, fallbackAlt?: string) => { src: string; alt: string };

const fallbackOnly: Resolve = (_key, src, alt = '') => ({ src, alt });

const SiteImagesContext = createContext<Resolve>(fallbackOnly);

export const SiteImagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<Record<string, SiteImage>>({});

  useEffect(() => {
    let isMounted = true;
    strapiApi
      .getSiteImages()
      .then((result) => {
        if (isMounted && result && Object.keys(result).length > 0) {
          setImages(result);
        }
      })
      .catch(() => {
        // CMS unreachable: keep bundled defaults
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const resolve = useCallback<Resolve>(
    (key, fallbackSrc, fallbackAlt = '') => {
      const image = images[key];
      return image ? { src: image.src, alt: image.alt || fallbackAlt } : { src: fallbackSrc, alt: fallbackAlt };
    },
    [images]
  );

  return <SiteImagesContext.Provider value={resolve}>{children}</SiteImagesContext.Provider>;
};

/** Returns `siteImage(key, fallbackSrc, fallbackAlt)` → `{ src, alt }`, ready to spread onto an <img>. */
export const useSiteImage = () => useContext(SiteImagesContext);

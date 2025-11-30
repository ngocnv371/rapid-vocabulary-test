import { useEffect } from "react";

interface MetaTagsConfig {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export const useMetaTags = (config: MetaTagsConfig) => {
  useEffect(() => {
    // Update title
    if (config.title) {
      document.title = config.title;
    }

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? "name" : "property";
      let metaTag = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute(attribute, property);
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute("content", content);
    };

    // Standard meta tags
    if (config.description) {
      updateMetaTag("description", config.description, true);
    }

    // Open Graph tags
    if (config.ogTitle) {
      updateMetaTag("og:title", config.ogTitle);
    }
    if (config.ogDescription) {
      updateMetaTag("og:description", config.ogDescription);
    }
    if (config.ogImage) {
      updateMetaTag("og:image", config.ogImage);
    }
    updateMetaTag("og:url", window.location.href);

    // Twitter Card tags
    if (config.twitterTitle) {
      updateMetaTag("twitter:title", config.twitterTitle, true);
    }
    if (config.twitterDescription) {
      updateMetaTag("twitter:description", config.twitterDescription, true);
    }
    if (config.twitterImage) {
      updateMetaTag("twitter:image", config.twitterImage, true);
    }
  }, [config]);
};

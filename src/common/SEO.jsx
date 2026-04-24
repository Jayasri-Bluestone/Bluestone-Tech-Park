import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, ogTitle, ogDescription, ogImage, ogType = 'website' }) => {
  const siteTitle = "Bluestone Tech Park";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  const baseUrl = "https://bluestonetechpark.com"; // Change to your actual domain
  const fullCanonical = `${baseUrl}${canonical}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={fullCanonical} />

      {/* Twitter Card tags */}
      <meta name="twitter:creator" content="@bluestonetech" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
    </Helmet>
  );
};

export default SEO;

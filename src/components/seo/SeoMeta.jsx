import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SeoMeta({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  schema
}) {
  const defaultTitle = 'EME (Explain My Exposure) | CyberEDT Exposure Intelligence Platform';
  const defaultDescription = 'Explain My Exposure (EME) by CyberEDT – an advanced interactive exposure intelligence platform to translate security scans into attacker-perspective exposure narratives.';
  const baseUrl = 'https://eme.cyberedt.com';
  
  const finalTitle = title ? `${title} | EME by CyberEDT` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  // Base Organization Schema for CyberEDT
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'CyberEDT',
    'url': 'https://cyberedt.com',
    'sameAs': [
      'https://eme.cyberedt.com'
    ]
  };

  const finalSchema = schema || {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Explain My Exposure',
    'url': baseUrl,
    'publisher': {
      '@type': 'Organization',
      'name': 'CyberEDT'
    }
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={`${baseUrl}/logo.png`} />
      <meta property="og:site_name" content="Explain My Exposure" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={`${baseUrl}/logo.png`} />
      
      {/* Brand Application Metadata */}
      <meta name="application-name" content="Explain My Exposure" />
      <meta name="author" content="CyberEDT" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(baseSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}

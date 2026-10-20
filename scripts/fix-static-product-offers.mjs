import fs from 'fs';
import path from 'path';

const PRODUCT_FILES = [
  'public/products/api-13a-section-12-attapulgite-powder/index.html',
  'public/products/attapulgite-natural-granules-1-5mm/index.html',
  'public/products/attapulgite-natural-powder/index.html',
  'public/products/flux-fine-200-attapulgite-powder/index.html',
  'public/products/premium-325-attapulgite-powder/index.html',
  'public/products/salt-gel-attapulgite-powder/index.html'
];

const mojibakeReplacements = [
  [/â‰¥/g, '≥'],
  [/â‰¤/g, '≤'],
  [/â€“/g, '–'],
  [/â€”/g, '—'],
  [/â€™/g, "'"],
  [/â„¢/g, '™'],
  [/Î¼m/g, 'μm'],
  [/ðŸ“ž/g, '📞'],
  [/âœ‰ï¸/g, '✉️'],
  [/ðŸ’¬/g, '💬'],
  [/ðŸ“/g, '📍'],
  [/CaClâ‚‚/g, 'CaCl₂']
];

for (const relPath of PRODUCT_FILES) {
  const filePath = path.resolve(relPath);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix mojibake
  for (const [re, str] of mojibakeReplacements) {
    content = content.replace(re, str);
  }

  // Extract slug from filename path
  const slug = relPath.split('/')[2];
  const canonicalUrl = `https://bentoclayclaytech.com/products/${slug}`;

  // Replace AggregateOffer with clean B2B RFQ Offer while retaining areaServed
  // Match:
  // "offers": {
  //   "@type": "AggregateOffer",
  //   ... up to "areaServed": [
  const offerRegex = /"offers":\s*\{\s*"@type":\s*"AggregateOffer",[\s\S]*?"areaServed":\s*(\[[^\]]+\])/;

  if (offerRegex.test(content)) {
    content = content.replace(offerRegex, (match, areaServed) => {
      return `"offers": {
            "@type": "Offer",
            "url": "${canonicalUrl}",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "priceType": "https://schema.org/InvoicePrice",
              "description": "Commercial B2B quotation upon RFQ enquiry based on required grade, packing, and destination port (FOB Mundra / CIF)"
            },
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
              "@type": "Organization",
              "name": "Bento Clay Tech",
              "url": "https://bentoclayclaytech.com/#organization"
            },
            "areaServed": ${areaServed}`;
    });
    console.log(`Updated schema in ${relPath}`);
  } else {
    console.log(`No AggregateOffer match in ${relPath}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

// Also sanitize public/products/index.html mojibake
const productsIndexPath = path.resolve('public/products/index.html');
if (fs.existsSync(productsIndexPath)) {
  let pContent = fs.readFileSync(productsIndexPath, 'utf8');
  for (const [re, str] of mojibakeReplacements) {
    pContent = pContent.replace(re, str);
  }
  fs.writeFileSync(productsIndexPath, pContent, 'utf8');
  console.log('Sanitized public/products/index.html');
}

console.log('Static product pages updated successfully.');

import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Replace mojibake
const replacements = [
  [/â‰¥/g, '≥'],
  [/â‰¤/g, '≤'],
  [/â€“/g, '–'],
  [/â€”/g, '—'],
  [/â€™/g, "'"],
  [/CaClâ‚‚/g, 'CaCl₂'],
  [/\(Mg,Al\)â‚‚Siâ‚„Oâ‚â‚€\(OH\) Â· 4Hâ‚‚O/g, '(Mg,Al)₂Si₄O₁₀(OH) · 4H₂O'],
  [/âš¡/g, '⚡'],
  [/ðŸ†/g, '🏆'],
  [/â›ï¸/g, '⚓'],
  [/ðŸš¢/g, '🚢'],
  [/â­/g, '⭐'],
  [/ðŸ‡®ðŸ‡³/g, '🇮🇳'],
  [/ðŸŒ/g, '🌍']
];

for (const [re, str] of replacements) {
  html = html.replace(re, str);
}

// Remove fake unverified aggregateRating and fix offers in Product schema
const offerReplacement = `"offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "0",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "priceType": "https://schema.org/InvoicePrice",
              "description": "Commercial B2B quotation upon RFQ enquiry based on required grade, packing, and destination port"
            },
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
              "@id": "https://bentoclayclaytech.com/#organization"
            }
          }`;

html = html.replace(/"offers":\s*\{[\s\S]*?"seller":\s*\{[\s\S]*?\}\s*\}/g, offerReplacement);
html = html.replace(/,\s*"aggregateRating":\s*\{\s*"@type":\s*"AggregateRating",[\s\S]*?\}/g, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Sanitization applied to index.html successfully.');

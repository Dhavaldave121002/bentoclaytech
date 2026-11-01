import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { blogArticles } from '../data/blogData';
import { faqs } from '../data/faqs';
import { trackPageView } from '../utils/analytics';

const BASE_URL = 'https://bentoclayclaytech.com';

const PAGE_KEYWORDS = {
  '/': 'Bento Clay Tech, Bentoclay Tech, Bento Clay, Bentoclay, bentoclaytech, Bentoclay Claytech, Bento Clay Clay Tech, bentoclayclaytech, Attapulgite powder manufacturer India, Attapulgite clay global exporter, API 13A Section 12 drilling clay, api 13 a powder, api 13a powder, best api 13a powder, best API 13A powder Ahmedabad, best attapulgite powder Ahmedabad, best drilling clay Ahmedabad Gujarat, best attapulgite manufacturer Gujarat, Salt Gel attapulgite, Premium 325 mesh attapulgite, Flux Fine 200 foundry clay, Attapulgite granules 1-5mm, Palygorskite manufacturer Gujarat, CAS 12174-11-7 exporter, HS Code 25084000 supplier, drilling mud viscosifier Middle East, API drilling clay Dubai UAE, attapulgite supplier Saudi Arabia, attapulgite exporter to USA, attapulgite powder Europe Rotterdam, paint thixotrope additive, agricultural carrier clay, industrial absorbent cat litter, Bhavnagar mineral plant, Mundra port container shipping, attapulgite supplier Mumbai Maharashtra, drilling clay Ahmedabad Gujarat, foundry flux supplier Chennai Tamil Nadu, paint additives Delhi NCR, agro carriers Hyderabad Telangana, domestic FTL truckload India, bentoclay official website, bentoclay.com, bentoclay minerals, best attapulgite powder Surat, best attapulgite powder Bhavnagar, best attapulgite powder Vadodara, best attapulgite powder Rajkot, best attapulgite supplier Ankleshwar, best attapulgite supplier Bharuch, best attapulgite Morbi, best api 13a powder Mumbai Maharashtra, best drilling clay India, best api 13a powder USA, best API 13A Section 12 drilling clay Texas Houston, best attapulgite exporter Dubai UAE, best attapulgite supplier Saudi Arabia, API 13A Section 12 attapulgite, salt gel attapulgite powder, attapulgite powder exporter India, attapulgite powder bulk supplier, palygorskite clay supplier, attapulgite supplier Mundra port, attapulgite for foundry, attapulgite for paint, attapulgite for animal feed, attapulgite for cat litter, attapulgite powder export from India, API 13A attapulgite export, attapulgite CIF supplier, attapulgite market, attapulgite clay, attapulgite powder',
  '/products': 'Attapulgite Clay Grades & Powder, API 13A drilling clay, Salt Gel powder, Premium 325 mesh, foundry flux clay, absorbent granules 1-5mm, attapulgite catalog, Bento Clay Tech, Bentoclay Tech, Bento Clay, Bentoclay, best attapulgite powder Ahmedabad, best attapulgite supplier Ahmedabad Gujarat, best API 13A powder Ahmedabad, attapulgite grades, API 13A Section 12 attapulgite, api 13 a powder, 325 mesh attapulgite, Flux Fine 200, attapulgite granules, palygorskite minerals India, attapulgite market, attapulgite clay, attapulgite powder',
  '/why-us': 'Attapulgite Clay Manufacturing Plant, Why choose Bentoclay, Attapulgite factory Bhavnagar, ISO quality control clay, Mundra port mineral export, attapulgite market, attapulgite clay, attapulgite powder',
  '/applications': 'Attapulgite Clay Applications, drilling fluids clay, paint thixotrope, foundry flux additive, pesticide carrier granules, pet care absorbents, attapulgite market, attapulgite clay, attapulgite powder',
  '/about': 'Bento Clay Tech, Attapulgite manufacturer India, Bhavnagar mineral company, Kardej GIDC manufacturer, Gujarat clay mining exporter, attapulgite market, attapulgite clay, attapulgite powder',
  '/contact': 'Buy Attapulgite Clay Direct, Bento Clay Tech quote, free lab sample COA, mineral sales Bhavnagar WhatsApp, attapulgite market, attapulgite clay, attapulgite powder',
  '/blog': 'Attapulgite Mineral Insights & Guides, drilling mud articles, paint thixotrope guides, API Spec 13A Section 12 tutorial, mineralogy Bhavnagar, attapulgite market, attapulgite clay, attapulgite powder',
  '/faq': 'Attapulgite Clay FAQ & Specs, drilling clay questions, API 13A moisture residue standards, export packaging 25kg HDPE, Mundra port shipping FAQ, attapulgite market, attapulgite clay, attapulgite powder',
  '/terms-conditions': 'Attapulgite Supply Terms & Warranty, mineral supply warranty, Incoterms 2020 Mundra, COA batch analysis warranty, attapulgite market, attapulgite clay, attapulgite powder',
};

const PRODUCT_KEYWORDS = {
  'salt-gel': 'salt gel attapulgite powder, best salt gel attapulgite powder, salt gel clay, attapulgite salt gel, saltwater drilling mud viscosifier, bento clay tech, bentoclay tech, bentoclay, bento clay, bentoclayclaytech, bento clay clay tech, bentoclaytech, best salt gel powder ahmedabad, best salt gel powder surat, best salt gel powder bhavnagar, best salt gel powder vadodara, best salt gel powder rajkot, best salt gel powder mumbai maharashtra, offshore drilling clay india, palygorskite salt gel, CAS 12174-11-7, HS Code 25084000, best drilling mud viscosifier dubai uae, salt gel exporter usa houston texas, attapulgite market, attapulgite clay, attapulgite powder',
  'api-13a': 'api 13a powder, api 13 a powder, best api 13a powder ahmedabad, best api 13 a powder ahmedabad, best drilling clay ahmedabad, best api 13a powder gujarat, api 13a, api 13 a, api 13a section 12, api spec 13a section 12, api drilling clay, api 13a attapulgite, api 13a salt gel, api 13a drilling mud viscosifier, saltwater drilling clay, offshore drilling clay, bentoclay api 13a, bentoclay tech, bento clay tech, bentoclay, bento clay, bentoclay claytech, bento clay clay tech, bentoclayclaytech, bentoclaytech, attapulgite powder manufacturer india, api 13a powder supplier dubai, api 13a powder houston texas, api 13a saudi arabia dammam, CAS 12174-11-7, HS Code 25084000, best api 13a powder surat, best api 13a powder bhavnagar, best api 13a powder vadodara, best api 13a powder rajkot, best api 13a powder ankleshwar, best api 13a powder mumbai maharashtra, best api 13a powder india, best api 13a powder usa, best api 13a powder uae, API 13A Section 12 attapulgite powder, attapulgite market, attapulgite clay, attapulgite powder',
  'natural-powder': 'natural attapulgite powder, best agrochemical carrier clay, pesticide carrier powder ahmedabad, agro carriers hyderabad telangana, bentoclay natural powder, bento clay tech, bentoclay tech, bentoclay, bento clay, bentoclayclaytech, bento clay clay tech, bentoclaytech, animal feed binder clay, 200 mesh attapulgite, agrochemical carrier gujarat ankleshwar, CAS 12174-11-7, HS Code 25084000, pesticide carrier exporter usa, attapulgite powder vadodara surat, attapulgite market, attapulgite clay, attapulgite powder',
  'flux-fine': 'flux fine 200 attapulgite, best foundry flux clay, foundry core wash refractory clay, foundry mold wash bentoclay, bento clay tech, bentoclay tech, bentoclay, bento clay, bentoclayclaytech, bento clay clay tech, bentoclaytech, foundry flux supplier ahmedabad, foundry flux supplier chennai tamil nadu, foundry clay rajkot gujarat, metallurgical flux attapulgite, CAS 12174-11-7, HS Code 25084000, foundry flux exporter uae saudi arabia, best foundry flux coimbatore kolkata, attapulgite market, attapulgite clay, attapulgite powder',
  'premium-325': 'premium 325 mesh attapulgite, best 325 mesh attapulgite powder, 325 mesh attapulgite powder ahmedabad, best paint thixotrope powder ahmedabad, paint thixotrope powder surat, paint additives delhi ncr, bento clay tech, bentoclay tech, bentoclay, bento clay, bentoclayclaytech, bento clay clay tech, bentoclaytech, coatings rheology modifier, bentoclay 325 mesh, palygorskite paint additive, CAS 12174-11-7, HS Code 25084000, paint additives mumbai maharashtra, thixotropic agent exporter usa europe, best attapulgite vadodara rajkot ankleshwar, attapulgite market, attapulgite clay, attapulgite powder',
  'granules': 'attapulgite granules 1-5mm, best industrial absorbent granules, cat litter clay granules, industrial absorbent ahmedabad, oil spill absorbent surat, bento clay tech, bentoclay tech, bentoclay, bento clay, bentoclayclaytech, bento clay clay tech, bentoclaytech, calcined attapulgite granules, chemical spill cleanup gujarat, CAS 12174-11-7, HS Code 25084000, absorbent granules exporter usa europe, best cat litter manufacturer india, attapulgite market, attapulgite clay, attapulgite powder',
};

const PAGE_META_CONFIG = {
  '/': {
    title: 'Bento Clay Tech | API 13A Attapulgite Powder Manufacturer India',
    description: 'Bento Clay Tech: API 13A Section 12 attapulgite, salt gel and 325 mesh powder manufacturer and exporter from Bhavnagar, Gujarat. Export via Mundra Port.',
    type: 'website'
  },
  '/products': {
    title: 'Attapulgite Products & Grades | Bento Clay Tech',
    description: 'Explore Bento Clay Tech attapulgite powder and granule grades for drilling, coatings, foundry, agriculture and absorbent applications.',
    type: 'website'
  },
  '/why-us': {
    title: 'Attapulgite Manufacturing | Bento Clay Tech',
    description: 'Learn about Bento Clay Tech, its attapulgite products and manufacturing base in Bhavnagar, Gujarat, India.',
    type: 'website'
  },
  '/applications': {
    title: 'Attapulgite Applications | Bento Clay Tech',
    description: 'Explore attapulgite uses in drilling fluids, coatings, foundry products, agriculture and absorbent applications.',
    type: 'website'
  },
  '/about': {
    title: 'About Bento Clay Tech | Attapulgite Manufacturer',
    description: 'Bento Clay Tech manufactures attapulgite clay products in Bhavnagar, Gujarat, India, for industrial and drilling applications.',
    type: 'website'
  },
  '/contact': {
    title: 'Contact & Product Enquiries | Bento Clay Tech',
    description: 'Contact Bento Clay Tech in Bhavnagar, India for attapulgite product specifications, available grades, packaging details and export quotations.',
    type: 'website'
  },
  '/blog': {
    title: 'Attapulgite Articles & Guides | Bento Clay Tech',
    description: 'Read Bento Clay Tech articles about attapulgite grades, drilling applications, coatings, foundry uses and industrial minerals.',
    type: 'website'
  },
  '/faq': {
    title: 'Attapulgite FAQs & Product Specifications | Bento Clay Tech',
    description: 'Answers to common questions about attapulgite product grades, published specifications, applications and packaging.',
    type: 'website'
  },
  '/terms-conditions': {
    title: 'Terms & Conditions | Bento Clay Tech',
    description: 'Review Bento Clay Tech terms and conditions for product enquiries, orders, supply and related services.',
    type: 'website'
  }
};

const PRODUCT_SPECIFIC_META = {
  'salt-gel': {
    title: 'Salt Gel Attapulgite Powder | Bento Clay Tech',
    description: 'Salt gel attapulgite powder for saline drilling fluids. The product data sheet lists 35 cps minimum viscosity at 600 rpm, 4% maximum residue above 75 μm and 8% maximum moisture.'
  },
  'api-13a': {
    title: 'API 13A Section 12 Attapulgite Powder | Bento Clay Tech',
    description: 'API 13A Section 12 attapulgite powder for saline drilling fluids. View grade requirements for viscosity, residue and moisture; request the data sheet.'
  },
  'natural-powder': {
    title: 'Natural Attapulgite Powder | Bento Clay Tech',
    description: 'Natural attapulgite powder for agricultural and industrial uses. View the published grade specifications, packaging information and product data sheet.'
  },
  'flux-fine': {
    title: 'Flux Fine-200 Foundry Powder | Bento Clay Tech',
    description: 'Flux Fine-200 attapulgite powder for foundry applications. Review the published grade specifications, packaging information and product data sheet.'
  },
  'premium-325': {
    title: 'Premium 325 Mesh Attapulgite | Bento Clay Tech',
    description: 'Fine attapulgite powder for paints, coatings, sealants and adhesives. Review the Premium 325 grade specifications and product data sheet.'
  },
  'granules': {
    title: 'Attapulgite Granules 1–5 mm | Bento Clay Tech',
    description: 'Low-dust, non-swelling attapulgite granules for litter, absorbent and carrier applications. View the published grade specifications and product data sheet.'
  }
};

export default function PageSEO() {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    let meta = PAGE_META_CONFIG[location.pathname];
    let structuredDataGraph = [];
    let breadcrumbs = [{ name: 'Home', url: `${BASE_URL}/` }];

    // Base Organization Schema & Google Merchant Center Top Quality Store Profile
    const baseOrg = {
      '@type': ['Organization', 'LocalBusiness', 'Manufacturer'],
      '@id': `${BASE_URL}/#organization`,
      name: 'Bento Clay Tech',
      legalName: 'Bento Clay Tech',
      alternateName: 'Bentoclay',
      url: `${BASE_URL}/`,
      logo: `${BASE_URL}/assets/bentoclay-logo.webp`,
      image: `${BASE_URL}/assets/product-range.webp`,
      description: 'Bento Clay Tech manufactures attapulgite clay products in Bhavnagar, Gujarat, India, including drilling, industrial powder and granule grades.',
      telephone: '+91-7435818628',
      email: ['dipak@bentoclay.com', 'bentoclayclaytech@gmail.com'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No. 12/A, GIDC Industrial Estate, Kardej',
        addressLocality: 'Bhavnagar',
        addressRegion: 'Gujarat',
        postalCode: '364004',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 21.7645,
        longitude: 72.1519
      },
      currenciesAccepted: 'USD, EUR, AED, SAR, GBP, INR',
      paymentAccepted: 'Letter of Credit (LC), T/T, Wire Transfer, NEFT/RTGS, GST Invoice',
      knowsAbout: [
        'Attapulgite Clay',
        'Palygorskite Mineral',
        'API Specification 13A Section 12',
        'Drilling Mud Viscosifiers',
        'Paint Thixotropic Additives',
        'Foundry Core Wash Clays',
        'Industrial Absorbent Granules',
        'CAS 12174-11-7',
        'HS Code 25084000'
      ]
    };

    // Voice & Answer Engine (AEO) Speakable Schema
    const speakableSchema = {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.aeo-answer-block', '.product-hero-desc', '.overview-text', '.faq-summary']
    };

    let isProductPage = false;
    let currentProductInfo = null;

    // Handle dynamic Product Detail Page
    if (!meta && location.pathname.startsWith('/products/')) {
      const slug = location.pathname.replace('/products/', '');
      const product = products.find(p => p.id === slug || p.slug === slug);
      if (product) {
        isProductPage = true;
        currentProductInfo = product;
        const specific = PRODUCT_SPECIFIC_META[product.id] || {};
        
        meta = {
          title: specific.title || `${product.name} | Bento Clay Tech Bhavnagar`,
          description: specific.description || `${product.name}: ${product.inShort || product.desc}`,
          keywords: `${PRODUCT_KEYWORDS[product.id] || `${product.name}, attapulgite`}, ${product.shortName}, ${product.type}, Attapulgite ${product.shortName}, Bento Clay Tech Bhavnagar, CAS 12174-11-7, HS Code 25084000`,
          type: 'product',
          image: product.image ? `${BASE_URL}${product.image}` : `${BASE_URL}/assets/product-range.webp`
        };

        breadcrumbs.push(
          { name: 'Products', url: `${BASE_URL}/products` },
          { name: product.name, url: `${BASE_URL}/products/${product.slug || product.id}` }
        );

        // Rich Product Schema for Google Search Rich Cards & Google Merchant Center Top Quality Store
        const productSchema = {
          '@type': 'Product',
          '@id': `${BASE_URL}/products/${product.slug || product.id}#product`,
          name: product.name,
          alternateName: product.shortName,
          description: specific.description || product.inShort || product.desc,
          image: [
            product.image ? `${BASE_URL}${product.image}` : `${BASE_URL}/assets/product-range.webp`,
            `${BASE_URL}/assets/product-range.webp`
          ],
          brand: {
            '@type': 'Brand',
            name: 'Bento Clay Tech'
          },
          manufacturer: {
            '@id': `${BASE_URL}/#organization`
          },
          category: product.type || 'Industrial Minerals',
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'CAS Registry Number',
              value: '12174-11-7'
            },
            {
              '@type': 'PropertyValue',
              name: 'HS Code',
              value: '2508.40.00'
            },
            {
              '@type': 'PropertyValue',
              name: 'Mineral Form',
              value: product.form || 'Powder'
            },
            {
              '@type': 'PropertyValue',
              name: 'Standard Packaging',
              value: product.packing || '25 kg HDPE moisture barrier bags'
            },
            ...(product.specs ? product.specs.map(s => ({
              '@type': 'PropertyValue',
              name: s.parameter,
              value: s.requirement
            })) : [])
          ]
        };

        structuredDataGraph.push(baseOrg, productSchema);
      }
    }

    // Handle dynamic Blog Detail Page
    if (!meta && location.pathname.startsWith('/blog/')) {
      const slug = location.pathname.replace('/blog/', '');
      const article = blogArticles.find(a => a.slug === slug);
      if (article) {
        meta = {
          title: `${article.title.slice(0, 52)} | Bentoclay`,
          description: (article.excerpt && article.excerpt.length >= 120 && article.excerpt.length <= 200)
            ? article.excerpt
            : `${article.title}: In-depth engineering spotlight on industrial attapulgite clay performance, specifications, and manufacturing from Bentoclay Claytech.`,
          keywords: `${article.title}, ${article.category}, attapulgite technical guide, Bento Clay Tech`,
          type: 'article',
          image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/assets/product-range.webp`
        };

        breadcrumbs.push(
          { name: 'Technical Blog', url: `${BASE_URL}/blog` },
          { name: article.title, url: `${BASE_URL}/blog/${article.slug}` }
        );

        // Rich Article / BlogPosting Schema
        const blogSchema = {
          '@type': 'BlogPosting',
          '@id': `${BASE_URL}/blog/${article.slug}#article`,
          headline: article.title,
          description: meta.description,
          image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/assets/product-range.webp`,
          datePublished: '2026-08-01T08:00:00+05:30',
          dateModified: '2026-10-04T12:00:00+05:30',
          author: {
            '@type': 'Organization',
            name: 'Bentoclay Technical Advisory Team',
            url: `${BASE_URL}/about`
          },
          publisher: {
            '@id': `${BASE_URL}/#organization`
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/blog/${article.slug}`
          },
          articleSection: article.category,
          speakable: speakableSchema
        };

        structuredDataGraph.push(baseOrg, blogSchema);
      }
    }

    // Fallback default
    if (!meta) {
      meta = PAGE_META_CONFIG['/'];
    }

    // Standard Route Breadcrumbs & Schemas
    if (location.pathname === '/products') {
      breadcrumbs.push({ name: 'Product Catalog', url: `${BASE_URL}/products` });
      structuredDataGraph.push(baseOrg, {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/products#catalog`,
        name: 'Bentoclay Attapulgite Product Catalog',
        description: meta.description,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: products.map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${BASE_URL}/products/${p.slug || p.id}`,
            name: p.name
          }))
        }
      });
    } else if (location.pathname === '/faq') {
      breadcrumbs.push({ name: 'FAQ', url: `${BASE_URL}/faq` });
      const faqSchema = {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/faq#faqpage`,
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${f.summary} ${f.points ? f.points.map(p => `${p.title}: ${p.desc}`).join('; ') : ''}`
          }
        }))
      };
      structuredDataGraph.push(baseOrg, faqSchema);
    } else if (location.pathname === '/applications') {
      breadcrumbs.push({ name: 'Industrial Applications', url: `${BASE_URL}/applications` });
      const appFaqSchema = {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/applications#faqpage`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does attapulgite perform in high-salinity drilling mud compared to bentonite?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Swelling bentonite clay flocculates in electrolyte-rich environments like saltwater and gypsum brines. Attapulgite needle crystals build mechanical suspension through physical entanglement rather than osmotic swelling, maintaining full viscosity and cuttings-carrying capacity even in saturated salt conditions.'
            }
          },
          {
            '@type': 'Question',
            name: 'What grade is recommended for anti-sag and thixotropy in industrial paints and coatings?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our Premium 325 mesh micronized attapulgite powder is engineered specifically for paint and coatings. It provides high shear-thinning thixotropy, excellent pigment anti-settling during storage, and smooth leveling during brush or spray application without altering finish gloss.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can attapulgite granules be used for cat litter and industrial oil spill absorption?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, our 1–5 mm natural calcined attapulgite granules have high internal pore volume, delivering 180% to 220% liquid absorption capacity by weight. They remain structurally intact when wet, making them low-dust and highly effective for cat litter, chemical spill control, and agricultural pesticide carrier granules.'
            }
          }
        ]
      };
      structuredDataGraph.push(baseOrg, {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/applications#page`,
        name: 'Attapulgite Clay Industrial Applications',
        description: meta.description
      }, appFaqSchema);
    } else if (location.pathname === '/why-us' || location.pathname === '/about') {
      breadcrumbs.push({ name: location.pathname === '/why-us' ? 'Why Us' : 'About Us', url: `${BASE_URL}${location.pathname}` });
      structuredDataGraph.push(baseOrg, {
        '@type': 'AboutPage',
        '@id': `${BASE_URL}${location.pathname}#about`,
        name: meta.title,
        description: meta.description,
        speakable: speakableSchema
      });
    } else if (location.pathname === '/contact') {
      breadcrumbs.push({ name: 'Contact & RFQ', url: `${BASE_URL}/contact` });
      structuredDataGraph.push(baseOrg, {
        '@type': 'ContactPage',
        '@id': `${BASE_URL}/contact#contactpage`,
        name: 'Contact Bentoclay Technical Sales',
        description: meta.description
      });
    } else if (location.pathname === '/') {
      structuredDataGraph.push(
        baseOrg,
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          url: `${BASE_URL}/`,
          name: 'Bentoclay Claytech Global',
          publisher: { '@id': `${BASE_URL}/#organization` },
          speakable: speakableSchema
        }
      );
    }

    // Add BreadcrumbList Schema to Graph
    const breadcrumbSchema = {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}${location.pathname}#breadcrumbs`,
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
    structuredDataGraph.push(breadcrumbSchema);

    // Update document title
    document.title = meta.title;

    // Update meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', meta.description);
    }

    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute(
      'content',
      meta.keywords || PAGE_KEYWORDS[location.pathname] || PAGE_KEYWORDS['/']
    );

    // Update OpenGraph Title & Description & Image & Type
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `${BASE_URL}${location.pathname}`);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && meta.image) ogImage.setAttribute('content', meta.image);

    let ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) ogType.setAttribute('content', meta.type || 'website');

    // Google Merchant Center & Product OpenGraph Tags
    const setMetaTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    if (isProductPage && currentProductInfo) {
      setMetaTag('product:brand', 'Bento Clay Tech');
      setMetaTag('product:condition', 'new');
      setMetaTag('product:retailer_item_id', currentProductInfo.id);
      setMetaTag('product:category', currentProductInfo.type || 'Industrial Minerals');
      // NOTE: product:price intentionally omitted — pricing is quotation-based (B2B RFQ model)
    }

    // Update Twitter Title & Description & Image
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', meta.title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', meta.description);

    let twImage = document.querySelector('meta[name="twitter:image"]');
    if (twImage && meta.image) twImage.setAttribute('content', meta.image);

    // Update Canonical Link (strips tracking/cross-domain query params like _gl, gclid, utm_*)
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    const cleanPath = location.pathname.endsWith('/') && location.pathname !== '/'
      ? location.pathname.slice(0, -1)
      : location.pathname;
    canonicalTag.setAttribute('href', `${BASE_URL}${cleanPath}`);

    // Dynamic JSON-LD injection for Google, Perplexity, Bing, and AI crawlers
    let dynamicLdJsonScript = document.getElementById('dynamic-page-jsonld');
    if (!dynamicLdJsonScript) {
      dynamicLdJsonScript = document.createElement('script');
      dynamicLdJsonScript.id = 'dynamic-page-jsonld';
      dynamicLdJsonScript.type = 'application/ld+json';
      document.head.appendChild(dynamicLdJsonScript);
    }
    dynamicLdJsonScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': structuredDataGraph
    });

    // Send SPA pageview to Google Analytics 4
    trackPageView(location.pathname, meta?.title || document.title);

  }, [location.pathname, params]);

  return null;
}

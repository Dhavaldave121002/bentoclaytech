import { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import GradeCustomizer from '../components/GradeCustomizer';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const handleZoomMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
    const tiltX = -((y - 50) / 50) * 4.5;
    const tiltY = ((x - 50) / 50) * 4.5;
    setCardTilt({ x: tiltX, y: tiltY });
  };

  const handleZoomLeave = () => {
    setIsZooming(false);
    setZoomPos({ x: 50, y: 50 });
    setCardTilt({ x: 0, y: 0 });
  };

  // Hook for GPU-accelerated scroll reveal
  useScrollReveal([slug, isLoading]);

  // Find product by slug or id
  const product = products.find(
    (p) => p.slug === slug || p.id === slug
  );

  const scrollToCustomizer = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const el = document.getElementById('customizer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('highlight-pulse');
      setTimeout(() => el.classList.remove('highlight-pulse'), 2000);
    }
  };

  useEffect(() => {
    // When switching product grade, brief smooth skeleton transition and default first FAQ open
    setIsLoading(true);
    setOpenFaq(0);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 180);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    if (location.hash === '#customizer-section' && !isLoading) {
      const t = setTimeout(() => {
        scrollToCustomizer();
      }, 250);
      return () => clearTimeout(t);
    }
  }, [location.hash, slug, isLoading]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  // Find related products
  const relatedProducts = (product.related || [])
    .map((relSlug) => products.find((p) => p.slug === relSlug || p.id === relSlug))
    .filter(Boolean);

  const hasResults = product.specs.some((s) => s.result);

  return (
    <main className="product-detail-page">
      {/* Hero Section with Creative Mineral Backdrop */}
      <section className="product-detail-hero">
        <div className="product-hero-backdrop" aria-hidden="true">
          <div
            className="product-backdrop-img"
            style={{ backgroundImage: `url('/assets/bentoclay-mine-bg.jpg')` }}
          />
          <div className="product-backdrop-overlay" />
          <div className="product-backdrop-brush" />
        </div>

        <div className="container product-hero-content-relative">
          {/* Breadcrumb & Mineral Identification Strip */}
          <div className="product-hero-top-meta">
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb-sep">/</span>
              <Link to="/products">Products</Link>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{product.shortName}</span>
            </nav>

            <div className="mineral-cas-strip" aria-label="Mineral Specification">
              <span className="cas-tag">CAS: 12174-11-7</span>
              <span className="cas-tag">HS CODE: 25084000</span>
              <span className="cas-tag">PALYGORSKITE</span>
            </div>
          </div>

          <div className="product-hero-grid">
            <div className="product-hero-copy">
              <span className="eyebrow">{product.eyebrow}</span>
              <h1>{product.name}</h1>
              <div className="hairline"></div>
              <p className="product-hero-tagline">{product.tagline}</p>

              <div className="product-hero-actions">
                <Link
                  to={`/contact?grade=${encodeURIComponent(product.shortName)}`}
                  className="btn btn-primary"
                >
                  Request price & sample <span>↗</span>
                </Link>
                <a
                  href={`https://wa.me/917435818628?text=${encodeURIComponent(
                    `Hello Bento Clay Tech, I would like to request price quote and sample specifications for ${product.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  title={`Direct WhatsApp quote for ${product.name}`}
                >
                  WhatsApp Quote <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={scrollToCustomizer}
                  className="btn btn-secondary btn-customize-hero"
                >
                  Customize this Grade <span>⚙</span>
                </button>
                <a
                  href={`/pds/${product.pdsName || 'PDS-' + product.id + '.pdf'}`}
                  download={product.pdsName || `${product.slug}-pds.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light"
                  title={`Download Official ${product.name} Published Product Data Sheet (PDF)`}
                >
                  Download PDS <span>↓</span>
                </a>
              </div>

              {/* Highlights definition list */}
              <dl className="hero-param-grid">
                {product.highlights.map((h, i) => (
                  <div key={i} className="hero-param-item">
                    <dt>{h.label}</dt>
                    <dd>{h.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Packaging & Supply Modes Strip matching bentoclay.com export specs */}
              <div className="hero-supply-strip" aria-label="Export Supply Modes">
                <span className="supply-pill">📦 25 kg HDPE w/ Liner</span>
                <span className="supply-pill">📦 50 kg & 1 MT Jumbo</span>
                <span className="supply-pill">🚢 Mundra Port Direct FTL / FOB</span>
              </div>
            </div>

            <div className="product-hero-media">
              <div
                className={`product-image-card ${isZooming ? 'is-zoomed' : 'floating-card-anim'}`}
                onMouseEnter={() => setIsZooming(true)}
                onMouseMove={handleZoomMove}
                onMouseLeave={handleZoomLeave}
                title="Hover & move cursor to inspect mineral texture"
                style={{
                  transform: isZooming
                    ? `perspective(1000px) rotateX(${cardTilt.x.toFixed(2)}deg) rotateY(${cardTilt.y.toFixed(2)}deg)`
                    : undefined,
                }}
              >
                <div
                  className="zoom-image-wrapper"
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZooming ? 'scale(1.42)' : 'scale(1)',
                  }}
                >
                  <div className="detail-media-fade">
                    <ImageWithSkeleton
                      src={product.image}
                      alt={`${product.name} - High Purity Attapulgite Clay Mineral meeting API 13A Section 12 specification by Bento Clay Tech`}
                      className="product-main-photo"
                    />
                  </div>
                </div>

                {/* Anchored Bottom Photo Caption Badge */}
                <div className="photo-caption-badge">
                  <span>{product.type.toUpperCase()}</span> · <b>{product.form.toUpperCase()}</b>
                </div>

                {/* Interactive Zoom Lens Indicator Badge (bentoclay if-zoom style) */}
                <div className={`zoom-lens-hint ${isZooming ? 'active' : ''}`} aria-hidden="true">
                  <span>{isZooming ? '🔍 Zoom 142% Inspecting' : '🔍 Hover to Zoom'}</span>
                </div>

                {/* Luxury Golden Corner Fold Badge */}
                <div className="card-golden-corner-fold" aria-hidden="true">
                  <img
                    src="/assets/gold-corner-curl.png"
                    alt=""
                    className="gold-corner-curl-img"
                    width="58"
                    height="58"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Merchant Store Trust Badges */}
              <div className="merchant-trust-badges">
                <div className="merchant-badge-item">
                  <span className="badge-icon">⭐</span>
                  <div className="badge-text">
                    <strong>Top Quality Store & Direct Manufacturer</strong>
                    <span>ISO 9001:2015 Standards & Quality Laboratory Tested Meeting API-13A Section 12 Specification</span>
                  </div>
                </div>
                <div className="merchant-badge-item">
                  <span className="badge-icon">🚢</span>
                  <div className="badge-text">
                    <strong>Worldwide Container Export</strong>
                    <span>Direct dispatch from Mundra & Pipavav Ports (FOB/CIF)</span>
                  </div>
                </div>
                <div className="merchant-badge-item">
                  <span className="badge-icon">🛡️</span>
                  <div className="badge-text">
                    <strong>100% Quality Assurance Guarantee</strong>
                    <span>Full Certificate of Analysis (COA) issued with every lot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sticky Sidebar */}
      <section className="product-body-section section-pad">
        <div className="container product-body-grid">
          {/* Main Column */}
          <div className="product-main-col">
            {/* In Short AEO Answer Box */}
            {product.inShort && (
              <div className="in-short-box aeo-answer-block">
                <span className="in-short-eyebrow">DIRECT SPECIFICATION SUMMARY</span>
                <p><strong>{product.name}</strong>: {product.inShort}</p>
              </div>
            )}

            {/* Technical Overview */}
            {product.overview && product.overview.length > 0 && (
              <div className="tech-overview-block">
                <h2>{product.name} Technical Overview & Mineralogy</h2>
                <div className="prose-content">
                  {product.overview.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Physical & Chemical Parameters */}
            <div className="tech-specs-block">
              <h2>{product.name} Physical Parameters & Specification Requirements</h2>
              <div className="table-responsive">
                <table className="spec-table-detail">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Requirement</th>
                      {hasResults && <th>Tested Result</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr key={i}>
                        <td className="param-title">{s.parameter}</td>
                        <td className="param-req">{s.requirement}</td>
                        {hasResults && (
                          <td className="param-res">
                            <strong>{s.result || '—'}</strong>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {product.specNote && (
                <p className="spec-footnote">
                  <em>Standard Note:</em> {product.specNote}
                </p>
              )}

              {/* Official PDS PDF Download Banner */}
              <div className="pds-download-card">
                <div className="pds-download-info">
                  <span className="pds-icon">📄</span>
                  <div>
                    <strong>Official Published Product Data Sheet (PDS)</strong>
                    <span>Verified laboratory parameters, chemical composition & packaging specs</span>
                  </div>
                </div>
                <a
                  href={`/pds/${product.pdsName || 'PDS-' + product.id + '.pdf'}`}
                  download={product.pdsName || `${product.slug}-pds.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  title={`Download Official ${product.name} PDF Data Sheet`}
                >
                  Download {product.shortName} PDS (PDF) ↓
                </a>
              </div>
            </div>

            {/* Typical Applications */}
            {product.apps && product.apps.length > 0 && (
              <div className="tech-apps-block">
                <h2>Applications</h2>
                <ul className="apps-detail-grid">
                  {product.apps.map((app, i) => (
                    <li key={i} className="app-card">
                      <span className="app-dot"></span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Grade-specific FAQs */}
            {product.faqs && product.faqs.length > 0 && (
              <div className="tech-faqs-block">
                <h2>Frequently asked questions</h2>
                <div className="grade-faq-list">
                  {product.faqs.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div
                        key={i}
                        className={`grade-faq-item ${isOpen ? 'active' : ''}`}
                      >
                        <button
                          type="button"
                          className="grade-faq-q"
                          onClick={() => setOpenFaq(isOpen ? -1 : i)}
                          aria-expanded={isOpen}
                        >
                          <span className="grade-faq-q-text">{faq.q}</span>
                          <span className={`faq-toggle-icon grade-faq-toggle ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                            <svg
                              viewBox="0 0 24 24"
                              width="15"
                              height="15"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                              className="toggle-svg"
                            >
                              <line x1="12" y1="5" x2="12" y2="19" className="vert-line" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </span>
                        </button>
                        <div className="faq-answer-wrapper" aria-hidden={!isOpen}>
                          <div className="faq-answer-inner">
                            <div className="grade-faq-a">
                              <div className="grade-faq-card">
                                <div className="grade-faq-header">
                                  <span className="grade-faq-badge">TECHNICAL SPECIFICATION ANSWER</span>
                                </div>
                                <p className="grade-faq-text">{faq.a}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="product-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-icon">📦</div>
              <h3>Packing</h3>
              <p>{product.packing}</p>

              <div className="sidebar-divider"></div>

              <h3>Mineral habit</h3>
              <p>Hydrated aluminium magnesium silicate — (Mg,Al)₅Si₈O₂₂(OH)₄</p>

              {product.industries && product.industries.length > 0 && (
                <>
                  <div className="sidebar-divider"></div>
                  <h3>Industries served</h3>
                  <ul className="sidebar-industries">
                    {product.industries.map((ind, i) => (
                      <li key={i}>
                        <Link to="/applications">{ind}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="sidebar-card enquiry-card">
              <h3>Technical enquiry</h3>
              <p>
                Send your target parameter, mesh or volume; our Bhavnagar technical engineers confirm grade suitability.
              </p>
              <a
                href={`mailto:bentoclayclaytech@gmail.com?subject=Technical%20Enquiry%3A%20${encodeURIComponent(product.name)}`}
                className="sidebar-contact-link"
              >
                ✉ bentoclayclaytech@gmail.com
              </a>
              <a href="tel:+917435818628" className="sidebar-phone-link">
                📞 +91 74358 18628
              </a>
              <Link
                to={`/contact?grade=${encodeURIComponent(product.shortName)}`}
                className="btn btn-primary btn-full mt-4"
              >
                Request Quotation <span>↗</span>
              </Link>
              <button
                type="button"
                onClick={scrollToCustomizer}
                className="btn btn-secondary btn-full mt-2"
              >
                Customize Specification ⚙
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Interactive In-Page Customizer for this Specific Product Grade */}
      <GradeCustomizer key={product.id || product.slug} product={product} />

      {/* Related Grades Section */}
      {relatedProducts.length > 0 && (
        <section className="related-grades-section">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="section-number">COMPLEMENTARY MINERALS</span>
                <h2>Related attapulgite grades</h2>
              </div>
              <Link to="/products" className="text-link">
                View all six grades <span>→</span>
              </Link>
            </div>

            <div className="product-grid">
              {relatedProducts.map((rel) => {
                const originalIndex = products.findIndex((p) => p.id === rel.id);
                return (
                  <ProductCard
                    key={rel.id}
                    product={rel}
                    index={originalIndex >= 0 ? originalIndex : 0}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Formulation CTA */}
      <section className="page-cta">
        <div className="container">
          <div>
            <span>FORMULATION & BULK SUPPLY</span>
            <h2>Need a grade matched to your formulation?</h2>
            <p className="mt-2 text-muted-light">
              Share your viscosity, mesh or absorption target. Our technical team replies with matching grade recommendations, published PDS, and 25 kg export pricing.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToCustomizer}
            className="btn btn-white"
          >
            Customize this Grade <span>⚙</span>
          </button>
        </div>
      </section>
    </main>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { industries } from '../data/industries';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ProductModal from '../components/ProductModal';
import GradeComparisonTable from '../components/GradeComparisonTable';
import FaqAccordion from '../components/FaqAccordion';
import useScrollReveal from '../hooks/useScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import TeamVideoSection from '../components/TeamVideoSection';
import HeroClayShowcase from '../components/HeroClayShowcase';
import BentoclayHeroSlider from '../components/BentoclayHeroSlider';

export default function HomePage() {
  const [filter, setFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [industryView, setIndustryView] = useState('scroll');

  // High-performance scroll reveal animation trigger
  useScrollReveal([filter, loading]);

  const handleFilterChange = (newCat) => {
    if (newCat === filter) return;
    setLoading(true);
    setFilter(newCat);
    setTimeout(() => {
      setLoading(false);
    }, 180);
  };

  const filteredProducts = products.filter((p) => {
    if (filter === 'all') return true;
    return p.categories.includes(filter);
  });

  const getCount = (cat) => {
    if (cat === 'all') return products.length;
    return products.filter((p) => p.categories.includes(cat)).length;
  };

  return (
    <main>
      {/* Featured Brush-Splash Mineral Banner Slider (Matching bentoclay.com) */}
      <BentoclayHeroSlider />

      {/* Dynamic Clay & Mine Showcase Hero */}
      <HeroClayShowcase />

      {/* Intro Mineral Story */}
      <section className="intro section-pad" id="about">
        <div className="container intro-grid reveal-on-scroll">
          <div>
            <span className="section-number">01 / OUR MINERAL</span>
            <h2>
              One remarkable clay.<br />
              <span>Countless possibilities.</span>
            </h2>
          </div>
          <div className="intro-text">
            <p>
              Attapulgite is a naturally occurring hydrated aluminium magnesium silicate. Unlike plate-structured swelling clays (such as bentonite), its rigid rod-like needle crystals build viscosity through mechanical lattice entrapment. As an established attapulgite powder manufacturer India, we supply high-grade palygorskite clay supplier products engineered for challenging industrial applications.
            </p>
            <p>
              Because its suspension relies on mechanical interlocking rather than chemical double-layer hydration, attapulgite maintains high viscosity and suspension even in saturated salt water, brine, and high-temperature environments. This makes our salt gel attapulgite powder and API 13A Section 12 attapulgite the preferred attapulgite clay for drilling mud across offshore and deep-well exploration.
            </p>
          </div>
        </div>
      </section>

      {/* Team & Plant Operations Video Showcase */}
      <TeamVideoSection />

      {/* Products Section */}
      <section className="products section-pad" id="products">
        <div className="container">
          <div className="section-head reveal-on-scroll">
            <div>
              <span className="section-number">02 / PRODUCT RANGE</span>
              <h2>
                Six grades, one mineral,<br />
                <span>six different jobs.</span>
              </h2>
            </div>
            <p>Every specification below is reproduced from the published Bento Clay Tech product data sheet for that grade. As an attapulgite powder bulk supplier and attapulgite granules supplier, our processing plant delivers 325 mesh attapulgite powder supplier grades alongside low-dust granules.</p>
          </div>

          <div className="filter-bar" role="tablist" aria-label="Product filters">
            <button
              className={`filter ${filter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
              type="button"
            >
              All products <b>{getCount('all')}</b>
            </button>
            <button
              className={`filter ${filter === 'drilling' ? 'active' : ''}`}
              onClick={() => handleFilterChange('drilling')}
              type="button"
            >
              Drilling <b>{getCount('drilling')}</b>
            </button>
            <button
              className={`filter ${filter === 'industrial' ? 'active' : ''}`}
              onClick={() => handleFilterChange('industrial')}
              type="button"
            >
              Industrial <b>{getCount('industrial')}</b>
            </button>
            <button
              className={`filter ${filter === 'natural' ? 'active' : ''}`}
              onClick={() => handleFilterChange('natural')}
              type="button"
            >
              Natural <b>{getCount('natural')}</b>
            </button>
          </div>

          <div className="product-grid" id="productGrid">
            {loading ? (
              [...Array(filter === 'all' ? 6 : getCount(filter) || 3)].map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))
            ) : (
              filteredProducts.map((p) => {
                const originalIndex = products.findIndex((orig) => orig.id === p.id);
                return (
                  <ProductCard
                    key={p.id}
                    product={p}
                    index={originalIndex}
                    onViewDetails={setSelectedProduct}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Grade Comparison Matrix */}
      <GradeComparisonTable onSelectProduct={setSelectedProduct} />

      {/* Interactive Customizer Banner Callout */}
      <section className="customizer-callout-section reveal-on-scroll">
        <div className="container">
          <div className="customizer-callout-card">
            <div className="callout-content">
              <span className="section-number">TAILORED MINERAL RHEOLOGY</span>
              <h2>Configure Specifications Directly on Any Product Grade</h2>
              <p>
                Need specialized mesh fineness (100–325 mesh), high-salinity drilling rheology, calcined low moisture, or export palletization? Click any product to access its built-in interactive specification customizer and dispatch instant quotes.
              </p>
              <div className="callout-badges">
                <span>✓ Grade-Specific Parameters</span>
                <span>✓ Real-time Packaging Breakdown</span>
                <span>✓ Direct WhatsApp & Mail Inquiries</span>
              </div>
            </div>
            <div className="callout-actions">
              <Link to="/products/premium-325-attapulgite-powder#customizer-section" className="btn btn-primary btn-lg">
                Customize Premium 325 ⚙
              </Link>
              <Link to="/products/salt-gel-attapulgite-powder#customizer-section" className="btn btn-outline">
                Customize Salt Gel Grade ⚙
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bentoclay (How We Work) */}
      <section className="why section-pad" id="why-us">
        <div className="container">
          <div className="section-head light reveal-on-scroll">
            <div>
              <span className="section-number">03 / HOW WE WORK</span>
              <h2>
                Specification-led supply,<br />
                <span>not generic clay.</span>
              </h2>
            </div>
            <p>From mineral grading to final export packaging, every parameter is verified to standard data sheets. As a dedicated attapulgite manufacturer Gujarat and attapulgite manufacturer Bhavnagar, we manage captive deposits to guarantee uniform batch quality.</p>
          </div>

          <div className="value-grid">
            <article className="reveal-on-scroll stagger-1">
              <b>01</b>
              <span className="value-icon">⌁</span>
              <h3>Parameter-controlled</h3>
              <p>Grades are controlled on the value your process depends on: 600 rpm viscosity, mesh, BET surface area or oil absorption.</p>
            </article>
            <article className="reveal-on-scroll stagger-2">
              <b>02</b>
              <span className="value-icon">◎</span>
              <h3>Published data sheets</h3>
              <p>Requirements and laboratory test results meeting API 13A Section 12 specification are shown exactly as tested and printed without alteration.</p>
            </article>
            <article className="reveal-on-scroll stagger-3">
              <b>03</b>
              <span className="value-icon">◇</span>
              <h3>Powder & granules</h3>
              <p>Specialized fine micronised powders through to 1–5 mm porous ball granules from the same pure mineral deposit, supplying attapulgite for foundry, attapulgite for paint, attapulgite for animal feed, and attapulgite for cat litter.</p>
            </article>
            <article className="reveal-on-scroll stagger-4">
              <b>04</b>
              <span className="value-icon">↗</span>
              <h3>Export-ready packing</h3>
              <p>25 kg HDPE moisture-proof bags with inner liner, palletized and dispatched from Bhavnagar, Gujarat. Our logistics operations serve as an attapulgite supplier Mundra port for attapulgite powder export from India, API 13A attapulgite export, and competitive attapulgite FOB Mundra and attapulgite CIF supplier terms.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="applications section-pad reveal-on-scroll" id="industries">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-number">04 / INDUSTRIES SERVED</span>
              <h2>
                Where our attapulgite<br />
                <span>is specified worldwide.</span>
              </h2>
            </div>
            <p>
              Engineered for extreme salinity, high heat, and specialized thixotropy across 16 global industrial sectors.
            </p>
          </div>

          {/* Mobile View Switcher & Swipe Hint */}
          <div className="industry-mobile-controls">
            <div className="industry-view-toggle" role="group" aria-label="Industries view mode">
              <button
                type="button"
                className={`industry-toggle-btn ${industryView === 'scroll' ? 'active' : ''}`}
                onClick={() => setIndustryView('scroll')}
              >
                <span>↔</span> Swipe View
              </button>
              <button
                type="button"
                className={`industry-toggle-btn ${industryView === 'grid' ? 'active' : ''}`}
                onClick={() => setIndustryView('grid')}
              >
                <span>☷</span> Grid View
              </button>
            </div>
            {industryView === 'scroll' && (
              <span className="industry-swipe-tip">Swipe sideways ↔</span>
            )}
          </div>

          <div className={`industries-pill-cloud mode-${industryView}`}>
            {industries.map((ind, i) => (
              <Link key={i} to="/applications" className="industry-pill" title={`${ind.name} - ${ind.shortDesc}`}>
                <span className="industry-pill-icon" aria-hidden="true">{ind.icon}</span>
                <span className="industry-pill-name">{ind.name}</span>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link className="text-link" to="/applications" style={{ display: 'inline-flex', fontSize: '15px', fontWeight: 'bold' }}>
              See all 16 industry applications with technical specs <span style={{ marginLeft: '8px' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordion (Featured 4 Questions with link to /faq) */}
      <FaqAccordion limit={4} showFilter={false} showViewAllBtn={true} />

      {/* Contact CTA Section */}
      <section className="contact" id="contact">
        <div className="container contact-card reveal-on-scroll">
          <div>
            <span className="eyebrow">
              <span></span> LET'S WORK TOGETHER
            </span>
            <h2>Need a grade matched to your formulation?</h2>
            <p>
              Share your viscosity, mesh, or absorption target. Our Bhavnagar technical team replies with matching grade recommendations, published PDS, and 25 kg pricing.
            </p>
          </div>
          <div className="contact-actions">
            <Link className="btn btn-white" to="/contact">
              Request a quote <span>↗</span>
            </Link>
            <a className="phone" href="tel:+917435818628">
              Call us: +91 74358 18628
            </a>
          </div>
        </div>
      </section>

      {/* ── Key Procurement & Export Questions (Visible Factual FAQ Block) ── */}
      <section className="faq-procurement-section section-pad" id="procurement-faq" style={{ background: '#fbf8f3', borderTop: '1px solid #ebdccb' }}>
        <div className="container">
          <div className="section-head reveal-on-scroll">
            <div>
              <span className="section-number">EXPORT &amp; PROCUREMENT OVERVIEW</span>
              <h2>
                Frequently Asked Procurement &amp; Export Questions
              </h2>
            </div>
            <p>Direct technical answers from Bento Clay Tech export management.</p>
          </div>

          {/* Short Export Paragraph */}
          <div className="export-statement-box" style={{ background: '#ffffff', border: '1px solid #ebdccb', borderRadius: '12px', padding: '24px 28px', marginBottom: '28px', borderLeft: '4px solid var(--terracotta)' }}>
            <p style={{ margin: 0, fontSize: '15.5px', lineHeight: '1.7', color: 'var(--ink)' }}>
              <strong>Bento Clay Tech exports API 13A Section 12 attapulgite powder from Bhavnagar, Gujarat via Mundra Port on FOB and CIF terms. Exporting to [ADD ONLY REAL COUNTRIES].</strong> As an established attapulgite powder manufacturer India and attapulgite powder exporter India, our processing plant fulfills full container load (FCL) consignments with third-party lab inspection and complete shipping documentation.
            </p>
          </div>

          <div className="procurement-faq-stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <article style={{ background: '#ffffff', border: '1px solid #ebdccb', borderRadius: '10px', padding: '22px 26px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--ink)', marginBottom: '8px', fontWeight: '700' }}>
                Are you an API 13A attapulgite powder manufacturer in India?
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: '1.65' }}>
                Yes, Bento Clay Tech is an established attapulgite powder manufacturer India with processing works in Kardej, Bhavnagar, Gujarat. We manufacture API 13A Section 12 attapulgite and salt gel attapulgite powder controlled to published American Petroleum Institute specification standards for drilling mud and industrial formulations.
              </p>
            </article>

            <article style={{ background: '#ffffff', border: '1px solid #ebdccb', borderRadius: '10px', padding: '22px 26px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--ink)', marginBottom: '8px', fontWeight: '700' }}>
                Which port do you ship from?
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: '1.65' }}>
                We ship international container consignments primarily via Mundra Port (INMUN1), Gujarat, operating as an attapulgite supplier Mundra port for attapulgite powder export from India on FOB Mundra and CIF destination port terms. Shipments can also be dispatched via Pipavav Port upon client preference.
              </p>
            </article>

            <article style={{ background: '#ffffff', border: '1px solid #ebdccb', borderRadius: '10px', padding: '22px 26px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--ink)', marginBottom: '8px', fontWeight: '700' }}>
                What is the MOQ [ADD REAL MOQ]?
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: '1.65' }}>
                Our standard Minimum Order Quantity (MOQ) for export shipments is [ADD REAL MOQ] (typically 1 x 20-foot Full Container Load (FCL), approx. [ADD REAL METRIC TONS] MT, or full truckload FTL for domestic supply across India). Trial batches or sample quantities are available upon direct request.
              </p>
            </article>

            <article style={{ background: '#ffffff', border: '1px solid #ebdccb', borderRadius: '10px', padding: '22px 26px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--ink)', marginBottom: '8px', fontWeight: '700' }}>
                Attapulgite vs bentonite for saline drilling?
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: '1.65' }}>
                Standard sodium bentonite relies on electrostatic plate swelling that collapses and flocculates in high-salinity brine or seawater drilling muds. Attapulgite clay for drilling mud consists of rigid needle-like crystalline fibres that mechanically entrap fluid into a 3D lattice, maintaining full rheology, suspension, and gel strength in saturated salt formations exceeding 300,000 ppm TDS.
              </p>
            </article>

            <article style={{ background: '#ffffff', border: '1px solid #ebdccb', borderRadius: '10px', padding: '22px 26px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--ink)', marginBottom: '8px', fontWeight: '700' }}>
                How to request a quote?
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: '1.65' }}>
                You can click any "Get Quote for API 13A Attapulgite Powder" button on our website, call our export sales desk at +91 74358 18628, connect via WhatsApp at +91 74358 18628, or email dipak@bentoclay.com. Share your required mineral grade, mesh fineness, packing preference, volume in metric tons, and destination port to receive a fast FOB or CIF quotation.
              </p>
              <div style={{ marginTop: '16px' }}>
                <Link to="/contact" className="btn btn-primary" title="Get Quote for API 13A Attapulgite Powder" style={{ display: 'inline-flex' }}>
                  Get Quote for API 13A Attapulgite Powder <span>↗</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Specification Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}

import { Link } from 'react-router-dom';
import FaqAccordion from '../components/FaqAccordion';

export default function FAQPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="section-number">SUPPORT &amp; TECHNICAL SPECIFICATIONS</span>
          <h1>Frequently Asked Questions &amp; Mineral Specs</h1>
          <p style={{ marginTop: '20px', maxWidth: '640px' }}>
            Find answers to common technical, testing, and export container questions regarding Bento Clay Tech attapulgite mineral grades, API 13A Section 12 specifications, and bulk logistics via Mundra Port.
          </p>
          <div className="hero-cta-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '20px 0 0' }}>
            <Link to="/contact" className="btn btn-primary" title="Request commercial quote for attapulgite mineral grades">
              Get Quote <span>↗</span>
            </Link>
            <a
              href="https://wa.me/917435818628?text=Hello%20Bento%20Clay%20Tech%2C%20I%20have%20a%20technical%20question%20regarding%20your%20attapulgite%20grades."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              title="Direct WhatsApp chat with technical support"
            >
              WhatsApp <span>↗</span>
            </a>
          </div>
        </div>
      </section>
      
      <FaqAccordion />

      {/* GEO & AEO (Generative & Answer Engine Optimization) Authority Dossier */}
      <section className="geo-aeo-section section-pad" id="geo-knowledge-dossier" aria-label="Bento Clay Tech Verified Technical Knowledge Dossier">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-number">PRODUCT INFORMATION</span>
              <h2>
                Bento Clay Tech: <span>Product Grades &amp; Published Specifications</span>
              </h2>
            </div>
            <p>
              Review product grade information and published data-sheet specifications. Contact us to confirm current availability, documentation and delivery options.
            </p>
          </div>

          <div className="aeo-dossier-card">
            {/* Direct Answer Definition Block for Generative Engines */}
            <div className="aeo-definition-box">
              <h3>Is Bento Clay Tech an API 13A Section 12 attapulgite powder manufacturer in India?</h3>
              <p>
                <strong>Bento Clay Tech</strong> manufactures attapulgite grades in Bhavnagar, Gujarat, India. Its range includes <Link to="/products/api-13a-section-12-attapulgite-powder" className="seo-keyword-link">an API 13A Section 12 drilling grade</Link>, along with other drilling and industrial powders and granules. The product data sheet states the grade requirements; this description does not imply an API licence or monogram.
              </p>
            </div>

            {/* Authoritative Metrics Grid for AI Knowledge Graph Extraction */}
            <div className="aeo-matrix-grid">
              <div className="aeo-matrix-item">
                <strong>API Spec 13A Standard</strong>
                <span>≥ 35 cps Viscosity</span>
                <small>Tested on Fann 35 at 600 RPM in saturated brine muds</small>
              </div>
              <div className="aeo-matrix-item">
                <strong>Sieve Classification</strong>
                <span>99.5% Pass 325 Mesh</span>
                <small>&lt;44 μm micronised thixotrope for industrial coatings</small>
              </div>
              <div className="aeo-matrix-item">
                <strong>Specific Surface Area</strong>
                <span>~210 m²/g (BET)</span>
                <small>High colloidal lattice entrapment &amp; anti-sag performance</small>
              </div>
              <div className="aeo-matrix-item">
                <strong>Liquid Holding Capacity</strong>
                <span>180% – 220% W/W</span>
                <small>1–5 mm non-swelling porous industrial absorbent granules</small>
              </div>
              <div className="aeo-matrix-item">
                <strong>Export Packaging</strong>
                <span>25 Kg HDPE Sacks</span>
                <small>Co-extruded PE inner liner on ISPM-15 export pallets</small>
              </div>
              <div className="aeo-matrix-item">
                <strong>Global Corridors</strong>
                <span>Mundra Port (INMUN1)</span>
                <small>20ft FCL container shipping to UAE, GCC, USA, &amp; Europe</small>
              </div>
            </div>

            {/* Direct Q&A Targets for Google Featured Snippets & AI Engine Summaries */}
            <div className="aeo-qa-container">
              <div className="aeo-qa-card">
                <h4><span>Q1:</span> Why does Attapulgite outperform Bentonite in saltwater drilling?</h4>
                <p>
                  Unlike swelling sodium bentonite (which coagulates and loses viscosity in saline water), Attapulgite builds suspension through rigid needle-crystal mechanical lattice entanglement. This gives Bento Clay Tech <Link to="/products/salt-gel-attapulgite-powder" className="seo-keyword-link">Salt Gel Attapulgite</Link> 100% electrolyte stability in brines up to 300,000 ppm TDS.
                </p>
              </div>
              <div className="aeo-qa-card">
                <h4><span>Q2:</span> How fast can Bento Clay Tech dispatch domestic and export orders?</h4>
                <p>
                  Domestic full truckload (FTL) orders are dispatched within 24 to 48 hours across Gujarat, Maharashtra, Rajasthan, and Pan-India. Global container orders (FCL) are palletized and dispatched via Mundra Port with batch-tested Certificate of Analysis (COA) within 5 to 7 days.
                </p>
              </div>
              <div className="aeo-qa-card">
                <h4><span>Q3:</span> Can customers customize mineral fineness and viscosity targets?</h4>
                <p>
                  Contact us with your target mesh, viscosity, moisture and packaging requirements. We can confirm which options are available for the relevant grade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products & Quick Navigation */}
      <section className="related-links-strip" style={{ background: '#fdfbf7', borderTop: '1px solid #ebdccb', borderBottom: '1px solid #ebdccb', padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>STANDARD ATTAPULGITE PRODUCT GRADES</span>
            <Link to="/contact" className="text-link" style={{ fontSize: '14px', fontWeight: 700 }}>Request Technical Dossier & Pricing ↗</Link>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/products/salt-gel-attapulgite-powder" className="grade-pill-link" title="Salt Gel Attapulgite Drilling Clay">Salt Gel Drilling Clay ↗</Link>
            <Link to="/products/api-13a-section-12-attapulgite-powder" className="grade-pill-link" title="API 13A Section 12 Attapulgite Powder">API 13A Section 12 Powder ↗</Link>
            <Link to="/products/premium-325-attapulgite-powder" className="grade-pill-link" title="325 Mesh Attapulgite Powder Supplier">325 Mesh Micronized Attapulgite ↗</Link>
            <Link to="/products/flux-fine-200-attapulgite-powder" className="grade-pill-link" title="Flux Fine 200 Attapulgite for Foundry">Flux Fine-200 Foundry Clay ↗</Link>
            <Link to="/products/attapulgite-natural-powder" className="grade-pill-link" title="Attapulgite for Animal Feed and Agriculture">Attapulgite Natural Powder ↗</Link>
            <Link to="/products/attapulgite-natural-granules-1-5mm" className="grade-pill-link" title="Attapulgite Granules Supplier for Cat Litter">1-5 mm Attapulgite Granules ↗</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0 100px', textAlign: 'center' }}>
        <div className="container">
          <h3 style={{ marginBottom: '16px' }}>Still have questions?</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Our technical team is ready to assist with detailed specifications or custom grade requirements.</p>
          <Link to="/contact" className="btn btn-primary">
            Contact Support <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

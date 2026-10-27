import { useState } from 'react';
import { Link } from 'react-router-dom';
import { industries } from '../data/industries';
import { products } from '../data/products';
import ProductModal from '../components/ProductModal';
import FaqAccordion from '../components/FaqAccordion';

export default function ApplicationsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProductObj = (gradeId) => {
    return products.find((p) => p.id === gradeId);
  };

  return (
    <main>
      <section className="page-hero applications-hero">
        <div className="container">
          <div>
            <span className="section-number">INDUSTRIAL APPLICATIONS</span>
            <h1>
              One mineral.<br />
              <em>Multiple advantages.</em>
            </h1>
            <p>
              From saline drilling mud to premium architectural coatings, attapulgite brings valuable rheology, absorption, binding and stability to demanding industrial processes. Specialized attapulgite clay for drilling mud maintains stable rheology in saturated brine and deepwater formations, while micronized grades serve as premium attapulgite for paint thickeners, binder carriers in foundry washes, and absorbent attapulgite for cat litter formulations.
            </p>
            <div className="hero-cta-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '20px 0 24px' }}>
              <Link to="/contact" className="btn btn-primary" title="Request commercial quote for industrial attapulgite applications">
                Get Quote <span>↗</span>
              </Link>
              <a
                href="https://wa.me/917435818628?text=Hello%20Bento%20Clay%20Tech%2C%20I%20would%20like%20to%20discuss%20attapulgite%20grades%20for%20our%20industrial%20application."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                title="Direct WhatsApp chat with Bento Clay Tech applications engineer"
              >
                WhatsApp <span>↗</span>
              </a>
            </div>
          </div>
          <figure className="page-visual">
            <img
              src="/assets/applications-industries.webp"
              alt="Attapulgite applications across drilling, foundry, coatings and agriculture"
            />
          </figure>
        </div>
      </section>

      <section className="function-strip">
        <div className="container">
          <span>VISCOSITY</span>
          <span>SUSPENSION</span>
          <span>ABSORPTION</span>
          <span>BINDING</span>
          <span>STABILITY</span>
        </div>
      </section>

      {/* Comprehensive Industry Grid */}
      <section className="industry-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-number">16 TARGET INDUSTRIES</span>
              <h2>
                Grade-to-industry<br />
                <span>performance mapping.</span>
              </h2>
            </div>
            <p>Select any grade to view parameters and specifications meeting API 13A Section 12 specification.</p>
          </div>

          <div className="industry-grid">
            {industries.map((ind, i) => (
              <article key={i} className="industry-card">
                <div className="industry-card-top">
                  <div className="industry-icon-pill">
                    <span className="ind-icon">{ind.icon || '🏭'}</span>
                    <span className="ind-profile-tag">APPLICATION PROFILE</span>
                  </div>
                  <span className="industry-index">0{i + 1 > 9 ? i + 1 : `0${i + 1}`}</span>
                </div>

                <div className="industry-card-body">
                  <h3>{ind.name}</h3>
                  <p className="industry-desc">{ind.shortDesc}</p>
                  
                  <div className="industry-benefit-box">
                    <span className="benefit-icon">✨</span>
                    <div>
                      <strong>Key Performance Advantage:</strong>
                      <span>{ind.keyBenefit}</span>
                    </div>
                  </div>
                </div>

                <div className="industry-card-footer">
                  <small className="grades-label">RECOMMENDED GRADES:</small>
                  <div className="grade-badges-inline">
                    {ind.recommendedGrades.map((gId) => {
                      const p = getProductObj(gId);
                      if (!p) return null;
                      return (
                        <Link
                          key={gId}
                          to={`/products/${p.slug || p.id}`}
                          className="grade-pill-link"
                        >
                          <span>{p.shortName}</span>
                          <small>({p.form})</small>
                          <span className="pill-arrow">↗</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}

            <article className="industry-quote industry-card">
              <div className="quote-badge">💡 TECHNICAL MATCHING</div>
              <h3>Tell us what performance you need.</h3>
              <p>Our Bhavnagar technical team will evaluate your process rheology, mesh cut, or absorption needs and formulate matching grade samples.</p>
              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <Link className="btn btn-white" to="/contact">
                  Request Grade Advice <span>↗</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Applications FAQ Section */}
      <FaqAccordion
        limit={4}
        showFilter={false}
        showViewAllBtn={true}
        title={
          <>
            Industrial Application Questions,<br />
            <span>answered with data.</span>
          </>
        }
        subtitle="Practical technical answers on specifying attapulgite clay across drilling mud, paint, foundry, and absorbent formulations."
      />

      {/* Related Products & Quick Navigation */}
      <section className="related-links-strip" style={{ background: '#faf6f0', borderTop: '1px solid #ebdccb', borderBottom: '1px solid #ebdccb', padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>RECOMMENDED ATTAPULGITE PRODUCT GRADES</span>
            <Link to="/contact" className="text-link" style={{ fontSize: '14px', fontWeight: 700 }}>Contact Bento Clay Tech Technical Sales ↗</Link>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/products/salt-gel-attapulgite-powder" className="grade-pill-link" title="Salt Gel Attapulgite for Drilling Mud">Salt Gel Drilling Clay ↗</Link>
            <Link to="/products/api-13a-section-12-attapulgite-powder" className="grade-pill-link" title="API 13A Section 12 Attapulgite Powder">API 13A Section 12 Powder ↗</Link>
            <Link to="/products/premium-325-attapulgite-powder" className="grade-pill-link" title="Attapulgite for Paint and Coatings">325 Mesh Paint Thixotrope ↗</Link>
            <Link to="/products/flux-fine-200-attapulgite-powder" className="grade-pill-link" title="Attapulgite for Foundry Core Wash">Flux Fine-200 Foundry Clay ↗</Link>
            <Link to="/products/attapulgite-natural-powder" className="grade-pill-link" title="Attapulgite for Animal Feed Carrier">Attapulgite Natural Powder ↗</Link>
            <Link to="/products/attapulgite-natural-granules-1-5mm" className="grade-pill-link" title="Attapulgite for Cat Litter and Absorbents">1-5 mm Absorbent Granules ↗</Link>
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="container">
          <div>
            <span>DIRECT TECHNICAL & COMMERCIAL INQUIRIES</span>
            <h2>Need grade recommendations for your application?</h2>
          </div>
          <Link className="btn btn-white" to="/contact">
            Request quotation <b>↗</b>
          </Link>
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

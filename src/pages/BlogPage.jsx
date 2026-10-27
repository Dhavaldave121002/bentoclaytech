import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogArticles } from '../data/blogData';

const CATEGORIES = ['All Articles', 'Product Spotlight', 'Technical Guides', 'Company & Quality'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Articles');

  const filteredArticles = activeCategory === 'All Articles'
    ? blogArticles
    : blogArticles.filter(a => a.category === activeCategory);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="section-number">KNOWLEDGE BASE & PRODUCT SPOTLIGHTS</span>
          <h1>Mineral Insights, Guides & Product Spotlights</h1>
          <p style={{ marginTop: '16px', maxWidth: '680px' }}>
            Explore technical deep dives into attapulgite mineralogy, dedicated grade spotlight guides for drilling, coatings, foundry, and agriculture, plus quality updates from our Bhavnagar manufacturing works. Find technical parameters for API 13A Section 12 attapulgite, 325 mesh paint thixotropes, and bulk export mineral specifications from Bhavnagar.
          </p>
          <div className="hero-cta-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '20px 0 0' }}>
            <Link to="/contact" className="btn btn-primary" title="Request commercial quote for attapulgite mineral grades">
              Get Quote <span>↗</span>
            </Link>
            <a
              href="https://wa.me/917435818628?text=Hello%20Bento%20Clay%20Tech%2C%20I%20am%20reading%20your%20technical%20guides%20and%20would%20like%20to%20request%20product%20specifications."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              title="Direct WhatsApp chat with Bento Clay Tech"
            >
              WhatsApp <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Category Filter Navigation */}
      <section style={{ background: '#fffdf9', borderBottom: '1px solid var(--line)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginRight: '8px' }}>FILTER:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'var(--green)' : '#f5ece0',
                color: activeCategory === cat ? '#ffffff' : 'var(--ink)',
                border: activeCategory === cat ? '1px solid var(--green)' : '1px solid #e0d0bf',
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="blog-content" style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div
            className="blog-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredArticles.map((article, idx) => (
              <article
                key={idx}
                className="blog-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #ebdccb',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(94, 54, 31, 0.04)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* Full-bleed 16:10 Landscape Editorial Cover Image */}
                <Link
                  to={`/blog/${article.slug}`}
                  style={{
                    position: 'relative',
                    display: 'block',
                    width: '100%',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    backgroundColor: '#fbf9f6',
                    borderBottom: '1px solid #ebdccb'
                  }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 25%',
                      display: 'block',
                      transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </Link>

                {/* Card Content with Clean Inline Badges */}
                <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      style={{
                        background: '#f5ede2',
                        color: 'var(--green)',
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {article.category}
                    </span>
                    {article.badge && (
                      <span
                        style={{
                          background: '#f3ebdd',
                          color: 'var(--gold)',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid #e5d8c6'
                        }}
                      >
                        {article.badge}
                      </span>
                    )}
                    <span style={{ fontSize: '12px', color: 'var(--muted)', marginLeft: 'auto' }}>
                      {article.date}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '16.5px', fontWeight: 700, margin: '0 0 10px', lineHeight: '1.4', color: 'var(--ink)' }}>
                    <Link to={`/blog/${article.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {article.title}
                    </Link>
                  </h3>

                  <p
                    style={{
                      fontSize: '13.5px',
                      color: 'var(--muted)',
                      marginBottom: '18px',
                      lineHeight: '1.6',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {article.excerpt}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid #f4ece2' }}>
                    <Link
                      to={`/blog/${article.slug}`}
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        color: 'var(--gold)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      Read Article <span>→</span>
                    </Link>
                    {article.productId && (
                      <Link
                        to={`/products/${article.productId}`}
                        style={{
                          fontSize: '12px',
                          color: 'var(--green)',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        View Product PDS ↗
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* Related Products & Quick Navigation */}
      <section className="related-links-strip" style={{ background: '#fdfbf7', borderTop: '1px solid #ebdccb', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>FEATURED ATTAPULGITE MINERAL GRADES</span>
            <Link to="/contact" className="text-link" style={{ fontSize: '14px', fontWeight: 700 }}>Request Lab Samples & PDS ↗</Link>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/products/salt-gel-attapulgite-powder" className="grade-pill-link" title="Salt Gel Attapulgite Drilling Clay">Salt Gel Drilling Clay ↗</Link>
            <Link to="/products/api-13a-section-12-attapulgite-powder" className="grade-pill-link" title="API 13A Section 12 Attapulgite Powder">API 13A Section 12 Powder ↗</Link>
            <Link to="/products/premium-325-attapulgite-powder" className="grade-pill-link" title="325 Mesh Attapulgite Powder Supplier">325 Mesh Micronized Attapulgite ↗</Link>
            <Link to="/products/flux-fine-200-attapulgite-powder" className="grade-pill-link" title="Flux Fine 200 Attapulgite for Foundry">Flux Fine-200 Foundry Clay ↗</Link>
            <Link to="/products/attapulgite-natural-powder" className="grade-pill-link" title="Attapulgite for Animal Feed and Agriculture">Attapulgite Natural Powder ↗</Link>
            <Link to="/products/attapulgite-natural-granules-1-5mm" className="grade-pill-link" title="Attapulgite Granules Supplier for Cat Litter">1-5 mm Attapulgite Granules ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

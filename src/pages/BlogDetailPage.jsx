import { useParams, Navigate, Link } from 'react-router-dom';
import { blogArticles } from '../data/blogData';
import { products } from '../data/products';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const featuredProduct = article.productId ? products.find(p => p.id === article.productId) : null;

  return (
    <main>
      <section className="page-hero blog-detail-hero">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/blog" className="blog-back-btn">
            ← Back to Blog
          </Link>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--green)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{article.category}</span>
            <span style={{ fontSize: '13px', color: '#888' }}>{article.date}</span>
          </div>
          <h1 style={{ lineHeight: '1.25', fontSize: 'clamp(28px, 4vw, 42px)', margin: '0 0 16px 0' }}>{article.title}</h1>
          <div className="hero-cta-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '16px 0 0' }}>
            <Link to="/contact" className="btn btn-primary" title="Request commercial quote for this mineral grade">
              Get Quote <span>↗</span>
            </Link>
            <a
              href={`https://wa.me/917435818628?text=${encodeURIComponent(
                `Hello Bento Clay Tech, I was reading your article "${article.title}" and would like to request technical specifications and quote.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              title="Direct WhatsApp inquiry about this article"
            >
              WhatsApp <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="article-content" style={{ padding: '0 0 100px' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: '#fbf9f6', borderRadius: '12px', border: '1px solid #ebdccb', padding: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
            <img 
              src={article.image} 
              alt={article.title} 
              style={{ maxWidth: '100%', maxHeight: '420px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} 
            />
          </div>
          
          <div style={{ fontSize: '17px', lineHeight: '1.85', color: 'var(--ink)' }}>
            {article.content.split('\n\n').map((block, i) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={i} style={{ fontSize: '22px', fontWeight: '700', color: 'var(--green)', margin: '36px 0 16px', fontFamily: 'Manrope, sans-serif' }}>
                    {trimmed.replace(/^###\s+/, '')}
                  </h3>
                );
              }

              const parseFormatting = (text) => {
                return text
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="seo-keyword-link" title="$1">$1</a>');
              };

              if (trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').filter(line => line.trim().startsWith('- '));
                return (
                  <ul key={i} style={{ paddingLeft: '24px', marginBottom: '24px', color: 'var(--ink)' }}>
                    {items.map((item, j) => {
                      const cleanItem = item.replace(/^-\s+/, '');
                      return (
                        <li key={j} style={{ marginBottom: '10px' }}>
                          <span dangerouslySetInnerHTML={{ __html: parseFormatting(cleanItem) }} />
                        </li>
                      );
                    })}
                  </ul>
                );
              }

              if (/^\d+\.\s+/.test(trimmed)) {
                const items = trimmed.split('\n').filter(line => /^\d+\.\s+/.test(line.trim()));
                return (
                  <ol key={i} style={{ paddingLeft: '24px', marginBottom: '24px', color: 'var(--ink)' }}>
                    {items.map((item, j) => {
                      const cleanItem = item.replace(/^\d+\.\s+/, '');
                      return (
                        <li key={j} style={{ marginBottom: '10px' }}>
                          <span dangerouslySetInnerHTML={{ __html: parseFormatting(cleanItem) }} />
                        </li>
                      );
                    })}
                  </ol>
                );
              }

              return (
                <p key={i} style={{ marginBottom: '22px' }} dangerouslySetInnerHTML={{ __html: parseFormatting(trimmed) }} />
              );
            })}
          </div>

          {featuredProduct && (
            <div style={{ marginTop: '48px', padding: '24px 28px', background: '#ffffff', border: '2px solid #5e361f', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', boxShadow: '0 6px 20px rgba(94, 54, 31, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', minWidth: '260px' }}>
                <img src={featuredProduct.image} alt={featuredProduct.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #ebdccb', background: '#faf6f0' }} />
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>FEATURED ATTAPULGITE GRADE</span>
                  <h4 style={{ margin: '3px 0', fontSize: '19px', color: 'var(--green)', fontWeight: 800 }}>{featuredProduct.name}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>{featuredProduct.tagline}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link to={`/products/${featuredProduct.slug || featuredProduct.id}`} className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '13.5px' }}>
                  View Grade Specs <span>↗</span>
                </Link>
                <Link to={`/products/${featuredProduct.slug || featuredProduct.id}#customizer-section`} className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '13.5px' }}>
                  Customize Recipe <span>⚙</span>
                </Link>
              </div>
            </div>
          )}

          <div style={{ marginTop: '50px', padding: '36px', background: '#fdfbf7', border: '1px solid #ebdccb', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '20px' }}>Looking for High-Performance Attapulgite?</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '540px', margin: '0 auto 24px' }}>
              Bentoclay manufactures API-13A drilling clays, high-purity coatings thixotropes, and absorbent granules directly from Bhavnagar, Gujarat.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-primary">Explore Products <span>→</span></Link>
              <Link to="/contact" className="btn btn-secondary">Request Specification Quote <span>↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products & Quick Navigation */}
      <section className="related-links-strip" style={{ background: '#fdfbf7', borderTop: '1px solid #ebdccb', padding: '36px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>POPULAR ATTAPULGITE MINERAL GRADES</span>
            <Link to="/contact" className="text-link" style={{ fontSize: '14px', fontWeight: 700 }}>Request Technical Support ↗</Link>
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
    </main>
  );
}

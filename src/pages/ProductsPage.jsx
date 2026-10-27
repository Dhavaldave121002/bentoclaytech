import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ProductModal from '../components/ProductModal';
import GradeComparisonTable from '../components/GradeComparisonTable';
import FaqAccordion from '../components/FaqAccordion';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ProductsPage() {
  const [filter, setFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <section className="page-hero products-catalog-hero">
        <div className="product-hero-backdrop" aria-hidden="true">
          <div
            className="product-backdrop-img"
            style={{ backgroundImage: `url('/assets/bentoclay-mine-bg.jpg')` }}
          />
          <div className="product-backdrop-overlay" />
          <div className="product-backdrop-brush" />
        </div>
        <div className="container product-hero-content-relative">
          <span className="section-number">PRODUCT PORTFOLIO / 06 GRADES</span>
          <h1>
            Attapulgite powder and<br />
            <em>granule grades.</em>
          </h1>
          <p>
            Six grades produced from the same rod-structured hydrated aluminium magnesium silicate, each ground and controlled for a different performance parameter. All specifications are taken from published product data sheets. Operating as an attapulgite powder manufacturer India and attapulgite powder bulk supplier, we dispatch standard and custom orders from Bhavnagar via Mundra Port on FOB and CIF terms.
          </p>
          <div className="portfolio-hero-pills" aria-label="Available Product Grades">
            <span className="hero-grade-tag">⚡ SG: 35 cps Salt Gel</span>
            <span className="hero-grade-tag">🛡️ API-13A Sec 12 Drilling</span>
            <span className="hero-grade-tag">🎨 P325 Paint Thixotrope</span>
            <span className="hero-grade-tag">🔥 FF200 Foundry Flux</span>
            <span className="hero-grade-tag">🐾 G15 Absorbent Granules</span>
            <span className="hero-grade-tag">🌾 NP Natural Agro Carrier</span>
          </div>
          <div className="hero-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" to="/contact" title="Get Quote for Attapulgite Powder and Granules">
              Get Quote <span>↗</span>
            </Link>
            <a
              className="btn btn-secondary"
              href="https://wa.me/917435818628?text=Hello%20Bento%20Clay%20Tech,%20please%20send%20quote%20for%20attapulgite%20grades."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Quote"
            >
              💬 WhatsApp (+91 74358 18628)
            </a>
          </div>
        </div>
      </section>

      {/* Filterable Products */}
      <section className="products page-products" id="products">
        <div className="container">
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

      {/* Grade Comparison Table */}
      <GradeComparisonTable onSelectProduct={setSelectedProduct} />

      {/* Technical FAQ */}
      <FaqAccordion limit={4} showFilter={false} showViewAllBtn={true} />

      <section className="page-cta reveal-on-scroll">
        <div className="container">
          <div>
            <span>NEED TECHNICAL GUIDANCE?</span>
            <h2>Let’s identify the right grade for your process.</h2>
          </div>
          <Link className="btn btn-white" to="/contact">
            Discuss your application <b>↗</b>
          </Link>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}

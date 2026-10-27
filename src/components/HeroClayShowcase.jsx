import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedCounter from './AnimatedCounter';

const showcaseGrades = [
  {
    id: 'salt-gel',
    slug: 'salt-gel-attapulgite-powder',
    name: 'Attapulgite Salt Gel Grade',
    shortName: 'Salt Gel',
    code: 'SG',
    tagline: 'Viscosity building in high-salt, saline drilling fluids',
    paramLabel: '600 RPM Viscosity',
    paramVal: '35 cps min',
    mesh: '4% max > 75 µm',
    application: 'Saline Drilling Fluids',
    image: '/assets/product-images/Attapulgite Salt Gel Grade Powder.webp',
  },
  {
    id: 'api-13a',
    slug: 'api-13a-section-12-attapulgite-powder',
    name: 'API-13A Section 12 Grade',
    shortName: 'API-13A',
    code: '13A',
    tagline: 'Standard specification for oil & gas offshore drilling clay',
    paramLabel: 'API Viscosity Reading',
    paramVal: '30 cps min',
    mesh: '8% max > 75 µm',
    application: 'Offshore & Deep Wells',
    image: '/assets/product-images/Attapulgite Powder API-13A Section 12 Grade.webp',
  },
  {
    id: 'premium-325',
    slug: 'premium-325-attapulgite-powder',
    name: 'Premium 325 Mesh Thixotrope',
    shortName: 'Premium 325',
    code: 'P325',
    tagline: 'Ultra-fine high-surface-area rheology modifier for coatings & paints',
    paramLabel: 'BET Surface Area',
    paramVal: '210 m²/g',
    mesh: '0.2% max > 45 µm',
    application: 'Paints & Coatings',
    image: '/assets/product-images/Attapulgite Premium 325 Powder.webp',
  },
  {
    id: 'flux-fine-200',
    slug: 'flux-fine-200-attapulgite-powder',
    name: 'Flux Fine-200 Foundry Flux',
    shortName: 'Flux Fine-200',
    code: 'FF200',
    tagline: 'High-temperature thermal stabilizer & refractory wash binder',
    paramLabel: 'Suspension Index',
    paramVal: 'High Gel',
    mesh: '98% pass 200 mesh',
    application: 'Foundry & Metallurgy',
    image: '/assets/product-images/Attapulgite Flux Fine-200 (Foundry Flux) Powder.webp',
  },
  {
    id: 'natural-granules',
    slug: 'attapulgite-natural-granules-1-5mm',
    name: 'Natural Absorbent Granules (1–5 mm)',
    shortName: 'Granules 1–5mm',
    code: 'G15',
    tagline: 'Low-dust calcined & raw porous granules for cat litter & carriers',
    paramLabel: 'Liquid Absorption',
    paramVal: '110–130%',
    mesh: '1.0 – 5.0 mm',
    application: 'Cat Litter & Absorbent',
    image: '/assets/product-images/Attapulgite Natural Granules 1 to 5 mm.webp',
  },
  {
    id: 'natural-powder',
    slug: 'attapulgite-natural-powder',
    name: 'Natural Attapulgite Powder',
    shortName: 'Natural Powder',
    code: 'NP',
    tagline: 'Inert, high sorptive carrier for agricultural crop care & fertilizers',
    paramLabel: 'Bulk Density',
    paramVal: '0.55–0.65 g/cm³',
    mesh: '90% pass 200 mesh',
    application: 'Agro Carriers & Feeds',
    image: '/assets/product-images/Attapulgite Natural Powder.webp',
  },
];

export default function HeroClayShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode] = useState('powder'); // 'powder' | 'bag'
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const activeGrade = showcaseGrades[activeIdx];

  // Auto-rotate every 6.5s unless hovered or user interacts
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % showcaseGrades.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // 3D Parallax Mouse Tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 992) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = -(y / (rect.height / 2)) * 6.5; // max ±6.5deg
    const tiltY = (x / (rect.width / 2)) * 6.5;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  return (
    <section
      className="hero-clay-showcase-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Cinematic Mine & Clay Background Layer ── */}
      <div className="hero-bg-cinematic" aria-hidden="true">
        <div
          className="hero-bg-photo"
          style={{ backgroundImage: `url('/assets/bentoclay-mine-bg.jpg')` }}
        />
        <div className="hero-bg-overlay" />
        <div className="hero-bg-brush-mask" />
        <div className="hero-floating-particles">
          <span className="particle p1"></span>
          <span className="particle p2"></span>
          <span className="particle p3"></span>
          <span className="particle p4"></span>
          <span className="particle p5"></span>
        </div>
      </div>

      <div className="container hero-content-relative">
        <div className="hero-grid">
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span> Attapulgite specialists · Bhavnagar, India
            </div>

            <h1 className="hero-title">
              Attapulgite engineered to the<br />
              <em className="hero-highlight">parameter that matters.</em>
            </h1>

            <p className="hero-lead">
              Bento Clay Tech manufactures six specialized attapulgite grades — from 35 cps salt gel for saline drilling fluids to 210 m²/g Premium 325 for paint and coatings — each controlled to a published data sheet in 25 kg HDPE packing. As an established attapulgite powder manufacturer India and attapulgite powder exporter India, our processing works supply API 13A Section 12 attapulgite and salt gel attapulgite powder for worldwide industrial clients.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#products">
                Explore the six grades <span>↓</span>
              </a>
              <Link className="btn btn-secondary" to="/contact" title="Get Quote for API 13A Attapulgite Powder">
                Get Quote <span>↗</span>
              </Link>
              <a
                className="btn btn-whatsapp-hero"
                href="https://wa.me/917435818628?text=Hello%20Bento%20Clay%20Tech,%20please%20send%20quote%20for%20API%2013A%20attapulgite%20powder."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp Quote"
                style={{ backgroundColor: '#25D366', borderColor: '#20ba5a', color: '#ffffff' }}
              >
                💬 WhatsApp
              </a>
            </div>

            {/* Quick Interactive Grade Selector Strip */}
            <div className="hero-quick-grades" aria-label="Quick Select Clay Grade">
              <div className="quick-grades-label">
                <span className="quick-pulse"></span>
                <span>SELECT MINERAL GRADE:</span>
              </div>
              <div className="quick-grades-pills" role="tablist">
                {showcaseGrades.map((g, idx) => (
                  <button
                    key={g.id}
                    type="button"
                    role="tab"
                    aria-selected={activeIdx === idx}
                    className={`grade-pill ${activeIdx === idx ? 'active' : ''}`}
                    onClick={() => {
                      setActiveIdx(idx);
                      setIsPaused(true);
                    }}
                  >
                    <span className="pill-code">{g.code}</span>
                    <span className="pill-name">{g.shortName}</span>
                    {activeIdx === idx && <span className="pill-bar"></span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Clay & 25kg Bag Showcase */}
          <div className="hero-visual-col">
            <div
              className="clay-showcase-card"
              ref={cardRef}
              onMouseMove={handleMouseMove}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
              }}
            >
              {/* Card Header: View Mode Switcher */}
              <div className="showcase-card-topbar">
                <div className="showcase-grade-meta">
                  <span className="showcase-badge-pill">0{activeIdx + 1}&nbsp;/&nbsp;06</span>
                  <span className="showcase-app-name">{activeGrade.application}</span>
                </div>

                <div className="view-mode-toggle" role="group" aria-label="Toggle Image View">
                  <button
                    type="button"
                    className={`toggle-btn ${viewMode === 'powder' ? 'active' : ''}`}
                    onClick={() => setViewMode('powder')}
                    title="View Mineral Sample"
                  >
                    <span>🥣 {activeGrade.code === 'NG' ? 'Granules' : 'Powder'}</span>
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${viewMode === 'bag' ? 'active' : ''}`}
                    onClick={() => setViewMode('bag')}
                    title="View 25kg HDPE Bag Packaging"
                  >
                    <span>📦 25kg Bag</span>
                  </button>
                </div>
              </div>

              {/* Central Visual: Floating Animation with smooth transition */}
              <div className="showcase-stage">
                <div className="showcase-aura" aria-hidden="true"></div>

                {viewMode === 'powder' ? (
                  <div className="showcase-media-box showcase-powder-box" key={`powder-${activeGrade.id}`}>
                    <img
                      src={activeGrade.image}
                      alt={`${activeGrade.name} - Pure Attapulgite Clay Mineral by Bento Clay Tech, Attapulgite Powder Manufacturer India`}
                      className="showcase-main-img floating-clay-anim"
                      width="540"
                      height="540"
                      loading="eager"
                      fetchpriority="high"
                    />
                    <div className="clay-ground-shadow" aria-hidden="true"></div>
                  </div>
                ) : (
                  <div className="showcase-media-box showcase-bag-box" key="bag-view">
                    <img
                      src="/assets/bentoclay-hdpe-bag.jpg"
                      alt="Bento Clay Tech 25 kg HDPE Woven Sack with PE Liner - Attapulgite Powder Bulk Supplier & Exporter India"
                      className="showcase-main-img floating-clay-anim bag-photo"
                      width="540"
                      height="540"
                      loading="eager"
                      fetchpriority="high"
                    />
                    <div className="clay-ground-shadow" aria-hidden="true"></div>
                  </div>
                )}

                {/* Floating Grade Info Badge */}
                <div className="floating-param-badge">
                  <small>{activeGrade.paramLabel.toUpperCase()}</small>
                  <strong>{activeGrade.paramVal}</strong>
                  <span>{activeGrade.mesh}</span>
                </div>

                {/* Packaging Spec Tag */}
                <div className="floating-pack-tag">
                  <span className="pack-icon">📦</span>
                  <div>
                    <strong>25 KG HDPE</strong>
                    <small>With Moisture Liner</small>
                  </div>
                </div>
              </div>

              {/* Card Footer: Active Product Info & Direct Spec Link */}
              <div className="showcase-card-footer">
                <div className="footer-grade-details">
                  <h4>{activeGrade.name}</h4>
                  <p>{activeGrade.tagline}</p>
                </div>
                <Link
                  to={`/products/${activeGrade.slug}`}
                  className="showcase-specs-btn"
                  aria-label={`View full specifications for ${activeGrade.name}`}
                >
                  Full Specs <span>↗</span>
                </Link>
              </div>

              {/* Progress Timer Line */}
              <div className="showcase-progress-track">
                <div
                  className={`showcase-progress-fill ${isPaused ? 'paused' : 'running'}`}
                  key={`progress-${activeIdx}`}
                ></div>
              </div>
            </div>

            {/* Formula Chip below Card */}
            <div className="formula-chip hero-formula-chip">
              <small>MINERAL COMPOSITION</small>
              <strong>(Mg, Al)₅ Si₈ O₂₂ (OH)₄</strong>
              <span>Rod-like / needle-like crystal habit · High-Shear Viscosifier</span>
            </div>
          </div>
        </div>

        {/* Metric counters spanning full width */}
        <div className="hero-metrics-bar hero-metrics-full reveal-on-scroll">
          <div className="metric-item">
            <strong>
              <AnimatedCounter target={6} />
            </strong>
            <span>Attapulgite grades</span>
          </div>
          <div className="metric-item">
            <strong>
              <AnimatedCounter target={25} suffix=" kg" />
            </strong>
            <span>HDPE with liner</span>
          </div>
          <div className="metric-item">
            <strong>
              <AnimatedCounter target={2} />
            </strong>
            <span>Powder & granule forms</span>
          </div>
          <div className="metric-item">
            <strong>1–5 mm</strong>
            <span>Granule range</span>
          </div>
        </div>
      </div>
    </section>
  );
}

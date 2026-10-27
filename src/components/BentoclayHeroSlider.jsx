import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const bannerSlides = [
  {
    id: 'attapulgite-mines',
    title: 'ATTAPULGITE MINING',
    subtitle: 'Well Established Quarry Infrastructure',
    tag: 'Direct Open-Pit Mining & Processing in Bhavnagar, Gujarat',
    image: '/assets/banners/banner-attapulgite-mines.jpg',
    alt: 'Bento Clay Tech Attapulgite Mineral Infrastructure & Open-Pit Mining Quarry in Bhavnagar',
    link: '/about',
    ctaText: 'Our Infrastructure',
  },
  {
    id: 'drilling-clay',
    title: 'API-13A DRILLING CLAY',
    subtitle: 'Offshore & Deep Well Mud Systems',
    tag: 'API Spec 13A Section 12 Compliant',
    image: '/assets/banners/banner-drilling-api13a.jpg',
    alt: 'API 13A Section 12 Compliant Attapulgite Drilling Clay for Oil & Gas Exploration',
    link: '/products/api-13a-section-12-attapulgite-powder',
    ctaText: 'View API-13A Specs',
  },
  {
    id: 'paint-premium-325',
    title: 'PREMIUM 325 THIXOTROPE',
    subtitle: 'Paint & Coatings Rheology Modifier',
    tag: 'Superfine 325 Mesh · 210 m²/g High Surface Area',
    image: '/assets/banners/banner-paint-premium325.jpg',
    alt: 'Bentoclay Premium 325 Mesh High Purity Attapulgite Rheology Modifier for Paints and Coatings',
    link: '/products/premium-325-attapulgite-powder',
    ctaText: 'View Premium 325',
  },
  {
    id: 'export-packaging',
    title: 'GLOBAL EXPORT SUPPLY',
    subtitle: 'Container Shipping via Mundra Port',
    tag: '25 Kg HDPE Sacks with PE Moisture Liner',
    image: '/assets/banners/banner-export-packaging.jpg',
    alt: 'Bento Clay Tech 25 Kg HDPE Export Packaging & Container Shipping from Mundra Port',
    link: '/products',
    ctaText: 'View Export Grades',
  },
];

export default function BentoclayHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide every 5.5s with automatic restart on interaction
  const startAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5500);
  };

  useEffect(() => {
    if (!isHovered) {
      startAutoSlide();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
    startAutoSlide();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    startAutoSlide();
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <section
      className="bentoclay-hero-banner-slider"
      aria-label="Bentoclay Featured Product Showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Slide Progress Bar */}
      <div className="banner-slider-progressbar" aria-hidden="true">
        <div
          className={`progressbar-fill ${!isHovered ? 'running' : 'paused'}`}
          key={`prog-${currentSlide}`}
        />
      </div>

      <div className="banner-slider-container">
        {/* Stacked Slides Container with Slider Revolution transition */}
        <div className="banner-slider-stage">
          {bannerSlides.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.id}
                className={`banner-slide-item ${isActive ? 'is-active' : 'is-inactive'}`}
                aria-hidden={!isActive}
              >
                <div className="banner-image-wrapper">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className={`banner-slide-img ${isActive ? 'ken-burns-active' : ''}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchpriority={idx === 0 ? 'high' : 'auto'}
                    width="1920"
                    height="1080"
                  />

                  {/* Animated Interactive CTA Badge with Staggered Entrance */}
                  <div className="banner-slide-cta-wrapper">
                    <Link
                      to={slide.link}
                      className="banner-slide-cta-link"
                      aria-label={`${slide.ctaText} - ${slide.title}`}
                    >
                      <span className="banner-cta-badge">
                        {slide.ctaText} <span>↗</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Previous / Next Arrow Controls */}
        <button
          type="button"
          className="banner-nav-btn banner-prev-btn"
          onClick={prevSlide}
          aria-label="Previous Banner Slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          type="button"
          className="banner-nav-btn banner-next-btn"
          onClick={nextSlide}
          aria-label="Next Banner Slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Bottom Pagination Dots (Matching bentoclay.com style) */}
        <div className="banner-slider-bullets" role="tablist" aria-label="Slider Pagination">
          {bannerSlides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={idx === currentSlide}
              aria-label={`Go to slide ${idx + 1}: ${s.title}`}
              className={`bullet-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            >
              <span className="bullet-inner"></span>
            </button>
          ))}
        </div>
      </div>

      {/* High-Conversion Industrial Trust Badges Strip */}
      <div className="hero-trust-strip" aria-label="Quality & Infrastructure Certifications">
        <div className="container hero-trust-grid">
          <div className="trust-badge-item">
            <span className="trust-badge-icon">🛡️</span>
            <div className="trust-badge-text">
              <strong>API Spec 13A Section 12</strong>
              <small>Viscosity meeting API 13A Section 12 specification (≥ 35 cps)</small>
            </div>
          </div>
          <div className="trust-badge-item">
            <span className="trust-badge-icon">🏭</span>
            <div className="trust-badge-text">
              <strong>Captive Mine & Plant</strong>
              <small>Bhavnagar, Gujarat Works</small>
            </div>
          </div>
          <div className="trust-badge-item">
            <span className="trust-badge-icon">🚢</span>
            <div className="trust-badge-text">
              <strong>Mundra Port Dispatch</strong>
              <small>Worldwide Container Shipping</small>
            </div>
          </div>
          <div className="trust-badge-item">
            <span className="trust-badge-icon">📦</span>
            <div className="trust-badge-text">
              <strong>25 Kg Moisture Barrier</strong>
              <small>Export HDPE Sacks with PE Liner</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

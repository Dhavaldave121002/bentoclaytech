import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';

export default function FloatingActions() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Detect scroll to toggle Back to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Determine active product based on URL route or param
  let activeProduct = null;
  const gradeParam = searchParams.get('grade') || searchParams.get('product') || searchParams.get('id');

  if (location.pathname.startsWith('/products/')) {
    const slug = location.pathname.replace('/products/', '').split('/')[0].split('#')[0];
    if (slug) {
      activeProduct = products.find(p => p.slug === slug || p.id === slug);
    }
  } else if (gradeParam) {
    const clean = decodeURIComponent(gradeParam).trim().toLowerCase();
    activeProduct = products.find(p =>
      p.id.toLowerCase() === clean ||
      p.shortName.toLowerCase() === clean ||
      p.name.toLowerCase() === clean ||
      p.slug.toLowerCase() === clean
    );
  }

  const whatsappNumber = '917435818628';
  const whatsappText = activeProduct
    ? `Hello Bento Clay Tech, I am interested in ${activeProduct.name} and would like to request technical specifications, pricing, and sample availability.`
    : 'Hello Bento Clay Tech, I am interested in your attapulgite and bentonite mineral grades and would like to request product details, technical specifications, and export pricing.';

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <aside
      className="floating-actions-container"
      aria-label="Quick contact and navigation"
    >
      {/* Quick Direct Call Button */}
      <a
        href="tel:+917435818628"
        className="floating-btn call-direct-btn"
        aria-label="Call Bento Clay Tech: +91 74358 18628"
        title="Call: +91 74358 18628"
      >
        <span className="floating-tooltip">Call: +91 74358 18628</span>
        <svg
          viewBox="0 0 24 24"
          width="19"
          height="19"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

      {/* Primary 1-Click WhatsApp Button (Official Green #25D366) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-direct-btn"
        aria-label="Chat on WhatsApp with Bento Clay Tech"
        title="Chat on WhatsApp"
      >
        <span className="whatsapp-pulse" aria-hidden="true"></span>
        <span className="whatsapp-label-badge">WhatsApp Us</span>
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="#ffffff"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.68 7.5 8.46 7.74C8.24 7.97 7.62 8.56 7.62 9.76C7.62 10.96 8.5 12.12 8.62 12.28C8.75 12.44 10.33 14.89 12.76 15.94C14.79 16.81 15.2 16.64 15.63 16.6C16.07 16.56 17.04 16.03 17.24 15.47C17.45 14.9 17.45 14.42 17.38 14.32C17.32 14.21 17.16 14.15 16.92 14.03C16.67 13.91 15.48 13.32 15.26 13.24C15.04 13.16 14.88 13.12 14.71 13.36C14.55 13.6 14.08 14.15 13.93 14.32C13.79 14.48 13.65 14.5 13.4 14.38C13.16 14.26 12.38 14 11.46 13.18C10.74 12.54 10.25 11.75 10.11 11.51C9.97 11.27 10.09 11.14 10.21 11.02C10.32 10.91 10.46 10.73 10.59 10.58C10.71 10.43 10.76 10.33 10.84 10.17C10.92 10.01 10.88 9.87 10.82 9.75C10.76 9.63 10.29 8.47 10.09 8C9.9 7.54 9.7 7.61 9.55 7.6C9.41 7.6 9.25 7.44 9.11 7.44Z" />
        </svg>
      </a>

      {/* Back to Top Button */}
      <button
        type="button"
        className={`floating-btn back-to-top-btn ${showTopBtn ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <span className="floating-tooltip">Back to top</span>
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </aside>
  );
}

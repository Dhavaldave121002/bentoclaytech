import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { FORM_CONFIG, getDirectContactLinks } from '../config/formConfig';

function resolveSelectedProduct(param) {
  if (!param) return 'Choose a product';
  const clean = decodeURIComponent(param).trim().toLowerCase();

  const matched = products.find(p =>
    p.id.toLowerCase() === clean ||
    p.shortName.toLowerCase() === clean ||
    p.name.toLowerCase() === clean ||
    p.slug.toLowerCase() === clean ||
    p.code.toLowerCase() === clean ||
    clean.includes(p.shortName.toLowerCase()) ||
    clean.includes(p.id.toLowerCase()) ||
    p.name.toLowerCase().includes(clean)
  );

  return matched ? matched.id : 'Choose a product';
}

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('grade') || searchParams.get('product') || searchParams.get('id');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    quantity: '1 x 20ft FCL (~20 MT)',
    product: resolveSelectedProduct(queryParam),
    requirement: '',
    bot_field: ''
  });

  useEffect(() => {
    if (queryParam) {
      setFormData((prev) => ({ ...prev, product: resolveSelectedProduct(queryParam) }));
    }
  }, [queryParam]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('bentoclay:productChange', {
          detail: { product: formData.product }
        })
      );
    }
  }, [formData.product]);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const selectedProductObj = products.find((p) => p.id === formData.product);
  const activeProductName = selectedProductObj
    ? selectedProductObj.name
    : (formData.product && formData.product !== 'Choose a product' ? formData.product : '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerMailtoFallback = (productName) => {
    const directLinks = getDirectContactLinks(formData.phone);
    const subject = encodeURIComponent(`B2B Quote RFQ: ${productName} - ${formData.company || formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nCompany: ${formData.company}\nCountry / Port: ${formData.country}\nQuantity: ${formData.quantity}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProduct: ${productName}\n\nRequirement:\n${formData.requirement}${directLinks.summaryText}`
    );
    window.location.href = `mailto:${FORM_CONFIG.clientEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Spam honeypot trap
    if (formData.bot_field) {
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    const selectedProd = products.find((p) => p.id === formData.product);
    const productName = selectedProd ? selectedProd.name : (formData.product !== 'Choose a product' ? formData.product : 'General Enquiry');
    const directLinks = getDirectContactLinks(formData.phone);

    // If access key is available and configured
    if (FORM_CONFIG.accessKey && FORM_CONFIG.accessKey !== 'YOUR_ACCESS_KEY_HERE') {
      try {
        const payload = {
          access_key: FORM_CONFIG.accessKey,
          name: formData.name,
          "🏢 Company / Organization": formData.company || 'Not specified',
          email: formData.email,
          phone: formData.phone,
          "🌍 Country / Delivery Port": formData.country || 'Not specified',
          "📦 Target Quantity": formData.quantity,
          product: productName,
          message: formData.requirement || 'General RFQ inquiry / No extra message provided.',
          subject: `New B2B Bento Clay Tech RFQ: ${productName} (${formData.company || formData.name})`,
          from_name: 'Bento Clay Tech Web RFQ Desk'
        };

        if (directLinks.cleanPhone && directLinks.cleanPhone !== 'Not provided') {
          payload["📱 Client Mobile Number"] = formData.phone;
        }
        if (directLinks.callUrl) {
          payload["📞 Click to Call (Direct Dial)"] = directLinks.callUrl;
        }
        if (directLinks.whatsappUrl) {
          payload["💬 Click to WhatsApp (Direct Chat)"] = directLinks.whatsappUrl;
        }

        const response = await fetch(FORM_CONFIG.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.success) {
          setIsSubmitting(false);
          setSubmitted(true);

          // Track GA4 conversion event
          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', {
              event_category: 'Contact Form',
              event_label: `RFQ - ${productName}`,
              value: 1.0
            });
          }

          setFormData({
            name: '',
            company: '',
            email: '',
            phone: '',
            country: '',
            quantity: '1 x 20ft FCL (~20 MT)',
            product: 'Choose a product',
            requirement: '',
            bot_field: ''
          });
          return;
        }
      } catch (err) {
        console.warn('Web3Forms API request error, falling back:', err);
      }
    }

    // Fallback if key not set or network issue
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      triggerMailtoFallback(productName);
    }, 500);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <div>
            <span className="section-number">CONTACT BENTOCLAY</span>
            <h1>
              Let’s discuss your<br />
              <em>next requirement.</em>
            </h1>
            <p>
              Tell us about your application, required grade or quantity. As an attapulgite manufacturer in Bhavnagar, Gujarat and attapulgite supplier via Mundra Port, we provide rapid commercial terms for attapulgite FOB Mundra, CIF international destination ports, and domestic full-truckload dispatches.
            </p>

            <div className="hero-cta-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '16px 0 20px' }}>
              <a
                href={`https://wa.me/917435818628?text=${encodeURIComponent(
                  activeProductName
                    ? `Hello Bento Clay Tech, I would like to request export quotation and specifications for ${activeProductName}.`
                    : 'Hello Bento Clay Tech, I would like to request export quotation and specifications for attapulgite mineral grades.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                title="Direct WhatsApp chat with Bento Clay Tech commercial desk"
              >
                Instant WhatsApp Quote ↗
              </a>
              <a href="tel:+917435818628" className="btn btn-primary" title="Call Bento Clay Tech Bhavnagar Office">
                Direct Call: +91 74358 18628 ↗
              </a>
            </div>

            <div className="contact-image-card">
              <img
                src="/assets/contect.webp"
                alt="Bento Clay Tech Attapulgite Mineral Product Packaging and Export Logistics"
                className="contact-hero-img"
                loading="eager"
                decoding="async"
                width="1672"
                height="941"
              />
            </div>

            <div className="direct-details">
              <a href="mailto:dipak@bentoclay.com">
                <small>DIRECT SALES</small>dipak@bentoclay.com
              </a>
              <a href={`mailto:bentoclayclaytech@gmail.com?subject=${encodeURIComponent(activeProductName ? `Inquiry: ${activeProductName}` : 'Inquiry for Bento Clay Tech')}`}>
                <small>GENERAL EMAIL</small>bentoclayclaytech@gmail.com
              </a>
              <a href="tel:+917435818628">
                <small>PHONE / WHATSAPP</small>+91 74358 18628
              </a>
            </div>

            <div style={{ marginTop: '28px' }}>
              <small style={{ display: 'block', marginBottom: '14px', letterSpacing: '0.8px', fontSize: '11px', opacity: 0.6 }}>CONNECT WITH US</small>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://www.linkedin.com/in/bentoclayclaytech" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a
                  href={`https://wa.me/917435818628?text=${encodeURIComponent(
                    activeProductName
                      ? `Hello Bento Clay Tech, I am interested in ${activeProductName} and would like to request product details and pricing.`
                      : 'Hello Bento Clay Tech, I am interested in your mineral grades and would like to request product details and pricing.'
                  )}`}
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <form className="quote-form" onSubmit={handleSubmit} data-agent="commercial-rfq-form" aria-label="Commercial Quote Request Form">
            <div className="form-head">
              <span>REQUEST A QUOTE</span>
              <b>Usually responds directly</b>
            </div>

            {submitted && (
              <div className="form-success-banner" role="alert" aria-live="polite">
                ✓ Thank you! Your RFQ has been recorded. Our Bhavnagar export desk will connect with you within 24 hours.
              </div>
            )}

            {/* Hidden honeypot field for bot protection */}
            <input
              type="text"
              name="bot_field"
              id="rfq-bot-field"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
              style={{ display: 'none', position: 'absolute', left: '-9999px' }}
              value={formData.bot_field}
              onChange={handleChange}
            />

            <div className="form-row">
              <label htmlFor="rfq-name">
                Your name *
                <input
                  id="rfq-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Full name"
                  data-agent="contact-name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="rfq-company">
                Company / Organization *
                <input
                  id="rfq-company"
                  name="company"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="Company name"
                  data-agent="contact-company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-row">
              <label htmlFor="rfq-email">
                Business email *
                <input
                  id="rfq-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="procurement@company.com"
                  data-agent="contact-email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="rfq-phone">
                Phone / WhatsApp *
                <input
                  id="rfq-phone"
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="+Country Code & Number"
                  data-agent="contact-phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-row">
              <label htmlFor="rfq-country">
                Country / Destination Port *
                <input
                  id="rfq-country"
                  name="country"
                  type="text"
                  required
                  autoComplete="country-name"
                  placeholder="e.g. USA (Houston), UAE (Jebel Ali), India"
                  data-agent="delivery-destination"
                  value={formData.country}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="rfq-quantity">
                Target Order Quantity *
                <select
                  id="rfq-quantity"
                  name="quantity"
                  data-agent="target-quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                >
                  <option value="1 x 20ft FCL (~20 MT)">1 x 20ft FCL (~20 Metric Tons)</option>
                  <option value="25 kg Lab Evaluation Sample">25 kg Lab Evaluation Sample (with COA)</option>
                  <option value="2 MT Trial Batch">2 MT Trial Batch (Plant Evaluation)</option>
                  <option value="2 to 5 FCL Containers (40–100 MT)">2 to 5 FCL Containers (40–100 MT)</option>
                  <option value="100+ MT Bulk Supply">100+ MT Annual Supply Contract</option>
                  <option value="Custom Quantity">Custom Quantity / Project Requirement</option>
                </select>
              </label>
            </div>

            <label htmlFor="rfq-product">
              Mineral Grade Interest *
              <select
                id="rfq-product"
                name="product"
                data-agent="selected-product"
                value={formData.product}
                onChange={handleChange}
              >
                <option value="Choose a product">Choose a product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="rfq-requirement">
              Technical Specifications & Requirements
              <textarea
                id="rfq-requirement"
                name="requirement"
                rows="4"
                placeholder="Mention required viscosity (cps), mesh fineness, packaging preference (25 kg bags or 1 MT jumbo), or delivery timeline..."
                data-agent="technical-requirements"
                value={formData.requirement}
                onChange={handleChange}
              ></textarea>
            </label>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
              data-agent="submit-rfq-button"
            >
              {isSubmitting ? 'Sending Request...' : 'Submit Commercial RFQ'} <span>↗</span>
            </button>
          </form>
        </div>
      </section>

      {/* Related Products & Quick Navigation */}
      <section className="related-links-strip" style={{ background: '#fdfbf7', borderTop: '1px solid #ebdccb', borderBottom: '1px solid #ebdccb', padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>POPULAR ATTAPULGITE MINERAL GRADES</span>
            <Link to="/products" className="text-link" style={{ fontSize: '14px', fontWeight: 700 }}>Browse Complete Catalog (6 Grades) ↗</Link>
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

      <section className="contact-location">
        <div className="container">
          <span>MANUFACTURING WORKS</span>
          <address>
            L.S. 341/P-2, Behind Manpasand Dhaba,<br />
            Vallabhipur Highway, Kardej,<br />
            Bhavnagar – 364060, Gujarat, India
          </address>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Kardej+Bhavnagar+364060"
            target="_blank"
            rel="noopener noreferrer"
          >
            View location ↗
          </a>
        </div>
      </section>
    </main>
  );
}

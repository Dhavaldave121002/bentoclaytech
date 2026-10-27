import { Link } from 'react-router-dom';
import FaqAccordion from '../components/FaqAccordion';
import useScrollReveal from '../hooks/useScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';

export default function WhyUsPage() {
  useScrollReveal();

  return (
    <main>
      <section className="page-hero split-hero visual-split">
        <div className="container">
          <div>
            <span className="section-number">WHY BENTO CLAY TECH</span>
            <h1>
              Specification-led supply,<br />
              <em>not generic clay.</em>
            </h1>
            <p>
              Processing consists of drying and grinding crude clay to specific particle size distributions with specific ranges of gel viscosity, measured according to the end use.
            </p>
            <div className="inline-facts-grid">
              <Link to="/products" className="fact-badge-card" style={{ textDecoration: 'none', color: 'inherit' }} title="Explore all 6 attapulgite product grades">
                <div className="fact-num-val">
                  <AnimatedCounter target={6} />
                </div>
                <div className="fact-text-group">
                  <span className="fact-title">Standard Grades ↗</span>
                  <span className="fact-sub">Target-controlled attapulgite</span>
                </div>
              </Link>

              <div className="fact-badge-card">
                <div className="fact-num-val">
                  <AnimatedCounter target={25} suffix=" kg" />
                </div>
                <div className="fact-text-group">
                  <span className="fact-title">HDPE Packaging</span>
                  <span className="fact-sub">Moisture-barrier inner liner</span>
                </div>
              </div>
            </div>
          </div>
          <figure className="page-visual">
            <img
              src="/assets/why-quality-lab.webp"
              alt="Attapulgite quality control laboratory bench with viscometer and sample beakers"
            />
          </figure>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="reason-section">
        <div className="container reason-grid">
          <article className="reveal-on-scroll stagger-1">
            <b>01</b>
            <h3>Parameter-controlled</h3>
            <p>
              Grades are controlled on the value your process depends on: <Link to="/products/api-13a-section-12-attapulgite-powder" className="seo-keyword-link">600 rpm dial viscosity</Link>, wet mesh, <Link to="/products/premium-325-attapulgite-powder" className="seo-keyword-link">BET surface area</Link>, swelling index or oil absorption.
            </p>
          </article>
          <article className="reveal-on-scroll stagger-2">
            <b>02</b>
            <h3>Published data sheets</h3>
            <p>
              Requirements — and certified reported results where the data sheet provides them — are shown exactly as tested on daily production composite samples. Download official PDS on any <Link to="/products" className="seo-keyword-link">product grade page</Link>.
            </p>
          </article>
          <article className="reveal-on-scroll stagger-3">
            <b>03</b>
            <h3>Powder & granules</h3>
            <p>
              From <Link to="/products/premium-325-attapulgite-powder" className="seo-keyword-link">325 mesh (44 μm) micronised powders</Link> through to <Link to="/products/attapulgite-natural-granules-1-5mm" className="seo-keyword-link">1–5 mm porous absorbent granules</Link> produced from our high-purity Bhavnagar deposits.
            </p>
          </article>
          <article className="reveal-on-scroll stagger-4">
            <b>04</b>
            <h3>Export-ready packing</h3>
            <p>
              HDPE woven bags with extruded liners, unitized on ISPM-15 export pallets for global container shipment. Tailor container volumes via our <Link to="/customizer" className="seo-keyword-link">recipe customizer</Link>.
            </p>
          </article>
        </div>
      </section>

      {/* Quality Band */}
      <section className="quality-band">
        <div className="container quality-grid">
          <div>
            <span className="section-number">OUR LABORATORY STANDARDS</span>
            <h2>
              Measured parameters.<br />
              <span>Practical results.</span>
            </h2>
            <p className="quality-copy">
              Depending on grade, our published data sheets define moisture, pH, wet particle size, specific gravity, Fann suspension viscosity, Brookfield viscosity, swelling index, surface area (BET) and loss on ignition (LOI).
            </p>
          </div>
          <div className="quality-list">
            <p>
              <b>01</b>
              <span>Moisture and particle-size distribution control</span>
            </p>
            <p>
              <b>02</b>
              <span>Viscosity, shear thinning and suspension performance</span>
            </p>
            <p>
              <b>03</b>
              <span>Physical and chemical oxide test reporting</span>
            </p>
            <p>
              <b>04</b>
              <span>Protected 25 kg HDPE packaging with moisture barrier</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion limit={4} showFilter={false} showViewAllBtn={true} />

      <section className="page-cta">
        <div className="container">
          <div>
            <span>PUT OUR QUALITY TO WORK</span>
            <h2>Discuss your target specifications with our team.</h2>
          </div>
          <Link className="btn btn-white" to="/contact">
            Contact technical team <b>↗</b>
          </Link>
        </div>
      </section>
    </main>
  );
}

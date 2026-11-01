import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import FloatingActions from './components/FloatingActions';
import PageSEO from './components/PageSEO';
import { initGlobalAnalyticsListeners } from './utils/analytics';

const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const WhyUsPage = lazy(() => import('./pages/WhyUsPage'));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));

export default function App() {
  useEffect(() => {
    initGlobalAnalyticsListeners();
  }, []);

  return (
    <Router>
      <PageSEO />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/customize" element={<Navigate to="/products/premium-325-attapulgite-powder#customizer-section" replace />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingActions />
    </Router>
  );
}

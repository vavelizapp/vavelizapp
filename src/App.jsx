import { useState } from 'react';
import './App.css';

function App() {
  const [showFallbackModal, setShowFallbackModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Función híbrida: Intenta abrir el correo y muestra la alerta de respaldo
  const handleEmailTrigger = (e) => {
    e.preventDefault();
    // 1. Intenta abrir la app de correo del dispositivo
    window.location.href = "mailto:info@vaveliz.com?subject=Translation%20Request%20-%20USCIS";

    // 2. Muestra la ventana por si la PC del cliente ignoró la orden
    setShowFallbackModal(true);
    setCopied(false);
  };

  // Función para copiar el correo con un clic
  const copyToClipboard = () => {
    navigator.clipboard.writeText("info@vaveliz.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="top-header">
        <div className="header-grid">
          <div className="brand-lang-container">
            <a href="/" className="logo-link"></a>
            <div className="brand-text-block">
              <h1>VAVELIZ</h1>
              <span className="brand-tagline">Reliably Efficient</span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="contact-column contact-text">
            <p className="label">Official Translation Agency</p>
            <p className="label">🏛️ 319 Brookdale Dr., League City, TX, 77573</p>
            <p className="label">Business Hours: Monday - Friday, 8 a.m. - 6 p.m.</p>
            <p className="label">Online: 24/7</p>
          </div>
          <div className="contact-column">
            <p className="label">📞 Phone Number:</p>
            <p className="value">+1 (346) 810-3931</p>
            <p className="subtext">Send your documents to:</p>
            <span className="email">info@vaveliz.com</span>
            <button className="quote-button" onClick={handleEmailTrigger}>
              Send us an Email
            </button>
          </div>
        </div>

        <nav className="main-nav">
          <a href="#strengths">OUR STRENGTHS</a>
          <a href="#services">SERVICES</a>
          <a href="#contact">CONTACTS</a>
        </nav>
      </header>

      <main>
        {/* SECCIÓN: FORTALEZAS */}
        <section id="strengths">
          <h2 className="section-title">WHY CHOOSE VAVELIZ?</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏛️</div>
              <h3>USCIS Compliance</h3>
              <p>100% guaranteed acceptance for immigration processes, courts, and federal agencies. We follow all strict certification standards.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Fast Turnaround</h3>
              <p>We understand legal deadlines. Quick, reliable delivery without compromising the exactness of your legal documents.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔒</div>
              <h3>Strict Confidentiality</h3>
              <p>Your sensitive personal and legal data is handled with the highest level of security and privacy protocols.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: SERVICIOS */}
        <section id="services">
          <h2 className="section-title">SPECIALIZED TRANSLATION SERVICES</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">⚖️</div>
              <h3>Certified Translation</h3>
              <p>For USCIS, courts, and immigration processes with full legal validity across the United States.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3>Civil and Medical Documents</h3>
              <p>Precise translation of birth certificates, marriage licenses, divorce decrees, passports, and medical records.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Corporate Translation</h3>
              <p>Contracts, manuals, technical documents, and financial reports translated with exact legal terminology.</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer" id="contact">
        <div className="footer-grid">
          <div className="footer-col">
            <h1 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '24px' }}>VAVELIZ</h1>
            <p>Leaders in certified translation for immigration and legal compliance.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#strengths">Our Strengths</a></li>
              <li><a href="#services">Services</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>info@vaveliz.com</li>
              <li>+1 (346) 810-3931</li>
              <li>League City, TX</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{ textAlign: 'center', margin: '20px 0 0 0', fontSize: '12px', color: '#7f8c8d' }}>
          &copy; {new Date().getFullYear()} Smart Solutions. All rights reserved.
        </div>
      </footer>

      {/* VENTANA FLOTANTE HÍBRIDA (ALERTA DE RESPALDO) */}
      {showFallbackModal && (
        <div className="modal-overlay" onClick={() => setShowFallbackModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
            <button className="close-modal" onClick={() => setShowFallbackModal(false)}>✖</button>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✉️</div>
            <h3 style={{ color: '#117ee4', marginTop: 0 }}>Opening your email app...</h3>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '25px', lineHeight: '1.6' }}>
              If your email application didn't launch automatically, please copy our address below and send us your documents using your preferred webmail (Gmail, Yahoo, etc.).
            </p>

            <div className="copy-email-box">
              <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#2c3e50' }}>info@vaveliz.com</span>
              <button onClick={copyToClipboard} className={copied ? "btn-copied" : "btn-copy"}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
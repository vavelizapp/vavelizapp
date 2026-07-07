import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="top-header">
        <div className="header-grid">
          <div className="brand-lang-container">
            <a href="/" className="logo-link">
              {/* Logo gráfico eliminado, se mantiene solo texto */}
            </a>
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
            <a href="mailto:info@vaveliz.com" className="email">info@vaveliz.com</a>
            <a href="mailto:info@vaveliz.com" className="quote-button">Send us an Email</a>
          </div>
        </div>
        
        <nav className="main-nav">
          <a href="#strengths">OUR STRENGTHS</a>
          <a href="#services">SERVICES</a>
          <a href="#contact">CONTACTS</a>
        </nav>
      </header>
      
      <main>
        {/* NUEVA SECCIÓN: FORTALEZAS */}
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

        {/* SECCIÓN: SERVICIOS Y TARIFAS (Apostilla eliminada) */}
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
            <h1 style={{color: 'white', margin: '0 0 10px 0', fontSize: '24px'}}>VAVELIZ</h1>
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
              <li><a href="mailto:info@vaveliz.com">info@vaveliz.com</a></li>
              <li>+1 (346) 810-3931</li>
              <li>League City, TX</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#7f8c8d'}}>
          &copy; {new Date().getFullYear()} Smart Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
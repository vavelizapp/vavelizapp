import { useState } from 'react'
import './App.css'
import logoCube from './assets/vaveliz.png'
// import { supabase } from './supabaseClient' // Mantenido para futura integración del Status Tracker

function App() {
  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="top-header">
        <div className="header-grid">
          <div className="brand-lang-container">
            <a href="/" className="logo-link">
              <img src={logoCube} alt="Vaveliz" className="brand-logo" />
            </a>
            <div className="brand-text-block">
              <h1>VAVELIZ</h1>
              <span className="brand-tagline">RELIABLY EFFICIENT</span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="contact-column contact-text">
            <p className="label">Translation Agency</p>
            <p className="label">🏛️ 319 Brookdale Dr., League City, TX, 77573</p>
            <p className="label">Business Hours: Monday - Friday, 8 a.m. - 6 p.m.</p>
            <p className="label">Online: 24/7</p>
          </div>
          <div className="contact-column">
            <p className="label">📞 Phone Number:</p>
            <p className="value">+1 (346) 810-3931</p>
            <p className="subtext">Send your request to:</p>
            <a href="mailto:info@vaveliz.com" className="email">info@vaveliz.com</a>
            {/* Botón superior directo al correo */}
            <a href="mailto:info@vaveliz.com?subject=Quote%20Request&body=Please%20attach%20your%20documents%20here." className="quote-button" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center', boxSizing: 'border-box' }}>
              Send Documents
            </a>
          </div>
        </div>
        <nav className="main-nav">
          <a href="#agency">OUR AGENCY</a>
          <a href="#services">SERVICES</a>
          <a href="#how-it-works">HOW IT WORKS</a>
          <a href="#contact">CONTACTS</a>
        </nav>
      </header>
      
      <main>
        {/* SECTION 1: STRENGTHS & DIRECT EMAIL CONTACT */}
        <section id="agency" className="strengths-section">
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="subtitle" style={{ textAlign: 'center', marginBottom: '35px', color: '#444' }}>
            We specialize in certified translations tailored for immigration, legal, and corporate processes.
          </p>
          
          <div className="strengths-grid">
            <div className="strength-card">
              <div className="strength-icon">✅</div>
              <h3>100% USCIS Acceptance</h3>
              <p>Our translations strictly comply with all United States Citizenship and Immigration Services standards and requirements.</p>
            </div>
            <div className="strength-card">
              <div className="strength-icon">⚡</div>
              <h3>Fast & Reliable</h3>
              <p>Swift turnaround times to keep your immigration or business processes moving forward without unexpected delays.</p>
            </div>
            <div className="strength-card">
              <div className="strength-icon">🔒</div>
              <h3>Strict Confidentiality</h3>
              <p>Your sensitive personal and legal documents are protected and handled with the highest security standards.</p>
            </div>
          </div>

          <div className="mailto-container">
            <p>Ready to get your documents translated?</p>
            <a 
              href="mailto:info@vaveliz.com?subject=Translation%20Request&body=Hello,%0A%0APlease%20find%20my%20documents%20attached%20for%20translation.%0A%0AThank%20you." 
              className="btn-mailto"
            >
              ✉️ Click Here to Email Us Your Documents
            </a>
            <p className="formats-note">Simply attach your files (PDF, DOCX, JPG) directly in the email. We will review them and reply promptly with your details.</p>
          </div>
        </section>

        {/* SECTIONS 2 & 3: SERVICES AND TRACKER */}
        <section id="services">
          <h2 className="section-title">SPECIALIZED TRANSLATION SERVICES</h2>
          <div className="services-grid">
            <div className="service-card"><div className="service-icon">⚖️</div><h3>Certified Translation</h3><p>For USCIS, courts, and immigration processes with full legal validity.</p></div>
            <div className="service-card"><div className="service-icon">🏥</div><h3>Civil and Medical Documents</h3><p>Birth certificates, marriage, divorce, passports, and medical records.</p></div>
            <div className="service-card"><div className="service-icon">🏢</div><h3>Corporate Translation</h3><p>Contracts, manuals, technical documents, and financial reports for business expansion.</p></div>
            <div className="service-card"><div className="service-icon">📜</div><h3>Legalization and Apostille</h3><p>Complete management to ensure your documents are valid abroad.</p></div>
          </div>
        </section>

        <section id="how-it-works">
          <h2 className="section-title">STATUS TRACKER AND PROCESS</h2>
          <div className="tracker-container">
            {[ "Reception and Analysis", "Assignment", "Translation and Editing", "Audit and Certification", "Digital / Physical Delivery"].map((step, i) => (
              <div key={i} className="tracker-step">
                <div className="step-circle">{i + 1}</div>
                <div className="step-line"></div>
                <h4>{step}</h4>
                <p>Process details for step {i + 1}.</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col"><img src={logoCube} alt="Vaveliz Logo" className="footer-logo"/><p>Leaders in certified translation.</p></div>
          <div className="footer-col"><h4>Quick Links</h4><ul><li><a href="#services">Services</a></li></ul></div>
          <div className="footer-col"><h4>Legal</h4><ul><li><a href="#">Privacy</a></li></ul></div>
        </div>
      </footer>
    </div>
  )
}

export default App
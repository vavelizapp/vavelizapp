import { useState } from 'react'
import './App.css'
//import logoCube from './assets/vaveliz.png'
import { supabase } from './supabaseClient'

function App() {
  // States for the interactive estimator
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [files, setFiles] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  
  // Modals
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalOrder, setShowModalOrder] = useState(false);
  
  // Client form
  const [clientData, setClientData] = useState({
    name: '', email: '', countryCode: '+1', phone: ''
  });

  const CERTIFICATION_FEES = 25.00;

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        file: file, isOfficial: true, pages: 1, words: Math.max(250, Math.floor((file.size % 2000) + 500))
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      setResult(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file: file, isOfficial: true, pages: 1, words: Math.max(250, Math.floor((file.size % 2000) + 500))
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      setResult(null);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setResult(null);
  };

  const toggleOfficial = (index) => {
    const newFiles = [...files];
    newFiles[index].isOfficial = !newFiles[index].isOfficial;
    setFiles(newFiles);
    setResult(null);
  };

  const updatePages = (index, value) => {
    const newFiles = [...files];
    newFiles[index].pages = value < 1 ? 1 : value;
    setFiles(newFiles);
    setResult(null);
  };

  const calculateCost = () => {
    if (!sourceLanguage || !targetLanguage) {
      alert('Please select the source and target languages.');
      return;
    }
    if (files.length === 0) {
      alert('Please upload at least one document for estimation.');
      return;
    }
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      let totalTranslationCost = 0;
      let totalPages = 0;
      
      const documentBreakdown = files.map(obj => {
        totalPages += obj.pages;
        // Cost is now based on word count (0.08 per word)
        const docCost = obj.words * 0.08;
        totalTranslationCost += docCost;
        
        return {
          name: obj.file.name,
          words: obj.words,
          type: obj.isOfficial ? `Official (${obj.pages} pages)` : `General (${obj.pages} pages)`,
          cost: docCost.toFixed(2)
        };
      });

      const totalCertificationCost = CERTIFICATION_FEES * files.length;
      const totalEstimated = totalTranslationCost + totalCertificationCost;
      
      const now = new Date();
      const hour = now.getHours();
      let daysToAdd = (totalPages <= 6) ? 1 : ((hour >= 15) ? 3 : 2);
      const deliveryDate = new Date(now);
      deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
      if (deliveryDate.getDay() === 6) deliveryDate.setDate(deliveryDate.getDate() + 2);
      if (deliveryDate.getDay() === 0) deliveryDate.setDate(deliveryDate.getDate() + 1);
      
      setResult({
        breakdown: documentBreakdown,
        translationCost: totalTranslationCost.toFixed(2),
        certification: totalCertificationCost.toFixed(2),
        total: totalEstimated.toFixed(2),
        delivery: deliveryDate.toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        })
      });
      setAnalyzing(false);
    }, 1500);
  };

  const processOrder = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          first_name: clientData.name,
          phone_number: clientData.phone,
          country_code: clientData.countryCode
        },
      ]);
    if (error) {
      console.error("Error saving data:", error);
      alert("There was an issue processing your request. Please try again.");
    } else {
      const fullPhone = `${clientData.countryCode} ${clientData.phone}`;
      alert(`Thank you, ${clientData.name}!\nYour quote has been registered with phone number: ${fullPhone}.\nYour profile has been created for the Status Tracker.`);
      setShowModalOrder(false);
    }
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="top-header">
        <div className="header-grid">
          <div className="brand-lang-container">
            <a href="/" className="logo-link">
              {/*<img src={logoCube} alt="Vaveliz" className="brand-logo" />*/}
            </a>
            <div className="brand-text-block">
              <h1>Vaveliz</h1>
              <span className="brand-tagline">RELIABILITY EFFICIENCY</span>
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
            <button className="quote-button">Quote and Order.</button>
          </div>
        </div>
        <nav className="main-nav">
          <a href="#agency">OUR AGENCY</a>
          <a href="#services">SERVICES AND RATES</a>
          <a href="#how-it-works">HOW IT WORKS</a>
          <a href="#payment">PAYMENT AND DELIVERY</a>
          <a href="#contact">CONTACTS</a>
        </nav>
      </header>
      <main>
        {/* ==============================================
        SECTION 1: INTERACTIVE ESTIMATOR
        ============================================== */}
        <section className="cotizador-card" style={{ padding: '40px 25px' }}>
          <h2 style={{ textAlign: 'center', color: '#117ee4', fontSize: '24px', marginBottom: '10px' }}>Instant Quote</h2>
          <p className="subtitle">Upload your documents and get an exact quote in minutes.</p>
          <div className={`drop-zone ${files.length > 0 ? 'has-file' : ''}`} onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="drop-zone-content">
              <span className="upload-icon">📄</span>
              <p>Drag and drop your files here or
                <label className="file-label">
                  <input type="file" onChange={handleFileChange} accept=".pdf,.docx,.jpg,.jpeg,.png" multiple />
                  <span> Browse</span>
                </label>
              </p>
              <div className="info-banner-dropzone" onClick={() => setShowModalInfo(true)}>
                <span className="info-icon">ⓘ</span>
                <span>Delivery and Quality Terms</span>
              </div>
              <p className="formats-note">Accepted formats: PDF, DOCX, JPG (Minimum recommended resolution for USCIS: 300 dpi).</p>
            </div>
            {files.length > 0 && (
              <div className="file-list">
                {files.map((obj, index) => (
                  <div key={index} className="file-item-extended">
                    <div className="file-info-top">
                      <span className="file-name">📄 {obj.file.name}</span>
                      <button onClick={() => removeFile(index)} className="btn-remove-file">X</button>
                    </div>
                    <div className="file-options">
                      <label>
                        <input type="checkbox" checked={obj.isOfficial} onChange={() => toggleOfficial(index)} />
                        Official Document
                      </label>
                      <label>
                        Pages:
                        <input type="number" min="1" value={obj.pages} onChange={(e) => updatePages(index, parseInt(e.target.value) || 1)} className="page-input" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="selectors-container">
            <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)} className="lang-select">
              <option value="">Select Source Language</option>
              <option value="es">Spanish</option>
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
            <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} className="lang-select">
              <option value="">Select Target Language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
            <button onClick={calculateCost} className="btn-calcular" disabled={analyzing}>
              {analyzing ? 'Calculating...' : 'Calculate Cost'}
            </button>
          </div>
          {analyzing && (
            <div className="analizando-loader">
              <div className="spinner"></div>
              <p>Analyzing workload...</p>
            </div>
          )}
          {result && (
            <div className="resultado-cotizacion">
              <h3>Quote Summary</h3>
              <div className="desglose-documentos">
                <h4>Breakdown per file:</h4>
                {result.breakdown.map((item, index) => (
                  <div key={index} className="desglose-item">
                    <span className="doc-name">
                        📄 {item.name} <br/>
                        <small style={{color: '#777'}}>{item.type} | {item.words} words</small>
                    </span>
                    <span className="doc-price">${item.cost} USD</span>
                  </div>
                ))}
              </div>
              <div className="resultado-item">
                <span>Translation Subtotal:</span>
                <strong>${result.translationCost} USD</strong>
              </div>
              <div className="resultado-item">
                <span>Certification x {files.length} (USCIS):</span>
                <strong>${result.certification} USD</strong>
              </div>
              <div className="resultado-item total-row">
                <span>Total Estimated:</span>
                <strong className="total-price">${result.total} USD</strong>
              </div>
              <div className="entrega-nota">
                <span>📅 <strong>Estimated Delivery: {result.delivery}</strong></span>
              </div>
              <button className="btn-pedido" onClick={() => setShowModalOrder(true)}>
                Proceed with Order
              </button>
            </div>
          )}
        </section>
        {/* ==============================================
        SECTION 2: SERVICES
        ============================================== */}
        <section id="services">
          <h2 className="section-title">SPECIALIZED TRANSLATION SERVICES</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">⚖️</div>
              <h3>Certified Translation</h3>
              <p>For USCIS, courts, and immigration processes with full legal validity.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3>Civil and Medical Documents</h3>
              <p>Birth certificates, marriage, divorce, passports, and medical records.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Corporate Translation</h3>
              <p>Contracts, manuals, technical documents, and financial reports for business expansion.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📜</div>
              <h3>Legalization and Apostille</h3>
              <p>Complete management to ensure your documents are valid abroad.</p>
            </div>
          </div>
        </section>
        {/* ==============================================
        SECTION 3: TRACKER
        ============================================== */}
        <section id="how-it-works">
          <h2 className="section-title">STATUS TRACKER AND PROCESS</h2>
          <div className="tracker-container">
            <div className="tracker-step">
              <div className="step-circle">1</div>
              <div className="step-line"></div>
              <h4>Reception and Analysis</h4>
              <p>Document review and quality check at 300 dpi.</p>
            </div>
            <div className="tracker-step">
              <div className="step-circle">2</div>
              <div className="step-line"></div>
              <h4>Assignment</h4>
              <p>Selection of the ideal certified translator.</p>
            </div>
            <div className="tracker-step">
              <div className="step-circle">3</div>
              <div className="step-line"></div>
              <h4>Translation and Editing</h4>
              <p>Precise conversion of the original text.</p>
            </div>
            <div className="tracker-step">
              <div className="step-circle">4</div>
              <div className="step-line"></div>
              <h4>Audit and Certification</h4>
              <p>Final review and notary signature (USCIS).</p>
            </div>
            <div className="tracker-step">
              <div className="step-circle">5</div>
              <div className="step-line"></div>
              <h4>Digital / Physical Delivery</h4>
              <p>Secure shipment to the client.</p>
            </div>
          </div>
        </section>
      </main>
      {/* ==============================================
      DARK FOOTER
      ============================================== */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col">
            {/*<img src={logoCube} alt="Vaveliz Logo" className="footer-logo" />*/}
            <p>Leaders in certified translation with international standards. Reliability and efficiency guaranteed.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 Vaveliz Translation Agency. All rights reserved.
        </div>
      </footer>
      {/* ==============================================
      MODALS AND FLOATING FORMS
      ============================================== */}
      {showModalInfo && (
        <div className="modal-overlay" onClick={() => setShowModalInfo(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delivery and Quality Terms</h3>
            <ul className="modal-lista">
              <li><strong>Minimum Quality:</strong> Documents must be uploaded with a minimum resolution of 300 dpi to ensure certification and official acceptance for entities such as USCIS.</li>
              <li><strong>24-Hour Delivery:</strong> Automatically applies for orders (short or long) with a total of 6 pages or fewer.</li>
              <li><strong>Standard Delivery:</strong> If the total exceeds 6 pages, the delivery time is 2 to 3 business days.</li>
            </ul>
            <button className="quote-button" onClick={() => setShowModalInfo(false)}>Understood</button>
          </div>
        </div>
      )}
      {showModalOrder && (
        <div className="modal-overlay" onClick={() => setShowModalOrder(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Finalize Order and Create Account</h3>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px' }}>
              Please provide your contact details. This information will allow us to generate your profile so you can track the progress of your translation in the Status Tracker.
            </p>
            <form className="form-pedido" onSubmit={processOrder}>
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={clientData.name}
                  onChange={e => setClientData({...clientData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email Address:</label>
                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  value={clientData.email}
                  onChange={e => setClientData({...clientData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone / WhatsApp:</label>
                <div className="phone-input-group">
                  <input
                    type="text"
                    className="country-code-input"
                    required
                    placeholder="+1"
                    title="Country Code"
                    value={clientData.countryCode}
                    onChange={e => setClientData({...clientData, countryCode: e.target.value})}
                  />
                  <input
                    type="tel"
                    className="phone-number-input"
                    required
                    placeholder="346 810 3931"
                    title="Phone Number"
                    value={clientData.phone}
                    onChange={e => setClientData({...clientData, phone: e.target.value})}
                  />
                </div>
                <span className="whatsapp-note">We recommend using your WhatsApp number for your convenience.</span>
              </div>
              <button type="submit" className="btn-pedido" style={{ marginTop: '10px' }}>
                Confirm Quote and Subscribe
              </button>
              <button type="button" className="btn-cancelar" onClick={() => setShowModalOrder(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default App
import { useState } from 'react'
import './App.css'
import logoCube from './assets/vaveliz.png'
import banner1 from './assets/banner1.png'
import banner2 from './assets/banner2.png'
import banner3 from './assets/banner3.png'
import banner4 from './assets/banner4.png'

function App() {
  // Estados para el cotizador interactivo
  const [idiomaOrigen, setIdiomaOrigen] = useState('');
  const [idiomaDestino, setIdiomaDestino] = useState('');
  const [archivos, setArchivos] = useState([]);
  const [analizando, setAnalizando] = useState(false);
  const [resultado, setResultado] = useState(null);
  
  // Modales
  const [mostrarModalInfo, setMostrarModalInfo] = useState(false);
  const [mostrarModalPedido, setMostrarModalPedido] = useState(false);
  
  // Formulario cliente
  const [datosCliente, setDatosCliente] = useState({
    nombre: '', correo: '', codigoPais: '+1', telefono: ''
  });

  const PRECIO_FIJO_PAGINA = 30.00;
  const GASTOS_CERTIFICACION = 25.00;

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const nuevos = Array.from(e.dataTransfer.files).map(file => ({
        file: file, esOficial: true, paginas: 1
      }));
      setArchivos((prev) => [...prev, ...nuevos]);
      setResultado(null);
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const nuevos = Array.from(e.target.files).map(file => ({
        file: file, esOficial: true, paginas: 1
      }));
      setArchivos((prev) => [...prev, ...nuevos]);
      setResultado(null);
    }
  };

  const eliminarArchivo = (index) => {
    const nuevos = archivos.filter((_, i) => i !== index);
    setArchivos(nuevos);
    setResultado(null);
  };

  const toggleOficial = (index) => {
    const nuevos = [...archivos];
    nuevos[index].esOficial = !nuevos[index].esOficial;
    setArchivos(nuevos);
    setResultado(null);
  };

  const actualizarPaginas = (index, valor) => {
    const nuevos = [...archivos];
    nuevos[index].paginas = valor < 1 ? 1 : valor;
    setArchivos(nuevos);
    setResultado(null);
  };

  const calcularCosto = () => {
    if (!idiomaOrigen || !idiomaDestino) {
      alert('Por favor, selecciona los idiomas de origen y destino.');
      return;
    }
    if (archivos.length === 0) {
      alert('Por favor, sube al menos un documento para cotizar.');
      return;
    }

    setAnalizando(true);
    setResultado(null);

    setTimeout(() => {
      let costoTraduccionTotal = 0;
      let totalPaginas = 0;
      
      const desgloseDocumentos = archivos.map(obj => {
        let costoDoc = 0;
        totalPaginas += obj.paginas;

        if (obj.esOficial) {
          costoDoc = obj.paginas * PRECIO_FIJO_PAGINA;
        } else {
          const simulatedWords = Math.max(250, Math.floor((obj.file.size % 2000) + 500));
          costoDoc = simulatedWords * 0.08; 
        }
        
        costoTraduccionTotal += costoDoc;
        
        return { 
          nombre: obj.file.name, 
          tipo: obj.esOficial ? `Oficial (${obj.paginas} pág.)` : `Extenso (${obj.paginas} pág.)`,
          costo: costoDoc.toFixed(2)
        };
      });
      
      const costoCertificacionTotal = GASTOS_CERTIFICACION * archivos.length;
      const totalEstimado = costoTraduccionTotal + costoCertificacionTotal;

      const now = new Date();
      const hour = now.getHours();
      let diasASumar = (totalPaginas <= 6) ? 1 : ((hour >= 15) ? 3 : 2);
      
      const fechaEntrega = new Date(now);
      fechaEntrega.setDate(fechaEntrega.getDate() + diasASumar);
      
      if (fechaEntrega.getDay() === 6) fechaEntrega.setDate(fechaEntrega.getDate() + 2);
      if (fechaEntrega.getDay() === 0) fechaEntrega.setDate(fechaEntrega.getDate() + 1);

      setResultado({
        desglose: desgloseDocumentos,
        costoTraduccion: costoTraduccionTotal.toFixed(2),
        certificacion: costoCertificacionTotal.toFixed(2),
        total: totalEstimado.toFixed(2),
        entrega: fechaEntrega.toLocaleDateString('es-ES', { 
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        })
      });
      setAnalizando(false);
    }, 1500);
  };

  const procesarPedido = (e) => {
    e.preventDefault();
    const telefonoCompleto = `${datosCliente.codigoPais} ${datosCliente.telefono}`;
    alert(`¡Gracias, ${datosCliente.nombre}!\nTu cotización ha sido registrada con el número: ${telefonoCompleto}.\nSe ha creado tu perfil para el Rastreador de Estatus.`);
    setMostrarModalPedido(false);
  };

  return (
    <div className="app-container">
      {/* CABECERA */}
      <header className="top-header">
        <div className="header-grid">
          <div className="brand-lang-container">
            <div className="language-selector">
              <button className="lang-btn active">ES</button>
              <span className="separator">|</span>
              <button className="lang-btn">EN</button>
            </div>
            <a href="/" className="logo-link">
              <img src={logoCube} alt="Vaveliz" className="brand-logo" />
            </a>
            <div className="brand-text-block">
              <h1>VAVELIZ</h1>
              <span className="brand-tagline">RELIABILITY EFFICIENCY</span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="contact-column contact-text">
            <p className="label">Translation Agency</p>
            <p className="label">🏛️ 319 Brookdale Dr., League City, Tx, 77573</p>
            <p className="label">Horario: Lunes - Viernes, 8 a.m. - 6 p.m.</p>
            <p className="label">En linea: 24/7</p>
          </div>
          <div className="contact-column">
            <p className="label">📞 Número de Telefono:</p>
            <p className="value">+1 (346) 810-3931</p>
            <p className="subtext">Envía tu solicitud a:</p>
            <a href="mailto:info@vaveliz.com" className="email">info@vaveliz.com</a>
            <button className="quote-button">Cotización y Pedido.</button>
          </div>
        </div>
        <nav className="main-nav">
          <a href="#agencia">NUESTRA AGENCIA</a>
          <a href="#servicios">SERVICIOS Y TARIFAS</a>
          <a href="#como-funciona">CÓMO FUNCIONA</a>
          <a href="#pago">PAGO Y ENTREGA</a>
          <a href="#contacto">CONTACTOS</a>
        </nav>
      </header>
      
      {/* BANNERS */}
      <section className="hero-slider">
        <div className="slides">
          <div className="slide"><img src={banner1} alt="Banner 1" /></div>
          <div className="slide"><img src={banner2} alt="Banner 2" /></div>
        </div>
      </section>
      
      <main>
        {/* ==============================================
            SECCIÓN 1: COTIZADOR INTERACTIVO 
            ============================================== */}
        <section className="cotizador-card" style={{ padding: '40px 25px' }}>
          <h2 style={{ textAlign: 'center', color: '#117ee4', fontSize: '24px', marginBottom: '10px' }}>Cotización Inmediata</h2>
          <p className="subtitle">Sube tus documentos y obtén un presupuesto exacto en minutos.</p>

          <div className={`drop-zone ${archivos.length > 0 ? 'has-file' : ''}`} onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="drop-zone-content">
              <span className="upload-icon">📄</span>
              <p>Arrastra tus archivos aquí o 
                <label className="file-label">
                  <input type="file" onChange={handleFileChange} accept=".pdf,.docx,.jpg,.jpeg,.png" multiple />
                  <span> Examinar</span>
                </label>
              </p>
              
              <div className="info-banner-dropzone" onClick={() => setMostrarModalInfo(true)}>
                <span className="info-icon">ⓘ</span>
                <span>Condiciones de Entrega y Calidad</span>
              </div>
              
              <p className="formats-note">Formatos aceptados: PDF, DOCX, JPG (Resolución mínima recomendada para USCIS: 300 dpi).</p>
            </div>
            
            {archivos.length > 0 && (
              <div className="file-list">
                {archivos.map((obj, index) => (
                  <div key={index} className="file-item-extended">
                    <div className="file-info-top">
                      <span className="file-name">📄 {obj.file.name}</span>
                      <button onClick={() => eliminarArchivo(index)} className="btn-remove-file">X</button>
                    </div>
                    <div className="file-options">
                      <label>
                        <input type="checkbox" checked={obj.esOficial} onChange={() => toggleOficial(index)} />
                        Documento Oficial (Acta, Pasaporte, ID)
                      </label>
                      <label>
                        Páginas: 
                        <input type="number" min="1" value={obj.paginas} onChange={(e) => actualizarPaginas(index, parseInt(e.target.value) || 1)} className="page-input" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="selectors-container">
            <select value={idiomaOrigen} onChange={(e) => setIdiomaOrigen(e.target.value)} className="lang-select">
              <option value="">Selecciona Idioma de Origen</option>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
              <option value="fr">Francés</option>
            </select>
            <select value={idiomaDestino} onChange={(e) => setIdiomaDestino(e.target.value)} className="lang-select">
              <option value="">Selecciona Idioma de Destino</option>
              <option value="en">Inglés</option>
              <option value="es">Español</option>
              <option value="fr">Francés</option>
            </select>
            <button onClick={calcularCosto} className="btn-calcular" disabled={analizando}>
              {analizando ? 'Calculando...' : 'Calcular Costo'}
            </button>
          </div>

          {analizando && (
            <div className="analizando-loader">
              <div className="spinner"></div>
              <p>Analizando carga de trabajo...</p>
            </div>
          )}

          {resultado && (
            <div className="resultado-cotizacion">
              <h3>Resumen del Presupuesto</h3>
              
              <div className="desglose-documentos">
                <h4>Desglose por archivo:</h4>
                {resultado.desglose.map((item, index) => (
                  <div key={index} className="desglose-item">
                    <span className="doc-name">📄 {item.nombre} <br/><small style={{color: '#777'}}>{item.tipo}</small></span>
                    <span className="doc-price">${item.costo} USD</span>
                  </div>
                ))}
              </div>

              <div className="resultado-item">
                <span>Subtotal Traducción:</span>
                <strong>${resultado.costoTraduccion} USD</strong>
              </div>
              <div className="resultado-item">
                <span>Certificación x {archivos.length} (USCIS):</span>
                <strong>${resultado.certificacion} USD</strong>
              </div>
              <div className="resultado-item total-row">
                <span>Total Estimado:</span>
                <strong className="total-price">${resultado.total} USD</strong>
              </div>
              
              <div className="entrega-nota">
                <span>📅 <strong>Entrega estimada: {resultado.entrega}</strong></span>
              </div>

              <button className="btn-pedido" onClick={() => setMostrarModalPedido(true)}>
                Proceder con el Pedido
              </button>
            </div>
          )}
        </section>

        {/* ==============================================
            SECCIÓN 2: SERVICIOS (COMO EN LA IMAGEN 2)
            ============================================== */}
        <section id="servicios">
          <h2 className="section-title">SERVICIOS DE TRADUCCIÓN ESPECIALIZADA</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">⚖️</div>
              <h3>Traducción Certificada</h3>
              <p>Para USCIS, tribunales y trámites migratorios con total validez legal y notariada.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3>Documentos Civiles y Médicos</h3>
              <p>Actas de nacimiento, matrimonio, divorcio, pasaportes, y expedientes clínicos.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Traducción Corporativa</h3>
              <p>Contratos, manuales, técnicos y balances financieros para expansión empresarial.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📜</div>
              <h3>Legalización y Apostilla</h3>
              <p>Gestión completa para que tus documentos sean válidos en el extranjero.</p>
            </div>
          </div>
        </section>

        {/* ==============================================
            SECCIÓN 3: RASTREADOR (COMO EN LA IMAGEN 2)
            ============================================== */}
        <section id="como-funciona">
          <h2 className="section-title">RASTREADOR DE ESTATUS Y PROCESO</h2>
          <div className="tracker-container">
            <div className="tracker-step">
              <div className="step-circle">1</div>
              <div className="step-line"></div>
              <h4>Recepción y Análisis</h4>
              <p>Revisión de documentos y calidad a 300 dpi.</p>
            </div>
            <div className="tracker-step">
              <div className="step-circle">2</div>
              <div className="step-line"></div>
              <h4>Asignación</h4>
              <p>Selección del traductor certificado ideal.</p>
            </div>
            <div className="tracker-step">
              <div className="step-circle">3</div>
              <div className="step-line"></div>
              <h4>Traducción y Edición</h4>
              <p>Conversión precisa del texto original.</p>
            </div>
            <div className="tracker-step">
              <div className="step-circle">4</div>
              <div className="step-line"></div>
              <h4>Auditoría y Certificación</h4>
              <p>Revisión final y firma notarial (USCIS).</p>
            </div>
            <div className="tracker-step">
              <div className="step-circle">5</div>
              <h4>Entrega Digital / Física</h4>
              <p>Envío seguro al cliente.</p>
            </div>
          </div>
        </section>
      </main>

      {/* ==============================================
          PIE DE PÁGINA OSCURO (FOOTER)
          ============================================== */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <img src={logoCube} alt="Vaveliz Logo" className="footer-logo" />
            <p>Líderes en traducción certificada con estándares internacionales. Confiabilidad y eficiencia garantizada.</p>
          </div>
          <div className="footer-col">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#como-funciona">Cómo funciona</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Términos de Servicio</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 Vaveliz Translation Agency. Todos los derechos reservados.
        </div>
      </footer>

      {/* ==============================================
          MODALES Y FORMULARIOS FLOTANTES
          ============================================== */}
      {mostrarModalInfo && (
        <div className="modal-overlay" onClick={() => setMostrarModalInfo(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Condiciones de Entrega y Calidad</h3>
            <ul className="modal-lista">
              <li><strong>Calidad Mínima:</strong> Los documentos deben subirse con una resolución mínima de 300 dpi para garantizar su certificación y aceptación oficial ante entidades como USCIS.</li>
              <li><strong>Entregas en 24 Horas:</strong> Aplica automáticamente para pedidos (cortos o largos) cuya suma total no supere las 6 páginas.</li>
              <li><strong>Entregas Regulares:</strong> Si la suma supera las 6 páginas, el tiempo de entrega será de 2 a 3 días hábiles.</li>
            </ul>
            <button className="quote-button" onClick={() => setMostrarModalInfo(false)}>Entendido</button>
          </div>
        </div>
      )}

      {mostrarModalPedido && (
        <div className="modal-overlay" onClick={() => setMostrarModalPedido(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Finalizar Pedido y Crear Cuenta</h3>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px' }}>
              Por favor, completa tus datos de contacto. Esta información nos permitirá generar tu perfil para que puedas visualizar el progreso de tu traducción en el Rastreador de Estatus.
            </p>
            
            <form className="form-pedido" onSubmit={procesarPedido}>
              <div className="form-group">
                <label>Nombre Completo:</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ej. Juan Pérez"
                  value={datosCliente.nombre} 
                  onChange={e => setDatosCliente({...datosCliente, nombre: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Correo Electrónico:</label>
                <input 
                  type="email" 
                  required 
                  placeholder="ejemplo@correo.com"
                  value={datosCliente.correo} 
                  onChange={e => setDatosCliente({...datosCliente, correo: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Teléfono / WhatsApp:</label>
                <div className="phone-input-group">
                  <input 
                    type="text" 
                    className="country-code-input"
                    required
                    placeholder="+1"
                    title="Código de país"
                    value={datosCliente.codigoPais} 
                    onChange={e => setDatosCliente({...datosCliente, codigoPais: e.target.value})} 
                  />
                  <input 
                    type="tel" 
                    className="phone-number-input"
                    required 
                    placeholder="346 810 3931"
                    title="Número de teléfono"
                    value={datosCliente.telefono} 
                    onChange={e => setDatosCliente({...datosCliente, telefono: e.target.value})} 
                  />
                </div>
                <span className="whatsapp-note">Recomendamos usar tu número de WhatsApp para tu comodidad.</span>
              </div>
              
              <button type="submit" className="btn-pedido" style={{ marginTop: '10px' }}>
                Confirmar Cotización y Suscribirse
              </button>
              <button type="button" className="btn-cancelar" onClick={() => setMostrarModalPedido(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default App
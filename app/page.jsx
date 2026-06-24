"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ShinyButton } from '../components/ui/shiny-button';
import { BeamsBackground } from '../components/ui/beams-background';
import { ComingSoonModal } from '../components/ui/coming-soon-modal';
import { LanguageSwitcher } from '../components/ui/language-switcher';
import { translations } from '../lib/translations';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef();
  const [lang, setLang] = useState('pt');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalState, setModalState] = useState({ open: false, type: 'passageiro' });
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    carModel: '',
    availability: '',
    howDidYouKnow: ''
  });

  const t = translations[lang];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, whatsapp, carModel, availability, howDidYouKnow } = formData;
    const text = `${t.waFormText}%0A%0A*${t.waFormName}* ${name}%0A*${t.waFormWa}* ${whatsapp}%0A*${t.waFormCar}* ${carModel}%0A*${t.waFormAvail}* ${availability}%0A*${t.waFormHow}* ${howDidYouKnow}`;
    window.open(`https://wa.me/5512988973901?text=${text}`, '_blank');
  };

  useGSAP(() => {
    gsap.utils.toArray('.gsap-fade-up').forEach((elem) => {
      gsap.fromTo(elem, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: elem, start: 'top 85%' }
      });
    });
  }, { scope: container });

  const handleMouseMove3D = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    gsap.to(target, { rotateX, rotateY, transformPerspective: 1000, ease: "power2.out", duration: 0.4 });
  };

  const handleMouseLeave3D = (e) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, ease: "power2.out", duration: 0.6 });
  };

  const handleEmBreve = (e, type = 'passageiro') => {
    e.preventDefault();
    setModalState({ open: true, type });
  };

  return (
    <div ref={container} style={{ overflowX: 'hidden' }}>

      <ComingSoonModal
        isOpen={modalState.open}
        type={modalState.type}
        lang={lang}
        translations={t}
        onClose={() => setModalState({ open: false, type: modalState.type })}
      />

      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="site-header">
        <div className="container header-inner" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <nav className="desktop-nav">
            <a href="#formulario" className="nav-link">{t.navDriver}</a>
            <a href="#" onClick={(e) => handleEmBreve(e, 'passageiro')} className="nav-link">{t.navPassenger}</a>
            <a href="#" onClick={(e) => handleEmBreve(e, 'empresa')} className="nav-link">{t.navCompany}</a>
            <a
              href="#manifesto"
              className="badge-em-breve"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              {t.navBadge}
            </a>
          </nav>

          <Link href="/" className="logo-link logo-header-link">
            <img src="/images/uba_logo_new.png" alt="UBA APP" style={{ height: '60px', objectFit: 'contain' }} />
          </Link>

          <div className="header-right">
            <div className="lang-switcher-wrapper">
              <LanguageSwitcher lang={lang} onSwitch={setLang} />
            </div>
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════ MOBILE MENU ═══════════════ */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-badge">
            <span>{t.mobileBadge}</span>
          </div>
          <nav>
            <a href="#formulario" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>{t.navDriver}</a>
            <a href="#" className="mobile-link" onClick={(e) => { setIsMobileMenuOpen(false); handleEmBreve(e, 'passageiro'); }}>{t.navPassenger}</a>
            <a href="#" className="mobile-link" onClick={(e) => { setIsMobileMenuOpen(false); handleEmBreve(e, 'empresa'); }}>{t.navCompany}</a>
          </nav>
        </div>
      )}

      {/* ═══════════════ HERO BEAMS ═══════════════ */}
      <BeamsBackground className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {t.heroLine1}<br />
            <span className="accent-line" style={{ display: 'block' }}>{t.heroLine2}</span>
          </h1>
          <div className="hero-apps">
            <p className="hero-apps-label">{t.heroStoreLabel}</p>
            <div className="hero-store-buttons">
              <img src="/images/4-google.png-BkyOWf3u.webp" alt="Google Play" className="store-img" style={{ height: '45px', width: 'auto' }} />
              <img src="/images/5-apple.png-BOo2m4m-.webp" alt="App Store" className="store-img" style={{ height: '45px', width: 'auto' }} />
            </div>
          </div>
        </div>
      </BeamsBackground>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title gsap-fade-up">
            {t.statsTitle.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </h2>
          <p className="section-subtitle gsap-fade-up">{t.statsSubtitle}</p>
          <div className="stats-grid gsap-fade-up">
            {[
              { value: '100%', label: t.statLabels[0] },
              { value: 'R$0', label: t.statLabels[1] }
            ].map((stat, i) => (
              <div key={i} className="stat-card" onMouseMove={handleMouseMove3D} onMouseLeave={handleMouseLeave3D}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ MANIFESTO ═══════════════ */}
      <BeamsBackground id="manifesto" className="manifesto-section" intensity="medium">
        <div className="container manifesto-content">
          <h2 className="manifesto-title gsap-fade-up">
            {t.manifestoTitle1}<br />
            {t.manifestoTitle2}<br />
            {t.manifestoTitle3}
          </h2>
          <div className="manifesto-box gsap-fade-up">
            <p style={{ marginBottom: '20px' }}>
              <strong>{t.manifestoP1}</strong><br />
              {t.manifestoP2}<br />
              {t.manifestoP3}
            </p>
            <p className="highlight-text">{t.manifestoHighlight}</p>
            <p style={{ marginBottom: '20px' }}>
              <strong>{t.manifestoP4}</strong>
            </p>
            <p>{t.manifestoP5}</p>
          </div>
          <p className="manifesto-cta-text">{t.manifestoCta}</p>
          <ShinyButton
            className="btn-cta"
            onClick={() => document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' })}
          >
            {t.btnFounder}
          </ShinyButton>
        </div>
      </BeamsBackground>

      {/* ═══════════════ NOVIDADE NA CIDADE ═══════════════ */}
      <section className="novidade-section">
        <div className="container novidade-content">
          <p className="novidade-text">
            {t.novidadeLine1}<br />
            <span className="blue">{t.novidadeLine2}</span>
          </p>
        </div>
      </section>

      {/* ═══════════════ DRIVER FORM ═══════════════ */}
      <section id="formulario" className="form-section">
        <div className="container form-wrapper">
          <div className="form-text gsap-fade-up">
            <h2>
              {t.formTitle1}<br />{t.formTitle2}<br />
              <span className="accent">{t.formTitle3}</span>
            </h2>
            <p>{t.formDesc}</p>
            <div className="benefits-list">
              {t.benefits.map((benefit, i) => (
                <div key={i} className="benefit-item">
                  <div className="benefit-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="form-card gsap-fade-up" onMouseMove={handleMouseMove3D} onMouseLeave={handleMouseLeave3D}>
            <p className="form-card-title">{t.formCardTitle}</p>
            <p className="form-card-sub">{t.formCardSub}</p>
            <form onSubmit={handleSubmit} className="form-group">
              <input type="text" name="name" value={formData.name} placeholder={t.placeholderName} required onChange={handleChange} className="form-input" />
              <input type="text" name="whatsapp" value={formData.whatsapp} placeholder={t.placeholderWhatsapp} required onChange={handleChange} className="form-input" />
              <input type="text" name="carModel" value={formData.carModel} placeholder={t.placeholderCar} required onChange={handleChange} className="form-input" />

              <select name="availability" value={formData.availability} required onChange={handleChange} className={`form-select ${!formData.availability ? 'placeholder' : ''}`}>
                <option value="" disabled>{t.placeholderAvailability}</option>
                {t.availabilityOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>

              <select name="howDidYouKnow" value={formData.howDidYouKnow} required onChange={handleChange} className={`form-select ${!formData.howDidYouKnow ? 'placeholder' : ''}`}>
                <option value="" disabled>{t.placeholderHow}</option>
                {t.howOptions.map((opt, i) => (
                  <option key={i} value={t.howValues[i]}>{opt}</option>
                ))}
              </select>

              <ShinyButton className="btn-submit">{t.btnSubmit}</ShinyButton>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════ DEADLINE / PARCEIRO FUNDADOR ═══════════════ */}
      <section className="deadline-section">
        <div className="deadline-bg" style={{ backgroundImage: 'url("/images/deadline_bg.jpg")' }} />
        <div className="deadline-overlay" />
        <div className="container deadline-content">
          <div className="deadline-box gsap-fade-up">
            <h3>{t.deadlineText} <strong style={{ color: '#2774ae' }}>07/07/2026</strong></h3>
            <p>{t.deadlineAfter}</p>
            <div style={{ margin: '32px 0', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(39,116,174,0.5), transparent)' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {t.deadlineUrgency}
            </div>
            <ShinyButton
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ width: '100%', maxWidth: '450px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: '800', letterSpacing: '1px', padding: '4px 0', width: '100%' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span style={{ whiteSpace: 'normal', lineHeight: '1.2' }}>{t.btnFounder}</span>
              </div>
            </ShinyButton>
          </div>
        </div>
      </section>

      {/* ═══════════════ DIFFERENTIALS ═══════════════ */}
      <section className="diff-section">
        <div className="container">
          <h2 className="section-title">{t.diffTitle}</h2>
          <p className="section-subtitle">{t.diffSubtitle}</p>
          <div className="diff-grid">
            {t.diffs.map((diff, i) => (
              <div key={i} className="diff-card gsap-fade-up" onMouseMove={handleMouseMove3D} onMouseLeave={handleMouseLeave3D}>
                <h3>{diff.title}</h3>
                <p>{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/images/uba_logo_new.png" alt="UBA APP" style={{ height: '60px', objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: '24px' }} />
              <p>{t.footerBrandDesc}</p>
              <div className="social-links">
                <a href="https://www.instagram.com/UBA_APP" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://wa.me/5512988973901" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>

              <div className="footer-lang-switcher">
                <span style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '1px', fontWeight: '700', marginBottom: '8px' }}>
                  {t.footerLangTitle}
                </span>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <LanguageSwitcher lang={lang} onSwitch={setLang} variant="footer" />
                </div>
              </div>
            </div>

            <div className="footer-col">
              <h4>{t.footerMenu}</h4>
              <ul className="footer-links-list">
                <li><a href="#formulario">{t.navDriver}</a></li>
                <li><a href="#" onClick={(e) => handleEmBreve(e, 'passageiro')}>{t.navPassenger}</a></li>
                <li><a href="#" onClick={(e) => handleEmBreve(e, 'empresa')}>{t.navCompany}</a></li>
              </ul>
            </div>

            <div className="footer-apps">
              <h4>{t.footerDownload}</h4>
              <div className="footer-store-badges">
                <img src="/images/4-google.png-BkyOWf3u.webp" alt="Google Play Store" />
                <img src="/images/5-apple.png-BOo2m4m-.webp" alt="Apple App Store" />
              </div>
              <ShinyButton className="wa-btn" onClick={() => window.open('https://wa.me/5512988973901', '_blank')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {t.footerSupport}
                </div>
              </ShinyButton>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{t.footerCopyright}</p>
          </div>
        </div>
      </footer>

      {/* ═══════════════ WHATSAPP FLUTUANTE ═══════════════ */}
      <a
        href={`https://wa.me/5512988973901?text=${encodeURIComponent(t.waText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Fale conosco no WhatsApp"
      >
        <span className="whatsapp-float__tooltip">{t.waTooltip}</span>
        <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

    </div>
  );
}

"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ShinyButton } from '../components/ui/shiny-button';
import { BeamsBackground } from '../components/ui/beams-background';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    carModel: '',
    availability: '',
    howDidYouKnow: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, whatsapp, carModel, availability, howDidYouKnow } = formData;
    const text = `Olá, quero ser motorista parceiro do UBA APP!%0A%0A*Nome:* ${name}%0A*WhatsApp:* ${whatsapp}%0A*Modelo do Carro:* ${carModel}%0A*Disponibilidade:* ${availability}%0A*Como conheceu:* ${howDidYouKnow}`;
    window.open(`https://wa.me/5512999999999?text=${text}`, '_blank');
  };

  useGSAP(() => {
    // ScrollTrigger fade up
    gsap.utils.toArray('.gsap-fade-up').forEach((elem) => {
      gsap.fromTo(elem, {
        y: 60,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
        }
      });
    });

    // Advanced GSAP Particles
    const particles = gsap.utils.toArray('.advanced-particle');
    particles.forEach(p => {
      gsap.set(p, {
        x: () => Math.random() * window.innerWidth,
        y: () => Math.random() * window.innerHeight,
        opacity: () => Math.random() * 0.5 + 0.1
      });
      gsap.to(p, {
        x: () => `+=${Math.random() * 200 - 100}`,
        y: () => `+=${Math.random() * 200 - 100}`,
        duration: () => Math.random() * 5 + 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
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
    
    gsap.to(target, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleMouseLeave3D = (e) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, ease: "power2.out", duration: 0.6 });
  };

  const handleEmBreve = (e) => {
    e.preventDefault();
    alert("Lançamento em breve em todas as plataformas");
  };

  return (
    <div ref={container} style={{ overflowX: 'hidden' }}>

      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="site-header">
        <div className="container header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Link href="/" className="logo-link">
              <img src="/images/uba_logo.png" alt="UBA APP" style={{ height: '60px', objectFit: 'contain' }} />
            </Link>

            <nav className="desktop-nav">
              <a href="#formulario" className="nav-link">Motorista</a>
              <a href="#" onClick={handleEmBreve} className="nav-link">Passageiro</a>
              <a href="#" onClick={handleEmBreve} className="nav-link">Empresa</a>
            </nav>
          </div>

          <div className="header-right">
            <a 
              href="#manifesto" 
              className="badge-em-breve"
              onClick={(e) => { 
                e.preventDefault(); 
                document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' }); 
              }}
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              Em breve em Ubatuba
            </a>
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
            <span>Em breve em Ubatuba</span>
          </div>
          <nav>
            <a href="#formulario" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Motorista</a>
            <a href="#" className="mobile-link" onClick={(e) => { setIsMobileMenuOpen(false); handleEmBreve(e); }}>Passageiro</a>
            <a href="#" className="mobile-link" onClick={(e) => { setIsMobileMenuOpen(false); handleEmBreve(e); }}>Empresa</a>
          </nav>
        </div>
      )}

      {/* ═══════════════ HERO BEAMS ═══════════════ */}
      <BeamsBackground className="hero-section">
        <div className="hero-content">

          <h1 className="hero-title">
            Sou de Ubatuba.<br />
            <span className="accent-line" style={{ display: 'block' }}>Vou de UBA.</span>
          </h1>


          <div className="hero-apps">
            <p className="hero-apps-label">Em breve na Google Play e App Store</p>
            <div className="hero-store-buttons">
              <img
                src="/images/4-google.png-BkyOWf3u.webp"
                alt="Google Play"
                className="store-img"
              />
              <img
                src="/images/5-apple.png-BOo2m4m-.webp"
                alt="App Store"
                className="store-img"
              />
            </div>
          </div>
        </div>
      </BeamsBackground>



      {/* ═══════════════ STATS ═══════════════ */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title gsap-fade-up">
            O UBA APP É UBATUBA<br />SE MOVENDO
          </h2>
          <p className="section-subtitle gsap-fade-up">
            O app de mobilidade feito por quem é de Ubatuba, para quem vive e visita a cidade.
          </p>

          <div className="stats-grid gsap-fade-up">
            {[
              { value: '100%', label: 'Local' },
              { value: 'R$0', label: 'Taxa de Adesão' }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="stat-card"
                onMouseMove={handleMouseMove3D}
                onMouseLeave={handleMouseLeave3D}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════════ MANIFESTO ═══════════════ */}
      <section id="manifesto" className="manifesto-section">

        <div className="container manifesto-content">
          <h2 className="manifesto-title gsap-fade-up">
            Taxa justa.<br />
            App local.<br />
            Ubatuba.
          </h2>

          <div className="manifesto-box gsap-fade-up">
            <p style={{ marginBottom: '20px' }}>
              <strong>A Uber leva até 27% da sua corrida.</strong><br />
              A 99 fica com uma fatia do seu suor.<br />
              E quando você tem um problema, cai numa fila de robô que não resolve nada.
            </p>
            <p className="highlight-text">
              Você virou funcionário de uma empresa que não te chama de funcionário.
            </p>
            <p style={{ marginBottom: '20px' }}>
              <strong>O UBA APP chegou pra mudar isso.</strong>
            </p>
            <p>
              Somos o app de Ubatuba, feito por quem conhece cada rua dessa cidade.
              Aqui você fica com mais do que ganha, fala com gente de verdade quando
              precisa de suporte e trabalha no seu horário. Sem escala, sem chefe, sem taxa abusiva.
            </p>
          </div>

          <p className="manifesto-cta-text">
            Os primeiros motoristas têm condições exclusivas que não voltam mais.
          </p>

          <ShinyButton 
            className="btn-cta" 
            onClick={() => document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' })}
          >
            Quero ser parceiro fundador
          </ShinyButton>
        </div>
      </section>

      {/* ═══════════════ NOVIDADE NA CIDADE ═══════════════ */}
      <section className="novidade-section">
        <div className="container novidade-content">
          <p className="novidade-text">
            Aonde você for,<br />
            <span className="blue">vá de UBA.</span>
          </p>

        </div>
      </section>

      {/* ═══════════════ DRIVER FORM ═══════════════ */}
      <section id="formulario" className="form-section">
        <div className="container form-wrapper">
          <div className="form-text gsap-fade-up">
            <h2>
              SEJA UM<br />MOTORISTA<br />
              <span className="accent">PARCEIRO</span>
            </h2>
            <p>
              Ganhe uma renda extra com horários flexíveis, recebendo pagamentos na sua carteira digital e com suporte 24 horas.
            </p>
            <div className="benefits-list">
              {[
                'Cadastro gratuito — R$0 de adesão',
                'Você decide seus horários',
                'Suporte humano 24h via WhatsApp',
                'Pagamento rápido e transparente',
                'Exclusividade para os primeiros'
              ].map((benefit, i) => (
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

          <div 
            className="form-card gsap-fade-up"
            onMouseMove={handleMouseMove3D}
            onMouseLeave={handleMouseLeave3D}
          >
            <p className="form-card-title">Cadastro de Motorista</p>
            <p className="form-card-sub">Preencha seus dados e entre em contato direto pelo WhatsApp</p>

            <form onSubmit={handleSubmit} className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Seu Nome Completo"
                required
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                placeholder="Seu WhatsApp (ex: 12 99999-9999)"
                required
                onChange={handleChange}
                className="form-input"
              />

              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                placeholder="Modelo e Ano do Carro"
                required
                onChange={handleChange}
                className="form-input"
              />

              <select
                name="availability"
                value={formData.availability}
                required
                onChange={handleChange}
                className={`form-select ${!formData.availability ? 'placeholder' : ''}`}
              >
                <option value="" disabled>Sua Disponibilidade</option>
                <option value="Integral">Integral</option>
                <option value="Meio Período">Meio Período</option>
                <option value="Apenas Finais de Semana">Apenas Finais de Semana</option>
                <option value="Temporada/Alta Temporada">Temporada / Alta Temporada</option>
              </select>

              <select
                name="howDidYouKnow"
                value={formData.howDidYouKnow}
                required
                onChange={handleChange}
                className={`form-select ${!formData.howDidYouKnow ? 'placeholder' : ''}`}
              >
                <option value="" disabled>Como ficou sabendo do UBA APP?</option>
                <option value="Instagram/Facebook">Instagram / Facebook</option>
                <option value="Indicação">Indicação de amigo</option>
                <option value="Rua/Panfleto">Rua / Panfleto</option>
                <option value="TikTok">TikTok</option>
                <option value="Outros">Outros</option>
              </select>

              <ShinyButton className="btn-submit">
                Quero ser motorista parceiro
              </ShinyButton>
            </form>
          </div>
        </div>
      </section>
      {/* ═══════════════ DEADLINE / PARCEIRO FUNDADOR ═══════════════ */}
      <section className="deadline-section">
        <div
          className="deadline-bg"
          style={{ backgroundImage: 'url("/images/deadline_bg.jpg")' }}
        />
        <div className="deadline-overlay" />
        
        <div className="container deadline-content">
          <div className="deadline-box gsap-fade-up">
            <h3>Inscrições de parceiro fundador encerram em <strong className="accent-line">04/07/2026</strong></h3>
            <p>Depois disso, as condições exclusivas não estarão mais disponíveis e novas inscrições entram na fila padrão.</p>
          </div>
        </div>
      </section>


      {/* ═══════════════ DIFFERENTIALS ═══════════════ */}
      <section className="diff-section">
        <div className="container">
          <h2 className="section-title">Por que dirigir com o UBA APP?</h2>
          <p className="section-subtitle">
            Porque você merece uma plataforma que trabalha pra você, não contra você.
          </p>

          <div className="diff-grid">
            {[
              {
                title: 'O dinheiro é seu. Todo ele.',
                desc: 'Chega de ver 27% da sua corrida ir pro bolso de quem não dirigiu um segundo sequer. No UBA APP a taxa é justa, transparente e você sabe exatamente o que recebe antes de aceitar qualquer corrida.'
              },
              {
                title: 'Seu horário. Sua vida.',
                desc: 'Segunda de manhã, sábado à noite, feriado na praia ou nenhum desses. Você ativa o app quando quer e desativa quando precisa. Sem meta mínima, sem punição por ficar offline.'
              },
              {
                title: 'Corrida perto, lucro maior.',
                desc: 'Ubatuba tem alta temporada, turistas chegando o ano todo e moradores que precisam se locomover todo dia. Você trabalha pertinho de casa, gasta menos gasolina e lucra mais por hora rodada.'
              },
              {
                title: 'Problema? Tem gente aqui.',
                desc: 'Nada de abrir ticket, esperar 3 dias e receber resposta de robô. No UBA APP você fala com a equipe local que conhece você pelo nome e resolve na hora.'
              }
            ].map((diff, i) => (
              <div 
                key={i} 
                className="diff-card gsap-fade-up"
                onMouseMove={handleMouseMove3D}
                onMouseLeave={handleMouseLeave3D}
              >
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
            {/* Brand */}
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/images/uba_logo.png" alt="UBA APP" style={{ height: '60px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
              <p>O app de mobilidade feito para Ubatuba. Segurança, preço justo e respeito por quem vive e visita a cidade.</p>
              <div className="social-links">
                <a href="https://www.instagram.com/UBA_APP" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://wa.me/5512999999999" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Menu */}
            <div className="footer-col">
              <h4>Menu</h4>
              <ul className="footer-links-list">
                <li><a href="#formulario">Motorista</a></li>
                <li><a href="#" onClick={handleEmBreve}>Passageiro</a></li>
                <li><a href="#" onClick={handleEmBreve}>Empresa</a></li>
              </ul>
            </div>

            {/* App Download */}
            <div className="footer-apps">
              <h4>Baixe o App (Em breve)</h4>
              <div className="footer-store-badges">
                <img src="/images/4-google.png-BkyOWf3u.webp" alt="Google Play Store" />
                <img src="/images/5-apple.png-BOo2m4m-.webp" alt="Apple App Store" />
              </div>
              <ShinyButton 
                className="wa-btn" 
                onClick={() => window.open('https://wa.me/5512999999999', '_blank')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Suporte WhatsApp
                </div>
              </ShinyButton>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 UBA APP TECNOLOGIA LTDA. Ubatuba — SP. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

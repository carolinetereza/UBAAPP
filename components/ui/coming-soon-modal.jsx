"use client";

import { useEffect, useRef } from "react";

export function ComingSoonModal({ isOpen, onClose, type = "passageiro" }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  const isPassageiro = type === "passageiro";

  const config = {
    passageiro: {
      icon: (
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      ),
      tag: "Passageiro",
      title: "Em breve para toda Ubatuba",
      benefits: [
        { text: "Preço justo, sem taxas abusivas" },
        { text: "Motoristas verificados e seguros" },
        { text: "Feito para as ruas de Ubatuba" },
      ],
    },
    empresa: {
      icon: (
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          <line x1="12" y1="12" x2="12" y2="16"/>
          <line x1="10" y1="14" x2="14" y2="14"/>
        </svg>
      ),
      tag: "Empresas",
      title: "Em breve para toda Ubatuba",
      benefits: [
        { text: "Relatórios e controle de despesas" },
        { text: "Conta corporativa com suporte dedicado" },
        { text: "Pensado para o mercado de Ubatuba" },
      ],
    },
  };

  const c = config[isPassageiro ? "passageiro" : "empresa"];

  return (
    <>
      <style>{`
        @property --cs-border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes cs-border-spin {
          to { --cs-border-angle: 360deg; }
        }
        @keyframes cs-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cs-slide-up {
          from { opacity: 0; transform: translateY(36px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cs-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.65); opacity: 0; }
        }

        .cs-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          animation: cs-fade-in 0.2s ease forwards;
        }

        .cs-card {
          position: relative;
          background:
            linear-gradient(#000000, #000000) padding-box,
            conic-gradient(from var(--cs-border-angle), rgba(255,255,255,0.08) 75%, #1e90ff 88%, #8484ff 96%, rgba(255,255,255,0.08) 100%) border-box;
          border: 1px solid transparent;
          border-radius: 20px;
          padding: 44px 40px 36px;
          max-width: 460px;
          width: 100%;
          text-align: center;
          box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(30,144,255,0.08);
          animation: cs-slide-up 0.35s cubic-bezier(0.34,1.4,0.64,1) forwards,
                     cs-border-spin 4s linear infinite;
        }

        .cs-close {
          position: absolute; top: 14px; right: 14px;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.45);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; z-index: 1;
        }
        .cs-close:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
          transform: scale(1.1);
        }

        .cs-icon-wrap {
          position: relative;
          width: 80px; height: 80px; border-radius: 50%;
          background: rgba(30, 144, 255, 0.08);
          border: 1px solid rgba(30, 144, 255, 0.3);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 22px;
          color: #1e90ff;
        }
        .cs-icon-wrap .cs-ring {
          position: absolute; inset: -10px; border-radius: 50%;
          border: 1.5px solid rgba(30, 144, 255, 0.35);
          animation: cs-pulse-ring 2.2s ease-out infinite;
        }
        .cs-icon-wrap .cs-ring2 { animation-delay: 0.8s; }

        .cs-tag {
          display: inline-block;
          background: rgba(30, 144, 255, 0.1);
          border: 1px solid rgba(30, 144, 255, 0.3);
          color: #60a5fa;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 100px;
          margin-bottom: 18px;
        }

        .cs-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 14px;
        }

        .cs-desc {
          font-size: 0.93rem;
          color: #cbd5e1;
          line-height: 1.75;
          margin: 0 0 26px;
        }

        .cs-benefits {
          display: flex; flex-direction: column; gap: 8px;
          margin-bottom: 28px; text-align: left;
        }
        .cs-benefit {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 10px 14px;
          font-size: 0.87rem; color: rgba(255,255,255,0.65);
          font-weight: 500;
        }
        .cs-benefit-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #1e90ff; flex-shrink: 0;
        }

        .cs-cta {
          width: 100%;
          background: linear-gradient(135deg, #1e90ff 0%, #1565c0 100%);
          color: #fff;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 14px 24px;
          border-radius: 12px;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          transition: all 0.25s;
          box-shadow: 0 6px 24px rgba(30,144,255,0.3);
          margin-bottom: 10px;
        }
        .cs-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(30,144,255,0.45);
        }
        .cs-cta:active { transform: translateY(0); }

        .cs-insta {
          width: 100%;
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-size: 0.87rem;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          transition: all 0.25s;
          text-decoration: none;
        }
        .cs-insta:hover {
          border-color: rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.04);
        }

        @media (max-width: 480px) {
          .cs-card { padding: 36px 22px 30px; }
          .cs-title { font-size: 1.4rem; }
        }
      `}</style>

      <div
        className="cs-overlay"
        ref={overlayRef}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        role="dialog"
        aria-modal="true"
        aria-label={`${c.tag} — Em breve`}
      >
        <div className="cs-card">
          <button className="cs-close" onClick={onClose} aria-label="Fechar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="cs-icon-wrap">
            <span className="cs-ring"/>
            <span className="cs-ring cs-ring2"/>
            {c.icon}
          </div>

          <div className="cs-tag">{c.tag}</div>
          <h2 className="cs-title">{c.title}</h2>

          <div className="cs-benefits">
            {c.benefits.map((b, i) => (
              <div key={i} className="cs-benefit">
                <span className="cs-benefit-dot"/>
                <span>{b.text}</span>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <button
            className="cs-cta"
            onClick={() => {
              window.open('https://wa.me/5512988973901?text=Olá! Tenho interesse no UBA APP. Quando vai lançar?', '_blank');
              onClose();
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Me avise quando lançar
          </button>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/UBA_APP"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-insta"
            onClick={onClose}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Siga-nos no Instagram
          </a>
        </div>
      </div>
    </>
  );
}

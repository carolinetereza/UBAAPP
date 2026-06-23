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
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      ),
      tag: "Passageiro",
      title: "Chegando em breve",
      subtitle: "para toda Ubatuba",
      desc: "O app UBA para passageiros está em fase final. Viagens seguras, preço justo e suporte de verdade — feito para quem vive ou visita Ubatuba.",
      benefits: [
        { icon: "💰", text: "Preço justo, sem taxas abusivas" },
        { icon: "🛡️", text: "Motoristas verificados e seguros" },
        { icon: "📍", text: "Feito para as ruas de Ubatuba" },
      ],
    },
    empresa: {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          <line x1="12" y1="12" x2="12" y2="16"/>
          <line x1="10" y1="14" x2="14" y2="14"/>
        </svg>
      ),
      tag: "Empresas",
      title: "Chegando em breve",
      subtitle: "para toda Ubatuba",
      desc: "Mobilidade corporativa local, sem complicação. Gerencie corridas da sua equipe com relatórios, rotas e tarifas especiais para empresas de Ubatuba.",
      benefits: [
        { icon: "📊", text: "Relatórios e controle de despesas" },
        { icon: "🤝", text: "Conta corporativa com suporte dedicado" },
        { icon: "🏙️", text: "Pensado para o mercado de Ubatuba" },
      ],
    },
  };

  const c = config[isPassageiro ? "passageiro" : "empresa"];

  return (
    <>
      <style>{`
        @keyframes modal-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modal-slide-up {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes count-down {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: 283; }
        }
        .cs-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          background: rgba(3, 8, 20, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          animation: modal-fade-in 0.25s ease forwards;
        }
        .cs-card {
          position: relative;
          background: linear-gradient(135deg, #0d1b35 0%, #071124 100%);
          border: 1px solid rgba(39, 116, 174, 0.35);
          border-radius: 24px;
          padding: 48px 40px 40px;
          max-width: 480px;
          width: 100%;
          text-align: center;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(39,116,174,0.15), inset 0 1px 0 rgba(255,255,255,0.05);
          animation: modal-slide-up 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;
          overflow: hidden;
        }
        .cs-card::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 250px; height: 250px;
          background: radial-gradient(circle, rgba(39,116,174,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .cs-card::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(0,46,93,0.3) 0%, transparent 70%);
          pointer-events: none;
        }
        .cs-close {
          position: absolute; top: 16px; right: 16px;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; z-index: 1;
        }
        .cs-close:hover { background: rgba(255,255,255,0.12); color: #fff; transform: scale(1.1); }
        .cs-icon-wrap {
          position: relative;
          width: 88px; height: 88px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(39,116,174,0.25), rgba(0,46,93,0.4));
          border: 1px solid rgba(39,116,174,0.4);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
          color: #2774ae;
        }
        .cs-icon-wrap .ring {
          position: absolute; inset: -8px; border-radius: 50%;
          border: 2px solid rgba(39,116,174,0.4);
          animation: pulse-ring 2s ease-out infinite;
        }
        .cs-icon-wrap .ring2 {
          animation-delay: 0.7s;
        }
        .cs-tag {
          display: inline-block;
          background: linear-gradient(135deg, rgba(39,116,174,0.2), rgba(0,46,93,0.3));
          border: 1px solid rgba(39,116,174,0.4);
          color: #5b9fd4;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .cs-title { font-size: 2rem; font-weight: 800; color: #fff; line-height: 1.1; margin: 0 0 4px; }
        .cs-subtitle { font-size: 2rem; font-weight: 800; line-height: 1.1; margin: 0 0 16px;
          background: linear-gradient(135deg, #2774ae, #5b9fd4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .cs-desc { font-size: 0.95rem; color: rgba(255,255,255,0.55); line-height: 1.7; margin: 0 0 28px; }
        .cs-benefits { display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; text-align: left; }
        .cs-benefit {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 10px 14px;
          font-size: 0.88rem; color: rgba(255,255,255,0.7);
          font-weight: 500;
        }
        .cs-benefit span:first-child { font-size: 1.2rem; flex-shrink: 0; }
        .cs-cta {
          width: 100%;
          background: linear-gradient(135deg, #2774ae, #1a5a8a);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 15px 24px;
          border-radius: 14px;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.25s;
          box-shadow: 0 8px 24px rgba(39,116,174,0.35);
          letter-spacing: 0.3px;
        }
        .cs-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(39,116,174,0.5); }
        .cs-cta:active { transform: translateY(0); }
        .cs-note { font-size: 0.75rem; color: rgba(255,255,255,0.3); margin-top: 14px; }

        @media (max-width: 480px) {
          .cs-card { padding: 36px 24px 32px; border-radius: 20px; }
          .cs-title, .cs-subtitle { font-size: 1.6rem; }
        }
      `}</style>

      <div
        className="cs-overlay"
        ref={overlayRef}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        role="dialog"
        aria-modal="true"
        aria-label={`${c.tag} - Em breve`}
      >
        <div className="cs-card">
          <button className="cs-close" onClick={onClose} aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="cs-icon-wrap">
            <span className="ring"/>
            <span className="ring ring2"/>
            {c.icon}
          </div>

          <div className="cs-tag">{c.tag}</div>
          <h2 className="cs-title">{c.title}</h2>
          <p className="cs-subtitle">{c.subtitle}</p>
          <p className="cs-desc">{c.desc}</p>

          <div className="cs-benefits">
            {c.benefits.map((b, i) => (
              <div key={i} className="cs-benefit">
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>

          <button
            className="cs-cta"
            onClick={() => {
              window.open('https://wa.me/5512988973901?text=Olá! Tenho interesse no UBA APP. Quando vai lançar?', '_blank');
              onClose();
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Me avise quando lançar
          </button>
          <p className="cs-note">Você será redirecionado ao WhatsApp 💙</p>
        </div>
      </div>
    </>
  );
}

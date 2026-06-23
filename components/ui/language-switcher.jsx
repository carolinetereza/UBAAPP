"use client";

import { useState } from "react";

const FLAG_BR = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
    <rect width="22" height="16" rx="2" fill="#009C3B"/>
    <polygon points="11,2 20,8 11,14 2,8" fill="#FEDF00"/>
    <circle cx="11" cy="8" r="3.2" fill="#002776"/>
    <path d="M7.9 8.6 Q11 6.5 14.1 8.6" stroke="white" strokeWidth="0.7" fill="none"/>
  </svg>
);

const FLAG_AR = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
    <rect width="22" height="16" rx="2" fill="#74ACDF"/>
    <rect y="5.33" width="22" height="5.33" fill="white"/>
    <circle cx="11" cy="8" r="1.6" fill="#F6B40E"/>
  </svg>
);

const FLAG_UK = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
    <rect width="22" height="16" rx="2" fill="#012169"/>
    {/* White diagonals */}
    <line x1="0" y1="0" x2="22" y2="16" stroke="white" strokeWidth="3.2"/>
    <line x1="22" y1="0" x2="0" y2="16" stroke="white" strokeWidth="3.2"/>
    {/* Red diagonals */}
    <line x1="0" y1="0" x2="22" y2="16" stroke="#C8102E" strokeWidth="1.8"/>
    <line x1="22" y1="0" x2="0" y2="16" stroke="#C8102E" strokeWidth="1.8"/>
    {/* White cross */}
    <rect x="9" y="0" width="4" height="16" fill="white"/>
    <rect x="0" y="6" width="22" height="4" fill="white"/>
    {/* Red cross */}
    <rect x="9.8" y="0" width="2.4" height="16" fill="#C8102E"/>
    <rect x="0" y="6.8" width="22" height="2.4" fill="#C8102E"/>
  </svg>
);

export function LanguageSwitcher({ lang, onSwitch }) {
  const [open, setOpen] = useState(false);

  const options = [
    { code: 'pt', label: 'PT', Flag: FLAG_BR, name: 'Português' },
    { code: 'es', label: 'ES', Flag: FLAG_AR, name: 'Español' },
    { code: 'en', label: 'EN', Flag: FLAG_UK, name: 'English' },
  ];

  const current = options.find(o => o.code === lang);

  return (
    <>
      <style>{`
        .lang-switcher { position: relative; display: inline-flex; align-items: center; }
        .lang-btn {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14);
          border-radius: 8px; padding: 5px 10px; cursor: pointer;
          color: rgba(255,255,255,0.85); font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.5px; transition: all 0.2s; white-space: nowrap;
        }
        .lang-btn:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.28); }
        .lang-chevron { transition: transform 0.2s; opacity: 0.6; }
        .lang-chevron.open { transform: rotate(180deg); }
        .lang-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #0d1b35; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5); z-index: 9999; min-width: 130px;
          animation: lang-drop 0.18s ease forwards;
        }
        @keyframes lang-drop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lang-option {
          display: flex; align-items: center; gap: 8px; padding: 10px 14px;
          cursor: pointer; font-size: 0.82rem; font-weight: 600;
          color: rgba(255,255,255,0.75); transition: background 0.15s, color 0.15s; white-space: nowrap;
        }
        .lang-option:hover { background: rgba(39,116,174,0.18); color: #fff; }
        .lang-option.active { color: #2774ae; background: rgba(39,116,174,0.1); }
      `}</style>

      <div className="lang-switcher">
        <button className="lang-btn" onClick={() => setOpen(!open)} aria-label="Switch language">
          {current && <current.Flag />}
          {current?.label}
          <svg className={`lang-chevron${open ? ' open' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {open && (
          <div className="lang-dropdown">
            {options.map(({ code, label, Flag, name }) => (
              <div
                key={code}
                className={`lang-option${lang === code ? ' active' : ''}`}
                onClick={() => { onSwitch(code); setOpen(false); }}
              >
                <Flag />
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

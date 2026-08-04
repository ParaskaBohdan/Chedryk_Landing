import React, { useEffect, useId } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calculator, Cpu, Zap, Phone, ArrowRight } from 'lucide-react';
import SolarPanelCard from '../components/SolarPanelCard';
import { LiveBadge, TelemetryChip } from '../components/SolarTech';
import { SectionAmbience, RegistrationMarks, BusbarDivider } from '../components/SolarDetails';

/* A broken conductor: the string runs from the array and stops dead before the
   inverter, with the break marked. Reuses the site's flow-diagram language so
   the error page reads as part of the same system rather than a stock 404. */
function BrokenLineScene({ theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const metal = isDark ? '#94a3b8' : '#64748b';
  const dead = isDark ? 'rgba(148,163,184,0.28)' : 'rgba(100,116,139,0.26)';

  return (
    <svg
      viewBox="0 0 420 120"
      className="w-full h-auto max-w-lg mx-auto"
      role="img"
      aria-label="Обрив лінії: маршрут не знайдено"
    >
      <defs>
        <linearGradient id={`nf-live-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Array — still generating */}
      <g>
        <path
          d="M22 76 L46 44 L92 44 L68 76 Z"
          fill={isDark ? '#0b2545' : '#1c4e80'}
          stroke={metal}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <line x1="38" y1="76" x2="62" y2="44" stroke="rgba(148,197,255,0.4)" strokeWidth="1" />
        <line x1="52" y1="76" x2="76" y2="44" stroke="rgba(148,197,255,0.4)" strokeWidth="1" />
      </g>

      {/* Live segment up to the break */}
      <line x1="96" y1="60" x2="176" y2="60" stroke={dead} strokeWidth="2" strokeLinecap="round" />
      <line
        x1="96"
        y1="60"
        x2="176"
        y2="60"
        stroke={`url(#nf-live-${uid})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        className="energy-flow"
      />

      {/* The break */}
      <g>
        <path d="M176 60 L190 48 L198 66 L212 54" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="194" cy="60" r="20" fill="#f87171" opacity="0.12" className="solar-flare" />
      </g>

      {/* Dead segment onward */}
      <line x1="216" y1="60" x2="308" y2="60" stroke={dead} strokeWidth="2" strokeLinecap="round" strokeDasharray="5 6" />

      {/* Inverter — offline */}
      <g opacity="0.55">
        <rect x="308" y="42" width="44" height="36" rx="7" fill={isDark ? '#16243c' : '#f1f5f9'} stroke={metal} strokeWidth="2" />
        <rect x="316" y="49" width="28" height="12" rx="2.5" fill={isDark ? '#08182c' : '#0b2545'} />
        <circle cx="322" cy="69" r="2.5" fill={isDark ? '#334155' : '#cbd5e1'} />
        <circle cx="331" cy="69" r="2.5" fill={isDark ? '#334155' : '#cbd5e1'} />
      </g>

      {/* Grid — unreachable */}
      <g opacity="0.4" stroke={metal} strokeWidth="2" fill="none" strokeLinejoin="round">
        <path d="M372 80 L390 34 L408 80" />
        <line x1="380" y1="58" x2="400" y2="58" />
      </g>

      <text x="194" y="96" textAnchor="middle" fontSize="12" fontFamily="ui-monospace, monospace" letterSpacing="1" fill="#f87171">
        NO ROUTE
      </text>
    </svg>
  );
}

export default function NotFoundPage({ theme }) {
  const isDark = theme === 'dark';
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const destinations = [
    { to: '/', icon: Home, label: 'Головна', desc: 'Послуги та переваги' },
    { to: '/calculator', icon: Calculator, label: 'Калькулятор', desc: 'Розрахунок вартості СЕС' },
    { to: '/equipment', icon: Cpu, label: 'Обладнання', desc: 'Панелі, інвертори, АКБ' },
    { to: '/tariffs', icon: Zap, label: 'Зелений тариф', desc: 'Документи та Обленерго' }
  ];

  return (
    <div
      className={`py-16 sm:py-24 min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/70 text-slate-900'
      }`}
    >
      <SectionAmbience variant="c" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-8 relative z-10">
        {/*<div className="flex justify-center">
          <LiveBadge theme={theme} label="Signal Lost · 404" tone="amber" />
        </div>*/}

        <div className="space-y-3">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-solar-gradient">404</h1>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            <span className="heading-rule">Такої сторінки не існує</span>
          </h2>
          <p className={`text-sm sm:text-lg pt-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Схоже, лінія обірвалась. Можливо, адресу введено з помилкою або сторінку було переміщено.
          </p>
        </div>

        <SolarPanelCard theme={theme} glow className="p-6 sm:p-8" contentClassName="space-y-6">
          <RegistrationMarks />

          <BrokenLineScene theme={theme} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <TelemetryChip theme={theme} label="Запитаний маршрут" value={pathname} />
            <TelemetryChip theme={theme} label="Статус" value="404 · Not Found" />
          </div>

          <BusbarDivider />

          <div>
            <p className={`text-[10px] font-bold telemetry-label mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Доступні напрямки
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {destinations.map((d) => {
                const Icon = d.icon;
                return (
                  <Link
                    key={d.to}
                    to={d.to}
                    className={`group flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isDark
                        ? 'border-slate-700 bg-slate-900/50 hover:border-amber-400/60'
                        : 'border-slate-200 bg-white hover:border-amber-400'
                    }`}
                  >
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center border border-amber-400/40 bg-amber-500/15 text-amber-500 flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {d.label}
                      </span>
                      <span className={`block text-[11px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {d.desc}
                      </span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </SolarPanelCard>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <Link
            to="/"
            className="btn-orange-bright px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg glow-amber"
          >
            <Home className="w-4 h-4" />
            <span>На головну</span>
          </Link>
          <Link
            to="/contacts"
            className={`px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center gap-2 ${
              isDark
                ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Phone className="w-4 h-4 text-amber-500" />
            <span>Зв'язатися з нами</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

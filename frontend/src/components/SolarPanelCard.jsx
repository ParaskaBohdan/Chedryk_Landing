import React, { useCallback, useRef } from 'react';

/**
 * Container styled as a photovoltaic module: silicon cell grid, anodised
 * metallic frame, mounting bolts and a light sweep on hover.
 * Pure CSS/SVG — see the "Solar Design System" block in index.css.
 */
export default function SolarPanelCard({
  theme,
  className = '',
  contentClassName = '',
  children,
  glow = false,
  bolts = true,
  sheen = true,
  as: Tag = 'div',
  ...rest
}) {
  const isDark = theme === 'dark';
  const shellRef = useRef(null);
  const frameRef = useRef(null);

  // Track the pointer so the specular glare follows it, the way glare moves
  // across a real module. Coalesced into one rAF so a fast pointer over a grid
  // of cards can't queue up layout work.
  const handlePointerMove = useCallback((event) => {
    const el = shellRef.current;
    if (!el || frameRef.current) return;
    const { clientX, clientY } = event;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty('--my', `${((clientY - rect.top) / rect.height) * 100}%`);
    });
  }, []);

  const boltStyle = {
    background: isDark
      ? 'radial-gradient(circle at 32% 30%, #f1f5f9, #94a3b8 55%, #334155)'
      : 'radial-gradient(circle at 32% 30%, #ffffff, #cbd5e1 55%, #64748b)'
  };

  return (
    <Tag
      className={`pv-shell pv-texture pv-frame solar-hover rounded-3xl border ${
        isDark
          ? 'border-slate-700/70 bg-slate-800/70'
          : 'border-slate-200 bg-white/90'
      } ${glow ? 'solar-halo' : ''} ${className}`}
      ref={shellRef}
      onPointerMove={handlePointerMove}
      {...rest}
    >
      {sheen && <span className="pv-sheen" aria-hidden="true" />}
      <span className="pv-glare" aria-hidden="true" />

      {bolts && (
        <span aria-hidden="true">
          <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full pv-bolt" style={boltStyle} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full pv-bolt" style={boltStyle} />
          <span className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full pv-bolt" style={boltStyle} />
          <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full pv-bolt" style={boltStyle} />
        </span>
      )}

      {/* Layout classes belong here, not on the shell: the shell's other
          children are the absolutely-positioned sheen and bolt overlays. */}
      <div className={`pv-content h-full ${contentClassName}`}>{children}</div>
    </Tag>
  );
}

import React from 'react';

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
      {...rest}
    >
      {sheen && <span className="pv-sheen" aria-hidden="true" />}

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

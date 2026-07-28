import React from 'react';

/* ==========================================================================
   Shared building blocks for the inline SVG scenes.
   Gradients are namespaced by a `uid` so any number of scenes can coexist
   on one page without their ids colliding.
   ========================================================================== */

export function SceneDefs({ uid, isDark }) {
  return (
    <defs>
      <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={isDark ? '#0f2947' : '#dbeafe'} />
        <stop offset="100%" stopColor={isDark ? '#0a1c33' : '#f8fafc'} />
      </linearGradient>
      <linearGradient id={`${uid}-panel`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#123a63" />
        <stop offset="55%" stopColor="#0b2545" />
        <stop offset="100%" stopColor="#1c4e80" />
      </linearGradient>
      <linearGradient id={`${uid}-suit`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e3a5f" />
        <stop offset="100%" stopColor="#132a47" />
      </linearGradient>
      <linearGradient id={`${uid}-helmet`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="45%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id={`${uid}-case`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={isDark ? '#1b2c47' : '#ffffff'} />
        <stop offset="100%" stopColor={isDark ? '#111f36' : '#e8eef6'} />
      </linearGradient>
      <radialGradient id={`${uid}-sun`}>
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="60%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f97316" />
      </radialGradient>
      <radialGradient id={`${uid}-glow`}>
        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

export function Sun({ uid, cx, cy, r = 16 }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    return {
      x1: cx + Math.cos(a) * (r + 6),
      y1: cy + Math.sin(a) * (r + 6),
      x2: cx + Math.cos(a) * (r + 13),
      y2: cy + Math.sin(a) * (r + 13)
    };
  });

  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 3} fill={`url(#${uid}-glow)`} />
      <g className="solar-spin-slow" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {rays.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${uid}-sun)`} />
    </g>
  );
}

/**
 * A tilted photovoltaic module drawn as a parallelogram with cell divisions
 * and a support post. `x`,`y` is the front-bottom-left corner.
 */
export function TiltedModule({ uid, x, y, w = 40, rise = 22, depth = 14, drop = 6, post = 0, cells = 3 }) {
  const A = [x, y];
  const B = [x + w, y - rise];
  const C = [x + w + depth, y - rise + drop];
  const D = [x + depth, y + drop];

  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const divisions = Array.from({ length: cells - 1 }, (_, i) => {
    const t = (i + 1) / cells;
    return [lerp(A, B, t), lerp(D, C, t)];
  });
  const midA = lerp(A, D, 0.5);
  const midB = lerp(B, C, 0.5);
  const foot = lerp(A, C, 0.5);

  return (
    <g>
      {post > 0 && (
        <line
          x1={foot[0]}
          y1={foot[1]}
          x2={foot[0]}
          y2={foot[1] + post}
          stroke={`url(#${uid}-metal)`}
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
      <path
        d={`M${A} L${B} L${C} L${D} Z`}
        fill={`url(#${uid}-panel)`}
        stroke={`url(#${uid}-metal)`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <g stroke="rgba(148,197,255,0.34)" strokeWidth="1">
        {divisions.map((d, i) => (
          <line key={i} x1={d[0][0]} y1={d[0][1]} x2={d[1][0]} y2={d[1][1]} />
        ))}
        <line x1={midA[0]} y1={midA[1]} x2={midB[0]} y2={midB[1]} />
      </g>
      <path d={`M${A} L${B} L${midB} L${midA} Z`} fill="#ffffff" opacity="0.06" />
    </g>
  );
}

import React from 'react';
import { Phone } from 'lucide-react';

/**
 * Floating green call widget positioned directly above the return-to-top button.
 * Incorporates a custom slow ripple keyframe animation to draw elegant attention.
 * Hardcoded dimensions and flex-shrink-0 ensure a perfect circle on all mobile browsers.
 */
export default function CallWidget() {
  return (
    <a
      href="tel:+380970000000"
      aria-label="Зателефонувати майстру"
      style={{ width: '48px', height: '48px', minWidth: '48px', minHeight: '48px' }}
      className="fixed bottom-5 right-5 z-40 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-[0_4px_20px_rgba(34,197,94,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group flex-shrink-0"
    >
      {/* Pulsating ripple effect */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-slow-ripple pointer-events-none" />
      
      {/* Icon with slight hover tilt */}
      <Phone className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12 fill-current" />
    </a>
  );
}

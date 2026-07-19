import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ 
  value, 
  onChange, 
  options = [], 
  icon: Icon, 
  placeholder = 'Оберіть значення',
  className = '',
  theme = 'dark'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [openUpward, setOpenUpward] = useState(false);

  const isDark = theme === 'dark';

  // Close dropdown on click outside or ESC key & check vertical position
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const parentModal = containerRef.current.closest('.overflow-y-auto, .glass-panel, [role="dialog"]');
      const parentBottom = parentModal ? parentModal.getBoundingClientRect().bottom : window.innerHeight;
      
      const spaceBelow = parentBottom - rect.bottom;
      if (spaceBelow < 190 && rect.top > 160) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => 
    typeof opt === 'string' ? opt === value : opt.value === value
  );
  const selectedLabel = selectedOption
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label)
    : (typeof value === 'string' ? value : value?.label || placeholder);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full min-h-[44px] sm:min-h-[48px] border rounded-xl pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm font-medium flex items-center justify-between text-left transition-all duration-200 cursor-pointer select-none ${
          isDark 
            ? 'border-slate-700 bg-slate-900/90 text-white hover:border-slate-600' 
            : 'border-amber-200 bg-amber-50/50 text-slate-900 hover:border-amber-300'
        } ${
          isOpen ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md' : ''
        }`}
      >
        {Icon && (
          <Icon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none" />
        )}
        
        <span className="truncate pr-2">{selectedLabel}</span>

        <ChevronDown 
          className={`w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none ${
            isOpen ? 'rotate-180 text-amber-500' : 'text-slate-400'
          }`} 
        />
      </button>

      {/* Floating Options Menu */}
      {isOpen && (
        <div 
          className={`absolute left-0 right-0 z-50 rounded-2xl border shadow-2xl p-1.5 space-y-1 max-h-48 overflow-y-auto animate-in fade-in duration-150 backdrop-blur-xl ${
            isDark 
              ? 'bg-slate-900/98 border-slate-700 text-white shadow-slate-950/80' 
              : 'bg-white/98 border-amber-200 text-slate-900 shadow-xl'
          } ${
            openUpward ? 'bottom-[calc(100%+6px)]' : 'top-[calc(100%+6px)]'
          }`}
        >
          {options.map((opt, idx) => {
            const optValue = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            const isSelected = optValue === value;

            return (
              <div
                key={idx}
                onClick={() => handleSelect(optValue)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? isDark 
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-xs' 
                      : 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-xs'
                    : isDark 
                      ? 'text-slate-200 hover:bg-slate-800 hover:translate-x-0.5' 
                      : 'text-slate-700 hover:bg-amber-50 hover:translate-x-0.5'
                }`}
              >
                <span className="truncate pr-2">{optLabel}</span>
                {isSelected && (
                  <Check className="w-4 h-4 flex-shrink-0 text-amber-500" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

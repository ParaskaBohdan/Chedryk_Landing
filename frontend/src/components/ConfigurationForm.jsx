import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, User, MessageSquare, Cpu, Calendar, Clock } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function ConfigurationForm({ configurationSummary, onCloseModal, theme }) {
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const todayStr = new Date().toISOString().split('T')[0];
  const dateInputRef = useRef(null);

  const handleDateContainerClick = () => {
    if (dateInputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        try {
          dateInputRef.current.showPicker();
        } catch {
          dateInputRef.current.focus();
        }
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '+380 (',
    preferred_date: todayStr,
    preferred_time: 'Якомога швидше',
    comment: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const timeOptions = [
    'Якомога швидше',
    '09:00 - 12:00',
    '12:00 - 15:00',
    '15:00 - 18:00',
    'Після 18:00'
  ];

  const [phoneDigits, setPhoneDigits] = useState('');
  const phoneInputRef = useRef(null);

  const formatPhoneMask = (digits) => {
    const d = digits.slice(0, 9);
    let result = '+380 (';
    
    if (d.length > 0) {
      result += d.slice(0, 2);
    }
    if (d.length >= 2) {
      result += ') ';
    }
    if (d.length > 2) {
      result += d.slice(2, 5);
    }
    if (d.length >= 5) {
      result += '-';
    }
    if (d.length > 5) {
      result += d.slice(5, 7);
    }
    if (d.length >= 7) {
      result += '-';
    }
    if (d.length > 7) {
      result += d.slice(7, 9);
    }
    
    return result;
  };

  const getCursorPos = (digitsLen) => {
    if (digitsLen === 0) return 6;
    if (digitsLen <= 2) return 6 + digitsLen;
    if (digitsLen <= 5) return 6 + digitsLen + 2;
    if (digitsLen <= 7) return 6 + digitsLen + 3;
    return 6 + digitsLen + 4;
  };

  const setCursorPosition = (digitsLen) => {
    setTimeout(() => {
      if (phoneInputRef.current) {
        const pos = getCursorPos(digitsLen);
        phoneInputRef.current.setSelectionRange(pos, pos);
      }
    }, 0);
  };

  const handlePhoneChange = (e) => {
    const inputVal = e.target.value;
    let rawDigits = inputVal.replace(/\D/g, '');
    
    if (rawDigits.startsWith('380')) {
      rawDigits = rawDigits.slice(3);
    }

    const cleanDigits = rawDigits.slice(0, 9);
    setPhoneDigits(cleanDigits);
    
    const formatted = formatPhoneMask(cleanDigits);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    
    setCursorPosition(cleanDigits.length);
  };

  const handlePhoneFocus = () => {
    if (!formData.phone || formData.phone === '') {
      setFormData((prev) => ({ ...prev, phone: '+380 (' }));
    }
    setCursorPosition(phoneDigits.length);
  };

  const handlePhoneBlur = () => {
    if (phoneDigits.length === 0) {
      setFormData((prev) => ({ ...prev, phone: '+380 (' }));
    }
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (phoneDigits.length > 0) {
        const nextDigits = phoneDigits.slice(0, -1);
        setPhoneDigits(nextDigits);
        const formatted = formatPhoneMask(nextDigits);
        setFormData((prev) => ({ ...prev, phone: formatted }));
        setCursorPosition(nextDigits.length);
      }
    } else if (e.key === 'Delete') {
      e.preventDefault();
    }
  };

  const handlePhonePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    let rawDigits = pastedText.replace(/\D/g, '');
    
    if (rawDigits.startsWith('380')) {
      rawDigits = rawDigits.slice(3);
    } else if (rawDigits.startsWith('0') && rawDigits.length === 10) {
      rawDigits = rawDigits.slice(1);
    }

    const cleanDigits = rawDigits.slice(0, 9);
    setPhoneDigits(cleanDigits);
    
    const formatted = formatPhoneMask(cleanDigits);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    
    setCursorPosition(cleanDigits.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || phoneDigits.length !== 9) {
      setStatus({ 
        type: 'error', 
        message: 'Будь ласка, вкажіть ваше ім\'я та заповніть номер телефону повністю (9 цифр після +380).' 
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    const apiUrl = import.meta.env.VITE_API_URL || '/api/consultation.php';

    const submitPayload = {
      name: formData.name,
      phone: formData.phone,
      service: 'Розрахунок з Калькулятора СЕС',
      configuration: configurationSummary,
      preferred_date: formData.preferred_date,
      preferred_time: formData.preferred_time,
      comment: formData.comment.trim()
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitPayload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (window.fbq) {
          window.fbq('track', 'Lead');
        }
        if (onCloseModal) {
          onCloseModal();
        }
        navigate('/thank-you');
        return;
      } else {
        setStatus({
          type: 'error',
          message: result.message || 'Сталася помилка при відправці заявки.'
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Помилка мережі. Перевірте з\'єднання та спробуйте ще раз.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`glass-panel p-5 sm:p-8 rounded-3xl border shadow-2xl max-w-xl mx-auto transition-colors ${
      isDark ? 'border-slate-700 bg-slate-800/90 text-white' : 'border-amber-200 bg-white text-slate-900 shadow-amber-500/10'
    }`}>
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          Надіслати Конфігурацію Майстру
        </h3>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Залиште контакти та зручний час — фахівець Nova Energy зателефонує вам для узгодження деталей обраної конфігурації.
        </p>
      </div>

      {status?.type === 'success' ? (
        <div className="p-6 rounded-2xl border border-emerald-400/40 bg-emerald-500/15 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold">Заявку Прийнято!</h4>
          <p className="text-xs sm:text-sm leading-relaxed opacity-90">{status.message}</p>
          <div className="pt-2">
            <button
              onClick={() => {
                setStatus(null);
                if (onCloseModal) onCloseModal();
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-md cursor-pointer"
            >
              Зрозуміло
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {status?.type === 'error' && (
            <div className="p-3.5 bg-rose-500/15 rounded-xl border border-rose-500/40 text-rose-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Ваше Ім'я *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-500" />
              <input
                type="text"
                required
                placeholder="наприклад, Олександр"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors ${
                  isDark ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-400' : 'border-amber-200 bg-amber-50/50 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Номер Телефону *
            </label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-500 pointer-events-none z-30" />
              
              {/* Visual Mask Overlay */}
              <div className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono flex items-center select-none z-10 ${
                isDark ? 'border-slate-700 bg-slate-900/90' : 'border-amber-200 bg-amber-50/50'
              }`}>
                <span className={isDark ? 'text-white font-bold' : 'text-slate-900 font-bold'}>+380 (</span>
                
                <span className={phoneDigits.length > 0 ? (isDark ? 'text-white font-bold' : 'text-slate-900 font-bold') : (isDark ? 'text-slate-500' : 'text-slate-400')}>
                  {phoneDigits[0] || 'X'}
                </span>
                <span className={phoneDigits.length > 1 ? (isDark ? 'text-white font-bold' : 'text-slate-900 font-bold') : (isDark ? 'text-slate-500' : 'text-slate-400')}>
                  {phoneDigits[1] || 'X'}
                </span>
                
                <span className={`whitespace-pre ${isDark ? 'text-white font-bold' : 'text-slate-900 font-bold'}`}>{') '}</span>

                <span className={phoneDigits.length > 2 ? (isDark ? 'text-white font-bold' : 'text-slate-900 font-bold') : (isDark ? 'text-slate-500' : 'text-slate-400')}>
                  {phoneDigits[2] || 'X'}
                </span>
                <span className={phoneDigits.length > 3 ? (isDark ? 'text-white font-bold' : 'text-slate-900 font-bold') : (isDark ? 'text-slate-500' : 'text-slate-400')}>
                  {phoneDigits[3] || 'X'}
                </span>
                <span className={phoneDigits.length > 4 ? (isDark ? 'text-white font-bold' : 'text-slate-900 font-bold') : (isDark ? 'text-slate-500' : 'text-slate-400')}>
                  {phoneDigits[4] || 'X'}
                </span>

                <span className={isDark ? 'text-white font-bold' : 'text-slate-900 font-bold'}>-</span>

                <span className={phoneDigits.length > 5 ? (isDark ? 'text-white font-bold' : 'text-slate-900 font-bold') : (isDark ? 'text-slate-500' : 'text-slate-400')}>
                  {phoneDigits[5] || 'X'}
                </span>
                <span className={phoneDigits.length > 6 ? (isDark ? 'text-white font-bold' : 'text-slate-900 font-bold') : (isDark ? 'text-slate-500' : 'text-slate-400')}>
                  {phoneDigits[6] || 'X'}
                </span>

                <span className={isDark ? 'text-white font-bold' : 'text-slate-900 font-bold'}>-</span>

                <span className={phoneDigits.length > 7 ? (isDark ? 'text-white font-bold' : 'text-slate-900 font-bold') : (isDark ? 'text-slate-500' : 'text-slate-400')}>
                  {phoneDigits[7] || 'X'}
                </span>
                <span className={phoneDigits.length > 8 ? (isDark ? 'text-white font-bold' : 'text-slate-900 font-bold') : (isDark ? 'text-slate-500' : 'text-slate-400')}>
                  {phoneDigits[8] || 'X'}
                </span>
              </div>

              {/* Transparent Input Layer */}
              <input
                ref={phoneInputRef}
                type="tel"
                required
                value={formData.phone}
                onChange={handlePhoneChange}
                onFocus={handlePhoneFocus}
                onBlur={handlePhoneBlur}
                onClick={handlePhoneFocus}
                onKeyDown={handlePhoneKeyDown}
                onPaste={handlePhonePaste}
                className="absolute inset-0 w-full pl-10 pr-4 py-2.5 text-sm font-mono text-transparent caret-amber-500 bg-transparent rounded-xl border border-transparent focus:border-amber-500 focus:outline-none transition-colors z-20"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Вибрана Конфігурація
            </label>
            <div className="relative">
              <Cpu className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-500 z-10" />
              <textarea
                readOnly
                rows={4}
                value={configurationSummary || 'Параметри СЕС не вибрано'}
                className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium leading-relaxed resize-none select-text transition-colors cursor-default ${
                  isDark ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-amber-300 bg-amber-50/70 text-slate-800'
                }`}
              />
            </div>
          </div>

          {/* Date & Time Booking Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Зручний день
              </label>
              <div 
                onClick={handleDateContainerClick}
                className="relative flex items-center cursor-pointer"
              >
                <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none z-10" />
                <input
                  ref={dateInputRef}
                  type="date"
                  min={todayStr}
                  value={formData.preferred_date}
                  onChange={(e) => {
                    if (e.target.value) {
                      setFormData({ ...formData, preferred_date: e.target.value });
                    }
                  }}
                  className={`w-full border rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors cursor-pointer select-none ${
                    isDark ? 'border-slate-700 bg-slate-900/90 text-white' : 'border-amber-200 bg-amber-50/50 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Час
              </label>
              <CustomSelect
                value={formData.preferred_time}
                onChange={(val) => setFormData({ ...formData, preferred_time: val })}
                options={timeOptions}
                icon={Clock}
                theme={theme}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Коментар (необов'язково)
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-500" />
              <textarea
                rows={3}
                placeholder="Додаткові побажання чи деталі об'єкта..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors ${
                  isDark ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-400' : 'border-amber-200 bg-amber-50/50 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-orange-bright font-bold text-sm py-3.5 rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 glow-amber cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Відправка конфігурації...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Надіслати Конфігурацію Майстру</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, User, MessageSquare, Wrench, Calendar, Clock } from 'lucide-react';

export default function ConsultationForm({ selectedServicePrefill, onCloseModal, theme }) {
  const isDark = theme === 'dark';

  const todayStr = new Date().toISOString().split('T')[0];

  const [phoneDigits, setPhoneDigits] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    service: selectedServicePrefill || 'Побудова сонячних станцій (28–60 кВт)',
    preferred_date: todayStr,
    preferred_time: '10:00',
    comment: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const servicesList = [
    'Побудова сонячних станцій (28–60 кВт)',
    'Установка панелей на дах',
    'Установлення систем EcoFlow та акумуляторів',
    'Проектування та налагодження електромереж в будівлях',
    'Інше (Загальне запитання)'
  ];

  const timeOptions = [
    'Якомога швидше',
    '09:00 - 12:00',
    '12:00 - 15:00',
    '15:00 - 18:00',
    '18:00 - 20:00'
  ];

  const formatInputSpaces = (digits) => {
    const d = (digits || '').slice(0, 9);
    const pad = (str, len) => str.padEnd(len, ' ');

    const code = pad(d.slice(0, 2), 2);
    const p1 = pad(d.slice(2, 5), 3);
    const p2 = pad(d.slice(5, 7), 2);
    const p3 = pad(d.slice(7, 9), 2);

    return `(${code}) ${p1}-${p2}-${p3}`;
  };

  const renderPhoneOverlay = () => {
    const d = phoneDigits.slice(0, 9);
    const len = d.length;

    const typedClass = isDark ? 'text-white font-bold' : 'text-slate-900 font-bold';
    const greyClass = isDark ? 'text-slate-500 font-normal' : 'text-slate-400 font-normal';

    const getChar = (idx) => (idx < len ? d[idx] : '0');
    const getDigitColor = (idx) => (idx < len ? typedClass : greyClass);

    const caret = isPhoneFocused && (
      <span className={`inline-block w-[1.5px] h-4 animate-pulse mx-[0.5px] ${
        isDark ? 'bg-white' : 'bg-slate-900'
      }`} />
    );

    return (
      <div className="absolute left-[4.8rem] pointer-events-none text-sm tracking-wide flex items-center select-none font-mono">
        <span className={typedClass}>(</span>
        {len === 0 && caret}

        <span className={getDigitColor(0)}>{getChar(0)}</span>
        {len === 1 && caret}

        <span className={getDigitColor(1)}>{getChar(1)}</span>
        <span className={typedClass}>)&nbsp;</span>

        {len === 2 && caret}
        <span className={getDigitColor(2)}>{getChar(2)}</span>

        {len === 3 && caret}
        <span className={getDigitColor(3)}>{getChar(3)}</span>

        {len === 4 && caret}
        <span className={getDigitColor(4)}>{getChar(4)}</span>

        <span className={typedClass}>-</span>

        {len === 5 && caret}
        <span className={getDigitColor(5)}>{getChar(5)}</span>

        {len === 6 && caret}
        <span className={getDigitColor(6)}>{getChar(6)}</span>

        <span className={typedClass}>-</span>

        {len === 7 && caret}
        <span className={getDigitColor(7)}>{getChar(7)}</span>

        {len === 8 && caret}
        <span className={getDigitColor(8)}>{getChar(8)}</span>

        {len === 9 && caret}
      </div>
    );
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      setPhoneDigits((prev) => prev.slice(0, -1));
    }
  };

  const handlePhoneChange = (e) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits.startsWith('380') && digits.length > 9) {
      digits = digits.slice(3);
    } else if (digits.startsWith('0') && digits.length >= 10) {
      digits = digits.slice(1);
    }
    setPhoneDigits(digits.slice(0, 9));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || phoneDigits.length < 9) {
      setStatus({ type: 'error', message: 'Будь ласка, заповніть ім\'я та повний номер телефону (9 цифр після +380).' });
      return;
    }

    setLoading(true);
    setStatus(null);

    const apiUrl = import.meta.env.VITE_API_URL || '/api/consultation.php';

    const formattedMask = `(${phoneDigits.slice(0, 2)}) ${phoneDigits.slice(2, 5)}-${phoneDigits.slice(5, 7)}-${phoneDigits.slice(7, 9)}`;
    const fullPhone = `+380 ${formattedMask}`;

    const payload = {
      ...formData,
      phone: fullPhone
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: 'success',
          message: result.message || 'Дякуємо! Вашу заявку успішно відправлено.'
        });
        setPhoneDigits('');
        setFormData({
          name: '',
          service: servicesList[0],
          preferred_date: todayStr,
          preferred_time: 'Якомога швидше',
          comment: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: result.message || 'Виникла помилка під час відправки. Спробуйте ще раз.'
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus({
        type: 'error',
        message: 'Не вдалося з\'єднатися із сервером. Зателефонуйте майстру напряму.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`glass-panel p-5 sm:p-8 rounded-3xl border shadow-2xl max-w-xl mx-auto transition-colors ${
      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900 shadow-sky-500/10'
    }`}>
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          Замовити Безкоштовну Консультацію
        </h3>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Залиште контакти та зручний час — Чедрик Іван зателефонує вам для узгодження деталей.
        </p>
      </div>

      {status?.type === 'success' ? (
        <div className={`p-6 rounded-2xl border text-center space-y-4 ${
          isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-sky-50 border-sky-200'
        }`}>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${
            isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-600'
          }`}>
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold">Заявку Прийнято!</h4>
          <p className="text-xs sm:text-sm leading-relaxed">{status.message}</p>
          <div className="pt-2">
            <button
              onClick={() => {
                setStatus(null);
                if (onCloseModal) onCloseModal();
              }}
              className={`font-bold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-md ${
                isDark ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950' : 'bg-sky-500 hover:bg-sky-600 text-white'
              }`}
            >
              Зрозуміло
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {status?.type === 'error' && (
            <div className="p-3.5 bg-rose-500/10 rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Ваше Ім'я *
            </label>
            <div className="relative">
              <User className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-500' : 'text-sky-500'}`} />
              <input
                type="text"
                required
                placeholder="наприклад, Олександр"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors ${
                  isDark 
                    ? 'bg-slate-950/90 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                    : 'bg-sky-50/50 border-sky-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Номер Телефону *
            </label>
            <div className="relative flex items-center">
              <Phone className={`w-4 h-4 absolute left-3 top-3.5 ${isDark ? 'text-slate-500' : 'text-sky-500'}`} />
              <span className={`absolute left-9 font-extrabold text-sm select-none pointer-events-none font-mono ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                +380
              </span>

              {renderPhoneOverlay()}

              <input
                type="tel"
                required
                value={formatInputSpaces(phoneDigits)}
                onChange={handlePhoneChange}
                onKeyDown={handlePhoneKeyDown}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
                className={`w-full border rounded-xl pl-[4.8rem] pr-4 py-2.5 text-sm font-mono focus:outline-none transition-colors text-transparent bg-transparent caret-transparent ${
                  isDark 
                    ? 'border-slate-700 focus:border-amber-400 bg-slate-950/90' 
                    : 'border-sky-200 focus:border-sky-500 bg-sky-50/50'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Послуга, яка вас цікавить
            </label>
            <div className="relative">
              <Wrench className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-500' : 'text-sky-500'}`} />
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors ${
                  isDark 
                    ? 'bg-slate-950/90 border-slate-700 text-white focus:border-amber-400' 
                    : 'bg-sky-50/50 border-sky-200 text-slate-900 focus:border-sky-500'
                }`}
              >
                {servicesList.map((srv, idx) => (
                  <option key={idx} value={srv} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time Booking Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Зручний день
              </label>
              <div className="relative">
                <Calendar className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-500' : 'text-sky-500'}`} />
                <input
                  type="date"
                  min={todayStr}
                  value={formData.preferred_date}
                  onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                  className={`w-full border rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-slate-950/90 border-slate-700 text-white focus:border-amber-400' 
                      : 'bg-sky-50/50 border-sky-200 text-slate-900 focus:border-sky-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Час
              </label>
              <div className="relative">
                <Clock className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-500' : 'text-sky-500'}`} />
                <select
                  value={formData.preferred_time}
                  onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                  className={`w-full border rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-slate-950/90 border-slate-700 text-white focus:border-amber-400' 
                      : 'bg-sky-50/50 border-sky-200 text-slate-900 focus:border-sky-500'
                  }`}
                >
                  {timeOptions.map((tOpt, idx) => (
                    <option key={idx} value={tOpt} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                      {tOpt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Коментар
            </label>
            <div className="relative">
              <MessageSquare className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-500' : 'text-sky-500'}`} />
              <textarea
                rows={2}
                placeholder="Ваші побажання чи запитання..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors ${
                  isDark 
                    ? 'bg-slate-950/90 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                    : 'bg-sky-50/50 border-sky-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold text-sm py-3.5 rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
              isDark 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 glow-amber' 
                : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white glow-sky'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Відправка запиту...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Надіслати Заявку Мастеру</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}


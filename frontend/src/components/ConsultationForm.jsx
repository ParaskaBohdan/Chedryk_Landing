import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, User, MessageSquare, Wrench, Calendar, Clock } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function ConsultationForm({ selectedServicePrefill, onCloseModal, theme }) {
  const isDark = theme === 'dark';

  const todayStr = new Date().toISOString().split('T')[0];

  const [phoneDigits, setPhoneDigits] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    service: selectedServicePrefill || 'Побудова сонячних станцій (28–60 кВт)',
    preferred_date: todayStr,
    preferred_time: 'Якомога швидше',
    comment: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const servicesList = [
    'Побудова сонячних станцій (28–60 кВт)',
    'Гібридні системи Deye та акумулятори (EcoFlow)',
    'Установка сонячних панелей на дах',
    'Супровід документації & Зелений Тариф',
    'Налагодження електромереж в будівлях',
    'Інше (Загальне запитання)'
  ];

  React.useEffect(() => {
    if (selectedServicePrefill) {
      setFormData(prev => ({ ...prev, service: selectedServicePrefill }));
    }
  }, [selectedServicePrefill]);

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

    const typedClass = 'theme-text-primary font-bold';
    const greyClass = 'theme-text-muted font-normal';

    const getChar = (idx) => (idx < len ? d[idx] : '0');
    const getDigitColor = (idx) => (idx < len ? typedClass : greyClass);

    const caret = isPhoneFocused && (
      <span className="inline-block w-[1.5px] h-4 animate-pulse mx-[0.5px] bg-current theme-text-primary" />
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

  const dateInputRef = React.useRef(null);

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

  return (
    <div className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-2xl w-full max-w-xl mx-auto transition-colors theme-bg-modal theme-border-card theme-text-primary">
      <div className="text-center mb-5 sm:mb-8">
        <h3 className="text-lg sm:text-2xl font-bold mb-1.5 sm:mb-2">
          Замовити Безкоштовну Консультацію
        </h3>
        <p className="text-xs sm:text-sm theme-text-muted">
          Залиште контакти та зручний час — Чедрик Іван зателефонує вам для узгодження деталей.
        </p>
      </div>

      {status?.type === 'success' ? (
        <div className="p-5 sm:p-6 rounded-2xl border text-center space-y-4 theme-badge">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto theme-badge">
            <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 theme-icon-accent" />
          </div>
          <h4 className="text-base sm:text-lg font-bold">Заявку Прийнято!</h4>
          <p className="text-xs sm:text-sm leading-relaxed">{status.message}</p>
          <div className="pt-2">
            <button
              onClick={() => {
                setStatus(null);
                if (onCloseModal) onCloseModal();
              }}
              className="font-bold text-xs sm:text-sm min-h-[48px] px-6 py-3 rounded-xl transition-colors shadow-md theme-btn-primary flex items-center justify-center mx-auto"
            >
              Зрозуміло
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          
          {status?.type === 'error' && (
            <div className="p-3.5 bg-rose-500/10 rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1 theme-text-secondary">
              Ваше Ім'я *
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 theme-icon-accent pointer-events-none" />
              <input
                type="text"
                required
                placeholder="наприклад, Олександр"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full min-h-[48px] border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors theme-bg-input theme-border-subtle theme-border-focus theme-text-primary placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 theme-text-secondary">
              Номер Телефону *
            </label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 theme-icon-accent pointer-events-none" />
              <span className="absolute left-9 font-extrabold text-sm select-none pointer-events-none font-mono theme-text-primary">
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
                className="w-full min-h-[48px] border rounded-xl pl-[4.8rem] pr-4 py-3 text-sm font-mono focus:outline-none transition-colors text-transparent bg-transparent caret-transparent theme-border-subtle theme-border-focus theme-bg-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 theme-text-secondary">
              Послуга, яка вас цікавить
            </label>
            <CustomSelect
              value={formData.service}
              onChange={(val) => setFormData({ ...formData, service: val })}
              options={servicesList}
              icon={Wrench}
            />
          </div>

          {/* Date & Time Booking Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1 theme-text-secondary">
                Зручний день
              </label>
              <div 
                onClick={handleDateContainerClick}
                className="relative flex items-center cursor-pointer"
              >
                <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 theme-icon-accent pointer-events-none z-10" />
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
                  onKeyDown={(e) => e.preventDefault()}
                  className="w-full max-w-full min-h-[48px] border rounded-xl pl-10 pr-3 py-3 text-xs sm:text-sm focus:outline-none transition-colors theme-bg-input theme-border-subtle theme-border-focus theme-text-primary cursor-pointer select-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 theme-text-secondary">
                Час
              </label>
              <CustomSelect
                value={formData.preferred_time}
                onChange={(val) => setFormData({ ...formData, preferred_time: val })}
                options={timeOptions}
                icon={Clock}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 theme-text-secondary">
              Коментар
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 theme-icon-accent pointer-events-none" />
              <textarea
                rows={2}
                placeholder="Ваші побажання чи запитання..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors theme-bg-input theme-border-subtle theme-border-focus theme-text-primary placeholder:text-slate-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[48px] font-bold text-sm sm:text-base py-3.5 rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 theme-btn-primary"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Відправка запиту...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 fill-current" />
                <span>Надіслати Заявку Мастеру</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}


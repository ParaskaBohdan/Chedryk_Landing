import React, { useState, useEffect } from 'react';
import { X, Calculator, Zap, CheckCircle, Phone, User, Send, Loader2, DollarSign } from 'lucide-react';

export default function CalculatorModal({ onClose, theme }) {
  const [calculationData, setCalculationData] = useState(null);
  const [loadingCalc, setLoadingCalc] = useState(true);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [phoneDigits, setPhoneDigits] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    fetch('/api/calculate.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.examples) {
          setCalculationData(data.examples['20kw_deye']);
        }
      })
      .catch(() => {
        setCalculationData({
          title: 'Мережева / Гібридна СЕС 20 кВт (Зелений Тариф)',
          items: [
            { id: 1, name: 'Інвертор Deye 20 кВт', unit_price: '2250 €', qty: '1 шт', total_usd: 2573.55 },
            { id: 2, name: 'Акумулятор Deye 5,2 кВт', unit_price: '770 €', qty: '3 шт', total_usd: 2642.18 },
            { id: 3, name: 'Сонячні панелі TRINA 450 Вт', unit_price: '85.00 $', qty: '60 шт', total_usd: 5100.00 },
            { id: 4, name: 'Профіль нержавіючий', unit_price: '110 грн', qty: '170 м', total_usd: 419.52 },
            { id: 5, name: 'Міжпанельні та кінцеві притиски', unit_price: '60 грн', qty: '140 шт', total_usd: 188.45 },
            { id: 6, name: 'Кабель PV solar 6,0 мм²', unit_price: '58 грн', qty: '300 м', total_usd: 390.35 },
            { id: 7, name: 'Шпильки оцинковані', unit_price: '60 грн', qty: '172.5 шт', total_usd: 232.19 },
            { id: 8, name: 'З\'єднувачі, болти', unit_price: '90 грн', qty: '28.33 шт', total_usd: 57.21 },
            { id: 9, name: 'Доставка профілю', unit_price: '1000 грн', qty: '1 послуга', total_usd: 22.43 },
            { id: 10, name: 'Кабель силовий', unit_price: '330 грн', qty: '8 м', total_usd: 59.23 },
            { id: 11, name: 'Щит розподільний', unit_price: '1000 грн', qty: '1 шт', total_usd: 22.43 },
            { id: 12, name: 'Короб, автоматичні вимикачі', unit_price: '3000 грн', qty: '1 комплект', total_usd: 67.30 },
            { id: 13, name: 'Монтаж сонячних панелей', unit_price: '1500.00 $', qty: '1 комплект', total_usd: 1500.00 },
            { id: 14, name: 'Монтаж та налагодження системи', unit_price: '400.00 $', qty: '1 послуга', total_usd: 400.00 }
          ],
          total_usd: 13674.85
        });
      })
      .finally(() => setLoadingCalc(false));
  }, []);

  const handlePhoneChange = (e) => {
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/\D/g, '');

    let cleaned = digitsOnly;
    if (cleaned.startsWith('380')) {
      cleaned = cleaned.slice(3);
    } else if (cleaned.startsWith('0')) {
      cleaned = cleaned.slice(1);
    }

    if (cleaned.length <= 9) {
      setPhoneDigits(cleaned);
      setFormData({ ...formData, phone: `+380${cleaned}` });
    }
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === 'Backspace' && phoneDigits.length > 0) {
      const updated = phoneDigits.slice(0, -1);
      setPhoneDigits(updated);
      setFormData({ ...formData, phone: updated ? `+380${updated}` : '' });
    }
  };

  const formatInputSpaces = (digits) => {
    const d = digits.slice(0, 9);
    let result = '';
    if (d.length > 0) result += ` (${d.slice(0, 2)}`;
    if (d.length >= 2) result += `) ${d.slice(2, 5)}`;
    if (d.length >= 5) result += `-${d.slice(5, 7)}`;
    if (d.length >= 7) result += `-${d.slice(7, 9)}`;
    return result;
  };

  const renderPhoneOverlay = () => {
    const d = phoneDigits.slice(0, 9);
    const len = d.length;

    const typedClass = 'theme-text-primary font-bold';
    const greyClass = 'theme-text-muted font-normal';

    const getChar = (idx) => (idx < len ? d[idx] : '0');
    const getDigitColor = (idx) => (idx < len ? typedClass : greyClass);

    const caret = isPhoneFocused && (
      <span className="inline-block w-[1.5px] h-3.5 animate-pulse mx-[0.5px] bg-current theme-text-primary" />
    );

    return (
      <div className="absolute left-[4.8rem] pointer-events-none text-xs tracking-wide flex items-center select-none font-mono">
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneDigits.length < 9) {
      setErrorMsg('Будь ласка, введіть повний номер телефону (9 цифр).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/calculate.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: `+380${phoneDigits}`,
          calc_type: '20kw_deye',
          total_sum: '13 674.85 $'
        })
      });

      const resData = await response.json();
      if (resData.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(resData.message || 'Виникла помилка. Спробуйте ще раз.');
      }
    } catch {
      setErrorMsg('Помилка з’єднання з сервером.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-[95%] sm:w-full max-w-xl max-h-[92vh] flex flex-col my-auto rounded-2xl border shadow-2xl p-4 sm:p-6 transition-colors theme-bg-modal theme-border-card theme-text-primary overflow-hidden">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          aria-label="Закрити кошторис"
          title="Закрити кошторис"
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full border transition-all theme-badge shadow-xs hover:scale-110 active:scale-95 flex items-center justify-center"
        >
          <X className="w-5 h-5 theme-icon-accent" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-4 pr-8 flex-shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold theme-badge">
            <Calculator className="w-3.5 h-3.5 theme-icon-accent" />
            <span>Деталізований Кошторис СЕС</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold theme-text-primary">
            Приклад Розрахунку <span className="theme-text-accent">СЕС 20–30 кВт</span>
          </h2>
          <p className="text-xs theme-text-secondary">
            Ориєнтовний розрахунок обладнання та робіт «під ключ».
          </p>
        </div>

        {loadingCalc ? (
          <div className="py-8 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin theme-icon-accent" />
            <span className="text-xs font-semibold theme-text-muted">Завантаження розрахунку...</span>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto pr-1 space-y-4">
            
            {/* Calculation Table */}
            <div className="overflow-x-auto max-h-56 overflow-y-auto rounded-xl border theme-border-subtle shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 z-10">
                  <tr className="border-b theme-border-subtle theme-bg-input font-bold theme-text-primary">
                    <th className="py-2 px-2.5">#</th>
                    <th className="py-2 px-2.5">Найменування</th>
                    <th className="py-2 px-2 text-center">Ціна од.</th>
                    <th className="py-2 px-2 text-center">К-сть</th>
                    <th className="py-2 px-2.5 text-right">Сума ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y theme-border-subtle theme-text-secondary">
                  {calculationData?.items?.map((item, index) => (
                    <tr key={item.id || index} className="hover:theme-bg-input/50 transition-colors">
                      <td className="py-1.5 px-2.5 font-mono font-bold theme-text-accent">{index + 1}</td>
                      <td className="py-1.5 px-2.5 font-medium theme-text-primary">{item.name}</td>
                      <td className="py-1.5 px-2 text-center font-mono theme-text-muted">{item.unit_price}</td>
                      <td className="py-1.5 px-2 text-center font-mono">{item.qty}</td>
                      <td className="py-1.5 px-2.5 text-right font-mono font-bold theme-text-primary">
                        ${item.total_usd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Highlight Banner */}
            <div className="p-3 sm:p-4 rounded-xl border flex items-center justify-between gap-3 theme-badge shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-lg theme-btn-primary flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider opacity-90 block">
                    Загальна Вартість «Під Ключ»
                  </span>
                  <span className="text-[10px] theme-text-secondary">
                    Обладнання, доставка, монтаж та налаштування
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black font-mono tracking-tight theme-text-accent block">
                  ${calculationData?.total_usd?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] font-semibold theme-text-muted block">
                  (~ 567 000 грн)
                </span>
              </div>
            </div>

            {/* Quick Order Form */}
            {submitted ? (
              <div className="p-4 rounded-xl border text-center space-y-2 theme-badge">
                <CheckCircle className="w-10 h-10 mx-auto theme-icon-accent" />
                <h3 className="text-base font-bold theme-text-primary">Заявку Успішно Відправлено!</h3>
                <p className="text-xs theme-text-secondary max-w-sm mx-auto">
                  Чедрик Іван зв'яжеться з вами за вказаним номером для детального узгодження кошторису.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 min-h-[48px] px-5 py-2 text-xs font-bold rounded-xl theme-btn-primary"
                >
                  Закрити вікно
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-3.5 sm:p-4 rounded-xl border theme-border-subtle theme-bg-card space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider theme-text-accent">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Бажаєте отримати такий розрахунок під свій будинок?</span>
                </div>

                {errorMsg && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold mb-1 theme-text-secondary">Ваше Ім'я *</label>
                    <div className="relative flex items-center">
                      <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 theme-icon-accent pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="Олександр"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full min-h-[48px] border rounded-xl pl-8 pr-2.5 py-3 text-xs sm:text-sm focus:outline-none transition-colors theme-bg-input theme-border-subtle theme-border-focus theme-text-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold mb-1 theme-text-secondary">Номер Телефону *</label>
                    <div className="relative flex items-center">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 theme-icon-accent pointer-events-none" />
                      <span className="absolute left-8 font-extrabold text-xs select-none pointer-events-none font-mono theme-text-primary">
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
                        className="w-full min-h-[48px] border rounded-xl pl-[4.8rem] pr-2.5 py-3 text-xs font-mono focus:outline-none transition-colors text-transparent bg-transparent caret-transparent theme-border-subtle theme-border-focus theme-bg-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-grow font-bold text-xs uppercase tracking-wider min-h-[48px] py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 theme-btn-primary hover:scale-[1.01]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Відправка...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 fill-current" />
                        <span>Отримати Кошторис Від Чедрика Івана</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 min-h-[48px] font-semibold text-xs rounded-xl border transition-colors theme-btn-secondary"
                  >
                    Закрити
                  </button>
                </div>
              </form>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

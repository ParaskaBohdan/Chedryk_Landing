import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, User, MessageSquare, Wrench } from 'lucide-react';

export default function ConsultationForm({ selectedServicePrefill, onCloseModal }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: selectedServicePrefill || 'Побудова сонячних станцій (28–60 кВт)',
    comment: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const servicesList = [
    'Побудова сонячних станцій (28–60 кВт)',
    'Гібридні системи Deye та акумулятори',
    'Установка панелей на дах',
    'Супровід документації & Зелений Тариф',
    'Проектування та налагодження електромереж в будівлях',
    'Інше (Загальне запитання)'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setStatus({ type: 'error', message: 'Будь ласка, заповніть ім\'я та номер телефону.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    const apiUrl = import.meta.env.VITE_API_URL || '/api/consultation.php';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: 'success',
          message: result.message || 'Дякуємо! Вашу заявку успішно відправлено.'
        });
        setFormData({ name: '', phone: '', service: servicesList[0], comment: '' });
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
    <div className="glass-panel p-5 sm:p-8 rounded-3xl border border-slate-700 bg-slate-800/90 shadow-2xl max-w-xl mx-auto text-white">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          Замовити Безкоштовну Консультацію
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Залиште контакти — Чедрик Іван зателефонує вам для узгодження деталей та розрахунку.
        </p>
      </div>

      {status?.type === 'success' ? (
        <div className="p-6 rounded-2xl border border-emerald-400/40 bg-emerald-500/15 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-white">Заявку Прийнято!</h4>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-200">{status.message}</p>
          <div className="pt-2">
            <button
              onClick={() => {
                setStatus(null);
                if (onCloseModal) onCloseModal();
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-md"
            >
              Зрозуміло
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {status?.type === 'error' && (
            <div className="p-3.5 bg-rose-500/15 rounded-xl border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-200">
              Ваше Ім'я *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-400" />
              <input
                type="text"
                required
                placeholder="наприклад, Олександр"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-slate-700 bg-slate-900/90 text-white placeholder-slate-400 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-200">
              Номер Телефону *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-400" />
              <input
                type="tel"
                required
                placeholder="+380 (97) 000-00-00"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-slate-700 bg-slate-900/90 text-white placeholder-slate-400 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-200">
              Послуга, яка вас цікавить
            </label>
            <div className="relative">
              <Wrench className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-400" />
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full border border-slate-700 bg-slate-900/90 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              >
                {servicesList.map((srv, idx) => (
                  <option key={idx} value={srv} className="bg-slate-900 text-white">
                    {srv}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-200">
              Коментар або опис об'єкта (необов'язково)
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-400" />
              <textarea
                rows={3}
                placeholder="Потужність, тип даху або площа будівлі..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full border border-slate-700 bg-slate-900/90 text-white placeholder-slate-400 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-orange-bright text-slate-950 font-bold text-sm py-3.5 rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 glow-amber"
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

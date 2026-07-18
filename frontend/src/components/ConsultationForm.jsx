import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, User, MessageSquare, Wrench } from 'lucide-react';

export default function ConsultationForm({ selectedServicePrefill, onCloseModal, theme }) {
  const isDark = theme === 'dark';

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
    'Установка панелей на дах',
    'Установлення систем EcoFlow та акумуляторів',
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
    <div className={`glass-panel p-5 sm:p-8 rounded-3xl border shadow-2xl max-w-xl mx-auto transition-colors ${
      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900 shadow-sky-500/10'
    }`}>
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          Замовити Безкоштовну Консультацію
        </h3>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Залиште контакти — Чедрик Іван зателефонує вам для узгодження деталей та розрахунку.
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
            <div className="relative">
              <Phone className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-500' : 'text-sky-500'}`} />
              <input
                type="tel"
                required
                placeholder="+380 (97) 000-00-00"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Коментар або опис об'єкта (необов'язково)
            </label>
            <div className="relative">
              <MessageSquare className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-500' : 'text-sky-500'}`} />
              <textarea
                rows={3}
                placeholder="Потужність, тип даху або площа будівлі..."
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

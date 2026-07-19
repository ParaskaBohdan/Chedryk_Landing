import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Sun, DollarSign, Battery, Cpu, ShieldCheck } from 'lucide-react';

export default function StatsSection({ theme }) {
  const isDark = theme === 'dark';

  const officialFacts = [
    {
      icon: Sun,
      title: 'Інсоляція регіону',
      stat: '1150–1250 кВт·год/м²',
      desc: 'Закарпатська та Івано-Франківська області є одними з найсприятливіших регіонів Заходу України за сонячною радіацією.'
    },
    {
      icon: DollarSign,
      title: 'Середня окупність СЕС',
      stat: '3.5 – 4.5 Років',
      desc: 'При поточних та прогнозованих тарифах мережеві та гібридні станції від 5 кВт до 1 МВт повністю окупають інвестиції.'
    },
    {
      icon: Battery,
      title: 'Деградація фотомодулів',
      stat: '< 0.55% на рік',
      desc: 'Сучасні N-type Tier-1 сонячні панелі зберігають понад 85% номінальної потужності навіть після 25 років експлуатації.'
    },
    {
      icon: Cpu,
      title: 'ККД Сучасних Інверторів',
      stat: '98.5% Efficiency',
      desc: 'Використання високочастотних інверторів Deye мінімізує втрати під час конвертації струму та зарядки батарей.'
    }
  ];

  return (
    <section id="stats" className={`py-16 sm:py-20 relative overflow-hidden transition-colors duration-300 border-y ${
      isDark ? 'bg-slate-900 text-white border-slate-800' : 'bg-amber-50/40 text-slate-900 border-amber-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${
            isDark ? 'border-amber-400/40 bg-amber-500/15 text-amber-300' : 'border-amber-300 bg-amber-100 text-amber-800'
          }`}>
            <BarChart3 className="w-4 h-4 text-amber-500" />
            <span>Аналітика & Офіційні Дані</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Чому Сонячні Станції 5 кВт – 1 МВт — Вигідне Рішення?
          </h2>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Офіційні фізичні та економічні показники ефективності сонячної енергетики для Закарпаття та Франківщини.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {officialFacts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`glass-card p-5 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDark ? 'border-slate-700/80 bg-slate-800/80 hover:border-amber-400/60' : 'border-amber-200 bg-white hover:border-amber-400 shadow-xs'
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center mb-4 text-amber-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {fact.title}
                  </h3>
                  <p className="text-xl sm:text-2xl font-black mb-2 text-amber-500">
                    {fact.stat}
                  </p>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {fact.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fact Banner */}
        <div className={`mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark ? 'border-slate-700 bg-slate-800/90' : 'border-amber-200 bg-white shadow-xs'
        }`}>
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-500 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Повна відповідність ДБН та стандартам ПУЕ
              </h4>
              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Усі роботи Чедрика Івана виконуються за державними стандартами безпеки електроустановок.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

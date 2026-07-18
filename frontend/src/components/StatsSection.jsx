import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Sun, DollarSign, Battery, Cpu, ShieldCheck } from 'lucide-react';

export default function StatsSection({ theme }) {
  const isDark = theme === 'dark';

  const officialFacts = [
    {
      icon: Sun,
      title: 'Інсоляція на Закарпатті',
      stat: '1150–1250 кВт·год/м²',
      desc: 'Закарпатська область належить до найсприятливіших регіонів України за показниками сонячного випромінювання на рік.'
    },
    {
      icon: DollarSign,
      title: 'Середня окупність СЕС',
      stat: '3.5 – 4.5 Років',
      desc: 'При поточних та прогнозованих тарифах на електроенергію мережеві станції 28–60 кВт повністю окуплять інвестиції.'
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
      stat: '98.5% Ефективності',
      desc: 'Використання високочастотних гібридних інверторів мінімізує втрати під час конвертації постійного струму в змінний.'
    }
  ];

  return (
    <section id="stats" className="py-16 sm:py-20 relative overflow-hidden transition-colors duration-300 border-y theme-bg-section theme-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border theme-badge">
            <BarChart3 className="w-4 h-4 theme-icon-accent" />
            <span>Аналітика & Офіційні Дані</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-normal theme-text-primary">
            Чому Сонячні Станції 28–60 кВт — Вигідне Рішення?
          </h2>
          <p className="text-sm sm:text-lg theme-text-secondary">
            Офіційні фізичні та економічні показники ефективності сонячної енергетики для Закарпатської області.
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
                className="glass-panel p-5 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between theme-bg-card theme-border-card"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border theme-badge">
                    <Icon className="w-5 h-5 theme-icon-accent" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-1 theme-text-muted">
                    {fact.title}
                  </h3>
                  <p className="text-xl sm:text-2xl font-black mb-2 theme-text-accent">
                    {fact.stat}
                  </p>
                  <p className="text-xs leading-relaxed theme-text-secondary">
                    {fact.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fact Banner */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 theme-bg-card theme-border-card">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 mx-auto sm:mx-0 theme-badge">
              <ShieldCheck className="w-6 h-6 theme-icon-accent" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base theme-text-primary">
                Повна відповідність ДБН та стандартам ПУЕ
              </h4>
              <p className="text-xs theme-text-muted">
                Усі роботи Чедрика Івана виконуються за державними стандартами безпеки електроустановок.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

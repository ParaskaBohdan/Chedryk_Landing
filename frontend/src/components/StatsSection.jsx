import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Sun, DollarSign, Battery, Cpu, ShieldCheck } from 'lucide-react';

export default function StatsSection() {
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
      stat: '98.5% Efficiency',
      desc: 'Використання високочастотних гібридних інверторів мінімізує втрати під час конвертації постійного струму в змінний.'
    }
  ];

  return (
    <section id="stats" className="py-20 bg-slate-950 relative overflow-hidden border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold rounded-full">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Аналітика & Офіційні Дані</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Чому Сонячні Станції 28–60 кВт — Вигідне Рішення?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Офіційні фізичні та економічні показники ефективності сонячної енергетики для Закарпатської області.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {officialFacts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                    {fact.title}
                  </h3>
                  <p className="text-xl sm:text-2xl font-black text-amber-400 mb-3">
                    {fact.stat}
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {fact.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fact Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm sm:text-base">Повна відповідність ДБН та стандартам ПУЕ</h4>
              <p className="text-slate-400 text-xs">Усі роботи Чедрика Івана виконуються за державними стандартами безпеки електроустановок.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

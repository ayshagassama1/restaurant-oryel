import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronLeft, ChevronRight, CheckCircle, UtensilsCrossed, Calendar as CalendarIcon, Clock } from 'lucide-react';

const SLOTS_BY_PERIOD = {
  midi: ['12h00', '12h15', '12h30', '12h45', '13h00', '13h15', '13h30'],
  soir: ['19h00', '19h15', '19h30', '19h45', '20h00', '20h15', '20h30', '20h45', '21h00'],
};

const FULL_SLOTS = {
  0: ['12h00', '12h15', '19h30', '19h45', '20h00'],
  1: ['12h30', '19h00', '19h15'],
};

const DAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

function isFull(slot, dateOffset) {
  const full = FULL_SLOTS[dateOffset] || [];
  return full.includes(slot);
}

function formatDateLabel(date) {
  return `${DAYS_FR[date.getDay()]}. ${date.getDate()} ${MONTHS_FR[date.getMonth()].slice(0, 4)}.`;
}

function Calendar({ selectedDate, onSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="text-sm font-semibold text-gray-800">{MONTHS_FR[month]} {year}</span>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
          <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const isPast = date < today;
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === today.toDateString();
          return (
            <button
              key={date.getDate()}
              disabled={isPast}
              onClick={() => !isPast && onSelect(date)}
              className={`
                h-8 w-full rounded-lg text-sm font-medium transition-all
                ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#f0f9f8] cursor-pointer'}
                ${isSelected ? 'bg-[#0D9488] text-white hover:bg-[#0D9488]' : ''}
                ${isToday && !isSelected ? 'text-[#0D9488] font-bold' : ''}
                ${!isSelected && !isPast ? 'text-gray-700' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ReservationForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [covers, setCovers] = useState(2);
  const [coversOpen, setCoversOpen] = useState(false);
  const [dateMode, setDateMode] = useState(null);
  const [customDate, setCustomDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const getSelectedDate = () => {
    if (dateMode === 0) return today;
    if (dateMode === 1) return tomorrow;
    if (dateMode === 'other') return customDate;
    return null;
  };

  const getDateOffset = () => {
    if (dateMode === 0) return 0;
    if (dateMode === 1) return 1;
    return 2;
  };

  const handleOpenModal = () => {
    setStep(1);
    setDateMode(null);
    setSelectedSlot(null);
    setCustomDate(null);
    setShowCalendar(false);
    setForm({ name: '', email: '', phone: '', message: '' });
    setModalOpen(true);
  };

  const handleDateSelect = (mode) => {
    if (mode === 'other') {
      setShowCalendar(!showCalendar);
      setDateMode('other');
    } else {
      setDateMode(mode);
      setShowCalendar(false);
    }
    setSelectedSlot(null);
  };

  const handleCustomDateSelect = (date) => {
    setCustomDate(date);
    setDateMode('other');
    setShowCalendar(false);
    setSelectedSlot(null);
  };

  const canProceedToSlots = dateMode !== null && (dateMode !== 'other' || customDate);
  const selectedDate = getSelectedDate();

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedSlot,
          guests: covers,
          message: form.message || undefined,
        }),
      });
    } catch { }
    setSubmitting(false);
    setStep(4);
  };

  return (
    <>
      <section id="reserver" className="py-16 px-4 bg-secondary/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Réserver une table
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-lg mx-auto">
            Réservation confirmée instantanément selon les créneaux disponibles.
            Pour les groupes de plus de 8 personnes, appelez-nous.
          </p>
        </div>
      </section>

      <button
        onClick={handleOpenModal}
        title="Réserver une table"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-white border-2 border-primary text-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
      >
        <CalendarIcon className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 z-[98] bg-black/40 backdrop-blur-sm"
            />

            {/*
              CORRECTIF CLÉ : le centrage est géré par le wrapper flex (fixed inset-0),
              pas par transform sur le motion.div — ce qui évite le conflit avec
              l'animation scale de Framer Motion.
            */}
            <div className="fixed inset-0 z-[99] flex items-center justify-center pointer-events-none px-4">
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto w-full"
                style={{
                  maxWidth: '420px',
                  maxHeight: 'min(700px, calc(100vh - 2rem))',
                }}
              >
                {/* Header */}
                <div className="bg-primary px-6 py-5 flex items-center justify-between shrink-0">
                  <div>
                    <p className="font-heading text-white font-bold text-lg">Le Botaniste</p>
                    <p className="text-white/70 text-xs font-body mt-0.5">Metz · Cuisine de saison</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 text-xs font-body">FR</span>
                    <button onClick={() => setModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 min-h-0 overscroll-contain">

                  {/* Steps 1 & 2 */}
                  {(step === 1 || step === 2) && (
                    <div className="px-6 py-5 space-y-4">

                      {/* Couverts */}
                      <div className="border border-gray-200 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setCoversOpen(!coversOpen)}
                          className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <UtensilsCrossed className="w-4 h-4 text-gray-500" />
                            <span className="font-body font-semibold text-gray-800 text-sm">
                              {covers} couvert{covers > 1 ? 's' : ''}
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${coversOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {coversOpen && (
                          <div className="border-t border-gray-100 px-4 py-3 grid grid-cols-5 gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                              <button
                                key={n}
                                onClick={() => { setCovers(n); setCoversOpen(false); }}
                                className={`py-2 rounded-xl text-sm font-semibold font-body transition-all ${covers === n ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Date */}
                      <div className="border border-gray-200 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3.5 flex items-center gap-3 border-b border-gray-100">
                          <CalendarIcon className="w-4 h-4 text-gray-500" />
                          <span className="font-body font-semibold text-gray-800 text-sm">
                            {!selectedDate ? 'Choisir une date' : formatDateLabel(selectedDate)}
                          </span>
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-xs text-gray-400 font-body mb-2">Prochaine disponibilité</p>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: DAYS_FR[today.getDay()], sub: "Aujourd'hui", mode: 0 },
                              { label: DAYS_FR[tomorrow.getDay()], sub: 'Demain', mode: 1 },
                              { label: null, sub: 'Autre', mode: 'other', icon: true },
                            ].map(({ label, sub, mode, icon }) => (
                              <button
                                key={mode}
                                onClick={() => handleDateSelect(mode)}
                                className={`py-3 px-2 rounded-xl border-2 text-center transition-all ${
                                  dateMode === mode
                                    ? 'border-primary bg-[#f0f9f8]'
                                    : 'border-gray-100 hover:border-gray-300'
                                }`}
                              >
                                {icon
                                  ? <CalendarIcon className={`w-5 h-5 mx-auto mb-1 ${dateMode === mode ? 'text-primary' : 'text-gray-400'}`} />
                                  : <p className={`text-sm font-bold font-body ${dateMode === mode ? 'text-primary' : 'text-gray-700'}`}>{label}. {today.getDate() + (mode === 1 ? 1 : 0)}</p>
                                }
                                <p className={`text-xs font-body ${dateMode === mode ? 'text-primary' : 'text-gray-400'}`}>{sub}</p>
                              </button>
                            ))}
                          </div>
                          {showCalendar && (
                            <Calendar selectedDate={customDate} onSelect={handleCustomDateSelect} />
                          )}
                        </div>
                      </div>

                      {/* Créneaux */}
                      {canProceedToSlots && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-gray-200 rounded-2xl overflow-hidden"
                        >
                          <div className="px-4 py-3.5 border-b border-gray-100 flex items-center gap-3">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="font-body font-semibold text-gray-800 text-sm">
                              {selectedSlot ? selectedSlot : 'Choisir un créneau'}
                            </span>
                          </div>
                          {['midi', 'soir'].map(period => (
                            <div key={period} className="px-4 py-3 border-b border-gray-50 last:border-0">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2.5">
                                {period === 'midi' ? 'Déjeuner' : 'Dîner'}
                              </p>
                              <div className="grid grid-cols-4 gap-1.5">
                                {SLOTS_BY_PERIOD[period].map(slot => {
                                  const full = isFull(slot, getDateOffset());
                                  const selected = selectedSlot === slot;
                                  return (
                                    <button
                                      key={slot}
                                      disabled={full}
                                      onClick={() => !full && setSelectedSlot(slot)}
                                      className={`py-2 rounded-xl text-xs font-body font-semibold transition-all ${
                                        full
                                          ? 'bg-gray-100 text-gray-300 cursor-not-allowed line-through'
                                          : selected
                                          ? 'bg-primary text-white shadow-md shadow-primary/30'
                                          : 'bg-[#f0f9f8] text-[#0D9488] hover:bg-primary hover:text-white'
                                      }`}
                                    >
                                      {full ? 'Complet' : slot}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {/* CTA */}
                      <button
                        disabled={!selectedSlot}
                        onClick={() => setStep(3)}
                        className={`w-full py-4 rounded-2xl font-body font-semibold text-sm transition-all ${
                          selectedSlot
                            ? 'bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20'
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        Continuer
                      </button>
                    </div>
                  )}

                  {/* Step 3 : infos personnelles */}
                  {step === 3 && (
                    <div className="px-6 py-5 space-y-4">
                      <div className="bg-[#f0f9f8] rounded-2xl px-4 py-3 flex items-center justify-between">
                        <div className="text-sm font-body">
                          <span className="font-semibold text-gray-800">{covers} couvert{covers > 1 ? 's' : ''}</span>
                          <span className="text-gray-400 mx-2">·</span>
                          <span className="text-gray-600">{selectedDate && formatDateLabel(selectedDate)}</span>
                          <span className="text-gray-400 mx-2">·</span>
                          <span className="font-semibold text-primary">{selectedSlot}</span>
                        </div>
                        <button onClick={() => setStep(1)} className="text-xs text-primary font-body font-medium hover:underline">
                          Modifier
                        </button>
                      </div>
                      <div className="space-y-3">
                        {[
                          { field: 'name', label: 'Nom complet', placeholder: 'Jean Dupont', required: true },
                          { field: 'email', label: 'Email', placeholder: 'jean@email.com', type: 'email', required: true },
                          { field: 'phone', label: 'Téléphone (optionnel)', placeholder: '06 12 34 56 78', type: 'tel' },
                        ].map(({ field, label, placeholder, type = 'text', required }) => (
                          <div key={field}>
                            <label className="block text-xs font-semibold text-gray-500 font-body mb-1.5">{label}</label>
                            <input
                              type={type}
                              required={required}
                              placeholder={placeholder}
                              value={form[field]}
                              onChange={(e) => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-body text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                            />
                          </div>
                        ))}
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 font-body mb-1.5">
                            Allergies ou demandes spéciales (optionnel)
                          </label>
                          <textarea
                            placeholder="Intolérance au gluten, anniversaire, chaise bébé..."
                            value={form.message}
                            onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-body text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none h-20"
                          />
                        </div>
                      </div>
                      <button
                        disabled={!form.name || !form.email || submitting}
                        onClick={handleSubmit}
                        className={`w-full py-4 rounded-2xl font-body font-semibold text-sm transition-all ${
                          form.name && form.email && !submitting
                            ? 'bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20'
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {submitting ? 'Réservation en cours...' : 'Confirmer ma réservation'}
                      </button>
                    </div>
                  )}

                  {/* Step 4 : confirmation */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-6 py-10 text-center"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Réservation confirmée</h3>
                      <p className="font-body text-gray-500 text-sm mb-6">
                        {covers} couvert{covers > 1 ? 's' : ''} · {selectedDate && formatDateLabel(selectedDate)} · {selectedSlot}
                      </p>
                      <p className="font-body text-gray-400 text-xs mb-8">
                        Un email de confirmation a été envoyé à {form.email}.
                      </p>
                      <button
                        onClick={() => setModalOpen(false)}
                        className="bg-primary text-white font-body font-semibold px-8 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                      >
                        Fermer
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Footer */}
                {step !== 4 && (
                  <div className="border-t border-gray-100 px-6 py-3 flex items-center justify-center gap-2 shrink-0">
                    <span className="font-body text-xs text-gray-400">Rendu possible par</span>
                    <span className="font-body text-xs font-bold text-gray-500">Zenchef</span>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
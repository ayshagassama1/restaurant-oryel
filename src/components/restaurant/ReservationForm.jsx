import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, CalendarDays } from 'lucide-react';
 
const timeSlots = ['12h00', '12h30', '13h00', '19h00', '19h30', '20h00', '20h30'];
const guestOptions = Array.from({ length: 10 }, (_, i) => i + 1);
 
export default function ReservationForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
 
  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, guests: parseInt(form.guests) }),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      setSubmitted(true);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.');
    } finally {
      setSubmitting(false);
    }
  };
 
  return (
    <section id="reserver" className="py-20 sm:py-28 px-4 bg-secondary/50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">Réserver une table</h2>
          <p className="font-body text-muted-foreground text-base max-w-lg mx-auto">
            Réservation confirmée par email dans les 24h. Pour les groupes de plus de 8 personnes, appelez-nous.
          </p>
        </motion.div>
 
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-10 text-center border border-border"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">Votre table est réservée.</h3>
            <p className="font-body text-muted-foreground">
              Vous recevrez une confirmation par email sous 24h. À bientôt au Botaniste.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-6 sm:p-10 border border-border space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Nom complet</Label>
                <Input required placeholder="Jean Dupont" value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input required type="email" placeholder="jean@email.com" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
              </div>
            </div>
 
            <div className="space-y-2">
              <Label>Téléphone <span className="text-muted-foreground font-normal">(optionnel)</span></Label>
              <Input type="tel" placeholder="06 12 34 56 78" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
            </div>
 
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input required type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Heure</Label>
                <Select value={form.time} onValueChange={(v) => handleChange('time', v)} required>
                  <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Couverts</Label>
                <Select value={form.guests} onValueChange={(v) => handleChange('guests', v)} required>
                  <SelectTrigger><SelectValue placeholder="Nombre" /></SelectTrigger>
                  <SelectContent>
                    {guestOptions.map(n => (
                      <SelectItem key={n} value={String(n)}>{n} {n === 1 ? 'personne' : 'personnes'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
 
            <div className="space-y-2">
              <Label>Message / Allergies <span className="text-muted-foreground font-normal">(optionnel)</span></Label>
              <Textarea placeholder="Intolérance au gluten, anniversaire, chaise bébé..." value={form.message} onChange={(e) => handleChange('message', e.target.value)} className="resize-none h-24" />
            </div>
 
            {error && <p className="text-sm text-red-500 font-body">{error}</p>}
 
            <Button type="submit" disabled={submitting} className="w-full text-base py-6">
              {submitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Envoi en cours...</>
              ) : (
                <><CalendarDays className="w-4 h-4 mr-2" />Réserver ma table</>
              )}
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

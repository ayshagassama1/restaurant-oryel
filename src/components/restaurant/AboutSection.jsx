import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1701878198293-d1f3641efdb3?w=700&q=80',
    alt: 'Léa Bertrand, cheffe du Botaniste',
    caption: 'Léa Bertrand - cheffe & fondatrice',
  },
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80',
    alt: 'La terrasse du Botaniste en été',
    caption: 'La terrasse - ouverte dès mai',
  },
];

export default function AboutSection() {
  return (
    <section id="apropos" className="py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">Notre histoire</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
              Le Botaniste a ouvert ses portes en 2019 dans le quartier Impérial de Metz.
              Notre cuisine s'inspire du marché : chaque semaine, notre cheffe{' '}
              <span className="text-foreground font-medium">Léa Bertrand</span> compose
              une carte qui respecte les saisons et les producteurs locaux. Une adresse
              de quartier, pour les grandes occasions comme pour un déjeuner en semaine.
            </p>

            <div className="space-y-5">
              {[
                { Icon: MapPin, label: 'Adresse', value: '12 rue de la Jardinerie, 57000 Metz' },
                {
                  Icon: Clock,
                  label: 'Horaires',
                  value: 'Mar-Sam : 12h-14h / 19h-22h',
                  value2: 'Dim : 12h-14h | Lun : fermé',
                },
                { Icon: Phone, label: 'Téléphone', value: '03 12 34 56 78' },
              ].map(({ Icon, label, value, value2 }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">{label}</p>
                    <p className="font-body text-muted-foreground text-sm">{value}</p>
                    {value2 && (
                      <p className="font-body text-muted-foreground text-sm">{value2}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-4 pt-2">
                <div className="shrink-0">
                  <img
                    src="/qualite-mosl.jpg"
                    alt="Label Qualité Moselle"
                    className="h-14 w-auto"
                  />
                </div>
                <div className="pt-1">
                  <p className="font-body font-semibold text-foreground text-sm">Label Qualité Moselle</p>
                  <p className="font-body text-muted-foreground text-sm">
                    Établissement certifié pour la qualité de ses produits locaux et de son service.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Photos : cheffe + terrasse */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4 relative"
          >
            {photos.map(({ src, alt, caption }, i) => (
              <motion.div
                key={caption}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className={`flex flex-col gap-2 ${i === 1 ? 'mt-8' : ''}`}
              >
                <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-body text-xs text-muted-foreground text-center italic">
                  {caption}
                </p>
              </motion.div>
            ))}

            {/* Décoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
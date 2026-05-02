import { motion } from 'framer-motion';
import { Leaf, CalendarDays, Sun } from 'lucide-react';

const stats = [
  { value: '100%', label: 'Fait maison' },
  { value: '< 50 km', label: "Rayon d'approvisionnement" },
  { value: '40', label: 'Couverts' },
  { value: '14', label: 'Producteurs partenaires' },
];

const pillars = [
  {
    Icon: Leaf,
    title: 'Produits locaux',
    description:
      'Nos ingrédients viennent de producteurs mosellans et alsaciens que nous connaissons personnellement. Courte distance, vraie qualité.',
  },
  {
    Icon: CalendarDays,
    title: 'Carte de saison',
    description:
      "La carte change chaque semaine selon les arrivages du marché. Léa compose en fonction de ce qui est bon, pas l'inverse.",
  },
  {
    Icon: Sun,
    title: 'Terrasse ombragée',
    description:
      'Dès les beaux jours, notre terrasse ouvre ses portes. Idéale pour un déjeuner en plein air dans le quartier Impérial.',
  },
];

export default function HighlightsSection() {
  return (
    <section id="reserver">

      <div className="bg-stone-950 py-14 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-800"
        >
          {stats.map(({ value, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center py-8 sm:py-0 px-6 text-center"
            >
              <span className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2">
                {value}
              </span>
              <span className="font-body text-xs uppercase tracking-widest text-stone-400">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="bg-background py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto divide-y divide-border">
          {pillars.map(({ Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-6 py-8 group"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="border-l-2 border-primary/20 pl-6 group-hover:border-primary/60 transition-colors">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1.5">
                  {title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
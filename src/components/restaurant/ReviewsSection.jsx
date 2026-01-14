import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
 
const reviews = [
  { name: 'Marie L.', location: 'Metz', date: 'Mars 2026', stars: 5, text: "Le risotto aux champignons était exceptionnel. L'ambiance est parfaite pour un dîner en amoureux, on reviendra." },
  { name: 'Thomas R.', location: 'Nancy', date: 'Février 2026', stars: 5, text: "Service attentionné, carte courte mais chaque plat est une vraie réussite. Le magret de canard, une merveille." },
  { name: 'Sophie M.', location: 'Metz', date: 'Janvier 2026', stars: 5, text: "Très bien pour les allergies au gluten, le personnel prend ça au sérieux. Merci." },
  { name: 'Paul D.', location: 'Thionville', date: 'Mars 2026', stars: 4, text: "Cadre magnifique, cuisine inventive. Un peu difficile de trouver une place le vendredi soir, mais ça vaut la peine de s'organiser." },
];
 
function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? 'fill-amber-400 text-amber-400' : 'fill-border text-border'}`} />
      ))}
    </div>
  );
}
 
export default function ReviewsSection() {
  return (
    <section id="avis" className="py-20 sm:py-28 px-4 bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">Ce que disent nos clients</h2>
        </motion.div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <StarRating count={review.stars} />
              <p className="font-body text-foreground text-sm leading-relaxed mt-4 mb-5">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <p className="font-body font-semibold text-sm text-foreground">{review.name}</p>
                <p className="font-body text-xs text-muted-foreground">{review.location} · {review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

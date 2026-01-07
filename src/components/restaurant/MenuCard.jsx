import { useState } from 'react';
import { motion } from 'framer-motion';
 
const badgeStyles = {
  bestseller: 'bg-amber-400 text-white',
  nouveau: 'bg-primary text-primary-foreground',
};
 
const badgeLabels = {
  bestseller: 'Bestseller',
  nouveau: 'Nouveau',
};
 
export default function MenuCard({ dish, index }) {
  const [hovered, setHovered] = useState(false);
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {dish.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          />
          {dish.badge && (
            <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeStyles[dish.badge]}`}>
              {badgeLabels[dish.badge]}
            </span>
          )}
          {hovered && dish.origin && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs font-body px-3 py-2 backdrop-blur-sm">
              🌿 {dish.origin}
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-heading text-base font-semibold text-foreground">{dish.name}</h3>
          <span className="font-body font-bold text-amber-600 text-sm ml-2 shrink-0">{dish.price}</span>
        </div>
        <p className="font-body text-muted-foreground text-sm leading-relaxed mb-3">{dish.description}</p>
        {dish.tags && dish.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {dish.tags.map(tag => (
              <span key={tag} className="text-xs font-body px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

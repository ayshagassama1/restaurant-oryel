import { motion } from 'framer-motion';
import { Heart, MessageCircle, Instagram } from 'lucide-react';

const posts = [
  {
    src: 'https://images.unsplash.com/photo-1599731316783-665e50c66d55?w=600&q=80',
    likes: 312,
    comments: 18,
    caption: 'Cabillaud du jour, beurre blanc citronné. La pêche durable c\'est pas juste un mot ici.',
  },
  {
    src: 'https://images.unsplash.com/photo-1621341258668-b2bf005a9f97?w=600&q=80',
    likes: 487,
    comments: 34,
    caption: 'Risotto cèpes & girolles des Vosges. Bestseller de la semaine, comme souvent.',
  },
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    likes: 623,
    comments: 41,
    caption: 'La terrasse reprend du service. Venez vite, les places partent vite les midis.',
  },
  {
    src: 'https://images.unsplash.com/photo-1765441012353-10fb4701a276?w=600&q=80',
    likes: 271,
    comments: 12,
    caption: 'Magret rosé, cerises confites, purée de céleri. Simple, local',
  },
  {
    src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80',
    likes: 541,
    comments: 57,
    caption: 'Henri, notre commis de cuisine. La carte de la semaine se dessine là.',
  },
  {
    src: 'https://images.unsplash.com/photo-1600326145308-d7d5a04f4ce6?w=600&q=80',
    likes: 398,
    comments: 29,
    caption: 'Fondant chocolat Valrhona, coulant comme il faut. Encore bestseller.',
  },
  {
    src: 'https://images.unsplash.com/photo-1642699562319-f93601d495b1?w=600&q=80',
    likes: 234,
    comments: 9,
    caption: 'Tarte Tatin revisitée avec les pommes du verger Schmitt en Alsace',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    likes: 705,
    comments: 63,
    caption: 'Vendredi soir complet. Pensez à réserver pour le weekend, on vous attend.',
  },
  {
    src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
    likes: 189,
    comments: 7,
    caption: 'Sélection du chef au verre. Rouge ou blanc selon les arrivages, demandez-nous.',
  },
];

export default function InstagramSection() {
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Instagram className="w-5 h-5 text-primary" />
              <span className="font-heading text-lg font-semibold text-foreground">
                @lebotaniste_metz
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              2 418 abonnés · nos derniers moments en cuisine et en salle
            </p>
          </div>

          <a
            href="https://oryel.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary border border-primary/30 px-5 py-2.5 rounded-full hover:bg-primary/5 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Suivre
          </a>
        </motion.div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group aspect-square rounded-xl overflow-hidden bg-secondary"
            >
              <img
                src={post.src}
                alt={`Post Instagram Le Botaniste ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 p-3">
                <div className="flex items-center gap-5 text-white">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-white" />
                    <span className="font-body text-sm font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span className="font-body text-sm font-semibold">{post.comments}</span>
                  </div>
                </div>
                <p className="font-body text-white text-xs text-center leading-snug line-clamp-3 hidden sm:block">
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
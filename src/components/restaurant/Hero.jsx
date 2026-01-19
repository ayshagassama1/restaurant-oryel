import { motion } from 'framer-motion';
 
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
          alt="Le Botaniste restaurant - cuisine de saison"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>
 
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="text-white/80 text-sm font-body tracking-wide">Restaurant - Metz</span>
          </div>
 
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            Le Botaniste
          </h1>
 
          <p className="font-heading text-xl sm:text-2xl text-white/90 italic mb-3">
            Cuisine de saison. Terrasse. Metz.
          </p>
 
          <p className="font-body text-white/70 text-base sm:text-lg mb-4 max-w-lg mx-auto">
            Ouvert du mardi au dimanche, midi et soir. Réservation recommandée.
          </p>
 
          <p className="font-body text-white/60 text-sm mb-10">
            Sélection Le Républicain Lorrain 2025
          </p>
 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#reserver"
              className="bg-primary text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity"
            >
              Réserver une table
            </a>
            <a
              href="#carte"
              className="border-2 border-white/40 text-white font-body font-semibold px-8 py-3.5 rounded-full text-base hover:bg-white/10 transition-colors"
            >
              Voir la carte
            </a>
          </div>
        </motion.div>
      </div>
 
      <svg className="absolute bottom-0 left-0 w-full text-background" viewBox="0 0 1440 60" fill="currentColor" preserveAspectRatio="none">
        <path d="M0,60 L0,20 Q360,60 720,20 Q1080,-20 1440,20 L1440,60 Z" />
      </svg>
    </section>
  );
}

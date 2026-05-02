import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-primary" />
                <span className="font-heading text-xl font-semibold">Le Botaniste</span>
              </div>
              <p className="font-body text-sm text-background/60 leading-relaxed">
                Restaurant de cuisine de saison au coeur de Metz. Produits locaux, terrasse ombragée, réservation recommandée.
              </p>
              <div className="flex gap-3 mt-5">
                {['instagram', 'facebook'].map((network) => (
                  <a key={network} href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                    <span className="sr-only">{network}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      {network === 'instagram'
                        ? <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        : <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      }
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold mb-5">Contact</h3>
              <div className="space-y-4 font-body text-sm">
                {[
                  { Icon: MapPin, text: '12 rue de la Jardinerie, 57000 Metz' },
                  { Icon: Phone, text: '03 87 12 34 56' },
                  { Icon: Mail, text: 'contact@lebotaniste-metz.fr' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span className="text-background/70">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold mb-5">Nous trouver</h3>
              <div className="rounded-xl overflow-hidden h-44">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=6.17%2C49.11%2C6.18%2C49.12&layer=mapnik"
                  className="w-full h-full border-0"
                  title="Carte Le Botaniste Metz"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-background/40">
            © {new Date().getFullYear()} Le Botaniste. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/mentions-legales"
              className="font-body text-xs text-background/40 hover:text-background/70 transition-colors"
            >
              Mentions légales
            </Link>
            <span className="text-background/20">·</span>
            <p className="font-body text-xs text-background/40">
              Site créé par{' '}
              <a href="https://oryel.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                Oryel
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
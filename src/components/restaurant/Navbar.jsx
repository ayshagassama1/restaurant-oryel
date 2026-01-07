import { useState, useEffect } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
 
const navLinks = [
  { label: 'Notre carte', href: '#carte' },
  { label: 'Réserver', href: '#reserver' },
  { label: 'Avis', href: '#avis' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
];
 
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  return (
    <nav className={`sticky top-0 z-40 font-body transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-heading text-xl font-semibold text-foreground">Le Botaniste</span>
          </a>
 
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reserver"
              className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Réserver une table
            </a>
          </div>
 
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
 
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-1.5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reserver"
                className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full text-center mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Réserver une table
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

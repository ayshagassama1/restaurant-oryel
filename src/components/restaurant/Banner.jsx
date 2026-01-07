import { ExternalLink } from 'lucide-react';
 
export default function Banner() {
  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4 text-center text-sm font-body">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
        <span>Ce site a été créé par Aissatou Gassama. Vous voulez le même pour votre activité ?</span>
        <a
          href="https://oryel.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-white text-primary font-semibold text-xs px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Découvrir Oryel
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';

export default function MentionsLegales() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-body">
      {/* Mini header */}
      <div className="border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="font-heading font-semibold text-sm">Le Botaniste</span>
          </Link>
          <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
            Site de démonstration
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au site
        </Link>

        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Mentions légales</h1>
        <p className="text-sm text-gray-400 mb-6">Dernière mise à jour : mai 2026</p>

        {/* Bandeau démo */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-10">
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-semibold">Ce site est une démonstration fictive</span> réalisée par{' '}
            <a
              href="https://oryel.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-amber-900"
            >
              Oryel
            </a>{' '}
            pour illustrer l'offre "Vitrine + Assistant IA". Le restaurant "Le Botaniste" n'existe pas.
            Aucune réservation ne sera traitée.
          </p>
        </div>

        {/* Éditeur */}
        <section className="mb-10">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-3 pb-2 border-b border-gray-100">
            Éditeur du site
          </h2>
          <div className="text-gray-600 space-y-1 text-sm leading-relaxed">
            <p><span className="font-medium text-gray-700">Raison sociale :</span> Oryel</p>
            <p><span className="font-medium text-gray-700">Représentante :</span> Ndeye Aissatou Gassama</p>
            <p><span className="font-medium text-gray-700">Statut :</span> Auto-entrepreneur</p>
            <p><span className="font-medium text-gray-700">SIREN :</span> 982 878 449</p>
            <p><span className="font-medium text-gray-700">Siège social :</span> 31 Rue Saint-Pierre, 57000 Metz, France</p>
            <p>
              <span className="font-medium text-gray-700">Site principal :</span>{' '}
              <a
                href="https://oryel.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                oryel.dev
              </a>
            </p>
            <p>
              <span className="font-medium text-gray-700">Contact :</span>{' '}
              <a href="mailto:ndeye.aissatou.gassama.sn@gmail.com" className="text-primary hover:underline">
                ndeye.aissatou.gassama.sn@gmail.com
              </a>
            </p>
          </div>
        </section>

        {/* Hébergement */}
        <section className="mb-10">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-3 pb-2 border-b border-gray-100">
            Hébergement
          </h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-1">
            <p><span className="font-medium text-gray-700">Prestataire :</span> Amazon Web Services (AWS)</p>
            <p><span className="font-medium text-gray-700">Services utilisés :</span> Amazon S3, Amazon CloudFront, AWS Lambda</p>
            <p><span className="font-medium text-gray-700">Région :</span> Europe (Paris) - eu-west-3</p>
          </div>
        </section>

        {/* Données & formulaire */}
        <section className="mb-10">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-3 pb-2 border-b border-gray-100">
            Données personnelles et formulaires
          </h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-3">
            <p>
              Ce site comporte un formulaire de réservation à titre de démonstration. Les données saisies
              ne sont <span className="font-medium">ni stockées ni transmises</span> à un tiers.
              Le chatbot IA est alimenté par l'API Groq, les messages ne sont pas conservés.
            </p>
            <p>
              Pour toute question relative à la protection des données, consultez la politique de
              confidentialité d'Oryel :{' '}
              <a
                href="https://oryel.dev/mentions-legales"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                oryel.dev/mentions-legales
              </a>
            </p>
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section className="mb-10">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-3 pb-2 border-b border-gray-100">
            Propriété intellectuelle
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Le design, le code source et le contenu de ce site de démonstration sont la propriété
            exclusive d'Oryel - Aissatou Gassama. Le nom "Le Botaniste" et les visuels associés sont
            fictifs et réservés à cet usage de démonstration.
          </p>
        </section>

        <div className="pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Démonstration réalisée par{' '}
            <a
              href="https://oryel.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Oryel
            </a>{' '}
            · SIREN 982 878 449
          </p>
        </div>
      </div>
    </div>
  );
}
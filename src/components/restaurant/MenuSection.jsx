import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuCard from './MenuCard';
 
const menuData = {
  entrees: [
    {
      name: 'Velouté de potimarron',
      description: 'Velouté onctueux de potimarron, crème fraîche et graines de courge torréfiées.',
      price: '9€',
      tags: ['Végétarien', 'Sans gluten'],
      badge: 'bestseller',
      origin: 'Potimarron de la ferme Lecomte, Moselle',
      image: 'https://images.unsplash.com/photo-1696721497505-f1fdb13925ba?w=600&q=80',
    },
    {
      name: 'Tartare de thon rouge',
      description: 'Thon rouge frais, avocat crémeux, citron vert et coriandre. Servi avec des croûtons maison.',
      price: '13€',
      tags: [],
      badge: 'nouveau',
      origin: "Thon rouge du Pacifique, Label Rouge",
      image: 'https://images.unsplash.com/photo-1755156593680-d684c0517dc1?w=600&q=80',
    },
    {
      name: 'Tarte à la tomate et mozzarella',
      description: 'Tomates de saison, mozzarella de bufflon, basilic et huile d\'olive.',
      price: '13€',
      tags: ['Végétarien'],
      badge: 'nouveau',
      origin: "Tomates du jardin, Mozzarella de bufflon, Alsace",
      image: 'https://images.unsplash.com/photo-1722162141238-890628ed95e4?w=600&q=80',
    },
  ],
  plats: [
    {
      name: 'Filet de cabillaud',
      description: 'Cabillaud rôti, beurre blanc au citron et légumes de saison rôtis au thym.',
      price: '22€',
      tags: ['Sans gluten'],
      origin: 'Pêche durable, filière Label Rouge',
      image: 'https://images.unsplash.com/photo-1599731316783-665e50c66d55?w=600&q=80',
    },
    {
      name: 'Risotto aux champignons des bois',
      description: 'Risotto crémeux aux cèpes et girolles, copeaux de parmesan et huile de truffe.',
      price: '18€',
      tags: ['Végétarien'],
      badge: 'bestseller',
      origin: 'Champignons sauvages des Vosges',
      image: 'https://images.unsplash.com/photo-1621341258668-b2bf005a9f97?w=600&q=80',
    },
    {
      name: 'Magret de canard',
      description: 'Magret de canard rosé, sauce aux cerises, purée de céleri et légumes glacés.',
      price: '26€',
      tags: ['Sans gluten'],
      origin: 'Canard du Gers, élevage fermier',
      image: 'https://images.unsplash.com/photo-1765441012353-10fb4701a276?w=600&q=80',
    },
  ],
  desserts: [
    {
      name: 'Tarte Tatin revisitée',
      description: 'Pommes caramélisées sur pâte feuilletée croustillante, boule de glace vanille.',
      price: '8€',
      tags: ['Végétarien'],
      origin: 'Pommes du verger Schmitt, Alsace',
      image: 'https://images.unsplash.com/photo-1642699562319-f93601d495b1?w=600&q=80',
    },
    {
      name: 'Fondant au chocolat',
      description: 'Cœur coulant au chocolat noir, crème anglaise à la vanille bourbon.',
      price: '7€',
      tags: ['Végétarien'],
      badge: 'bestseller',
      origin: "Chocolat Valrhona 70%, origine Équateur",
      image: 'https://images.unsplash.com/photo-1600326145308-d7d5a04f4ce6?w=600&q=80',
    },
    {
      name: 'Assiette de fromages affinés',
      description: 'Sélection de trois fromages affinés, miel, noix et pain aux figues.',
      price: '10€',
      tags: ['Sans gluten'],
      origin: 'Fromagerie Remy, Metz',
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&q=80',
    },
  ],
  boissons: [
    { name: 'Eau minérale', description: 'Plate ou gazeuse, 75cl.', price: '3€', tags: ['Végétarien', 'Sans gluten', 'Sans lactose'] },
    { name: 'Vin au verre', description: "Sélection du chef - rouge ou blanc, selon les arrivages.", price: '6€', tags: ['Végétarien', 'Sans gluten', 'Sans lactose'] },
    { name: 'Jus de fruits frais', description: 'Orange, pomme ou fruits rouges, pressé à la commande.', price: '5€', tags: ['Végétarien', 'Sans gluten', 'Sans lactose'] },
    { name: 'Café', description: 'Expresso, allongé ou noisette.', price: '2,50€', tags: ['Végétarien', 'Sans gluten', 'Sans lactose'] },
  ],
};
 
const categories = [
  { key: 'entrees', label: 'Entrées' },
  { key: 'plats', label: 'Plats' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'boissons', label: 'Boissons' },
];
 
const allergenFilters = ['Végétarien', 'Sans gluten', 'Sans lactose'];
 
export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('entrees');
  const [activeFilters, setActiveFilters] = useState([]);
 
  const toggleFilter = (filter) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };
 
  const filteredDishes = menuData[activeCategory].filter(dish => {
    if (activeFilters.length === 0) return true;
    return activeFilters.every(f => dish.tags && dish.tags.includes(f));
  });
 
  return (
    <section id="carte" className="py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">Notre Carte</h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Des produits locaux, une cuisine qui change au fil des saisons.
          </p>
        </motion.div>
 
        <Tabs value={activeCategory} onValueChange={(v) => { setActiveCategory(v); setActiveFilters([]); }} className="mb-6">
          <TabsList className="mx-auto flex w-fit">
            {categories.map(cat => (
              <TabsTrigger key={cat.key} value={cat.key}>{cat.label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
 
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allergenFilters.map(filter => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`font-body text-sm px-4 py-1.5 rounded-full border transition-all duration-200 ${
                activeFilters.includes(filter)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish, index) => (
              <MenuCard key={dish.name} dish={dish} index={index} />
            ))
          ) : (
            <p className="col-span-3 text-center font-body text-muted-foreground py-10">
              Aucun plat ne correspond à ces filtres dans cette catégorie.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}


import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import MiniCart from '@/components/cart/MiniCart';

const CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "lighting", name: "Lighting" },
  { id: "furniture", name: "Furniture" },
  { id: "decor", name: "Decor" },
  { id: "textiles", name: "Textiles" }
];

const Shop = () => {
  const { category } = useParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('newest');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  useEffect(() => {
    if (category) {
      setActiveCategory(category.toLowerCase());
    }
  }, [category]);
  
  // For demo purposes, we'll simulate opening the cart from the header
  useEffect(() => {
    const handleCartClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[aria-label="Shopping cart"]')) {
        e.preventDefault();
        setIsCartOpen(true);
      }
    };
    
    document.addEventListener('click', handleCartClick);
    return () => document.removeEventListener('click', handleCartClick);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4 border-y">
          <div className="page-container">
            <div className="flex text-sm text-gray-600">
              <Link to="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link to="/shop" className="hover:text-black transition-colors">
                Shop
              </Link>
              {activeCategory !== 'all' && (
                <>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <span className="text-black">
                    {CATEGORIES.find(c => c.id === activeCategory)?.name || activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Page header */}
        <div className="py-8 bg-white">
          <div className="page-container">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-light mb-2">
                {activeCategory === 'all' 
                  ? 'Shop All Products' 
                  : CATEGORIES.find(c => c.id === activeCategory)?.name || activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              </h1>
              <p className="text-gray-600">
                Discover our collection of thoughtfully designed products that combine form and function in perfect harmony.
              </p>
            </div>
          </div>
        </div>
        
        {/* Product filtering and sorting */}
        <div className="border-y">
          <div className="page-container">
            <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
              {/* Category tabs (desktop) */}
              <div className="hidden md:block">
                <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="bg-transparent h-auto p-0 space-x-2">
                    {CATEGORIES.map(category => (
                      <TabsTrigger 
                        key={category.id}
                        value={category.id}
                        className="text-sm px-3 py-1 rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Mobile filter toggle */}
              <div className="md:hidden">
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between"
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                >
                  <span>Filter & Sort</span>
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Sort options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <Select
                  value={sort}
                  onValueChange={(value) => setSort(value as any)}
                >
                  <SelectTrigger className="h-9 w-[180px] text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Mobile filters (collapsible) */}
            {isFilterVisible && (
              <div className="py-4 border-t md:hidden">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="space-y-1">
                    {CATEGORIES.map(category => (
                      <button
                        key={category.id}
                        className={`block w-full text-left py-1 px-2 text-sm rounded ${
                          activeCategory === category.id
                            ? 'bg-black text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Products */}
        <div className="py-12 bg-white">
          <div className="page-container">
            <ProductGrid 
              filter={activeCategory === 'all' ? undefined : activeCategory} 
              sort={sort}
            />
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Mini Cart */}
      <MiniCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
};

export default Shop;

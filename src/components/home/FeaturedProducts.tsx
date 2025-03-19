
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { cn } from '@/lib/utils';

// Mock product data
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Minimalist Desk Lamp",
    price: 89.99,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1507643179773-3e975d7ac515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80",
    isNew: true,
    isBestseller: true
  },
  {
    id: 2,
    name: "Ergonomic Chair",
    price: 299.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    name: "Concrete Planter",
    price: 49.99,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    isNew: true,
    isBestseller: false
  },
  {
    id: 4,
    name: "Wall Clock",
    price: 69.99,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    isNew: false,
    isBestseller: false
  }
];

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
}

const FeaturedProducts = ({
  title = "Featured Products",
  subtitle = "Browse our selection of bestsellers and new arrivals"
}: FeaturedProductsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('featured-products');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section 
      id="featured-products" 
      className="py-20 bg-white"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal-animation">
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-light mb-4 transition-all duration-700 delay-75",
              isVisible ? "opacity-100 translate-y-0" : ""
            )}
          >
            {title}
          </h2>
          <p 
            className={cn(
              "text-gray-600 transition-all duration-700 delay-150",
              isVisible ? "opacity-100 translate-y-0" : ""
            )}
          >
            {subtitle}
          </p>
        </div>
        
        <div 
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12",
            isVisible ? "opacity-100" : "opacity-0",
            "transition-opacity duration-1000"
          )}
        >
          {FEATURED_PRODUCTS.map((product, idx) => (
            <div 
              key={product.id} 
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${idx * 100 + 200}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div 
          className={cn(
            "text-center transition-all duration-700 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Button 
            asChild
            variant="outline" 
            className="group"
          >
            <Link to="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

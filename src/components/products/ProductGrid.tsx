
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

// Mock product data for shop page
const ALL_PRODUCTS = [
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
  },
  {
    id: 5,
    name: "Ceramic Vase",
    price: 59.99,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2001&q=80",
    isNew: true,
    isBestseller: false
  },
  {
    id: 6,
    name: "Wooden Side Table",
    price: 129.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    isNew: false,
    isBestseller: true
  },
  {
    id: 7,
    name: "Pendant Light",
    price: 159.99,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    isNew: false,
    isBestseller: true
  },
  {
    id: 8,
    name: "Wool Throw Blanket",
    price: 79.99,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1532301791573-4e6ce86a085f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isNew: true,
    isBestseller: false
  }
];

interface ProductGridProps {
  filter?: string;
  sort?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest';
  limit?: number;
}

const ProductGrid = ({ filter, sort = 'newest', limit }: ProductGridProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Filter products by category if filter is provided
  const filteredProducts = filter 
    ? ALL_PRODUCTS.filter(product => product.category.toLowerCase() === filter.toLowerCase())
    : ALL_PRODUCTS;
  
  // Sort products based on sort parameter
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'newest':
      default:
        // For simplicity, we'll assume that products with isNew flag or lower IDs are newer
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return a.id - b.id;
    }
  });
  
  // Apply limit if provided
  const displayProducts = limit ? sortedProducts.slice(0, limit) : sortedProducts;
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('product-grid');
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
  
  if (displayProducts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No products found matching your criteria.</p>
      </div>
    );
  }
  
  return (
    <div 
      id="product-grid" 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
    >
      {displayProducts.map((product, idx) => (
        <div 
          key={product.id}
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: `${Math.min(idx * 100, 800)}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };
  
  return (
    <div 
      className="group relative h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/product/${product.id}`} 
        className="flex flex-col h-full"
      >
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
          {/* Badge indicators */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="default" className="bg-black text-white hover:bg-black">
                New
              </Badge>
            )}
            {product.isBestseller && (
              <Badge variant="secondary" className="bg-white text-black hover:bg-gray-100">
                Bestseller
              </Badge>
            )}
          </div>
          
          {/* Action buttons that appear on hover */}
          <div 
            className={cn(
              "absolute right-2 top-2 z-10 flex flex-col gap-2 transition-all duration-300 ease-in-out",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            )}
          >
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white hover:bg-gray-100 text-black border-transparent shadow-subtle"
              onClick={handleWishlist}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white hover:bg-gray-100 text-black border-transparent shadow-subtle"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
          
          {/* Product Image with hover animation */}
          <div className="aspect-square overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className={cn(
                "object-cover w-full h-full transition-all duration-500 ease-in-out",
                isHovered ? "scale-105" : "scale-100",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {/* Loading placeholder */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </div>
          
          {/* Quick view overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/90 text-black hover:bg-white"
            >
              <Eye className="h-4 w-4 mr-1" />
              Quick View
            </Button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <div className="mb-1 text-sm text-gray-500">
            {product.category}
          </div>
          <h3 className="text-base font-medium mb-1 group-hover:text-black transition-colors">
            {product.name}
          </h3>
          <div className="mt-auto text-base">
            ${product.price.toFixed(2)}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

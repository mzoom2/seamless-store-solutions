
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronRight, Minus, Plus, Heart, Share2, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import MiniCart from '@/components/cart/MiniCart';
import { Separator } from '@/components/ui/separator';

// Mock product data
const PRODUCT = {
  id: 1,
  name: "Minimalist Desk Lamp",
  price: 89.99,
  description: "Our signature desk lamp combines clean lines with practical design. The adjustable arm and energy-efficient LED bulb provide perfect task lighting, while the minimalist profile adds modern elegance to any workspace.",
  details: "Crafted from solid brass with a matte black finish. Features touch-sensitive controls with three brightness settings. The lamp head rotates 180 degrees and the arm extends up to 15 inches.",
  features: [
    "Dimmable LED with 50,000 hour lifespan",
    "Solid brass construction with quality craftsmanship",
    "Weighted base for stability",
    "Touch-sensitive controls",
    "Energy efficient design",
    "2 year warranty"
  ],
  specs: {
    "Dimensions": "16\" H x 5\" W x 20\" D",
    "Weight": "3.6 lbs",
    "Material": "Solid brass, steel components",
    "Finish": "Matte black",
    "Bulb": "Built-in 9W LED (included)",
    "Power": "AC adapter with 6ft cord",
    "Certifications": "UL Listed, Energy Star"
  },
  images: [
    "https://images.unsplash.com/photo-1507643179773-3e975d7ac515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80",
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80"
  ],
  category: "Lighting",
  rating: 4.8,
  reviewCount: 124,
  isInStock: true,
  variations: {
    colors: ["Black", "Brass", "Silver"]
  }
};

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(Array(PRODUCT.images.length).fill(false));
  const { toast } = useToast();
  
  // For a real app, we would fetch the product data based on the ID
  // But for this demo, we'll use the mock data
  
  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${PRODUCT.name} (${selectedColor}) × ${quantity} has been added to your cart.`,
    });
    
    // In a real app, we would add the product to the cart
    // For this demo, we'll just open the mini cart
    setIsCartOpen(true);
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${PRODUCT.name} has been added to your wishlist.`,
    });
  };
  
  const handleImageLoad = (index: number) => {
    const newLoadedState = [...isImageLoaded];
    newLoadedState[index] = true;
    setIsImageLoaded(newLoadedState);
  };
  
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
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link 
                to={`/shop/${PRODUCT.category.toLowerCase()}`} 
                className="hover:text-black transition-colors"
              >
                {PRODUCT.category}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-black">
                {PRODUCT.name}
              </span>
            </div>
          </div>
        </div>
        
        {/* Product details */}
        <section className="py-12 bg-white">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product images */}
              <div className="space-y-4">
                {/* Main image */}
                <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg">
                  {!isImageLoaded[selectedImage] && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
                  <img 
                    src={PRODUCT.images[selectedImage]} 
                    alt={PRODUCT.name} 
                    className={`object-cover w-full h-full transition-opacity duration-300 ${
                      isImageLoaded[selectedImage] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(selectedImage)}
                  />
                </div>
                
                {/* Thumbnail gallery */}
                <div className="grid grid-cols-4 gap-4">
                  {PRODUCT.images.map((image, idx) => (
                    <button 
                      key={idx}
                      className={`aspect-square overflow-hidden bg-gray-100 rounded transition-all ${
                        idx === selectedImage 
                          ? 'ring-2 ring-black' 
                          : 'hover:opacity-80'
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img 
                        src={image} 
                        alt={`${PRODUCT.name} - View ${idx + 1}`} 
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product info */}
              <div className="space-y-6">
                {/* Basic details */}
                <div>
                  <h1 className="text-3xl font-light mb-2">{PRODUCT.name}</h1>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`h-4 w-4 ${
                            idx < Math.floor(PRODUCT.rating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : idx < PRODUCT.rating 
                                ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                                : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {PRODUCT.rating} ({PRODUCT.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="text-2xl font-medium">${PRODUCT.price.toFixed(2)}</p>
                </div>
                
                <p className="text-gray-600">{PRODUCT.description}</p>
                
                {/* Color selector */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Color</h3>
                  <div className="flex space-x-3">
                    {PRODUCT.variations.colors.map(color => (
                      <button 
                        key={color}
                        className={`group relative h-10 px-4 flex items-center justify-center border rounded-full transition-all ${
                          selectedColor === color 
                            ? 'border-black font-medium' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {selectedColor === color && (
                          <span className="absolute inset-0 border-2 border-black rounded-full animate-scale-in" />
                        )}
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity and add to cart */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex border border-gray-200 rounded-md">
                    <button
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-black transition-colors disabled:opacity-50"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="w-14 h-12 flex items-center justify-center border-x border-gray-200">
                      {quantity}
                    </div>
                    <button
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full"
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleAddToWishlist}
                      className="w-full"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                  </div>
                </div>
                
                {/* Stock status and shipping */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3 mb-3">
                    <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Free Shipping</p>
                      <p className="text-sm text-gray-600">Free standard shipping on orders over $75</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 mb-3">
                    <RotateCcw className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Free Returns</p>
                      <p className="text-sm text-gray-600">30-day money back guarantee</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium">2 Year Warranty</p>
                      <p className="text-sm text-gray-600">Our quality promise to you</p>
                    </div>
                  </div>
                </div>
                
                {/* Share buttons */}
                <div className="flex items-center pt-2">
                  <span className="text-sm text-gray-600 mr-3">Share:</span>
                  <div className="flex space-x-4">
                    <button className="text-gray-500 hover:text-black transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Product tabs */}
        <section className="py-12 bg-white border-t">
          <div className="page-container">
            <Tabs defaultValue="details" className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <TabsList className="bg-transparent h-auto">
                  <TabsTrigger value="details" className="text-sm data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="specifications" className="text-sm data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-sm data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">
                    Reviews ({PRODUCT.reviewCount})
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="details" className="space-y-6">
                <p className="text-gray-600">
                  {PRODUCT.details}
                </p>
                <h3 className="text-lg font-medium">Features</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {PRODUCT.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="specifications" className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(PRODUCT.specs).map(([key, value], idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 py-3">
                      <div className="font-medium">{key}</div>
                      <div className="sm:col-span-2 text-gray-600">{value}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`h-4 w-4 ${
                              idx < Math.floor(PRODUCT.rating) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : idx < PRODUCT.rating 
                                  ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                                  : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        Based on {PRODUCT.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                <Separator />
                
                {/* Sample reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Alex Johnson",
                      rating: 5,
                      date: "3 months ago",
                      comment: "This lamp is exactly what I was looking for. The design is sleek and modern, and the light quality is excellent. It's also very sturdy and well-made. Highly recommend!"
                    },
                    {
                      name: "Sarah Miller",
                      rating: 4,
                      date: "1 month ago",
                      comment: "Beautiful design and excellent build quality. The only reason I'm giving 4 stars instead of 5 is that I wish it had more brightness settings. Otherwise, it's perfect!"
                    },
                    {
                      name: "Michael Chen",
                      rating: 5,
                      date: "2 weeks ago",
                      comment: "Exceeded my expectations in every way. The materials are premium, the design is timeless, and it functions perfectly. Worth every penny."
                    }
                  ].map((review, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${
                                    i < review.rating 
                                      ? 'text-yellow-400 fill-yellow-400' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">Verified Purchase</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Related products */}
        <section className="py-12 bg-gray-50">
          <div className="page-container">
            <h2 className="text-2xl font-light mb-8 text-center">You May Also Like</h2>
            <ProductGrid limit={4} />
          </div>
        </section>
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

export default Product;

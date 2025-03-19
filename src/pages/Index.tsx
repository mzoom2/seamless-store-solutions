
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import MiniCart from '@/components/cart/MiniCart';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Track scrolling for animation triggers
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      
      <main className="flex-1">
        <Hero />
        
        {/* Shop by category section */}
        <section className="py-20 bg-white">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-light mb-4">Shop by Category</h2>
              <p className="text-gray-600">
                Explore our collections of thoughtfully designed products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Lighting",
                  description: "Illuminate your space with modern elegance",
                  image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                  link: "/shop/lighting"
                },
                {
                  title: "Furniture",
                  description: "Pieces that combine form and function",
                  image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                  link: "/shop/furniture"
                },
                {
                  title: "Decor",
                  description: "The finishing touches for a complete space",
                  image: "https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
                  link: "/shop/decor"
                }
              ].map((category, idx) => (
                <Link 
                  key={idx} 
                  to={category.link}
                  className="group relative overflow-hidden rounded-lg transition-all duration-500 ease-in-out"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/30 z-10" />
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                    <div className="bg-white/90 backdrop-blur-xs rounded-lg p-4 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                      <h3 className="text-xl font-medium mb-1">{category.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                      <div className="flex items-center text-sm font-medium text-black">
                        Shop Now
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        
        {/* Feature banner */}
        <section className="py-20 bg-gray-50">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1916&q=80" 
                  alt="Modern workspace with minimalist design" 
                  className="rounded-lg shadow-elevated"
                />
              </div>
              <div className="space-y-6">
                <span className="inline-block text-sm uppercase tracking-widest py-1 px-3 bg-black/5 rounded-full">
                  Design Philosophy
                </span>
                <h2 className="text-3xl md:text-4xl font-light leading-tight">
                  Function and simplicity, beautifully balanced
                </h2>
                <p className="text-gray-600">
                  Our products are designed with intention, removing the unnecessary to focus on what matters. We believe in sustainable materials, timeless aesthetics, and exceptional craftsmanship.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    {
                      title: "Thoughtful Design",
                      description: "Every detail serves a purpose"
                    },
                    {
                      title: "Quality Materials",
                      description: "Built to last for generations"
                    },
                    {
                      title: "Sustainable Process",
                      description: "Mindful of our environmental impact"
                    },
                    {
                      title: "Timeless Aesthetic",
                      description: "Never goes out of style"
                    }
                  ].map((feature, idx) => (
                    <div key={idx} className="space-y-1">
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <Button 
                    asChild
                    variant="outline" 
                    className="group"
                  >
                    <Link to="/about">
                      Learn About Our Process
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Testimonials />
        <Newsletter />
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

export default Index;

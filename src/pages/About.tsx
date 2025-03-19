
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MiniCart from '@/components/cart/MiniCart';
import Newsletter from '@/components/home/Newsletter';

const About = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({
    section1: false,
    section2: false,
    section3: false,
  });
  
  useEffect(() => {
    const handleScroll = () => {
      const elements = {
        section1: document.getElementById('about-section-1'),
        section2: document.getElementById('about-section-2'),
        section3: document.getElementById('about-section-3'),
      };
      
      Object.entries(elements).forEach(([key, element]) => {
        if (element) {
          const position = element.getBoundingClientRect();
          if (position.top < window.innerHeight * 0.75) {
            setIsVisible(prev => ({ ...prev, [key]: true }));
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
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
      
      <main className="flex-1 pt-24">
        {/* Hero section */}
        <section className="relative flex items-center bg-gray-50 py-20 md:py-28">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-light mb-6 animate-fade-in">Our Story</h1>
              <p className="text-lg text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
                We create objects that blend form and function in perfect harmony. Every product tells a story of craftsmanship, thoughtful design, and materials chosen to last.
              </p>
              <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <Button asChild className="group">
                  <Link to="/shop">
                    Explore Our Products
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Vision section */}
        <section 
          id="about-section-1" 
          className="py-20 bg-white"
        >
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div 
                className={cn(
                  "transition-all duration-1000 delay-100",
                  isVisible.section1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                )}
              >
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80" 
                  alt="Workspace with minimalist design" 
                  className="rounded-lg shadow-elevated"
                />
              </div>
              <div 
                className={cn(
                  "space-y-6 transition-all duration-1000 delay-300",
                  isVisible.section1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                )}
              >
                <div className="inline-block">
                  <Separator className="w-20 h-[2px] bg-black mb-6" />
                </div>
                <h2 className="text-3xl font-light">Our Vision</h2>
                <p className="text-gray-600">
                  We believe that design should simplify and enhance everyday life. Our vision is to create products that are both beautiful and functional, employing the principles of minimalist design to reduce complexity and focus on what truly matters.
                </p>
                <p className="text-gray-600">
                  By stripping away unnecessary elements, we reveal the essence of each product, creating objects that will remain relevant and useful for generations. We approach each design decision with intention and purpose, placing equal importance on aesthetics and utility.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Process section */}
        <section 
          id="about-section-2" 
          className="py-20 bg-gray-50"
        >
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div 
                className={cn(
                  "order-2 lg:order-1 space-y-6 transition-all duration-1000 delay-100",
                  isVisible.section2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                )}
              >
                <div className="inline-block">
                  <Separator className="w-20 h-[2px] bg-black mb-6" />
                </div>
                <h2 className="text-3xl font-light">Our Process</h2>
                <p className="text-gray-600">
                  Every product begins with a clear problem to solve or a need to fulfill. Our designers explore multiple approaches, constantly refining and distilling their concepts until arriving at the purest solution. We prototype extensively, testing materials and manufacturing techniques to ensure both beauty and durability.
                </p>
                <p className="text-gray-600">
                  We work with skilled artisans and manufacturers who share our commitment to quality and attention to detail. Many of our products are made by hand, combining traditional craftsmanship with modern production methods to create objects of lasting value.
                </p>
              </div>
              <div 
                className={cn(
                  "order-1 lg:order-2 transition-all duration-1000 delay-300",
                  isVisible.section2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                )}
              >
                <img 
                  src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Product creation process" 
                  className="rounded-lg shadow-elevated"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section 
          id="about-section-3" 
          className="py-20 bg-white"
        >
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div 
                className={cn(
                  "inline-block transition-all duration-700",
                  isVisible.section3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <Separator className="w-20 h-[2px] bg-black mx-auto mb-6" />
              </div>
              <h2 
                className={cn(
                  "text-3xl font-light mb-4 transition-all duration-700 delay-100",
                  isVisible.section3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                Our Values
              </h2>
              <p 
                className={cn(
                  "text-gray-600 transition-all duration-700 delay-200",
                  isVisible.section3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                These core principles guide everything we do, from product development to customer service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality",
                  description: "We select premium materials and employ exacting standards throughout our manufacturing process. Every product is built to last, both physically and aesthetically."
                },
                {
                  title: "Simplicity",
                  description: "We believe in removing the unnecessary to focus on what matters. Our designs are clean and intuitive, eliminating complexity in favor of clarity and purpose."
                },
                {
                  title: "Sustainability",
                  description: "We seek to minimize our environmental impact by using sustainable materials, reducing waste in production, and creating products designed to last for generations."
                },
                {
                  title: "Innovation",
                  description: "While respecting traditional craftsmanship, we constantly explore new materials, technologies, and approaches to improve both form and function."
                },
                {
                  title: "Transparency",
                  description: "We believe in honest communication about our products, pricing, and production methods. We share the story behind each design and the people who create it."
                },
                {
                  title: "Community",
                  description: "We value the craftspeople, designers, and customers who form our community. We strive to create meaningful connections and support the regions where our products are made."
                }
              ].map((value, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "space-y-3 transition-all duration-700",
                    isVisible.section3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${300 + idx * 100}ms` }}
                >
                  <h3 className="text-xl font-medium">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-20 bg-gray-50">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-block">
                <Separator className="w-20 h-[2px] bg-black mx-auto mb-6" />
              </div>
              <h2 className="text-3xl font-light mb-4">Our Team</h2>
              <p className="text-gray-600">
                Meet the passionate individuals bringing our vision to life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Michael Chen",
                  role: "Founder & Creative Director",
                  bio: "With over 15 years of experience in product design, Michael leads our creative vision and ensures that every product meets our exacting standards.",
                  image: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                },
                {
                  name: "Sarah Johnson",
                  role: "Head of Design",
                  bio: "Sarah brings a unique perspective to our team, combining her background in architecture with a passion for everyday objects that enhance our living spaces.",
                  image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                },
                {
                  name: "David Patel",
                  role: "Production Manager",
                  bio: "David works closely with our manufacturing partners to ensure that our designs are produced with precision and care, maintaining quality at every step.",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                }
              ].map((member, idx) => (
                <div key={idx} className="group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
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

export default About;

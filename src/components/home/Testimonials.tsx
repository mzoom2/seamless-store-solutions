
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Mock testimonial data
const TESTIMONIALS = [
  {
    id: 1,
    quote: "The attention to detail in these products is unmatched. Every purchase feels like an investment in quality that will last for years.",
    author: "Sarah Johnson",
    title: "Interior Designer"
  },
  {
    id: 2,
    quote: "Elegant, functional, and remarkably well-crafted. The minimalist aesthetic perfectly complements my home office setup.",
    author: "Michael Chen",
    title: "Architect"
  },
  {
    id: 3,
    quote: "I appreciate how each piece serves both form and function. These are products designed by people who truly understand good design.",
    author: "Emma Rodriguez",
    title: "Creative Director"
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const goToTestimonial = (index: number) => {
    if (index === currentTestimonial) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setIsTransitioning(false);
    }, 400);
  };
  
  const nextTestimonial = () => {
    goToTestimonial((currentTestimonial + 1) % TESTIMONIALS.length);
  };
  
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [currentTestimonial]);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('testimonials');
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
      id="testimonials" 
      className="py-20 bg-gray-50"
    >
      <div className="page-container">
        <div 
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex justify-center items-center mb-10">
            <Separator className="w-8 bg-gray-300" />
            <span className="mx-4 text-sm uppercase tracking-widest text-gray-500">What Our Customers Say</span>
            <Separator className="w-8 bg-gray-300" />
          </div>
          
          <div className="relative min-h-[200px]">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={testimonial.id}
                className={cn(
                  "absolute top-0 left-0 w-full transition-all duration-500 ease-in-out",
                  idx === currentTestimonial && !isTransitioning 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8 pointer-events-none"
                )}
              >
                <blockquote className="mb-8">
                  <p className="text-xl md:text-2xl font-light text-gray-800 italic">
                    "{testimonial.quote}"
                  </p>
                </blockquote>
                <div className="flex flex-col items-center">
                  <cite className="not-italic font-medium text-black">
                    {testimonial.author}
                  </cite>
                  <span className="text-sm text-gray-500">
                    {testimonial.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-3 mt-10">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300 ease-in-out",
                  idx === currentTestimonial 
                    ? "bg-black scale-150" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                onClick={() => goToTestimonial(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

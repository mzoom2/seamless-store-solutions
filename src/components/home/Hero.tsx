
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Minimalist product showcase"
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80",
    alt: "Clean, modern product arrangement"
  },
  {
    src: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Premium lifestyle product display"
  }
];

interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

const Hero = ({
  title = "Designed for Perfection",
  subtitle = "Discover our collection of thoughtfully crafted products that blend form and function in perfect harmony.",
  buttonText = "Shop Now",
  buttonLink = "/shop"
}: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startSlideshow = () => {
    intervalRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const textTimer = setTimeout(() => setIsTextVisible(true), 300);
    return () => clearTimeout(textTimer);
  }, []);

  useEffect(() => {
    startSlideshow();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startSlideshow();
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background images slideshow */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((image, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out bg-black",
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div className="absolute inset-0 bg-black/30 z-20" />
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
              onLoad={() => {
                if (idx === 0) setIsLoaded(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div 
        className={cn(
          "relative z-30 text-white max-w-3xl mx-auto px-4 text-center transform transition-all duration-1000 ease-out",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}
      >
        <div className="space-y-6">
          <span className="inline-block text-sm uppercase tracking-widest py-1 px-3 border border-white/20 backdrop-blur-sm rounded-full opacity-0 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            New Collection
          </span>
          
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight transition-all duration-700",
              isTextVisible ? "opacity-100 transform-none" : "opacity-0 -translate-y-4"
            )}
          >
            {title}
          </h1>
          
          <p 
            className={cn(
              "max-w-lg mx-auto text-base md:text-lg text-white/80 transition-all duration-700 delay-100",
              isTextVisible ? "opacity-100 transform-none" : "opacity-0 -translate-y-4"
            )}
          >
            {subtitle}
          </p>
          
          <div 
            className={cn(
              "pt-4 transition-all duration-700 delay-200",
              isTextVisible ? "opacity-100 transform-none" : "opacity-0 -translate-y-4"
            )}
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-white group"
            >
              <Link to={buttonLink}>
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            className={cn(
              "w-12 h-1 rounded-full transition-all duration-300 ease-in-out",
              idx === currentSlide 
                ? "bg-white" 
                : "bg-white/30 hover:bg-white/50"
            )}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

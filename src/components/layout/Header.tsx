
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Search, ShoppingBag, Menu, X, ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavLink = ({ 
  to, 
  children, 
  isMobile = false
}: { 
  to: string; 
  children: React.ReactNode; 
  isMobile?: boolean;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "relative px-3 py-2 text-sm transition-colors duration-300 hover:text-black",
        isActive 
          ? "text-black font-medium" 
          : "text-gray-600",
        isMobile 
          ? "block w-full py-3 px-4 text-base border-b border-gray-100" 
          : "inline-flex items-center",
        "link-underline"
      )}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out py-4",
        isScrolled 
          ? "glass-effect py-3 shadow-subtle" 
          : "bg-transparent"
      )}
    >
      <div className="page-container">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-black"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link 
              to="/" 
              className={cn(
                "inline-block font-medium text-xl tracking-tight transition-all",
                isScrolled ? "text-black" : "text-gray-900"
              )}
            >
              BRAND
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-sm text-gray-600 transition-colors duration-300 hover:text-black group-hover:text-black link-underline">
                Shop
                <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link to="/shop/category1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Category 1
                </Link>
                <Link to="/shop/category2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Category 2
                </Link>
                <Link to="/shop/category3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Category 3
                </Link>
              </div>
            </div>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="text-gray-700 hover:text-black"
            >
              <Search className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Shopping cart"
                className="text-gray-700 hover:text-black"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-scale-in">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-white transform transition-transform duration-300 ease-in-out pt-16",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="overflow-y-auto py-4">
          <div className="px-5 py-2">
            <nav className="flex flex-col space-y-1">
              <NavLink to="/" isMobile>Home</NavLink>
              
              <div className="py-3 px-4 text-base border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shop</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="mt-2 pl-4 border-l border-gray-100 flex flex-col space-y-2">
                  <Link to="/shop/category1" className="py-2 text-sm text-gray-600">
                    Category 1
                  </Link>
                  <Link to="/shop/category2" className="py-2 text-sm text-gray-600">
                    Category 2
                  </Link>
                  <Link to="/shop/category3" className="py-2 text-sm text-gray-600">
                    Category 3
                  </Link>
                </div>
              </div>
              
              <NavLink to="/about" isMobile>About</NavLink>
              <NavLink to="/contact" isMobile>Contact</NavLink>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity"
          onClick={toggleMobileMenu}
        />
      )}
    </header>
  );
};

export default Header;

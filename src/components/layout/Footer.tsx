
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-100 pt-16 pb-8 bg-white">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">BRAND</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Premium quality products designed with attention to detail and crafted with the finest materials.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Shop column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/all-products" className="text-sm text-gray-600 hover:text-black transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop/new-arrivals" className="text-sm text-gray-600 hover:text-black transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop/bestsellers" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/shop/sale" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* About column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <p className="text-sm text-gray-600">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form 
              className="pt-2 flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
              }}
            >
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 absolute ml-3" />
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="pl-10"
                  required
                />
              </div>
              <Button type="submit" className="w-full group">
                Subscribe 
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="pt-8 border-t border-gray-100 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} BRAND. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              <Link to="/privacy-policy" className="text-xs text-gray-600 hover:text-black transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-xs text-gray-600 hover:text-black transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping-policy" className="text-xs text-gray-600 hover:text-black transition-colors">
                Shipping Policy
              </Link>
              <Link to="/refund-policy" className="text-xs text-gray-600 hover:text-black transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

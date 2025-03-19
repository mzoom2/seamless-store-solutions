
import { Link } from 'react-router-dom';
import { Package, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminHeader = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <span className="font-bold text-xl">ShopAdmin</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link to="/">View Store</Link>
          </Button>
          
          {isAdmin ? (
            <Button asChild variant="outline">
              <Link to="/admin/dashboard">
                <User className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link to="/admin">
                <User className="mr-2 h-4 w-4" />
                Admin Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

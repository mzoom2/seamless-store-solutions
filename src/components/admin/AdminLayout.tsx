
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, PlusCircle, BarChart, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in as admin
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white w-full md:w-64 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <Package className="h-6 w-6" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
            onClick={() => navigate('/admin/dashboard')}
          >
            <BarChart className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
            onClick={() => navigate('/admin/products')}
          >
            <Package className="mr-2 h-5 w-5" />
            Products
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
            onClick={() => navigate('/admin/add-product')}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Product
          </Button>
        </nav>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:text-white hover:bg-gray-800 mt-auto"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

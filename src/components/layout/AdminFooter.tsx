
import { Package } from 'lucide-react';

const AdminFooter = () => {
  return (
    <footer className="w-full border-t bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Package className="h-5 w-5" />
            <span className="font-bold">Shop Admin Panel</span>
          </div>
          
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Your Store. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;

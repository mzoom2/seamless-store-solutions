
import { BarChart, Package, ShoppingBag, Users } from 'lucide-react';

const AdminDashboard = () => {
  // Dummy stats
  const stats = [
    { title: 'Total Products', value: '8', icon: Package, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Orders', value: '25', icon: ShoppingBag, color: 'bg-green-100 text-green-600' },
    { title: 'Total Customers', value: '142', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { title: 'Revenue', value: '$4,258', icon: BarChart, color: 'bg-yellow-100 text-yellow-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                  <th className="py-3 text-right text-sm font-medium text-gray-500">Amount</th>
                  <th className="py-3 text-right text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#1234', customer: 'John Doe', amount: '$120.50', status: 'Completed' },
                  { id: '#1235', customer: 'Jane Smith', amount: '$75.99', status: 'Processing' },
                  { id: '#1236', customer: 'Robert Johnson', amount: '$249.00', status: 'Shipped' },
                  { id: '#1237', customer: 'Emily Davis', amount: '$89.50', status: 'Pending' },
                ].map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 text-sm">{order.id}</td>
                    <td className="py-3 text-sm">{order.customer}</td>
                    <td className="py-3 text-sm text-right">{order.amount}</td>
                    <td className="py-3 text-sm text-right">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Product</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Category</th>
                  <th className="py-3 text-right text-sm font-medium text-gray-500">Price</th>
                  <th className="py-3 text-right text-sm font-medium text-gray-500">Stock</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Minimalist Desk Lamp', category: 'Lighting', price: '$89.99', stock: '15' },
                  { name: 'Ergonomic Chair', category: 'Furniture', price: '$299.99', stock: '8' },
                  { name: 'Concrete Planter', category: 'Decor', price: '$49.99', stock: '24' },
                  { name: 'Wall Clock', category: 'Decor', price: '$69.99', stock: '12' },
                ].map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 text-sm">{product.name}</td>
                    <td className="py-3 text-sm">{product.category}</td>
                    <td className="py-3 text-sm text-right">{product.price}</td>
                    <td className="py-3 text-sm text-right">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useContext } from 'react';
import myContext from '../../context/data/MyContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, loading, orders } = context;

  // Group orders by date
  const groupOrdersByDate = (orders) => {
    const userOrders = orders.filter(obj => obj.userid === userid);
    const grouped = {};
    
    userOrders.forEach(order => {
      const date = new Date(order.date).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(order);
    });
    
    return grouped;
  };

  // Calculate total price for an order
  const calculateOrderTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + Number(item.price)*item.quantity, 0).toFixed(2);
  };

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <Layout>
      {loading && <Loader />}
      {orders.length > 0 ? (
          <div className="h-full pt-10 px-4">
          {Object.entries(groupedOrders).map(([date, dateOrders]) => (
              <div key={date} className="mb-8">
                  
              <h2 className="text-xl font-bold mb-4" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                Orders from {date}
              </h2>
              {dateOrders.map((order, orderIndex) => (
                <div key={orderIndex} className="mb-6">
                  <div className="mx-auto max-w-5xl">
                    <div className="p-4 rounded-t-lg" style={{ 
                      backgroundColor: mode === 'dark' ? 'rgb(68 82 101)' : '#F3F4F6',
                      color: mode === 'dark' ? 'white' : 'black'
                    }}>
                      <p className="font-semibold">
                        Order Total: ₹{calculateOrderTotal(order.cartItems)}
                      </p>
                    </div>
                    {order.cartItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-white rounded-none last:rounded-b-lg shadow-md" style={{ 
                        backgroundColor: mode === 'dark' ? '#282c34' : 'white',
                        color: mode === 'dark' ? 'white' : 'black'
                      }}>
                        <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                          <img loading="lazy"  
                            src={item.imageUrl} 
                            alt={item.title}
                            className="w-full sm:w-40 h-40 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600" style={{ color: mode === 'dark' ? '#E5E7EB' : '' }}>
                              {item.description}
                            </p>
                            <p className="mt-2 font-semibold" style={{ color: mode === 'dark' ? '#E5E7EB' : '' }}>
                            ₹{item.price}
                            </p>
                            <p className="mt-2 " style={{ color: mode === 'dark' ? '#E5E7EB' : '' }}>
                            Quantity : {item.quantity}
                            </p>
                            <p className="mt-2 " style={{ color: mode === 'dark' ? '#E5E7EB' : '' }}>
                            Total price : ₹{item.quantity*item.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders Found</h2>
      )}
    </Layout>
  );
}

export default Order;
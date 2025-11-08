import React, { useState } from 'react';
import {
  ArrowLeft, Pill, ShoppingCart, Search, Truck, Clock, MapPin, CreditCard
} from 'lucide-react';
import './PrescriptionsPage.css';

const PrescriptionsPage = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const medicines = [
    { id: 1, name: 'Paracetamol 500mg', price: 5.99, category: 'Pain Relief', stock: 150, image: '💊' },
    { id: 2, name: 'Amoxicillin 250mg', price: 12.99, category: 'Antibiotic', stock: 80, image: '💊' },
    { id: 3, name: 'Ibuprofen 200mg', price: 7.99, category: 'Pain Relief', stock: 120, image: '💊' },
    { id: 4, name: 'Vitamin D3 1000IU', price: 15.99, category: 'Supplement', stock: 200, image: '💊' },
    { id: 5, name: 'Omeprazole 20mg', price: 18.99, category: 'Digestive', stock: 90, image: '💊' },
    { id: 6, name: 'Cetirizine 10mg', price: 8.99, category: 'Allergy', stock: 110, image: '💊' }
  ];

  const recentOrders = [
    { id: 1, date: '2024-11-05', items: 3, status: 'Delivered', total: 45.97 },
    { id: 2, date: '2024-10-28', items: 2, status: 'In Transit', total: 28.98 },
    { id: 3, date: '2024-10-15', items: 5, status: 'Delivered', total: 62.95 }
  ];

  const addToCart = (medicine) => {
    const existing = cart.find(item => item.id === medicine.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CheckoutModal = ({ onClose }) => (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <h3>Checkout</h3>
        <div className="checkout-section">
          <div className="checkout-block">
            <div className="checkout-header">
              <MapPin size={20} />
              <h4>Delivery Address</h4>
            </div>
            <textarea placeholder="Enter your complete delivery address..."></textarea>
          </div>

          <div className="checkout-block">
            <div className="checkout-header">
              <CreditCard size={20} />
              <h4>Payment Method</h4>
            </div>
            <select>
              <option>Credit/Debit Card</option>
              <option>Cash on Delivery</option>
              <option>Digital Wallet</option>
              <option>Insurance</option>
            </select>
          </div>

          <div className="checkout-summary">
            <h4>Order Summary</h4>
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="checkout-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className="place-btn"
            onClick={() => {
              alert('Order placed successfully!');
              setCart([]);
              onClose();
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="prescriptions-page">
      <header className="header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <ArrowLeft size={20} /> Back to Home
        </button>
        <h1>Online Pharmacy</h1>
        <div className="cart-icon">
          <ShoppingCart size={24} />
          {cart.length > 0 && <span>{cart.length}</span>}
        </div>
      </header>

      <section className="hero">
        <h2>Online Prescriptions</h2>
        <p>Upload prescriptions & get medicines delivered to your doorstep</p>
      </section>

      <div className="tabs">
        {['upload', 'browse', 'orders'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'upload' && '📤 Upload Prescription'}
            {tab === 'browse' && '🔍 Browse Medicines'}
            {tab === 'orders' && '📦 My Orders'}
          </button>
        ))}
      </div>

      <div className="content">
        {activeTab === 'upload' && (
          <div className="upload-section">
            <div className="upload-box">
              <Pill size={64} />
              <h3>Upload Your Prescription</h3>
              <p>Drag & drop or click to upload (PDF, JPG, PNG)</p>
              <button className="choose-file-btn">Choose File</button>
            </div>

            <div className="upload-info">
              <div className="info-box blue">
                <Clock size={20} />
                <div>
                  <h4>Quick Processing</h4>
                  <p>Our pharmacists verify prescriptions within 2 hours</p>
                </div>
              </div>
              <div className="info-box green">
                <Truck size={20} />
                <div>
                  <h4>Fast Delivery</h4>
                  <p>Get medicines delivered within 24–48 hours</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'browse' && (
          <div className="browse-section">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="medicine-grid">
              {filteredMedicines.map(med => (
                <div key={med.id} className="medicine-card">
                  <div className="medicine-image">{med.image}</div>
                  <span className="medicine-category">{med.category}</span>
                  <h3>{med.name}</h3>
                  <div className="medicine-details">
                    <span className="price">${med.price}</span>
                    <span className="stock">{med.stock} in stock</span>
                  </div>
                  <button onClick={() => addToCart(med)} className="add-btn">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="cart-bar">
                <div>
                  <p>{cart.length} items in cart</p>
                  <h3>${cartTotal.toFixed(2)}</h3>
                </div>
                <div>
                  <button className="clear-btn" onClick={() => setCart([])}>Clear Cart</button>
                  <button className="checkout-btn" onClick={() => setShowCheckout(true)}>Checkout</button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            {recentOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p>{order.date}</p>
                  </div>
                  <span className={order.status === 'Delivered' ? 'status delivered' : 'status transit'}>
                    {order.status}
                  </span>
                </div>
                <div className="order-footer">
                  <div className="order-info">
                    <p>Items: {order.items}</p>
                    <p>Total: ${order.total}</p>
                  </div>
                  <button className="details-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </div>
  );
};

export default PrescriptionsPage;

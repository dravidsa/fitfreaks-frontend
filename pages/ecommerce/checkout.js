import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/global/layout';
import InnerPageLayout from '../../components/inner-page-layout';
import { useCart } from '../../contexts/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    // Shipping details
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment details
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would make an API call to process payment
    alert('Order placed successfully! Thank you for your purchase.');
    clearCart();
    router.push('/');
  };
  
  if (cart.length === 0) {
    return (
      <Layout title="Checkout">
        <InnerPageLayout title="Checkout" />
        <div className="section-padding">
          <div className="container text-center py-5">
            <h3 className="mb-4">Your cart is empty</h3>
            <p className="mb-4">You need to add some products to your cart before checking out.</p>
            <Link href="/ecommerce" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Checkout">
      <InnerPageLayout title="Checkout" />
      <div className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <h3>Your Cart</h3>
                  {cart.map(item => {
                    const price = parseFloat(item.price.replace('$', ''));
                    const itemTotal = price * item.quantity;
                    
                    return (
                      <div key={item.id} className="d-flex align-items-center mb-3 p-2 border-bottom">
                        <div className="me-3">
                          <Image 
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={60}
                            style={{objectFit: 'cover'}}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="mb-0">{item.name}</h5>
                          <p className="mb-0 small text-muted">
                            By {item.coach?.name || 'Unknown Coach'}
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="input-group input-group-sm me-3" style={{width: '100px'}}>
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input 
                              type="text" 
                              className="form-control text-center" 
                              value={item.quantity}
                              readOnly
                            />
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <div className="text-end" style={{minWidth: '80px'}}>
                            ${itemTotal.toFixed(2)}
                          </div>
                          <button 
                            className="btn btn-sm text-danger ms-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="d-flex justify-content-between mt-3">
                    <span className="fw-bold">Total:</span>
                    <span className="fw-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="card-body">
                  <h3 className="mb-4">Shipping & Payment</h3>
                  <form onSubmit={handleSubmit}>
                    <h5 className="mb-3">Shipping Information</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-5">
                        <label htmlFor="city" className="form-label">City</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="state" className="form-label">State</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="zipCode" className="form-label">Zip</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <h5 className="mb-3">Payment Information</h5>
                    <div className="row g-3">
                      <div className="col-12">
                        <label htmlFor="cardName" className="form-label">Name on Card</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="cardNumber" className="form-label">Card Number</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="expiry" className="form-label">Expiration Date</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="XXX"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button type="submit" className="btn btn-primary btn-lg w-100">
                        Complete Purchase
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-3">Order Summary</h4>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax:</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Total:</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>
                  
                  <Link href="/ecommerce" className="btn btn-outline-secondary w-100 mb-2">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
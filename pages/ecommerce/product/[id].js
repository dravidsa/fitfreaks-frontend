import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../../components/global/layout';
import InnerPageLayout from '../../../components/inner-page-layout';
import { useCart } from '../../../contexts/CartContext';
import coaches from '../../../data/coaches';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { cart, total, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [coach, setCoach] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    if (id) {
      // Find the product and its coach
      for (const c of coaches) {
        if (c.products) {
          const p = c.products.find(product => product.id.toString() === id);
          if (p) {
            setProduct(p);
            setCoach(c);
            break;
          }
        }
      }
    }
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      // Add coach info to the product
      const productWithCoach = {
        ...product,
        coach: {
          id: coach.id,
          name: coach.name,
          slug: coach.slug
        },
        quantity
      };
      
      addToCart(productWithCoach);
    }
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/ecommerce/checkout');
  };
  
  if (!product || !coach) {
    return (
      <Layout title="Product Details">
        <InnerPageLayout title="Product Details" />
        <div className="section-padding">
          <div className="container">
            <div className="text-center py-5">
              <p>Loading product details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Calculate the total number of items in cart
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  return (
    <Layout title={product.name}>
      <InnerPageLayout title="Product Details" />
      <div className="section-padding">
        <div className="container position-relative">
          {/* Simplified Cart Summary */}
          <div className="position-absolute top-0 end-0" style={{ zIndex: 100 }}>
            <div className="card shadow-sm">
              <div className="card-body p-3 d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-shopping-cart me-2"></i>
                  <span className="fw-bold">{itemCount}</span> items
                </div>
                <div className="ms-3 text-primary fw-bold">
                  ${total.toFixed(2)}
                </div>
                <Link href="/ecommerce/checkout" className="btn btn-primary btn-sm ms-3">
                  Checkout
                </Link>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <Link href={`/ecommerce/coach/${coach.slug}`} className="btn btn-outline-secondary">
                <i className="fas fa-arrow-left me-2"></i>
                Back to {coach.name}'s Products
              </Link>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card">
                <Image 
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  width={600}
                  height={400}
                  style={{objectFit: 'cover'}}
                />
              </div>
            </div>
            
            <div className="col-lg-6">
              <h1 className="mb-2">{product.name}</h1>
              <div className="d-flex align-items-center mb-3">
                <p className="me-3 mb-0">By:</p>
                <Link href={`/coaches/${coach.slug}`} className="text-decoration-none">
                  <div className="d-flex align-items-center">
                    <Image 
                      src={coach.profileImage}
                      alt={coach.name}
                      width={40}
                      height={40}
                      className="rounded-circle me-2"
                    />
                    <span>{coach.name}</span>
                  </div>
                </Link>
              </div>
              
              <h2 className="text-primary mb-4">{product.price}</h2>
              
              <p className="mb-4">
                This comprehensive resource provides everything you need to improve your fitness journey.
                Created by professional coach {coach.name}, this {product.name.toLowerCase()} delivers
                expert guidance and practical tips to help you achieve your goals.
              </p>
              
              <div className="d-flex align-items-center mb-4">
                <div className="input-group me-3" style={{maxWidth: '150px'}}>
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    className="form-control text-center" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="d-flex mb-4">
                <button 
                  className="btn btn-outline-primary me-2 px-4"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button 
                  className="btn btn-primary px-4"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
              
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Product Details</h5>
                  <ul className="list-unstyled">
                    <li><strong>Format:</strong> Digital Download</li>
                    <li><strong>Access:</strong> Immediate after purchase</li>
                    <li><strong>Support:</strong> Email assistance included</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/global/layout';
import InnerPageLayout from '../../components/inner-page-layout';
import { useCart } from '../../contexts/CartContext';
import coaches from '../../data/coaches';

export default function AllProductsPage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Get all unique coach categories
  const coachCategories = [...new Set(coaches.map(coach => coach.categoryId))];
  
  // Flatten all products from all coaches and add coach information
  const allProducts = coaches.reduce((products, coach) => {
    if (coach.products && coach.products.length > 0) {
      const coachProducts = coach.products.map(product => ({
        ...product,
        coach: {
          id: coach.id,
          name: coach.name,
          slug: coach.slug,
          categoryId: coach.categoryId
        }
      }));
      return [...products, ...coachProducts];
    }
    return products;
  }, []);
  
  // Filter products by category if needed
  const filteredProducts = activeCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.coach.categoryId.toString() === activeCategory);
  
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  return (
    <Layout title="FitFreaks Store - All Products">
      <InnerPageLayout title="FitFreaks Store" />
      <div className="section-padding">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-6">
              <h2>All Products</h2>
            </div>
            <div className="col-md-6 text-md-end">
              <Link href="/ecommerce/checkout" className="btn btn-primary">
                <i className="fas fa-shopping-cart me-2"></i>
                Checkout
              </Link>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-3">
              <div className="card mb-4">
                <div className="card-body">
                  <h4>Categories</h4>
                  <div className="list-group">
                    <button 
                      className={`list-group-item list-group-item-action ${activeCategory === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveCategory('all')}
                    >
                      All Products
                    </button>
                    {coachCategories.map(catId => (
                      <button
                        key={catId}
                        className={`list-group-item list-group-item-action ${activeCategory === catId.toString() ? 'active' : ''}`}
                        onClick={() => setActiveCategory(catId.toString())}
                      >
                        {catId === 1 ? 'Running' : 
                         catId === 2 ? 'Swimming' : 
                         catId === 3 ? 'Cycling' :
                         catId === 4 ? 'Yoga' :
                         catId === 5 ? 'Gym' : 'Nutrition'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-9">
              <div className="row">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
                      <div className="card h-100">
                        <Image 
                          src={product.image}
                          className="card-img-top"
                          alt={product.name}
                          width={300}
                          height={200}
                          style={{objectFit: 'cover'}}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text text-muted small">By {product.coach.name}</p>
                          <p className="card-text text-primary fw-bold">{product.price}</p>
                          <div className="d-flex justify-content-between">
                            <Link href={`/ecommerce/product/${product.id}`} className="btn btn-outline-primary">
                              Details
                            </Link>
                            <button 
                              className="btn btn-primary"
                              onClick={() => handleAddToCart(product)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <p>No products found in this category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
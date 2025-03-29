import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../../components/global/layout';
import InnerPageLayout from '../../../components/inner-page-layout';
import { useCart } from '../../../contexts/CartContext';
import { getCoachBySlug } from '../../../data/coaches';

export default function CoachProductsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart } = useCart();
  
  const coach = getCoachBySlug(slug);
  
  if (!coach) {
    return (
      <Layout title="Coach Not Found">
        <InnerPageLayout title="Coach Not Found" />
        <div className="section-padding">
          <div className="container text-center">
            <h2>Coach not found</h2>
            <button className="btn btn-primary mt-3" onClick={() => router.back()}>
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleAddToCart = (product) => {
    // Add coach info to the product
    const productWithCoach = {
      ...product,
      coach: {
        id: coach.id,
        name: coach.name,
        slug: coach.slug
      }
    };
    
    addToCart(productWithCoach);
  };
  
  return (
    <Layout title={`${coach.name}'s Products`}>
      <InnerPageLayout title={`${coach.name}'s Products`} />
      <div className="section-padding">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-6">
              <Link href="/ecommerce" className="btn btn-outline-secondary mb-3">
                <i className="fas fa-arrow-left me-2"></i>
                Back to All Products
              </Link>
            </div>
            <div className="col-md-6 text-md-end">
              <Link href="/ecommerce/checkout" className="btn btn-primary">
                <i className="fas fa-shopping-cart me-2"></i>
                Checkout
              </Link>
            </div>
          </div>
          
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body d-flex align-items-center">
                  <Image 
                    src={coach.profileImage}
                    alt={coach.name}
                    width={80}
                    height={80}
                    className="rounded-circle me-3"
                  />
                  <div>
                    <h3 className="mb-0">{coach.name}</h3>
                    <p className="text-muted mb-0">{coach.tagline}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            {coach.products && coach.products.length > 0 ? (
              coach.products.map(product => (
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
                <p>No products available from this coach.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 
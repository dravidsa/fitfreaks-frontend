import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from "../../components/global/layout";
import InnerPageLayout from "../../components/inner-page-layout";
import EventCarousel from "../../components/EventCarousel";
import Testimonial from "../../components/testimonial";
import CoachHero from "../../components/CoachHero";
import { getCoachBySlug } from '../../data/coaches';
import coachCategories from '../../data/coachCategories';
import Link from 'next/link'

var name = "Coach Details" ; 

export default function CoachSinglePage() {
  const router = useRouter();
  const [coach, setCoach] = useState(null);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch coach data when router is ready and slug is available
    if (router.isReady) {
      const { slug } = router.query;
      console.log( "slug is coach page is " + slug );
      const coachData = getCoachBySlug(slug);
      setCoach(coachData);
      
      if (coachData) {
        const categoryData = coachCategories.find(cat => cat.id === coachData.categoryId);
        setCategory(categoryData);
      }
      
      setIsLoading(false);
    }
  }, [router.isReady, router.query]);

  if (isLoading) {
    return (
      <Layout title="Loading...">
        <InnerPageLayout title="Loading..." />
        <div className="section-padding">
          <div className="container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading coach profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!coach) {
    return (
      <Layout title="Coach Not Found">
        <InnerPageLayout title="Coach Not Found" />
        <div className="section-padding">
          <div className="container text-center">
            <h2>Coach not found</h2>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => router.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div>
      <Layout title={coach.name}>
        <InnerPageLayout title={coach.name} />
        <CoachHero 
          image={coach.heroImage}
          name={coach.name}
          tagline={coach.tagline}
          category={category?.name}
          coachId={coach.id}
        />
        <div className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <Image 
                          src={coach.profileImage}
                          className="rounded-circle border border-primary"
                          alt={coach.name}
                          width={80}
                          height={80}
                        />
                      </div>
                      <div>
                        <p className="text-muted mb-0">{category?.name} Coach</p>
                        <div className="mt-1">
                          <i className="fas fa-map-marker-alt me-2 text-primary"></i>{coach.location}
                        </div>
                      </div>
                    </div>
                    
                    <p>{coach.description}</p>
                  </div>
                </div>
                
                {coach.services && coach.services.length > 0 ? (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="card-title">Services Offered</h3>
                      <div className="list-group">
                        {coach.services.map(service => (
                          <div className="list-group-item d-flex justify-content-between align-items-center" key={service.id}>
                            <span>{service.name}</span>
                            <span className="badge bg-primary rounded-pill">{service.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="card-title">Services Offered</h3>
                      <p className="text-muted">No services listed at this time.</p>
                    </div>
                  </div>
                )}
                
                {coach.events && coach.events.length > 0 ? (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="card-title">Upcoming Events</h3>
                      <EventCarousel events={coach.events} />
                    </div>
                  </div>
                ) : (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="card-title">Upcoming Events</h3>
                      <p className="text-muted">No upcoming events at this time.</p>
                    </div>
                  </div>
                )}
                
                {coach.testimonials && coach.testimonials.length > 0 ? (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="card-title">Client Testimonials</h3>
                      <div className="list-group">
                        {coach.testimonials.map(testimonial => (
                          <div className="list-group-item border-0" key={testimonial.id}>
                            <div className="d-flex mb-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <i key={i} className="fas fa-star text-warning me-1"></i>
                              ))}
                            </div>
                            <p className="fst-italic">"{testimonial.text}"</p>
                            <div className="text-end">- {testimonial.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="card-title">Client Testimonials</h3>
                      <p className="text-muted">No testimonials yet.</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Contact Information</h3>
                    <ul className="list-group list-group-flush">
                      {coach.contact?.email && (
                        <li className="list-group-item">
                          <i className="fas fa-envelope me-2"></i>
                          <a href={`mailto:${coach.contact.email}`}>{coach.contact.email}</a>
                        </li>
                      )}
                      {coach.contact?.phone && (
                        <li className="list-group-item">
                          <i className="fas fa-phone me-2"></i>
                          <a href={`tel:${coach.contact.phone}`}>{coach.contact.phone}</a>
                        </li>
                      )}
                      {coach.contact?.social && Object.keys(coach.contact.social).length > 0 && (
                        <>
                          {Object.entries(coach.contact.social).map(([platform, handle]) => (
                            <li className="list-group-item" key={platform}>
                              <i className={`fab fa-${platform} me-2`}></i>
                              {handle}
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="card mb-4 bg-light">
                  <div className="card-body">
                    <h3 className="card-title">Request Coaching</h3>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input type="text" className="form-control" id="name" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" id="message" rows="3"></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary w-100">Send Request</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products section - Full width */}
            {coach.products && coach.products.length > 0 && (
              <div className="row mt-4">
                <div className="col-12">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="card-title">Products & Resources</h3>
                      <div className="row">
                        {coach.products.map(product => (
                          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                            <div className="card h-100">
                              {product.image && (
                                <Image
                                  src={product.image}
                                  className="card-img-top"
                                  width={300}
                                  height={200}
                                  style={{objectFit: 'cover'}}
                                  alt={product.name}
                                />
                              )}
                              <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text text-primary fw-bold">{product.price}</p>
                                <Link href={`/ecommerce/product/${product.id}`} className="btn btn-outline-primary btn-sm w-100">
                                  Learn More
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-3">
                        <Link href={`/ecommerce/coach/${coach.slug}`} className="btn btn-primary">
                          View All Products
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  )
}

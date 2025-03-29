import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from "../../components/global/layout";
import InnerPageLayout from "../../components/inner-page-layout";
import Pagination from "../../components/Pagination";
import coachCategories from '../../data/coachCategories';
import { getCoachesByCategory, cities, getPaginatedCoaches } from '../../data/coaches';

import { useMemo } from 'react';


export default function CoachListing() {
  const router = useRouter();
  const { slug, page = 1, city } = router.query;
  
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
  const [selectedCity, setSelectedCity] = useState(city || '');
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  
  // Find the current category
  const category = coachCategories.find(cat => cat.slug === slug);
  
  // Get coaches for this category
  const allCategoryCoaches = useMemo(() => {
    return slug ? getCoachesByCategory(slug) : [];
  }, [slug]); // Now it only changes when `slug` changes

  //const allCategoryCoaches = slug ? getCoachesByCategory(slug) : [];
  
  /*
  useEffect(() => {
    if (slug) {
      // Apply city filter if selected
      let coaches = allCategoryCoaches;
      if (selectedCity) {
        coaches = coaches.filter(coach => coach.location === selectedCity);
      }
      
      // Apply pagination
      const { coaches: paginatedCoaches, pagination } = getPaginatedCoaches(coaches, currentPage, 5);
      
      setFilteredCoaches(paginatedCoaches);
      setPaginationData(pagination);
    }
  }, [slug, selectedCity, currentPage, allCategoryCoaches]);
  */

  useEffect(() => {
    if (slug) {
      let coaches = allCategoryCoaches;
  
      if (selectedCity) {
        coaches = coaches.filter(coach => coach.location === selectedCity);
      }
  
      // Apply pagination
      const { coaches: paginatedCoaches, pagination } = getPaginatedCoaches(coaches, currentPage, 5);
  
      setFilteredCoaches(paginatedCoaches);
      setPaginationData(pagination);
    }
  }, [slug, selectedCity, currentPage, allCategoryCoaches]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { 
        slug, 
        page,
        ...(selectedCity && { city: selectedCity })
      }
    }, undefined, { shallow: true });
  };
  
  // Handle city filter change
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setCurrentPage(1); // Reset to first page when filter changes
    
    router.push({
      pathname: router.pathname,
      query: { 
        slug,
        page: 1,
        ...(city && { city })
      }
    }, undefined, { shallow: true });
  };

  if (!category) {
    return (
      <Layout title="Category Not Found">
        <InnerPageLayout title="Category Not Found" />
        <div className="section-padding">
          <div className="container text-center">
            <h2>Category not found</h2>
            <Link href="/coachCategories">
              <button className="btn btn-primary mt-3">
                Back to Categories
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div>
      <Layout title={`${category.name} Coaches`}>
        <InnerPageLayout title={`${category.name} Coaches`} />
        <div className="section-padding">
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-8">
                <h2>{category.name} Coaches</h2>
                <p>Find the perfect {category.name.toLowerCase()} coach to help you achieve your fitness goals.</p>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="cityFilter">Filter by City:</label>
                  <select 
                    id="cityFilter" 
                    className="form-control" 
                    value={selectedCity} 
                    onChange={handleCityChange}
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="row">
              {filteredCoaches.length > 0 ? (
                filteredCoaches.map(coach => (
                  <div className="col-lg-4 col-md-6 mb-4" key={coach.id}>
                    <div className="card h-100 coach-card">
                      <div className="position-relative">
                        <Image 
                          src={coach.heroImage} 
                          className="card-img-top"
                          alt={coach.name}
                          width={400}
                          height={250}
                          style={{objectFit: 'cover'}}
                        />
                        <div className="coach-profile-image">
                          <Image 
                            src={coach.profileImage} 
                            alt={coach.name}
                            width={80}
                            height={80}
                            className="rounded-circle border border-white"
                          />
                        </div>
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{coach.name}</h3>
                        <div className="location mb-2">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          {coach.location}
                        </div>
                        <p className="card-text">{coach.tagline}</p>
                      </div>
                      <div className="card-footer bg-transparent border-0">
                    


                        <Link 
                          href={`/coaches/${coach.slug}`} 
                          className="btn btn-primary w-100 d-block text-decoration-none">
                             <button className="btn btn-primary">View Profile</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No coaches found in this category{selectedCity ? ` in ${selectedCity}` : ''}.</p>
                </div>
              )}
            </div>
            
            {paginationData.totalPages > 1 && (
              <div className="row mt-4">
                <div className="col-12">
                  <Pagination 
                    currentPage={paginationData.currentPage} 
                    totalPages={paginationData.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            )}
            
            <div className="row mt-4">
              <div className="col-12 text-center">
                <Link href="/coachCategories">
                  <button className="btn btn-secondary">Back to Categories</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
} 
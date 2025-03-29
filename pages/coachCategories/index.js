import React from 'react';
import Link from 'next/link';
import Layout from "../../components/global/layout";
import InnerPageLayout from "../../components/inner-page-layout";
import coachCategories from '../../data/coachCategories';

export default function CoachCategories() {
  return (
    <div>
      <Layout title="Coach Categories">
        <InnerPageLayout title="Coach Categories" />
        <div className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-5">
                <h2 className="text-center">Find Your Perfect Coach</h2>
                <p className="text-center">Browse our coaching categories to find the expert that matches your fitness goals</p>
              </div>
              
              {coachCategories.map((category) => (
                <div className="col-md-4 mb-4" key={category.id}>
                  <Link href={`/coachCategories/${category.slug}`}>
                    <div className="card h-100 category-card">
                      <div className="card-body text-center">
                        <div className="category-icon mb-3">
                          <span style={{ fontSize: '3rem' }}>{category.icon}</span>
                        </div>
                        <h3 className="card-title">{category.name}</h3>
                        <p className="card-text">{category.description}</p>
                      </div>
                      <div className="card-footer text-center bg-transparent border-0">
                        <button className="btn btn-primary">View Coaches</button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
} 
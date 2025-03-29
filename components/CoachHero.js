import React from 'react';
import { useRouter } from 'next/router';

const CoachHero = ({ image, name, tagline, category, coachId }) => {
  const router = useRouter();

  const handleBookAppointment = () => {
    router.push(`/appointments?coachId=${coachId}`);
  };

  return (
    <div className="coach-hero position-relative">
      <img 
        src={image || "/images/placeholder-hero.jpg"} 
        alt={name}
        className="w-100"
        style={{ height: '400px', objectFit: 'cover' }}
      />
      <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="text-white">{name}</h1>
              <p className="text-white mb-0">{tagline}</p>
              {category && <span className="badge bg-primary mt-2">{category}</span>}
            </div>
            <div className="col-md-4 text-md-end">
              <button className="btn btn-primary btn-lg me-2" onClick={handleBookAppointment}>
                Book Appointment
              </button>
              <button className="btn btn-success btn-lg">Join Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachHero;

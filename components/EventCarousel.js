import React, { useState, useEffect } from 'react';

const EventCarousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Filter events by type
  const upcomingEvents = events.filter(event => event.type === 'upcoming');
  const recentEvents = events.filter(event => event.type === 'recent');
  
  // Combine both types for the carousel
  const allEvents = [...upcomingEvents, ...recentEvents];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === allEvents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? allEvents.length - 1 : prevIndex - 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide();
    }
  };

  if (allEvents.length === 0) {
    return <div className="text-center p-4">No events scheduled</div>;
  }

  return (
    <div className="event-carousel position-relative">
      <div 
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {allEvents.map((event, index) => (
          <div 
            key={event.id} 
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            style={{ display: index === currentIndex ? 'block' : 'none' }}
          >
            <div className="card">
              <div className="row g-0">
                <div className="col-md-5">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="img-fluid rounded-start"
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h3 className="card-title">{event.name}</h3>
                      <span className={`badge ${event.type === 'upcoming' ? 'bg-primary' : 'bg-secondary'}`}>
                        {event.type === 'upcoming' ? 'Upcoming' : 'Recent'}
                      </span>
                    </div>
                    <p className="card-text mb-3">
                      <small className="text-muted">
                        <i className="far fa-calendar-alt me-2"></i>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </small>
                    </p>
                    <p className="card-text">{event.description}</p>
                    {event.type === 'upcoming' && (
                      <button className="btn btn-outline-primary mt-3">
                        Register Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-indicators mt-3">
              {allEvents.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`carousel-indicator ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: idx === currentIndex ? '#0d6efd' : '#dee2e6',
                    border: 'none',
                    margin: '0 5px',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                ></button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="carousel-control-prev" 
        type="button" 
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '-20px',
          transform: 'translateY(-50%)',
          backgroundColor: '#0d6efd',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        className="carousel-control-next" 
        type="button" 
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '-20px',
          transform: 'translateY(-50%)',
          backgroundColor: '#0d6efd',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default EventCarousel; 
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './bicycle-caraousel.jpg';

function CoachCarousel() {
  const [index, setIndex] = useState(0);
  console.log( "in coachCarousel") ; 

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/bicycle-caraousel.jpg"
              alt="First slide"
              height="300"
            />
            <Carousel.Caption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/bicycle-caraousel.jpg"
              alt="Second slide"
              height="300"
            />
            <Carousel.Caption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/bicycle-caraousel.jpg"
              alt="Third slide"
             height="300"
            />
            <Carousel.Caption>
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }
    
export default CoachCarousel;
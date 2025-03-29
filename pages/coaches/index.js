import React from 'react'


    //carousels/Responsive.js
    import { Carousel } from "react-responsive-carousel";
    import itemsData from "./Items.json";
    import "react-responsive-carousel/lib/styles/carousel.min.css";
    import styles from "../../styles/Responsive.module.css";

    import Card from 'react-bootstrap/Card';

    export default function CoachesPage() {
      const { responsive } = itemsData;
      return (
        <div className={styles.container}>
          <Carousel
            showArrows={true}
            showIndicators={true}
            infiniteLoop={true}
            dynamicHeight={false}
            className={styles.mySwiper}
          >
            {responsive.map((item) => (
              <div key={item.id} className={styles.swipItem}>
                <div className={styles.imgBox}>
                  <img src={item.imageUrl} alt="slides" />
                </div>
                <div className={styles.detail}>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </Carousel>

          <Card>
        <Card.Img variant="top" src="images/Gym.jpg" />
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
      <Card>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src="images/cycling.jpg" />
      </Card>
      
        </div>
      );
    }





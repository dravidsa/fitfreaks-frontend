import React from 'react';
import styles from '@/styles/groups/GroupHero.module.css';

const GroupHero = ({ tagline, description, hero_image }) => {
  return (
    <section 
      className={styles.heroSection}
      style={{ backgroundImage: `url(${hero_image})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.heroContent}>
          <h1 className={styles.tagline}>{tagline}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default GroupHero;

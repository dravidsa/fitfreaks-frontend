import styles from '../../styles/groups/GroupHero.module.css';
import { API_URL } from '../../config';

const GroupHero = ({ tagline, description, hero_image }) => {
  console.log("in Group hero component" );
  const imageUrlRaw = hero_image?.data?.attributes?.url;
  const imageUrl = typeof imageUrlRaw === 'string' ? imageUrlRaw : '';
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${API_URL}${imageUrl}`;

  console.log("API_URL:", API_URL);
  console.log("imageUrlRaw:", imageUrlRaw);
  console.log("fullImageUrl:", fullImageUrl);

  return (
    <section className={styles.hero}>
      <div
        className={styles.heroBackground}
        style={{
          backgroundImage: fullImageUrl ? `url(${fullImageUrl})` : undefined,
          backgroundColor: "#ccc", // fallback for debugging
          border: "2px solid red"  // for debugging visibility
        }}
      >
        <div className={styles.overlay}>
          <div className={styles.heroContent}>
            <h2 className={styles.tagline}>{tagline}</h2>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupHero;

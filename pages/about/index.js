import Layout from "../../components/global/layout";
import InnerPageLayout from "../../components/inner-page-layout";
import styles from "../../styles/about/About.module.css";
import JoinUs from "../../components/join-us"

const About = () => {
  return (
    <Layout>
      <InnerPageLayout title="About Us">
        <div className={styles.aboutContainer}>
          <section className={styles.section}>
            <h2>What is Fitfreaks?</h2>
            <div className={styles.sectionContent}>
              <div className={styles.textContent}>
                <p>
                  Fitfreaks is a sports and fitness community platform created by fitness freaks themselves 
                  for fitness and sports enthusiasts, coaches, event organizers and merchants. Our platform 
                  brings together all aspects of the fitness community in one place.
                </p>
              </div>
              <div className={styles.imageContent}>
                <img
                  src="/fitfreaks_logo_new.jpg"
                  alt="Fitness Community"
                  className={styles.sectionImage}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>How it helps the fitness community</h2>
            <div className={styles.sectionContent}>
              <div className={styles.imageContent}>
                <img
                  src="/coach_with_student.jpg"
                  alt="Fitness Tracking"
                  className={styles.sectionImage}
                />
              </div>
              <div className={styles.textContent}>
                <p>
                  We help fitness enthusiasts to look for events, coaches, and sports deals around them. 
                  Event managers can easily organize and sell their events through our platform. Coaches 
                  can showcase their skills and build their client base. With our integration with various 
                  fitness devices, we help track students' performance and create personalized plans for them.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>For Merchants</h2>
            <div className={styles.sectionContent}>
              <div className={styles.textContent}>
                <p>
                  As a merchant on Fitfreaks, you get access to a dedicated audience with specific interests 
                  in fitness and sports. This targeted reach helps you connect with customers who are actively 
                  looking for products and services in the fitness domain.
                </p>
              </div>
              <div className={styles.imageContent}>
                <img
                  src="fitness_merchant.jpg"
                  alt="Merchant Benefits"
                  className={styles.sectionImage}
                />
              </div>
            </div>
          </section>
          <JoinUs />
        </div>
      </InnerPageLayout>
    </Layout>
  );
};

export default About;

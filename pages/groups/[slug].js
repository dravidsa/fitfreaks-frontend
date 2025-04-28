import { useRouter } from 'next/router';
import Layout from '../../components/global/layout';
import GroupHero from '@/components/groups/GroupHero';
import ContactSection from '@/components/groups/ContactSection';
import ApproachSection from '@/components/groups/ApproachSection';
import ServicesSection from '@/components/groups/ServicesSection';
import AchievementsSection from '@/components/groups/AchievementsSection';
import UpcomingEventsSection from '@/components/groups/UpcomingEventsSection';
import MediaGallerySection from '@/components/groups/MediaGallerySection';
import TeamSection from '@/components/groups/TeamSection';
import ProductsResourcesSection from '@/components/groups/ProductsResourcesSection';
import TestimonialsSection from '@/components/groups/TestimonialsSection';
import { groupsData } from '../../data/groups';
import styles from '../../styles/groups/GroupHeader.module.css';

export default function GroupSinglePage() {
  const router = useRouter();
  const { slug } = router.query;

  // Find the group with matching slug
  const group = groupsData.find(g => g.attributes.slug === slug);

  if (!group) return <div>Loading...</div>;

  const { attributes } = group;
  const {
    name,
    tagline,
    description,
    hero_image,
    contact,
    approach,
    services,
    achievements,
    events,
    gallery,
    team,
    resources,
    testimonials
  } = attributes;

  return (
    <Layout title={name}>
      <div>
        <div className={styles.header}>
          <div className={styles.logoPlaceholder}>
            <div className={styles.circle}></div>
          </div>
          <h1 className={styles.groupName}>{name}</h1>
        </div>
        <GroupHero
          tagline={tagline}
          description={description}
          hero_image={hero_image}
        />
        <ApproachSection approach={approach} />
        <ServicesSection services={services} />
        <AchievementsSection achievements={achievements} />
        <UpcomingEventsSection events={events} />
        <MediaGallerySection gallery={gallery} />
        <ProductsResourcesSection resources={resources} />
        <TestimonialsSection testimonials={testimonials} />
        <TeamSection team={team} />
        <ContactSection 
          contact={contact} 
          to_email={contact.email} 
        />
      </div>
    </Layout>
  );
}

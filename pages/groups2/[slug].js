import { useRouter } from 'next/router';
import Layout from '../../components/global/layout';
import GroupHero from '@/components/groups/group-hero';
import ContactSection from '@/components/groups/ContactSection';
import ApproachSection from '@/components/groups/ApproachSection';
import ServicesSection from '@/components/groups/ServicesSection';
import AchievementsSection from '@/components/groups/AchievementsSection';
import UpcomingEventsSection from '@/components/groups/UpcomingEventsSection';
import MediaGallerySection from '@/components/groups/MediaGallerySection';
import TeamSection from '@/components/groups/TeamSection';
import ProductsResourcesSection from '@/components/groups/ProductsResourcesSection';
import MyEvents from '@/components/groups/MyEvents';
import { API_URL } from '../../config';
import styles from '../../styles/groups/GroupHeader.module.css';
import TestimonialsSection from '@/components/groups/TestimonialsSection';

export default function GroupSinglePage({ group }) {
  const router = useRouter();
  // If group is not found, show loading or not found
  if (!group) return <div>Loading...</div>;

  const { attributes } = group;
  const { contact_attributes } = attributes;

  //console.log("got this group", JSON.stringify(group)); 
  const {
    name,
    tagline,
    description,
    group_hero_image,
    approach,
    services,
    achievements,
    events,
    gallery,
    team,
    resources,
    image,
    address,phone, email, facebook, instagram, twitter,
    group_logo,
    testimonials 
  } = attributes;

  //console.log("group_logo", group_logo);
  //console.log("group_hero_image url", group_hero_image?.data?.attributes?.url);
  console.log("testimonials found are ", JSON.stringify(testimonials));

  const contact = { address, phone, email, facebook, instagram, twitter };
  //console.log( "contact object is " , JSON.stringify(contact));
  console.log("events found are ", JSON.stringify(events.data));
  return (
    <Layout title={name}>
      <div>
        <div className={styles.header}>
          <div className={styles.logoPlaceholder}>
            <div className={styles.circle}></div>
            {group_logo?.data?.attributes?.url && (
              <img
                src={`${API_URL}${group_logo.data.attributes.url}`}
                alt={`${name} logo`}
              />
            )}
          </div>
          <h1 className={styles.groupName}>{name}</h1>
        </div>
        <GroupHero
          tagline={tagline}
          description={description}
          hero_image={group_hero_image}
        />
        <ApproachSection approach={approach} />
        <ServicesSection services={services} />
        <AchievementsSection achievements={achievements} />
      
        <MediaGallerySection gallery={gallery} />
       
        <MyEvents events={events?.data} />
       { /* 
        <ProductsResourcesSection resources={resources} />
        */
}
        <TeamSection team={team} />
        <TestimonialsSection testimonials={testimonials} />
          <ContactSection 
          contact={contact} 
          to_email={contact.email} 
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const groupURL  = `${API_URL}/api/groups?filters[slug][$eq]=${slug}&populate[approach][populate][image]=*&populate[services][populate][image]=*&populate[gallery][populate][image]=*&populate[achievements][populate][image]=*&populate[team][populate][image]=*&populate[group_hero_image]=*&populate[group_logo]=*&populate[testimonials][populate][image]=*&populate[events][populate][image]=*` ; 
  const res = await fetch(groupURL);
  console.log("groupURL is ", groupURL);
  //const res = await fetch(`${API_URL}/api/groups?filters[slug][$eq]=${slug}&populate=*`);
  const data = await res.json();
  const group = data.data && data.data.length > 0 ? data.data[0] : null;

  return {
    props: { group },
  };
}

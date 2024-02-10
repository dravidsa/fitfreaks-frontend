import { Inter } from "@next/font/google";
import FeaturedEvents from "../components/featured-events";
import Layout from "../components/global/layout";
import Hero from "../components/hero";
import HowItWorks from "../components/how-it-works";
import RecentBlog from "../components/recent-blog";
import Testimonial from "../components/testimonial";
import UpcomingEvents from "../components/upcoming-events";
import { API_URL } from "../config";

import Groups from "../components/groups"
import Coaches from "../components/coaches"

const inter = Inter({ subsets: ["latin"] });

export default function Home({ events, blogs, groups  , coaches}) {
  const eventsData = events.data;
  const blogsData = blogs.data;
  const groupData = groups.data ; 

  const coachData = coaches.data ; 

  return (
    <Layout title="huddle">
      <Hero />
      <UpcomingEvents events={eventsData} />
      <Groups groups={groupData} />
      <Coaches coaches={coachData} /> 

      <HowItWorks />
      <FeaturedEvents events={eventsData} />
      <Testimonial />
      <RecentBlog blogs={blogsData} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const events = await res.json();
  const blogData = await fetch(`${API_URL}/api/blogs?populate=*`);
  const blogs = await blogData.json();
  const groupData = await fetch(`${API_URL}/api/groups?populate=*`);
  const groups = await groupData.json();
  console.log(blogs);
  const coachData = await fetch(`${API_URL}/api/coaches?populate=*`);
  const coaches = await coachData.json();
  console.log(blogs);
  console.log(coaches) ; 
  return {
    props: { events, blogs, groups  , coaches }
  };

}

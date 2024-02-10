import { Inter } from "@next/font/google";
import FeaturedEvents from "../components/featured-events";
import Layout from "../components/global/layout";
import Hero from "../components/hero";
import HowItWorks from "../components/how-it-works";
import Groups from "../components/groups";
import RecentBlog from "../components/recent-blog";
import Testimonial from "../components/testimonial";
import UpcomingEvents from "../components/upcoming-events";
import { API_URL } from "../config";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ events, blogs , groups }) {
  const eventsData = events.data;
  const blogsData = blogs.data;
  const groupsData = groups.data;

  return (
    <Layout title="huddle">
      <Hero />
      <UpcomingEvents events={eventsData} />
      <Groups events={groupsData} />
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
  return {
    props: { events, blogs, groups }
  };

}

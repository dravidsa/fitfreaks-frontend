import { Inter } from "@next/font/google";
import FeaturedEvents from "../components/featured-events";
import Layout from "../components/global/layout";
import Hero from "../components/hero";
import HowItWorks from "../components/how-it-works";
import RecentBlog from "../components/recent-blog";
import Testimonial from "../components/testimonial";
import UpcomingEvents from "../components/upcoming-events";
import { API_URL } from "../config";
import { useState, useEffect } from 'react';
import Link from 'next/link';

import Groups from "../components/groups"
import Coaches from "../components/coaches"
import AuthButton from "../components/global/AuthButton"

const inter = Inter({ subsets: ["latin"] });

export default function Home({ events, blogs, groups  , coaches}) {
  const eventsData = events.data;
  const blogsData = blogs.data;
  const groupData = groups.data ; 

  const coachData = coaches.data ; 

  const [isLogged, setIsLogged] = useState();
  const [username, setUsername] = useState('');
  
  useEffect(() => {

    const storedUsername = localStorage.getItem('username');
    setIsLogged(!!storedUsername);
    setUsername(storedUsername || ''); // Set to empty string if null
    //console.log("username is ", storedUsername);
    /*
      setIsLogged(!!localStorage.getItem('username'));
       username = localStorage.getItem('username') ; 
       console.log ( "username is ", username ) ;  */ 

  }, []);
  
 
  
  return (
    <Layout title="FitFreaks" username={username}>
      <Hero />
      <UpcomingEvents events={eventsData} />
      <Groups groups={groupData} />
      <Coaches coaches={coachData} /> 

      <HowItWorks />
    

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
  //console.log(blogs);
  const coachData = await fetch(`${API_URL}/api/coaches?populate=*`);
  const coaches = await coachData.json();
  //console.log(blogs);
  //console.log(coaches) ; 
  return {
    props: { events, blogs, groups  , coaches }
  };

}

import React from "react";
import Layout from "../../components/global/layout";
import { FaUserCircle } from "react-icons/fa";
import { ImLocation2, ImTicket, ImCalendar, ImPriceTags, ImClock } from "react-icons/im";
import { API_URL } from "../../config";
import InnerPageLayout from "../../components/inner-page-layout";
import Link from "next/link";
import SectionTitle from "../../components/global/section-title";
import GroupHero from "../../components/GroupHero";

import md from 'markdown-it';

export default function GroupSinglePage({groups,slug}) {
  const group = groups?.filter((grp) => grp?.attributes?.slug === slug);
  console.log( "group obj is " +JSON.stringify(group[0])  , "slug is" , slug ); 

  

  const { attributes } = group[0];
  console.log( "group_attribiutes are ", attributes) ; 
  const { name , tagline , location, description, mentor, sport  ,group_hero_image } = attributes;
  const hero_image_url = group_hero_image.data.attributes.url ; 

  console.log( "hero image url is " + hero_image_url , tagline, description) ; 

  return (

    <Layout title= {name}>
    <InnerPageLayout title= {name}/>
    <div>
     <GroupHero tagline={tagline} description={description} hero_image={hero_image_url} /> 


    </div>
    </Layout>
  )
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/groups?populate=*`);
  const allGroups = await res.json();
  const groups = allGroups.data;

  return {
    props: {
      groups,
      slug,
    },
  };
}

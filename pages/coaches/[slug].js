import React from 'react'
import CoachHero from '../../components/CoachHero'
import Testimonial from '../../components/testimonial'
import Layout from "../../components/global/layout";
import InnerPageLayout from "../../components/inner-page-layout";




export default function CoachSinglePage ({ coaches, slug })  {
  
  // const { image, headline, description, testimonials, team  , phone , email , products ,memdialist} = coach?.attributes;
  return (
    <div>
       <Layout title={name}>
       <InnerPageLayout title={name} />
      <div className="singlePage section-padding">
      Page for coach details 
     

      <Testimonial /> 
      </div> 
    </Layout> 

    </div>
  )
}

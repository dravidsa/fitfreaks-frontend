import React from 'react'
import CoachHero from '../../components/CoachHero'
import Testimonial from '../../components/testimonial'



export default function CoachSinglePage ({ coaches, slug })  {
  console.log ( "slug is " + slug + "coaches is " + JSON.stringify(coaches)) ; 
  const coach = coaches?.filter((evt) => evt?.attributes?.slug === slug);
  console.log( "coach found was " + JSON.stringify(coach)) ; 
  // const { image, headline, description, testimonials, team  , phone , email , products ,memdialist} = coach?.attributes;
  return (
    <div>
      <CoachHero />
      <Testimonial />

    </div>
  )
}

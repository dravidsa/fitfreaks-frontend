import React, { useEffect } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import { MdOutlineEvent } from "react-icons/md";
import Link from "next/link";
import { API_URL } from "../config";

const GroupHero = ( {tagline , description , hero_image}) => {
  
  hero_image = API_URL + hero_image ; 
  console.log ( "coach image is "  + JSON.stringify(hero_image)) ;   console.log ( "tagline is  "  + JSON.stringify(tagline) ); 
  console.log ( "desc is  "  + JSON.stringify(description)) ; 

  return (
    <div
      className="hero bg-image"
      style={{ backgroundImage: "http://localhost:1637/uploads/Adobe_Stock_546945846_Preview_9a7dd7b9ab.jpeg" }}
    >
      <div className="hero__wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-10 text-center">
              <h2 className="hero__title">
               {tagline}
              </h2>
              <p className="hero__description mt-4">
                {description} 
              </p>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupHero;

import React, { useEffect } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import { MdOutlineEvent } from "react-icons/md";
import Link from "next/link";

const CoachHero = () => {
  console.log ( "coach image is ") ; 
  return (
    <div
      className="hero bg-image"
      style={{ backgroundImage: "url({image})" }}
    >
      <div className="hero__wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-10 text-center">
              <h2 className="hero__title">
                Discover Sporting Events ,Fitness  Groups ,  Coaches Around You
              </h2>
              <p className="hero__description mt-4">
                Don't miss out on the experience of a lifetime - secure your
                spot at your preferable events with our easy online ticket
                purchasing system and join it for building a good community.
              </p>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachHero;

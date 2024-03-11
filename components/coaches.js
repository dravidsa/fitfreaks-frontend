import Link from "next/link";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import SectionTitle from "./global/section-title";
import {
  ImPriceTags,
  ImLocation2,
  ImTicket,
  ImCalendar,
  ImClock,
} from "react-icons/im";
import { API_URL } from "../config";

const Coaches = ({ coaches }) => {
  /*
  const sportsEvents = events?.filter(
    (evt) => evt.attributes.category === "sports"
  );
  const corporateEvents = events?.filter(
    (evt) => evt.attributes.category === "corporate"
  );
  const privateEvents = events?.filter(
    (evt) => evt.attributes.category === "private"
  );
  const charityEvents = events?.filter(
    (evt) => evt.attributes.category === "charity"
  );
  const festivalEvents = events?.filter(
    (evt) => evt.attributes.category === "festival"
  );
  const concertEvents = events?.filter(
    (evt) => evt.attributes.category === "concert"
  );
  const partyEvents = events?.filter(
    (evt) => evt.attributes.category === "party"
  );
  */

  const [key, setKey] = useState("AllCoaches");
  return (
    <div id="coaches" className="upcoming-events section-padding">
      <div className="container">
        <SectionTitle title="Featured Coaches" />
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="AllCoaches" title="All Coaches">
            <div className="row">
              {coaches?.slice(0, 6).map((coach) => (
                <div key={coach.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="upcoming-events__item">
                    <div className="image">
                      <img
                        className="img-fluid"
                        src={`${API_URL}${coach.attributes?.image?.data?.attributes.url}`}
                        alt={coach.attributes.image.data.attributes.name}
                      />
                      {coach?.attributes?.sport !== "none" ? (
                        <div className="popular">
                          {coach?.attributes?.sport}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="upcoming-events__item__info">
                      <div className="title">
                        <h3>
                          <Link href={`/coaches/${coach?.attributes?.slug}`} legacyBehavior>
                            {coach?.attributes?.name}
                          </Link>
                        </h3>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="price d-flex align-items-center gap-2">
                           <span>{coach.attributes.headline}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <ImTicket />{" "}
                          <span>{coach.attributes.phone}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <ImLocation2 /> <span>{coach.attributes.location}</span>
                      </div>
                      <div className="timing">
                        <div className="d-flex align-items-center gap-2">
                          <ImCalendar />
                          <span>{coach.attributes.sport}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <ImClock />
                          <span>{coach.attributes.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab>
 
        </Tabs>
      </div>
    </div>
  );
};

export default Coaches;

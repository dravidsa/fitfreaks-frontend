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

import GrUserManager from "react-icons/gr";
import { API_URL } from "../config";

const Groups = ({ groups }) => {
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

  const [key, setKey] = useState("AllGroups");
  return (
    <div id="groups" className="upcoming-events section-padding">
      <div className="container">
        <SectionTitle title="Featured Groups" />
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="AllGroups" title="All Groups">
            <div className="row">
              {groups?.slice(0, 6).map((group) => (
                <div key={group.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="upcoming-events__item">
                    <div className="image">
                      <img
                        className="img-fluid"
                        src={`${API_URL}${group.attributes?.image?.data?.attributes.url}`}
                        alt={group.attributes.image.data.attributes.name}
                      />
                      {group?.attributes?.sport !== "none" ? (
                        <div className="popular">
                          {group?.attributes?.sport}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="upcoming-events__item__info">
                      <div className="title">
                        <h3>
                          <Link href={`/groups/${group?.attributes?.slug}`} legacyBehavior>
                            {group?.attributes?.name}
                          </Link>
                        </h3>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="price d-flex align-items-center gap-2">
                           <span>${group.attributes.description}</span>
                        </div>
                       
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <ImLocation2 /> <span>{group.attributes.location}</span>
                      </div>
                      <div className="timing">
                        <div className="d-flex align-items-center gap-2">
                          <ImCalendar />
                          <span>{group.attributes.sport}</span>
                        </div>
                     
                        <div className="d-flex align-items-center gap-2">
                          <ImTicket />{" "}
                          <span>{group.attributes.mentor}</span>
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

export default Groups;

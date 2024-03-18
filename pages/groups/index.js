import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Layout from "../../components/global/layout";
import {
  ImPriceTags,
  ImLocation2,
  ImTicket,
  ImCalendar,
  ImClock,
} from "react-icons/im";
import SectionTitle from "../../components/global/section-title";
import Link from "next/link";
import { API_URL } from "../../config";
import Pagination from "../../components/pagination";
import InnerPageLayout from "../../components/inner-page-layout";

const GroupsPage = ({groups}) => {
  const [key, setKey] = useState("AllGroups");
  const { data } = groups;
  const strengthTrainingGroups = data?.filter(grp => grp.attributes.sport ==="Strength Training")
  const cyclingGroups = data?.filter(grp => grp.attributes.sport ==="Cycling")
  const yogaGroups = data?.filter(grp => grp.attributes.sport ==="Yoga")
  const trekkingGroups = data?.filter(grp => grp.attributes.sport ==="Trekking")
  const swimmingGroups = data?.filter(grp => grp.attributes.sport ==="Swimming")
  //const gymGroups = data?.filter(grp => grp.attributes.category ==="concert")
  
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const groupData = data?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Layout title="Groups Page">
       <InnerPageLayout title="All Groups" />
      <div className="upcoming-events section-padding">
        <div className="container">
          <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="AllGroups" title="All Groups">
            <div className="row">
            {groupData?.map((grp) => (
            <div key={grp.id} className="col-md-6 col-lg-4 mb-4">
              <div className="upcoming-events__item">
                <div className="image">
                  <img
                    className="img-fluid"
                    src={`${API_URL}${grp.attributes?.image?.data?.attributes.url}`}
                    alt={grp.attributes.image.data.attributes.name}
                  />
                  {grp?.attributes?.sport !== "none" ? (
                        <div className="popular">
                          {grp?.attributes?.sport}
                        </div>
                      ) : (
                        ""
                      )}
                </div>
                <div className="upcoming-events__item__info">
                  <div className="title">
                    <h3>
                      <Link href={`/groups/${grp?.attributes?.id}`} legacyBehavior>{grp?.attributes?.name}</Link>
                    </h3>
                  </div>
                  
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <ImLocation2 /> <span>{grp.attributes.location}</span>
                  </div>
            
                </div>
              </div>
            </div>
          ))}
            </div>
            {data.length > 6 ? (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={data?.length}
              paginate={paginate}
            />
          ) : (
            ""
          )}
          </Tab>
          <Tab eventKey="ST" title="Strength Training">
            <div className="row">
            {strengthTrainingGroups?.slice(0, 6).map((grp) => (
            <div key={grp.id} className="col-md-6 col-lg-4 mb-4">
              <div className="upcoming-events__item">
                <div className="image">
                  <img
                    className="img-fluid"
                    src={`${API_URL}${grp.attributes?.image?.data?.attributes.url}`}
                    alt={grp.attributes.image.data.attributes.name}
                  />
                 {grp?.attributes?.sport !== "none" ? (
                        <div className="popular">
                          {grp?.attributes?.sport}
                        </div>
                      ) : (
                        ""
                      )}
                </div>
                <div className="upcoming-events__item__info">
                  <div className="title">
                    <h3>
                      <Link href={`/groups//${grp?.attributes?.slug}`} legacyBehavior>{grp?.attributes?.name}</Link>
                    </h3>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                 
            
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <ImLocation2 /> <span>{grp.attributes.location}</span>
                  </div>
              
                </div>
              </div>
            </div>
          ))}
            </div>
          </Tab>
          <Tab groupsKey="cycling" title="Cycling">
            <div className="row">
            {cyclingGroups?.slice(0, 6).map((grp) => (
            <div key={grp.id} className="col-md-6 col-lg-4 mb-4">
              <div className="upcoming-events__item">
                <div className="image">
                  <img
                    className="img-fluid"
                    src={`${API_URL}${grp.attributes?.image?.data?.attributes.url}`}
                    alt={grp.attributes.image.data.attributes.name}
                  />
                  {grp?.attributes?.sport !== "none" ? (
                        <div className="popular">
                          {grp?.attributes?.sport}
                        </div>
                      ) : (
                        ""
                      )}
                </div>
                <div className="upcoming-events__item__info">
                  <div className="title">
                    <h3>
                      <Link href={`/groups//${grp?.attributes?.slug}`} legacyBehavior>{grp?.attributes?.name}</Link>
                    </h3>
                  </div>
              
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <ImLocation2 /> <span>{grp.attributes.location}</span>
                  </div>
                
                </div>
              </div>
            </div>
          ))}
            </div>
          </Tab>
          <Tab eventKey="yoga" title="Yoga">
            <div className="row">
            {yogaGroups?.slice(0, 6).map((grp) => (
            <div key={grp.id} className="col-md-6 col-lg-4 mb-4">
              <div className="upcoming-events__item">
                <div className="image">
                  <img
                    className="img-fluid"
                    src={`${API_URL}${grp.attributes?.image?.data?.attributes.url}`}
                    alt={grp.attributes.image.data.attributes.name}
                  />
                 {grp?.attributes?.sport !== "none" ? (
                        <div className="popular">
                          {grp?.attributes?.sport}
                        </div>
                      ) : (
                        ""
                      )}
                </div>
                <div className="upcoming-events__item__info">
                  <div className="title">
                    <h3>
                      <Link href={`/groups/${grp?.attributes?.slug}`} legacyBehavior>{grp?.attributes?.name}</Link>
                    </h3>
                  </div>
                
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <ImLocation2 /> <span>{grp.attributes.location}</span>
                  </div>
  
                </div>
              </div>
            </div>
          ))}
            </div>
          </Tab>
          <Tab eventKey="swimming" title="Swimming">
            <div className="row">
            {swimmingGroups?.slice(0, 6).map((grp) => (
            <div key={grp.id} className="col-md-6 col-lg-4 mb-4">
              <div className="upcoming-events__item">
                <div className="image">
                  <img
                    className="img-fluid"
                    src={`${API_URL}${grp.attributes?.image?.data?.attributes.url}`}
                    alt={grp.attributes.image.data.attributes.name}
                  />
                  {grp?.attributes?.sport !== "none" ? (
                        <div className="popular">
                          {grp?.attributes?.sport}
                        </div>
                      ) : (
                        ""
                      )}
                </div>
                <div className="upcoming-events__item__info">
                  <div className="title">
                    <h3>
                      <Link href={`/groups//${grp?.attributes?.slug}`} legacyBehavior>{grp?.attributes?.name}</Link>
                    </h3>
                  </div>
          
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <ImLocation2 /> <span>{grp.attributes.location}</span>
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
    </Layout>
  );
};

export default GroupsPage;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/groups?populate=*`);
  const groups = await res.json();

  return {
    props: { groups },
    revalidate: 1,
  };
}


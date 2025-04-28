import React, { useState } from "react";
import { Tab, Tabs, Card, Button } from "react-bootstrap";
import Layout from "../../components/global/layout";
import Link from "next/link";
import InnerPageLayout from "../../components/inner-page-layout";
//import { groupsData } from "../../data/groups";
import { API_URL } from "../../config";

const GroupsPage2 = ({groups}) => {
  const [key, setKey] = useState("AllGroups");
  
  console.log("Got these groups", JSON.stringify(groups));
  // Filter groups by sport
  const allGroups = groups.data;
  const runningGroups = allGroups.filter(grp => grp.attributes.sport.toLowerCase().includes('running'));
  const cyclingGroups = allGroups.filter(grp => grp.attributes.sport.toLowerCase().includes('cycling'));
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentGroups = allGroups.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderGroupCard = (group) => {
    const { attributes } = group;
    console.log("ind group is ", JSON.stringify(attributes)) ; 
    console.log("ind group image is ", JSON.stringify(attributes.image.data.attributes.url)) ; 
    return (
      <div key={group.id} className="col-md-6 col-lg-4 mb-4">
        <Card>
          <Card.Img 
            variant="top" 
            src={`${API_URL}${attributes.image?.data?.attributes?.url}`} 
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{attributes.name}</Card.Title>
            <Card.Text>{attributes.tagline}</Card.Text>
            <Card.Text className="text-muted">
              {attributes.address}
            </Card.Text>
            <Link href={`/groups2/${attributes.slug}`} passHref>
              <Button variant="primary">View Details</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <Layout title="Groups Page">
      <InnerPageLayout title="All Groups" />
      <div className="section-padding">
        <div className="container">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="AllGroups" title="All Groups">
              <div className="row mt-4">
                {currentGroups.map(renderGroupCard)}
              </div>
            </Tab>
            <Tab eventKey="Running" title="Running">
              <div className="row mt-4">
                {runningGroups.map(renderGroupCard)}
              </div>
            </Tab>
            <Tab eventKey="Cycling" title="Cycling">
              <div className="row mt-4">
                {cyclingGroups.map(renderGroupCard)}
              </div>
            </Tab>
          </Tabs>
          
          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {[...Array(Math.ceil(allGroups.length / postsPerPage))].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GroupsPage2;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/groups?populate=*`);
  //const res = await fetch(`${API_URL}/api/groups?populate[approach][populate][image]=*&populate[services][populate][image]=*&populate[gallery][populate][images]=*&populate[achievements][populate][image]=*`);
  const groups = await res.json();

  return {
    props: { groups },
    revalidate: 1,
  };
}

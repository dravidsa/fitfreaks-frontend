import React, { useState } from "react";
import { Tab, Tabs, Card, Button } from "react-bootstrap";
import Layout from "../../components/global/layout";
import Link from "next/link";
import InnerPageLayout from "../../components/inner-page-layout";
import { groupsData } from "../../data/groups";

const GroupsPage = () => {
  const [key, setKey] = useState("AllGroups");
  
  // Filter groups by sport
  const allGroups = groupsData;
  const runningGroups = groupsData.filter(grp => grp.attributes.name.toLowerCase().includes('running'));
  const cyclingGroups = groupsData.filter(grp => grp.attributes.name.toLowerCase().includes('cycling'));
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentGroups = allGroups.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderGroupCard = (group) => {
    const { attributes } = group;
    return (
      <div key={group.id} className="col-md-6 col-lg-4 mb-4">
        <Card>
          <Card.Img 
            variant="top" 
            src={attributes.hero_image.data.attributes.url} 
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{attributes.name}</Card.Title>
            <Card.Text>{attributes.tagline}</Card.Text>
            <Card.Text className="text-muted">
              {attributes.contact.address}
            </Card.Text>
            <Link href={`/groups/${attributes.slug}`} passHref>
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

export default GroupsPage;

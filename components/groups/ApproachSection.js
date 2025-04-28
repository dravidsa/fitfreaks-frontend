import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/groups/GroupSections.module.css';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as GrIcons from 'react-icons/gr';

const iconLibraries = {
  Bs: BsIcons,
  Fa: FaIcons,
  Md: MdIcons,
  Gr: GrIcons,
};

function getIconComponent(iconName) {
  if (!iconName || typeof iconName !== 'string') return null;
  const prefix = iconName.slice(0, 2);
  const library = iconLibraries[prefix];
  return library ? library[iconName] : null;
}

const ApproachSection = ({ approach }) => {
  // Split the approach items into rows of 4
  const rows = [];
  for (let i = 0; i < approach.length; i += 4) {
    rows.push(approach.slice(i, i + 4));
  }

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Our Approach</h2>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} className={`${styles.approachRow} justify-content-center`}>
            {row.map((item, index) => (
              <Col md={3} lg={3} xl={3} key={index} className="mb-4">
                <div className={styles.approachCard}>
                  <div className={styles.approachIcon}>{
                    (() => {
                      const Icon = getIconComponent(item.icon);
                      return Icon ? <Icon size={40} /> : null;
                    })()
                  }</div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default ApproachSection;

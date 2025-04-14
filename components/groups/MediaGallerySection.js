import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import styles from '@/styles/GroupSections.module.css';

const MediaGallerySection = ({ gallery }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Media Gallery</h2>
        <Row className={styles.gallery}>
          {gallery.map((image, index) => (
            <Col xs={6} md={4} lg={3} key={index} className="mb-4">
              <div 
                className={styles.galleryItem}
                onClick={() => handleImageClick(image)}
              >
                <img src={image.url} alt={image.caption} />
                {image.caption && (
                  <div className={styles.galleryCaption}>
                    {image.caption}
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>

        <Modal 
          show={showModal} 
          onHide={() => setShowModal(false)}
          size="lg"
          centered
        >
          {selectedImage && (
            <>
              <Modal.Body>
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.caption} 
                  className={styles.modalImage}
                />
              </Modal.Body>
              {selectedImage.caption && (
                <Modal.Footer>
                  <p>{selectedImage.caption}</p>
                </Modal.Footer>
              )}
            </>
          )}
        </Modal>
      </Container>
    </section>
  );
};

export default MediaGallerySection;

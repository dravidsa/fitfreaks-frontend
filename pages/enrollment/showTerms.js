import React, { useState } from 'react'
import Modal from 'react-modal'
//import * as DOMPurify from 'dompurify'; // Import all as DOMPurify

import DOMPurify from 'dompurify'

const ShowTerms = ({termsText, onClose}) => {
   

  
   const customStyles = {
      overlay: {
         backgroundColor: 'rgba(0, 0, 0, 0.6)' , 
         zIndex: 1000 // Ensure overlay has a high z-index
      },
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
         maxHeight: '80vh',
         width: '80%',
         overflow: 'auto'
      }
   }

   const sanitizedHTML = DOMPurify.sanitize(termsText) ; 

   return (
    
      <div style={{ paddingLeft: "50px" , paddingRight: "50px" }}>
         <Modal isOpen={true} onRequestClose={onClose} style={customStyles}>
            <h2>Terms and Conditions</h2>
             <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            <button 
               onClick={onClose}
               style={{
                  padding: '10px 20px',
                  margin: '20px 0',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
               }}
            >
               Accept
            </button>
         </Modal>
      </div>
   )
}

export default ShowTerms; 


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
         transform: 'translate(-50%, -50%)'
      }
   }

   const sanitizedHTML = DOMPurify.sanitize(termsText) ; 

   return (
    
      <div>
         <Modal isOpen={true} onRequestClose={onClose} style={customStyles}>
            <h2>Terms and Conditions</h2>
             <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            <button onClick={onClose}>Accept</button>
         </Modal>
      </div>
   )
}

export default ShowTerms; 

import React from 'react'
import Form from 'react-bootstrap/Form';


export default function Attendee_Catagories({attendee_catagories}) {
  console.log( "received ac as " , attendee_catagories) ;  

  return (
    <div>

       <Form>
       <Form.Group>
    
      {attendee_catagories.map((catagory) => (
          <Form.Check
            type="radio"
            name="attendee_catagory"
            id={`attendee_catagory_${catagory.catagory_name}`} 
            value={catagory.catagory_name}
            label={catagory.catagory_desc}
          />
      ))}
      </Form.Group>

      </Form>

    
    </div>
  )
}

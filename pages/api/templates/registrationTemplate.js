import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function  RegistrationTemplate({name , event_catagory , enrollmentID ,event_name}) {
  return (
    <>
    <p>

    </p>

    <Container>
      <Row>
        <Col><img src="https://fitfreaks.in/images/LSOM_3.jpg" /> </Col>

        <Col>
        <p>
          
          
        </p>
       <p>

       </p>
        <p> Dear <b>{name} </b></p>
        <p>

        </p>
        <p> Thank you for your registration for <b> {event_name} </b> .  
        </p>
        <p>
               Event Category  :  <b> {event_catagory} </b> 
        </p>
        <p> 
          Enrollment No : <b> {enrollmentID} </b> 
        </p>
        <p>
          Wait for further communication regarding Flag off time and BIB collection etc. 
        </p>
        <p>
          Yours truely,
          </p> 
          <p>
          Team KDR 
        </p>
        </Col>
      </Row>
      <Row>
        <Col>
        <p></p>
        For any queries, please feel free to reach out to us at support@fitfreaks.in; remember to include your enrollment number, email address, and name to help us address your concerns at the earliest.
        
        </Col>
      </Row>
      
    </Container>
    </>

      );
} ; 
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function  QueryTemplate({name , subject , from , query}) {
  return (
    <>
    <p>

    </p>

    <Container>
      <Row>
       

        <Col>
        <p>
          
          
        </p>
       <p>

       </p>
        <p> Dear User 
          
         
        <p>

        </p>
        <p> Please look into the query received frome <b> {from} </b> . 
            Name : <b> {name} </b></p> 
        </p>
       
        <p>
          <b> Subject : {subject} </b> 
        </p>
        <p>
          <b> {query} </b> 
        </p>
        <p>
          Yours truely,
          </p> 
          <p>
          Team FitFreaks
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
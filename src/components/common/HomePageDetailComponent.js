import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import carimage1 from "../../assets/PICKUP.png";
import carimage2 from "../../assets/emergency.png";
import carimage3 from "../../assets/REPAIR.png";
export function HomePageDetailComponent() {
  return (
    <CardGroup>
      <Card>
      <img className="d-block w-100" src={carimage1} alt="First slide" />
        {/* //<Card.Img variant="top" src={carimage1} /> */}
        <Card.Body>
          <Card.Title>Pick Up &amp; Delivery</Card.Title>
          <Card.Text>
          We offer car servicing for all the major brands including Maruti, Honda, Hyundai, Tata, Ford, Fiat, chevrolet , Mahindra, Toyota, Skoda, Volkswagen, BMW, Mercedes, Audi , Opel, Nissan, Renault, Mitsubishi, Jaguar ,Land Rover, Jeep and Volvo. We offer the 
          lowest prices on car servicing and repairing in Pune. 
          Get the best car servicing by the best car garage near you.
          </Card.Text>
        </Card.Body>
        {/* <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer> */}
      </Card>
      <Card>
      <img className="d-block w-100" src={carimage3} alt="First slide" />

        {/* <Card.Img variant="top" src="./ass" /> */}
        <Card.Body>
          <Card.Title>Repair &amp; Servicing</Card.Title>
          <Card.Text>
          Whatever your requirements - whether you want a one-off inspe
          ction or regular maintenance: we draw up a service and maintenance 
          plan to suit you. On request, we also take over the complete maintenance. This gives you all the benefits of a service partnership with SMS group: agreed pl
          availability, high planning reliability, and access to expertise{" "}
          </Card.Text>
        </Card.Body>
        {/* <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer> */}
      </Card>
      <Card>
      <img className="d-block w-100" src={carimage2} alt="First slide" />
        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        <Card.Body>
          <Card.Title>Emergency Service</Card.Title>
          <Card.Text>
          Whether you face a machine shutdown or suddenly require spare 
          parts, you can count on our fast service. We have continually
           expanded our service network over many years. Our employees
            in your region support you locally, and they speak your 
            language. You can also call our field service team for 
            assistance during scheduled as well as non-scheduled 
            shutdowns. 
            
          </Card.Text>
        </Card.Body>
        {/* <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer> */}
      </Card>
    </CardGroup>
  );
}
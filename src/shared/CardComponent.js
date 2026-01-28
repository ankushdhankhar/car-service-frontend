import React from "react";
import { Button, Card } from "react-bootstrap";

export default function CardComponent(props) {
  return (
    <Card>
      {/* //<Card.Img variant="top" src={carimage1} /> */}
      <Card.Body>
        <Card.Title>
          {props.title} {` `}
          {"\u20B9"} {props.price}
        </Card.Title>
        <Card.Text>{props.desc}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button
          variant="primary"
          className="btn float-right"
          onClick={props.click}
        >
          Book Service
        </Button>
      </Card.Footer>
    </Card>
  );
}

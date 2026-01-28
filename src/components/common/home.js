import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

import carimage from "../../assets/car-service.jpg";
import carimage1 from "../../assets/car-service-1.jpg";
import carimage2 from "../../assets/car-service-2.jpg";
import { HomePageDetailComponent } from "./HomePageDetailComponent";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    // UserService.getPublicContent().then(
    //   (response) => {
    //     this.setState({
    //       content: response.data,
    //     });
    //   },
    //   (error) => {
    //     this.setState({
    //       // content:
    //       //   (error.response && error.response.data) ||
    //       //   error.message ||
    //       //   error.toString()
    //     });
    //   }
    // );
  }

  render() {
    return (
      <div className="container">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={carimage} alt="First slide" />
            <Carousel.Caption>
              <h3>We have medicines for your car with any type of disease</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carimage1} alt="Second slide" />
            <Carousel.Caption>
              <h3>Drive your car on full speed, but after getting serviced</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carimage2} alt="Third slide" />
            <Carousel.Caption>
              <h3>Make your car feel like a brand new one </h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div style={{ marginBottom: "200px" }}>
          <HomePageDetailComponent />
        </div>
      </div>
    );
  }
}

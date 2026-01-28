import React, { Component } from "react";

class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="fixed-bottom">
        <footer className="footer">
          <span className="text-muted">
            All Rights Reserved 2021 @CarServiceApp
          </span>
        </footer>
      </div>
    );
  }
}

export default FooterComponent;

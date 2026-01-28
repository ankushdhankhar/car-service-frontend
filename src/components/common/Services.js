import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import PackageService from "../../services/PackageService";
import CardComponent from "../../shared/CardComponent";

class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: [],
      navigate: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    PackageService.getPackages().then((res) => {
      this.setState({ packages: res.data });
    });
  }

  handleClick(pId) {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      this.setState({ navigate: "/login" });
    } else if (currentUser.role.includes("EMPLOYEE")) {
      this.setState({ navigate: `/add-service/_add/${pId}` });
    } else if (currentUser.role.includes("CUSTOMER")) {
      this.setState({ navigate: `/customer/add-service/_add/${pId}` });
    }
  }

  render() {
    if (this.state.navigate) {
      return <Navigate to={this.state.navigate} replace />;
    }

    return (
      <div className="container">
        {this.state.packages.map((spackage) => (
          <CardComponent
            key={spackage.package_id}
            title={spackage.package_name}
            desc={spackage.package_description}
            price={spackage.package_price}
            click={() => this.handleClick(spackage.package_id)}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Services);

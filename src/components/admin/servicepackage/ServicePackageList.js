import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import PackageService from "../../../services/PackageService";

class ServicePackageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: [],
      isError: false,
      navigate: null,
    };
    this.addServicePackage = this.addServicePackage.bind(this);
    this.deletePackage = this.deletePackage.bind(this);
  }

  deletePackage(package_id) {
    PackageService.deletePackage(package_id)
      .then((res) => {
        this.setState({
          packages: this.state.packages.filter(
            (spack) => spack.package_id !== package_id
          ),
        });
        alert("Service package removed successfully");
      })
      .catch((error) => {
        this.setState({ isError: true });
        console.log("Error while deleting Service package!!!");
        alert("Error while deleting Service package!!!");
      });
  }
  componentDidMount() {
    PackageService.getPackages().then((res) => {
      this.setState({ packages: res.data });
    });
  }

  addServicePackage() {
    this.setState({ navigate: "/add-package/_add" });
  }

  render() {
    if (this.state.navigate) {
      return <Navigate to={this.state.navigate} replace />;
    }

    return (
      <div>
        <h2 className="text-center">Service Package List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addServicePackage}>
            Add Service Package
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> No</th>
                <th> Name</th>
                <th> Description</th>
                <th> Price</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.packages.map((spackage) => (
                <tr key={spackage.package_id}>
                  <td> {spackage.package_id} </td>
                  <td> {spackage.package_name} </td>
                  <td> {spackage.package_description}</td>
                  <td> {spackage.package_price}</td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deletePackage(spackage.package_id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ServicePackageList;

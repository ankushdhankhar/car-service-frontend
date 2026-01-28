import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AdminService from "../../services/AdminService";

class VendorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendors: [],
      isError: false,
      navigate: null,
    };
    this.addVendor = this.addVendor.bind(this);
    this.editVendor = this.editVendor.bind(this);
    this.deleteVendor = this.deleteVendor.bind(this);
  }

  deleteVendor(id) {
    AdminService.deleteVendor(id)
      .then((res) => {
        this.setState({
          vendors: this.state.vendors.filter((vendor) => vendor.id !== id),
        });
      })
      .catch((error) => {
        this.setState({ isError: true });
        console.log("Error while deleting vendor");
        alert("Error while deleting vendor")
      });
  }
  viewVendor(id) {
    this.setState({ navigate: `/view-vendor/${id}` });
  }
  editVendor(id) {
    this.setState({ navigate: `/add-vendor/${id}` });
  }

  componentDidMount() {
    AdminService.getVendors().then((res) => {
      this.setState({ vendors: res.data.data });
    }).catch((error) => {
      console.error("Error fetching vendors:", error);
      this.setState({ isError: true });
    });
  }

  addVendor() {
    this.setState({ navigate: "/add-vendor/_add" });
  }

  render() {
    if (this.state.navigate) {
      return <Navigate to={this.state.navigate} replace />;
    }

    return (
      <div>
        <h2 className="text-center">Vendor List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addVendor}>
            Add Vendor
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> No</th>
                <th> Name</th>
                <th> Email</th>
                <th> Password</th>
                <th> Address</th>
                <th> Contact</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td> {vendor.id} </td>
                  <td> {vendor.name} </td>
                  <td> {vendor.email}</td>
                  <td> {vendor.password}</td>
                  <td> {vendor.address} </td>
                  <td> {vendor.contact}</td>
                  <td>
                    <button
                      onClick={() => this.editVendor(vendor.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteVendor(vendor.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewVendor(vendor.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* {this.state.isError === true && (
          <div class="alert alert-danger">
            <strong>Danger!</strong> This alert box could indicate a dangerous
            or potentially negative action.
          </div>
        )} */}
      </div>
    );
  }
}

export default VendorList;

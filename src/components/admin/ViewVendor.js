import React, { Component } from "react";
import { useParams, Navigate } from "react-router-dom";
import AdminService from "../../services/AdminService";

class ViewVendor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.id,
      vendor: {},
      navigate: null,
    };
  }

  componentDidMount() {
    AdminService.getVendorById(this.state.id).then((res) => {
      this.setState({ vendor: res.data.data });
    }).catch((error) => {
      console.error("Error fetching vendor:", error);
      alert("Error fetching vendor details. Please try again.");
    });
  }
  cancel() {
    this.setState({ navigate: "/vendor-mgmt" });
  }

  render() {
    if (this.state.navigate) {
      return <Navigate to={this.state.navigate} replace />;
    }

    return (
      <div>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center"> View Vendor Details</h3>
          <div className="card-body">
            <div className="row">
              <label> Name: {this.state.vendor.name} </label>
            </div>
            <div className="row">
              <label> Email: {this.state.vendor.email} </label>
            </div>
            <div className="row">
              <label> Address: {this.state.vendor.address} </label>
            </div>
            <div className="row">
              <label> Contact: {this.state.vendor.contact} </label>
            </div>
            <button
              className="btn btn-info"
              onClick={this.cancel.bind(this)}
              style={{ marginLeft: "400px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Wrapper component to use useParams hook with class component
function ViewVendorWrapper(props) {
  const params = useParams();
  return <ViewVendor {...props} params={params} />;
}

export default ViewVendorWrapper;

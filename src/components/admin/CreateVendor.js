import React, { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import AdminService from "../../services/AdminService";

class CreateVendor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.params.id,
      name: "",
      email: "",
      password: "",
      address: "",
      contact: "",
      disabled: false,
      navigate: null,
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changeContactHandler = this.changeContactHandler.bind(this);
    this.saveOrUpdateVendor = this.saveOrUpdateVendor.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      AdminService.getVendorById(this.state.id).then((res) => {
        let vendor = res.data.data;
        this.setState({
          name: vendor.name,
          email: vendor.email,
          password: "", // Password not sent from backend for security
          address: vendor.address,
          contact: vendor.contact,
        });
      }).catch((error) => {
        console.error("Error fetching vendor:", error);
        alert("Error fetching vendor details. Please try again.");
      });
    }
  }
  saveOrUpdateVendor = (e) => {
    e.preventDefault();
    
    // Add validation
    if (!this.state.name || !this.state.email || !this.state.password || !this.state.address || !this.state.contact) {
      alert("Please fill in all fields");
      return;
    }

    this.setState({ disabled: true });

    let vendor = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      contact: this.state.contact,
    };

    if (this.state.id === "_add") {
      AdminService.createVendor(vendor)
        .then((res) => {
          this.setState({ navigate: "/vendor-mgmt" });
        })
        .catch((error) => {
          console.error("Error creating vendor:", error);
          alert("Error creating vendor. Please try again.");
          this.setState({ disabled: false });
        });
    } else {
      AdminService.updateVendor(vendor, this.state.id)
        .then((res) => {
          this.setState({ navigate: "/vendor-mgmt" });
        })
        .catch((error) => {
          console.error("Error updating vendor:", error);
          alert("Error updating vendor. Please try again.");
          this.setState({ disabled: false });
        });
    }
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };
  changeContactHandler = (event) => {
    this.setState({ contact: event.target.value });
  };

  cancel() {
    this.setState({ navigate: "/vendor-mgmt" });
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Vendor</h3>;
    } else {
      return <h3 className="text-center">Update Vendor</h3>;
    }
  }
  render() {
    if (this.state.navigate) {
      return <Navigate to={this.state.navigate} replace />;
    }

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Name: </label>
                    <input
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email: </label>
                    <input
                      placeholder="Email"
                      name="email"
                      className="form-control email"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Password: </label>
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.changePasswordHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Address: </label>
                    <input
                      placeholder="Address"
                      name="address"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.changeAddressHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Contact: </label>
                    <input
                      placeholder="Contact"
                      name="contact"
                      className="form-control"
                      value={this.state.contact}
                      onChange={this.changeContactHandler}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.saveOrUpdateVendor}
                    disabled={this.state.disabled}
                  >
                    {this.state.disabled ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                    disabled={this.state.disabled}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Wrapper component to use useParams hook with class component
function CreateVendorWrapper(props) {
  const params = useParams();
  return <CreateVendor {...props} params={params} />;
}

export default CreateVendorWrapper;

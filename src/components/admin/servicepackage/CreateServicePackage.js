import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import PackageService from "../../../services/PackageService";

class CreateServicePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      package_name: "",
      package_description: "",
      package_price: "",
      disabled: false,
      navigate: null,
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeDescHandler = this.changeDescHandler.bind(this);
    this.changePriceHandler = this.changePriceHandler.bind(this);
    this.saveOrUpdatePackage = this.saveOrUpdatePackage.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      PackageService.getPackageById(this.state.id).then((res) => {
        let sPackage = res.data.data;
        this.setState({
          package_name: sPackage.package_name,
          package_description: sPackage.package_description,
          package_price: sPackage.package_price,
        });
      });
    }
  }
  saveOrUpdatePackage = (e) => {
    e.preventDefault();
    
    // Add validation
    if (!this.state.package_name || !this.state.package_description || !this.state.package_price) {
      alert("Please fill in all fields");
      return;
    }

    this.setState({ disabled: true });

    let sPackage = {
      package_name: this.state.package_name,
      package_description: this.state.package_description,
      package_price: this.state.package_price,
    };

    if (this.state.id === "_add") {
      PackageService.createPackage(sPackage)
        .then((res) => {
          this.setState({ navigate: "/service-package" });
        })
        .catch((error) => {
          console.error("Error creating package:", error);
          alert("Error creating package. Please try again.");
          this.setState({ disabled: false });
        });
    } else {
      PackageService.updatePackage(sPackage, this.state.id)
        .then((res) => {
          this.setState({ navigate: "/service-package" });
        })
        .catch((error) => {
          console.error("Error updating package:", error);
          alert("Error updating package. Please try again.");
          this.setState({ disabled: false });
        });
    }
  };

  changeNameHandler = (event) => {
    this.setState({ package_name: event.target.value });
  };

  changeDescHandler = (event) => {
    this.setState({ package_description: event.target.value });
  };
  changePriceHandler = (event) => {
    this.setState({ package_price: event.target.value });
  };

  cancel() {
    this.setState({ navigate: "/service-package" });
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Service Package</h3>;
    } else {
      return <h3 className="text-center">Update Service Package</h3>;
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
                      name="package_name"
                      className="form-control"
                      value={this.state.package_name}
                      onChange={this.changeNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Description: </label>
                    <textarea
                      placeholder="Package Description"
                      name="package_description"
                      className="form-control email"
                      rows="5"
                      value={this.state.package_description}
                      onChange={this.changeDescHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Price: </label>
                    <input
                      placeholder="Price"
                      name="package_price"
                      type="number"
                      className="form-control"
                      value={this.state.package_price}
                      onChange={this.changePriceHandler}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.saveOrUpdatePackage}
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

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

// Wrapper component to use useParams hook with class component
function CreateServicePackageWrapper(props) {
  const params = useParams();
  return <CreateServicePackage {...props} params={params} />;
}

export default connect(mapStateToProps)(CreateServicePackageWrapper);

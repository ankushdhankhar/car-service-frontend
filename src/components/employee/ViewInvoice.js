import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeeService from "../../services/EmployeeService";

class ViewInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id: this.props.match.params.customerId,
      request_id: this.props.match.params.requestId,
      name: "",
      email: "",
      password: "",
      address: "",
      contact: "",
      employee_id: "",

      vehicle_reg_no: "",
      vehicle_type: "",
      vehicle_brand: "",
      vehicle_model: "",

      delivery_type: "",
      service_date: "",
      out_date: "",
      product_charges: "",
      labour_charges: "",
      discount: "",
      total: "",
      disabled: false,
    };
  }

  componentDidMount() {
    EmployeeService.getCustomerById(this.state.customer_id).then((res) => {
      let employee = res.data.data;
      this.setState({
        name: employee.name,
        email: employee.email,
        password: employee.password,
        address: employee.address,
        contact: employee.contact,
        employee_id: employee.employee_id,
      });
    });

    EmployeeService.getServiceById(this.state.request_id).then((res) => {
      let service = res.data.data;
      this.setState({
        vehicle_reg_no: service.vehicle_reg_no,
        vehicle_type: service.vehicle_type,
        vehicle_brand: service.vehicle_brand,
        vehicle_model: service.vehicle_model,
        delivery_type: service.delivery_type,
        employee_id: service.employee_id,
        customer_Id: service.customer_Id,
        status: service.status,
        service_date: service.service_date,
        out_date: service.out_date,
        product_charges: service.product_charges,
        labour_charges: service.labour_charges,
        discount: service.discount,
        total: service.total,
      });
    });
  }

  cancel() {
    this.props.history.push("/employee/service-mgmt");
  }

  getTitle() {
    return <h3 className="text-center">View Invoice</h3>;
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-9 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label> Name: </label>
                        <input
                          placeholder="Name"
                          name="name"
                          className="form-control"
                          value={this.state.name}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label> Email: </label>
                        <input
                          placeholder="Email"
                          name="email"
                          className="form-control email"
                          value={this.state.email}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label> Address: </label>
                        <input
                          placeholder="Address"
                          name="address"
                          className="form-control"
                          value={this.state.address}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label> Contact: </label>
                        <input
                          placeholder="Contact"
                          name="contact"
                          className="form-control"
                          value={this.state.contact}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label> Vehicle Registration No: </label>
                        <input
                          placeholder="Mh12sv1234"
                          name="vehicle_reg_no"
                          type="text"
                          className="form-control"
                          value={this.state.vehicle_reg_no}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label> Service Package </label>
                        <input
                          placeholder="Mh12sv1234"
                          name="vehicle_reg_no"
                          type="text"
                          className="form-control"
                          value={this.state.vehicle_reg_no}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div>
                        <label> Vehicle Type </label>
                        <input
                          placeholder="Car/Bike"
                          name="car/bike"
                          className="form-control"
                          value={this.state.vehicle_type}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label> Vehicle Brand: </label>
                        <input
                          placeholder="Brand"
                          type="text"
                          name="vehicle_brand"
                          className="form-control"
                          value={this.state.vehicle_brand}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label> Vehicle Model: </label>
                        <input
                          placeholder="Model"
                          name="vehicle_model"
                          className="form-control"
                          value={this.state.vehicle_model}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>Delivery Type:</label>
                        <input
                          placeholder="Drop-By/Pick-Up"
                          name="deliverytype"
                          className="form-control"
                          value={this.state.delivery_type}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label> Service Date: </label>
                        <input
                          name="service_date"
                          type="date"
                          className="form-control"
                          value={this.state.service_date}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label> Vehicle Out Date: </label>
                        <input
                          name="out_date"
                          type="date"
                          className="form-control"
                          value={this.state.out_date}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label> Product Charges: </label>
                        <input
                          placeholder="ProductCharges"
                          name="product_charges"
                          className="form-control"
                          value={this.state.product_charges}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label> Labour Charges: </label>
                        <input
                          placeholder="LabourCharges"
                          name="labour_charges"
                          className="form-control"
                          value={this.state.labour_charges}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label> Discount: </label>
                        <input
                          placeholder="Discount"
                          name="discount"
                          className="form-control"
                          value={this.state.discount}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label> Total: </label>
                        <input
                          placeholder="Total Bill"
                          name="total"
                          className="form-control"
                          value={this.state.total}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-info"
                    onClick={() => window.print()}
                  >
                    Print
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
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

export default connect(mapStateToProps)(ViewInvoice);

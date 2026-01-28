import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import PackageService from "../../services/PackageService";

class GenerateInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id: this.props.params.customerId,
      request_id: this.props.params.requestId,
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
      navigate: null,

      pid: "",
      pname: "",
      pprice: "",
      pacakges: [],
    };
    this.changeServiceDateHandler = this.changeServiceDateHandler.bind(this);
    this.changeOutDateHandler = this.changeOutDateHandler.bind(this);
    this.changeProductChargesHandler = this.changeProductChargesHandler.bind(
      this
    );
    this.changeLabourChargesHandler = this.changeLabourChargesHandler.bind(
      this
    );
    this.changeDiscountHandler = this.changeDiscountHandler.bind(this);
    this.changeTotalHandler = this.changeTotalHandler.bind(this);

    this.saveOrUpdateInvoice = this.saveOrUpdateInvoice.bind(this);
  }

  componentDidMount() {
    PackageService.getPackages().then((res) => {
      this.setState({
        pacakges: res.data,
      });
    });

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
        pid: service.package_id,
      });

      PackageService.getPackageById(service.package_id).then((res) => {
        let pack = res.data;
        this.setState({
          pid: pack.package_id,
          pname: pack.package_name,
          pprice: pack.package_price,
        });
      });
    });
  }
  saveOrUpdateInvoice = (e) => {
    const { user: currentUser } = this.props;
    e.preventDefault();
    
    // Add validation
    if (!this.state.service_date || !this.state.out_date || !this.state.product_charges ||
        !this.state.pprice || !this.state.discount || !this.state.total) {
      alert("Please fill in all required fields");
      return;
    }

    this.setState({ disabled: true });

    let serviceRequest = {
      customer_id: this.state.customer_id,
      request_id: this.state.request_id,
      package_id: this.state.pid,
      employee_id: currentUser.id,
      service_date: this.state.service_date,
      out_date: this.state.out_date,
      product_charges: this.state.product_charges,
      labour_charges: this.state.pprice,
      discount: this.state.discount,
      total: this.state.total,
    };
    
    EmployeeService.createInvoice(serviceRequest, this.state.request_id)
      .then((res) => {
        this.setState({ navigate: "/employee/service-mgmt" });
      })
      .catch((error) => {
        console.error("Error creating invoice:", error);
        alert("Error creating invoice. Please try again.");
        this.setState({ disabled: false });
      });
  };

  changeServiceDateHandler = (event) => {
    this.setState({ service_date: event.target.value });
  };
  changeOutDateHandler = (event) => {
    this.setState({ out_date: event.target.value });
  };
  changeProductChargesHandler = (event) => {
    this.setState({ product_charges: event.target.value });
  };
  changeLabourChargesHandler = (event) => {
    this.setState({ pprice: event.target.value });
  };
  changeDiscountHandler = (event) => {
    let markedprice = Number(this.state.product_charges) + Number(this.state.pprice);
    let dis = event.target.value;
    let s = 100 - dis;
    let finalTotal = (s * markedprice) / 100;
    console.log("@", markedprice)

    this.setState({ discount: event.target.value, total: finalTotal });
  };
  changeTotalHandler = (event) => {
    this.setState({ total: event.target.value });
  };

  cancel() {
    this.setState({ navigate: "/employee/service-mgmt" });
  }

  getTitle() {
    return <h3 className="text-center">Generate Invoice</h3>;
  }
  render() {
    if (this.state.navigate) {
      return <Navigate to={this.state.navigate} replace />;
    }

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
                        <select
                          value={this.state.pid}
                          className="form-control"
                          disabled
                        >
                          {this.state.pacakges.map((p, index) => (
                            <option key={index} value={p.package_id}>
                              {p.package_name} {`->`} {"\u20B9"}{" "}
                              {p.package_price}
                            </option>
                          ))}
                        </select>
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
                  {/* <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label> Employee_Id </label>
                        <input
                          placeholder="Employee_Id"
                          name="employee_id"
                          className="form-control"
                          value={1}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label> Customer_Id </label>
                        <input
                          placeholder="Customer_Id"
                          name="customer_id"
                          className="form-control"
                          value={currentUser.id}
                          disabled
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label> Service Date: </label>
                        <input
                          name="service_date"
                          type="date"
                          className="form-control"
                          value={this.state.service_date}
                          onChange={this.changeServiceDateHandler}
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
                          onChange={this.changeOutDateHandler}
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
                          onChange={this.changeProductChargesHandler}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label> Labour Charges: </label>
                        <input
                          placeholder="LabourCharges"
                          name="pprice"
                          className="form-control"
                          value={this.state.pprice}
                          onChange={this.changeLabourChargesHandler}
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
                          onChange={this.changeDiscountHandler}
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
                          onChange={this.changeTotalHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.saveOrUpdateInvoice}
                    disabled={this.state.disabled}
                  >
                    {this.state.disabled ? "Saving..." : "Save & Print"}
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

// Wrapper component to use useParams hook with class component
function GenerateInvoiceWrapper(props) {
  const params = useParams();
  return <GenerateInvoice {...props} params={params} />;
}

export default connect(mapStateToProps)(GenerateInvoiceWrapper);

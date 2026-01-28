import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeeService from "../../services/EmployeeService";

class ListofService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services: [],
      isError: false,
    };
    this.addService = this.addService.bind(this);
    this.editService = this.editService.bind(this);
  }

  createServiceInvoice(customerId, requestId) {
    this.props.history.push(`/generate-invoice/${customerId}/${requestId}`);
  }
  editService(id, pid) {
    this.props.history.push(`/add-service/${id}/${pid}`);
  }

  componentDidMount() {
    const { user: currentUser } = this.props;
    EmployeeService.getServices(currentUser.id).then((res) => {
      this.setState({ services: res.data.data });
    });
  }

  addService() {
    this.props.history.push(`/add-service/_add/${1}`);
  }

  viewServiceInvoice(customerId, requestId) {
    this.props.history.push(`/employee/view-invoice/${customerId}/${requestId}`);
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Service List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addService}>
            Add Service
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> No </th>
                <th> Vehicle Reg No.</th>
                <th> Vehicle Type</th>
                <th> Vehicle Brand</th>
                <th> Vehicle Model</th>
                <th> Delivery Type</th>
                {/* <th> Customer Name</th> */}
                <th> Status</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.services.map((service, index) => (
                <tr key={service.request_id}>
                  <td> {index + 1} </td>
                  <td> {service.vehicle_reg_no} </td>
                  <td> {service.vehicle_type} </td>
                  <td> {service.vehicle_brand}</td>
                  <td> {service.vehicle_model}</td>
                  <td> {service.delivery_type} </td>
                  {/* <td> {service.status} </td> */}
                  <td> {service.status} </td>
                  <td>
                    {service.status === "COMPLETED" && (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                          this.createServiceInvoice(
                            service.customer_Id,
                            service.request_id
                          )
                        }
                        className="btn btn-info"
                      >
                        Create Invoice
                      </button>
                    )}
                    {(service.status === "CREATED" ||
                      service.status === "INPROGRESS") && (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.editService(service.request_id, service.package_id)}
                        className="btn btn-info"
                      >
                        Edit
                      </button>
                    )}

                    {service.status === "INVOICEGENERATED" && (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                          this.viewServiceInvoice(
                            service.customer_Id,
                            service.request_id
                          )
                        }
                        className="btn btn-info"
                      >
                        View Invoice
                      </button>
                    )}
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

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(ListofService);

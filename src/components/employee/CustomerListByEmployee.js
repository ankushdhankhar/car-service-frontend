import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";

class CustomerListByEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      isError: false,
      navigate: null,
    };
    this.addCustomer = this.addCustomer.bind(this);
    this.editCustomer = this.editCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  deleteCustomer(id) {
    EmployeeService.deleteCustomer(id)
      .then((res) => {
        this.setState({
          customers: this.state.customers.filter(
            (customer) => customer.id !== id
          ),
        });
      })
      .catch((error) => {
        this.setState({ isError: true });
        console.log("Error while deleting vendor");
        alert("Error while deleting vendor");
      });
  }
  editCustomer(id) {
    this.setState({ navigate: `/add-customer/${id}` });
  }

  componentDidMount() {
    EmployeeService.getCustomers().then((res) => {
      this.setState({ customers: res.data.data });
    });
  }

  addCustomer() {
    this.setState({ navigate: "/add-customer/_add" });
  }

  render() {
    if (this.state.navigate) {
      return <Navigate to={this.state.navigate} replace />;
    }

    return (
      <div>
        <h2 className="text-center">Customer List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addCustomer}>
            Add Customer
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
              {this.state.customers.map((customer) => (
                <tr key={customer.id}>
                  <td> {customer.id} </td>
                  <td> {customer.name} </td>
                  <td> {customer.email}</td>
                  <td> {customer.password}</td>
                  <td> {customer.address} </td>
                  <td> {customer.contact}</td>
                  <td>
                    <button
                      onClick={() => this.editCustomer(customer.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteCustomer(customer.id)}
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
export default CustomerListByEmployee;

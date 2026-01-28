import React, { Component } from "react";
import VendorService from "../../services/VendorService";

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      isError: false,
    };
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  deleteCustomer(id) {
    VendorService.deleteCustomer(id)
      .then((res) => {
        this.setState({
          customers: this.state.customers.filter((customer) => customer.id !== id),
        });
      })
      .catch((error) => {
        this.setState({ isError: true });
        console.log("Error while deleting customer");
        alert("Error while deleting customer")
      });
  }
  componentDidMount() {
    VendorService.getCustomers().then((res) => {
      this.setState({ customers: res.data.data || res.data });
    }).catch((error) => {
      console.error("Error fetching customers:", error);
      this.setState({ isError: true });
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Customer List</h2>
        <div className="row">
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

export default CustomerList;

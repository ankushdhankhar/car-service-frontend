import React, { Component } from "react";
import EmployeeService from "../../services/EmployeeService";

class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      isError: false,
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id)
      .then((res) => {
        this.setState({
          employees: this.state.employees.filter((employee) => employee.id !== id),
        });
      })
      .catch((error) => {
        this.setState({ isError: true });
        console.log("Error while deleting employee");
        alert("Error while deleting employee")
      });
  }
  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`);
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data.data });
    });
  }

  addEmployee() {
    this.props.history.push("/add-employee/_add");
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Employee List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addEmployee}>
            Add Employee
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
                <th> BirthDate</th>
                <th> Vendor_Id</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td> {employee.id} </td>
                  <td> {employee.name} </td>
                  <td> {employee.email}</td>
                  <td> {employee.password}</td>
                  <td> {employee.birthdate} </td>
                  <td> {employee.vendorid}</td>
                  <td>
                    <button
                      onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteEmployee(employee.id)}
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

export default EmployeeList;

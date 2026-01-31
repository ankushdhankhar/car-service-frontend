import axios from 'axios';
import authHeader from "./auth-header";

const EMPLOYEE_API_BASE_URL = "https://gogarage-backend-1.onrender.com";

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL + "/vendor/employeeList", {
            headers: authHeader(),
          });
        }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL+ "/vendor/addEmployee",  employee,{
            headers: authHeader(),
          });
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/vendor/employee/' + employeeId,{
            headers: authHeader(),
          });
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/vendor/editEmployee/' + employeeId, employee,{
            headers: authHeader(),
          });
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/vendor/deleteEmployee/' + employeeId,{
            headers: authHeader(),
          });
    }






    getCustomers(){
        return axios.get(EMPLOYEE_API_BASE_URL + "/employee/customerlist", {
            headers: authHeader(),
          });
        }

    createCustomer(customer){
        return axios.post(EMPLOYEE_API_BASE_URL+ "/employee/customer/signup",  customer,{
            headers: authHeader(),
          });
    }

    getCustomerById(customerId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/employee/customer/' + customerId,{
            headers: authHeader(),
          });
    }

    updateCustomer(customer, customerId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/employee/editCustomer/' + customerId, customer,{
            headers: authHeader(),
          });
    }

    deleteCustomer(customerId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/employee/deleteCustomer/' + customerId,{
            headers: authHeader(),
          });
    }

    getServices(customerId) {
      return axios.get(
        EMPLOYEE_API_BASE_URL + "/employee/services/" + customerId,
        {
          headers: authHeader(),
        }
      );
    }

    getServiceById(requestId) {
      return axios.get(
        EMPLOYEE_API_BASE_URL + "/employee/servicereq/" + requestId,
        {
          headers: authHeader(),
        }
      );
    }

    createService(service, customerId) {
      return axios.post(
        EMPLOYEE_API_BASE_URL + "/employee/addService/" + customerId,
        service,
        {
          headers: authHeader(),
        }
      );
    }
    updateService(service, requestId) {
      return axios.post(EMPLOYEE_API_BASE_URL + "/employee/updateService/" + requestId, service, {
        headers: authHeader(),
      });
    }


    createInvoice(service, requestId) {
      return axios.put(
        EMPLOYEE_API_BASE_URL + "/employee/service/createInvoice/" + requestId,
        service,
        {
          headers: authHeader(),
        }
      );
    }
}

const employeeService = new EmployeeService();
export default employeeService;
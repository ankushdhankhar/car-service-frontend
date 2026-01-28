import axios from "axios";
import authHeader from "./auth-header";

const CUSTOMER_API_BASE_URL = "http://localhost:8080";

class CustomerService {
  getCustomers() {
    return axios.get(CUSTOMER_API_BASE_URL + "/employee/customerlist", {
      headers: authHeader(),
    });
  }

  createCustomer(customer) {
    return axios.post(CUSTOMER_API_BASE_URL + "/", customer, {
      headers: authHeader(),
    });
  }

  getCustomerById(customerId) {
    return axios.get(CUSTOMER_API_BASE_URL + "/customer/" + customerId, {
      headers: authHeader(),
    });
  }

  updateCustomer(customer, customerId) {
    return axios.put(CUSTOMER_API_BASE_URL + `/customer/editCustomer/` + customerId, customer, {
      headers: authHeader(),
    });
  }

  getServices(customerId) {
    return axios.get(
      CUSTOMER_API_BASE_URL + "/customer/service/" + customerId,
      {
        headers: authHeader(),
      }
    );
  }

  getServiceById(customerId) {
    return axios.get(
      CUSTOMER_API_BASE_URL + "/customer/service/" + customerId,
      {
        headers: authHeader(),
      }
    );
  }

  deleteCustomer(customerId) {
    return axios.delete(
      CUSTOMER_API_BASE_URL + `/customer/deleteCustomer/${customerId}`,
      {
        headers: authHeader(),
      }
    );
  }

  createService(customer, customerId) {
    return axios.post(
      CUSTOMER_API_BASE_URL + "/customer/addService/" + customerId,
      customer,
      {
        headers: authHeader(),
      }
    );
  }
  getInvoice(customerId){
    return axios.get(
      CUSTOMER_API_BASE_URL + "/customer/viewInvoice/" + customerId,
      {
        headers: authHeader(),
      }
    );
  }
}

const customerService = new CustomerService();
export default customerService;

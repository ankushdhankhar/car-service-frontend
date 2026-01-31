import axios from "axios";
import authHeader from "./auth-header";

const VENDOR_API_BASE_URL = "https://gogarage-backend-1.onrender.com/vendor";

class VendorService {
  // Employee management methods for vendors
  getEmployees() {
    return axios.get(VENDOR_API_BASE_URL + "/employeeList", {
      headers: authHeader(),
    });
  }

  createEmployee(employee) {
    return axios.post(VENDOR_API_BASE_URL + "/addEmployee", employee, {
      headers: authHeader(),
    });
  }

  getEmployeeById(employeeId) {
    return axios.get(VENDOR_API_BASE_URL + "/employee/" + employeeId, {
      headers: authHeader(),
    });
  }

  updateEmployee(employee, employeeId) {
    return axios.put(VENDOR_API_BASE_URL + `/editEmployee/` + employeeId, employee, {
      headers: authHeader(),
    });
  }

  deleteEmployee(employeeId) {
    return axios.delete(VENDOR_API_BASE_URL + `/deleteEmployee/${employeeId}`, {
      headers: authHeader(),
    });
  }

  // Vendor profile methods
  getVendorById(vendorId) {
    return axios.get(VENDOR_API_BASE_URL + "/" + vendorId, {
      headers: authHeader(),
    });
  }

  getVendorByEmail(emailId) {
    return axios.get(VENDOR_API_BASE_URL + "/byEmail/" + emailId, {
      headers: authHeader(),
    });
  }

  // Customer management methods for vendors
  getCustomers() {
    return axios.get(VENDOR_API_BASE_URL + "/customer-management/list", {
      headers: authHeader(),
    });
  }

  getCustomerById(customerId) {
    return axios.get(VENDOR_API_BASE_URL + "/customer/" + customerId, {
      headers: authHeader(),
    });
  }

  deleteCustomer(customerId) {
    return axios.delete(VENDOR_API_BASE_URL + `/deleteCustomer/${customerId}`, {
      headers: authHeader(),
    });
  }

  // Feedback management methods for vendors
  getFeedbacks() {
    return axios.get(VENDOR_API_BASE_URL + "/Feedbacklist", {
      headers: authHeader(),
    });
  }

  deleteFeedback(feedbackId) {
    return axios.delete(VENDOR_API_BASE_URL + `/deleteFeedback/${feedbackId}`, {
      headers: authHeader(),
    });
  }
}

const vendorService = new VendorService();
export default vendorService;

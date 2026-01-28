import axios from "axios";
import authHeader from "./auth-header";

const ADMIN_API_BASE_URL = "http://localhost:8080/admin";

class AdminService {
  getVendors() {
    return axios.get(ADMIN_API_BASE_URL + "/vendorlist", {
      headers: authHeader(),
    });
  }

  createVendor(vendor) {
    return axios.post(ADMIN_API_BASE_URL + "/vendor/signup", vendor, {
      headers: authHeader(),
    });
  }

  getVendorById(vendorId) {
    return axios.get(ADMIN_API_BASE_URL + "/vendor/" + vendorId, {
      headers: authHeader(),
    });
  }

  updateVendor(vendor, vendorId) {
    return axios.put(ADMIN_API_BASE_URL + `/editVendor/` + vendorId, vendor, {
      headers: authHeader(),
    });
  }

  deleteVendor(vendorId) {
    return axios.delete(ADMIN_API_BASE_URL + `/deleteVendor/${vendorId}`, {
      headers: authHeader(),
    });
  }

  getAdmins() {
    return axios.get(ADMIN_API_BASE_URL + "/list", {
      headers: authHeader(),
    });
  }

  getAdminById(adminId) {
    return axios.get(ADMIN_API_BASE_URL + "/" + adminId, {
      headers: authHeader(),
    });
  }

  getOffers() {
    return axios.get(ADMIN_API_BASE_URL + "/offerlist", {
      headers: authHeader(),
    });
  }

  createOffer(offer) {
    return axios.post(ADMIN_API_BASE_URL + "/addOffer", offer, {
      headers: authHeader(),
    });
  }

  updateOffer(offer, offerId) {
    return axios.put(ADMIN_API_BASE_URL + `/editOffer/` + offerId, offer, {
      headers: authHeader(),
    });
  }

  deleteOffer(offerId) {
    return axios.delete(ADMIN_API_BASE_URL + `/deleteOffer/${offerId}`, {
      headers: authHeader(),
    });
  }
}

const adminService = new AdminService();
export default adminService;
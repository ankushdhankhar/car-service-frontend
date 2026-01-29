import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/common/home";
import Profile from "./components/profile";
import FooterComponent from "./components/common/FooterComponent";

import { logout } from "./actions/auth";

import { AdminHome } from "./components/admin/AdminHome";
import VendorList from "./components/admin/VendorList";
import CreateVendor from "./components/admin/CreateVendor";
import ViewVendor from "./components/admin/ViewVendor";
import { FeedbackComponent } from "./components/admin/FeedbackComponent";
import { VendorHome } from "./components/vendor/VendorHome";
import { SiteMaitainance } from "./shared/SiteMaitainance";
import EmployeeList from "./components/vendor/EmployeeList";
import CreateEmployee from "./components/vendor/CreateEmployee";
import CustomerList from "./components/vendor/CustomerList";
import CreateCustomer from "./components/employee/CreateCustomer";
import { Aboutus } from "./components/common/Aboutus";
import { Contactus } from "./components/common/Contactus";
import { FAQs } from "./components/common/FAQs";
import CustomerListByEmployee from "./components/employee/CustomerListByEmployee";
import { CustomerHome } from "./components/customer/CustomerHome";
import BookService from "./components/customer/BookService";
import ServiceList from "./components/customer/ServiceList";
import AddService from "./components/employee/AddService";
import ListofService from "./components/employee/ListofService";
import GenerateInvoice from "./components/employee/GenerateInvoice";
import CustomerEditProfile from "./components/customer/CustomerEditProfile";
import ServicePackageList from "./components/admin/servicepackage/ServicePackageList";
import CreateServicePackage from "./components/admin/servicepackage/CreateServicePackage";
import Services from "./components/common/Services";
import Invoice from "./components/customer/Invoice";
import ViewInvoice from "./components/employee/ViewInvoice";
import FloatingAIWidget from "./components/ai/FloatingAIWidget";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showVendorBoard: false,
      showEmployeeBoard: false,
      showCustomerBoard: false,
      showCommonBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    this.updateUserState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.updateUserState();
    }
  }

  updateUserState() {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.role === "ADMIN",
        showVendorBoard: user.role === "VENDOR",
        showEmployeeBoard: user.role === "EMPLOYEE",
        showCustomerBoard: user.role === "CUSTOMER",
        showCommonBoard: false,
      });
    } else {
      this.setState({
        currentUser: undefined,
        showAdminBoard: false,
        showVendorBoard: false,
        showEmployeeBoard: false,
        showCustomerBoard: false,
        showCommonBoard: true,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const {
      currentUser,
      showAdminBoard,
      showVendorBoard,
      showEmployeeBoard,
      showCommonBoard,
      showCustomerBoard,
    } = this.state;
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg fixed-top modern-navbar">
            <div className="container-fluid px-4">
              {/* Brand */}
              {/* <Link
                to="/"
                className="navbar-brand d-flex align-items-center gap-2"
              >
                <img src={logo} alt="AutoCare" height="36" />
                <span className="brand-text">AutoCare</span>
              </Link> */}

              <Link
                to="/"
                className="navbar-brand d-flex align-items-center gap-2 gogarage-brand"
              >
                <div className="brand-icon">G</div>
                <div className="d-flex flex-column lh-sm">
                  <span className="brand-name">GoGarage</span>
                  <small className="brand-tagline">Smart Car Service</small>
                </div>
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="mainNavbar">
                {/* CENTER NAV */}
                <ul className="navbar-nav mx-auto nav-center">
                  {showCommonBoard && (
                    <>
                      <li className="nav-item">
                        <Link to="/home" className="nav-link">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/services" className="nav-link">
                          Services
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/aboutus" className="nav-link">
                          About
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/faqs" className="nav-link">
                          FAQs
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/contactus" className="nav-link">
                          Contact
                        </Link>
                      </li>
                    </>
                  )}

                  {currentUser && showAdminBoard && (
                    <>
                      <li className="nav-item">
                        <Link to="/home" className="nav-link">
                          Dashboard
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/vendor-mgmt" className="nav-link">
                          Vendors
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/service-package" className="nav-link">
                          Packages
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/admin/feedback" className="nav-link">
                          Feedback
                        </Link>
                      </li>
                    </>
                  )}

                  {showVendorBoard && (
                    <>
                      <li className="nav-item">
                        <Link to="/home" className="nav-link">
                          Dashboard
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/vendor/employee-mgmt" className="nav-link">
                          Employees
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/vendor/customer-mgmt" className="nav-link">
                          Customers
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/vendor" className="nav-link">
                          Feedback
                        </Link>
                      </li>
                    </>
                  )}

                  {showEmployeeBoard && (
                    <>
                      <li className="nav-item">
                        <Link to="/home" className="nav-link">
                          Dashboard
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/employee/customer-mgmt" className="nav-link">
                          Customers
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/employee/service-mgmt" className="nav-link">
                          Services
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/employee" className="nav-link">
                          Feedback
                        </Link>
                      </li>
                    </>
                  )}

                  {showCustomerBoard && (
                    <>
                      <li className="nav-item">
                        <Link to="/home" className="nav-link">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/services" className="nav-link">
                          Services
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/customer/book-service" className="nav-link">
                          Book Service
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/customer/feedback" className="nav-link">
                          Feedback
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/customer/editprofile" className="nav-link">
                          Profile
                        </Link>
                      </li>
                    </>
                  )}
                </ul>

                {/* RIGHT ACTIONS */}
                <div className="d-flex align-items-center gap-3">
                  {currentUser ? (
                    <>
                      <span className="user-email d-none d-lg-block">
                        {currentUser.email}
                      </span>
                      <a
                        href="/login"
                        onClick={this.logOut}
                        className="btn btn-outline-accent btn-sm"
                      >
                        Logout
                      </a>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="btn btn-ghost btn-sm">
                        Login
                      </Link>
                      <Link to="/register" className="btn btn-accent btn-sm">
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin-home" element={<AdminHome />} />

              {/* vendor */}
              <Route path="/vendor-mgmt" element={<VendorList />} />
              <Route path="/service-package" element={<ServicePackageList />} />
              <Route
                path="/add-package/:id"
                element={<CreateServicePackage />}
              />
              <Route path="/add-vendor/:id" element={<CreateVendor />} />
              <Route path="/view-vendor/:id" element={<ViewVendor />} />
              <Route path="/admin/feedback" element={<FeedbackComponent />} />
              <Route path="/vendor/home" element={<VendorHome />} />

              {/* employee crud operation from vendor */}
              <Route path="/vendor/employee-mgmt" element={<EmployeeList />} />
              <Route path="/add-employee/:id" element={<CreateEmployee />} />
              <Route path="/vendor/customer-mgmt" element={<CustomerList />} />
              <Route
                path="/employee/view-invoice/:customerId/:requestId"
                element={<ViewInvoice />}
              />

              {/* customer crud operation from employee */}
              <Route
                path="/employee/customer-mgmt"
                element={<CustomerListByEmployee />}
              />
              <Route path="/add-customer/:id" element={<CreateCustomer />} />
              <Route
                path="/employee/service-mgmt"
                element={<ListofService />}
              />
              <Route path="/add-service/:id/:pid" element={<AddService />} />
              <Route
                path="/employee/invoice-mgmt"
                element={<SiteMaitainance />}
              />
              <Route
                path="/customer/editprofile"
                element={<CustomerEditProfile />}
              />
              <Route
                path="/generate-invoice/:customerId/:requestId"
                element={<GenerateInvoice />}
              />

              {/* Customer CRUD */}
              <Route path="/customer-home" element={<CustomerHome />} />
              <Route path="/customer/book-service" element={<ServiceList />} />
              <Route
                path="/customer/add-service/:id/:pid"
                element={<BookService />}
              />
              <Route
                path="/customer/print-invoice/:customerId/:requestId"
                element={<Invoice />}
              />
              <Route path="/customer/feedback" element={<SiteMaitainance />} />

              {/* maintenance page */}
              <Route path="/m" element={<SiteMaitainance />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/contactus" element={<Contactus />} />
              <Route path="/faqs" element={<FAQs />} />
            </Routes>
            {/* AI Floating Widget */}
            <FloatingAIWidget />
          </div>
          <FooterComponent />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);

import React from "react";

function FooterComponent() {
  return (
    <footer className="modern-footer">
      <span>
        © {new Date().getFullYear()} GoGarage. All rights reserved.
      </span>
    </footer>
  );
}

export default FooterComponent;

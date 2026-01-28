import React from "react";

export function SiteMaitainance() {
  const divStyle = {
    textAlign: "center",
    padding: "150px",
    font: "20px Helvetica",
    color: "#333",
  };

  const h1Style = { fontSize: "50px" };

  const aStyle = {
    color: "#dc8100",
    textDecoration: "none",
  };

  const articleStyle = {
    display: "block",
    textAlign: "left",
    width: "650px",
    margin: "0 auto",
  };

  return (
    <div style={divStyle}>
      <article style={articleStyle}>
        <h1 style={h1Style}>We&rsquo;ll be back soon!</h1>
        <div>
          <p>
            Sorry for the inconvenience but we&rsquo;re performing some
            maintenance at the moment. If you need to you can always{" "}
            <a style={aStyle} href="mailto:#">
              contact us
            </a>
            , otherwise we&rsquo;ll be back online shortly!
          </p>
          <p>&mdash; The Motor Work Team</p>
        </div>
      </article>
    </div>
  );
}
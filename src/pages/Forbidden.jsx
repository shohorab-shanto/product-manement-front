import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Forbidden = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column flex-root">
      <div className="d-flex flex-column flex-center flex-column-fluid p-10">
        <img
          src="/assets/media/illustrations/sketchy-1/18.png"
          alt="404"
          className="mw-100 mb-10 h-lg-450px"
        />

        <h1 className="fw-bold mb-10" style={{ color: " #A3A3C7" }}>
          Seems you don't have access to this page
        </h1>

        <Link
          onClick={() =>
            location.pathname.includes("panel")
              ? navigate(-1)
              : (window.location.href = "/")
          }
          to="#"
          className="btn btn-primary"
        >
          {location.pathname.includes("panel")
            ? "Return to Previous Page"
            : "Back to Home"}
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;

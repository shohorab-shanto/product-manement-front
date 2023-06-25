import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, login } from "features/Auth";
import { toast } from "react-toastify";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Replace the classes of body for the page
  let body = document.getElementsByTagName("body");
  body[0].setAttribute("class", "bg-body");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(async () => {
    let locUser = JSON.parse(localStorage.getItem("user"));
    if (locUser) {
      await dispatch(getProfile());

      if (locUser?.user?.details) {
        navigate("/panel/client/dashboard");
      } else {
        navigate("/panel/dashboard");
      }
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = data;
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    let msg = localStorage.getItem("auth_message");

    if (msg) {
      toast.warning(msg);
      localStorage.removeItem("auth_message");
    }
  }, []);

  return (
    <div className="d-flex flex-column flex-root">
      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
        <div
          className="d-flex flex-column flex-lg-row-auto w-xl-600px positon-xl-relative"
          style={{ backgroundColor: "#F2C98A", height: "100vh" }}
        >
          <div className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y">
            <div className="d-flex flex-row-fluid flex-column text-center p-10 pt-lg-20">
              <Link to="#" className="py-9 mb-5">
                <img
                  alt="Logo"
                  src="assets/media/logos/naf.png"
                  className="h-60px"
                />
              </Link>

              <h1
                className="fw-bolder fs-2qx pb-5 pb-md-10"
                style={{ color: "#986923" }}
              >
                Welcome to Product Management
              </h1>

              <p className="fw-bold fs-2" style={{ color: "#986923" }}>
                This is one of the most prestigious and experienced
                commercial and industrial conglomerates in Bangladesh today
              </p>
            </div>

            <div
              className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px"
              style={{
                backgroundImage:
                  "url(assets/media/illustrations/sketchy-1/13.png",
              }}
            ></div>
          </div>
        </div>

        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          <div className="d-flex flex-center flex-column flex-column-fluid">
            <div className="w-lg-500px p-10 p-lg-15 mx-auto">
              <form
                className="form w-100"
                noValidate="novalidate"
                action="/panel/dashboard"
              >
                <div className="text-center mb-10">
                  <h1 className="text-dark mb-3">Sign In to the Panel</h1>
                </div>

                <div className="fv-row mb-10">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Email
                  </label>

                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    autoComplete="off"
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                <div className="fv-row mb-10">
                  <div className="d-flex flex-stack mb-2">
                    <label className="form-label fw-bolder text-dark fs-6 mb-0">
                      Password
                    </label>

                    <a href="!#" className="link-primary fs-6 fw-bolder">
                      Forgot Password ?
                    </a>
                  </div>

                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="password"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    id="kt_sign_in_submit"
                    className="btn btn-lg btn-primary w-100 mb-5"
                    onClick={handleLogin}
                  >
                    <span className="indicator-label">Continue</span>
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
            <div className="d-flex flex-center fw-bold fs-6">
              <Link
                to="#"
                className="text-muted text-hover-primary px-2"
                target="_blank"
              >
                About
              </Link>
              <Link
                to="#"
                className="text-muted text-hover-primary px-2"
                target="_blank"
              >
                Support
              </Link>
              <Link
                to="#"
                className="text-muted text-hover-primary px-2"
                target="_blank"
              >
                Purchase
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

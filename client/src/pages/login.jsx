import React, { useContext, useState } from "react";
import "../components/core/style/auth.css";
import { imageLogoAssets } from "../assets/js/image-assets";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { apiConnector } from "../service/api-connector";
import { auth } from "../service/apis";
import { toast } from "react-toastify";
import { AppContext } from "../context/common-store";

const Login = () => {
  const { loginResponseData, storeTokenInLS, switchLoginVerify } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // ---------------------------------------- handle login formdata ---------------------------------------------
  const handleLoginFormData = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Sending otp...");
    try {
      const response = await apiConnector("POST", auth.SEND_OTP_API, {
        email,
      });
      if (!response.data.success) {
        alert(response.data.message);
      } else {
        loginResponseData({
          email: response.data.response.email,
          status: response.data.success,
        });
        setEmail("");

        toast.update(loadingToastId, {
          render: "OTP Send Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        // console.log("sending response : ", response.data.response);
      }
    } catch (error) {
      // console.log("sending  error response : ", error);
      toast.update(loadingToastId, {
        render: error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  // ---------------------------------------verify email  -------------------------------------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Verifying otp...");
    try {
      const response = await apiConnector("POST", auth.LOGIN_API, {
        email: switchLoginVerify.email,
        otp,
      });
      if (!response.data.success) {
        alert(response.data.message);
      } else {
        storeTokenInLS(response.data.token);
        toast.update(loadingToastId, {
          render: "Login Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        loginResponseData({
          email: "",
          status: false,
        });
        // console.log("login response : ", response.data.response);
        navigate("/home");
      }
    } catch (error) {
      // console.log("logIn  error response : ", error);
      toast.update(loadingToastId, {
        render: error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  return (
    <div className="login-container">
      {!switchLoginVerify?.status ? (
        <div className="login">
          <>
            <img src={imageLogoAssets.ProjectLogo} alt="Logo" />
          </>
          <>
            <h1>Login</h1>
            <form action="" onSubmit={(e) => handleLoginFormData(e)}>
              <input
                type="email"
                placeholder="Enter your email "
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">
                <FaArrowRight />
              </button>
            </form>
          </>
          <>
            <span>OR</span>

            <Link to={"/signup"}>
              <button className="signUpBtn">Sign up</button>
            </Link>
          </>
        </div>
      ) : (
        <div className="login verifyOTP">
          <h1>Verify OTP</h1>
          <form onSubmit={(e) => handleVerifyOtp(e)}>
            <OTPInput
              required
              numInputs={6}
              name={otp}
              value={otp}
              onChange={setOtp}
              renderInput={(props) => (
                <input {...props} placeholder="-" className="otp-boxes" />
              )}
            />
            <input type="submit" value="Verify" className="signUpBtn" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { State } from "country-state-city";
import { Link, useNavigate } from "react-router-dom";
import { apiConnector } from "../service/api-connector";
import { auth } from "../service/apis";
import { toast } from "react-toastify";

const SignUp = () => {
  const states = State.getStatesOfCountry("IN");
  const navigate = useNavigate();

  const [check, setChecked] = useState(false);

  const [userSignUpData, setUserSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    pinCode: "",
    state: "",
    referCode: "",
  });

  // TODO : ---------------------------------------------------------- handle input ------------------------------------------------------------
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserSignUpData({
      ...userSignUpData,
      [name]: value,
    });
  };

  // TODO : ---------------------------------------------------------- handle submit data ------------------------------------------------------------
  const handleSignUpFormData = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Submitting your data...");
    try {
      const response = await apiConnector("POST", auth.SIGNUP_API, {
        name: userSignUpData.name,
        email: userSignUpData.email,
        phone: userSignUpData.phone,
        pinCode: userSignUpData.pinCode,
        state: userSignUpData.state,
        referCode: userSignUpData.referCode,
        isChecked: check,
      });

      if (!response.data.success) {
        alert(response.data.message);
      } else {
        toast.update(loadingToastId, {
          render: "Signup Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        // console.log("signup response : ", response.data.response);
        navigate("/");
      }
    } catch (error) {
      // console.log("signup response : ", error);
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
    <div className="signUp-container">
      <div className="signUp">
        <h1>Sign up</h1>
        <form action="" onSubmit={(e) => handleSignUpFormData(e)}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={(e) => handleInput(e)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => handleInput(e)}
            required
          />
          <input
            type="number"
            name="phone"
            placeholder="Enter your mobile number"
            onChange={(e) => handleInput(e)}
            required
          />
          <input
            type="number"
            name="pinCode"
            placeholder="Enter your pin code"
            onChange={(e) => handleInput(e)}
            required
          />

          <select required name="state" onChange={(e) => handleInput(e)}>
            <option value="">Select your state</option>
            {states.map((stateName, index) => (
              <option key={index} value={stateName.name}>
                {stateName.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="referCode"
            placeholder="Enter refer code"
            onChange={(e) => handleInput(e)}
            required
          />
          <span>
            <input
              type="checkbox"
              name="isChecked"
              id="check"
              required
              onClick={() => setChecked(!check)}
            />
            <label htmlFor="check">Terms & conditions</label>
          </span>
          <button type="submit" className="signUpBtn">
            Submit
          </button>
          <p className="alreadyAccount">
            Already account ? <Link to={"/"}>Login</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

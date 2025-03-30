import { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { AppContext } from "./common-store";
import { apiConnector } from "../service/api-connector";
import { auth, business } from "../service/apis";

// 1. create
export const APIContext = createContext();

// 2. Provider
const APIProvider = (props) => {
  const { token } = useContext(AppContext);
  const authorizationToken = `Bearer ${token}`;

  // ------------------------------------------- Getting user details ---------------------------------
  const [user, setUser] = useState({});
  const [userDetailsLoading, setUserDetailsLoading] = useState(true);
  const userDetails = async () => {
    try {
      setUserDetailsLoading(true);

      try {
        const headers = {
          Authorization: authorizationToken,
        };

        const response = await apiConnector(
          "GET",
          auth.USER_DETAILS,
          null,
          headers
        );

        if (!response.data.success) {
          alert(response.data.message);
        } else {
          setUser(response.data.response);
          console.log("user details response ", response);
          setUserDetailsLoading(false);
        }
      } catch (error) {}
    } catch (error) {
      console.log("error occurs in user details", error);
      setUserDetailsLoading(false);
    }
  };

  useEffect(() => {
    userDetails();
  }, [token]);

  // ------------------------------------------- Register business account ---------------------------------
  const [registerBusinessLoading, setRegisterBusinessLoading] = useState(true);
  const registerBusiness = async (formData) => {
    // it is used because we image and data both
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const headers = {
        Authorization: authorizationToken,
      };

      const response = await apiConnector(
        "POST",
        business.BUSINESS_CREATE_API,
        formDataToSend,
        headers
      );

      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        console.log("business register response ", response);
        checkBusiness();
      }
    } catch (error) {
      console.log("error occurs in register business", error);
    }
  };

  // ------------------------------------Checking business account ---------------------------------
  const [businessAccountExists, setBusinessAccountExists] = useState(true);
  const checkBusiness = async () => {
    try {
      const headers = {
        Authorization: authorizationToken,
      };

      const response = await apiConnector(
        "GET",
        business.BUSINESS_ACCOUNT_EXISTS_API,
        null,
        headers
      );

      if (!response.data.success) {
        businessAccountExists(response.data.message);
      } else {
        console.log("business check response ", response);
        setBusinessAccountExists(response.data.check);
      }
    } catch (error) {
      console.log("error occurs in check business", error);
    }
  };

  useEffect(() => {
    checkBusiness();
  }, [token]);

  // ------------------------------------------------ bundle ---------------------------------------
  const contextValue = {
    userDetailsLoading,
    user,
    businessAccountExists,
    registerBusiness,
  };

  return (
    <APIContext.Provider value={contextValue}>
      {props.children}
    </APIContext.Provider>
  );
};

export default APIProvider;

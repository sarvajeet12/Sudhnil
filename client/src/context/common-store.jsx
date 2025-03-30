import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
// 1. create
export const AppContext = createContext();

// 2. Provider
const ContextProvider = (props) => {
  // TODO: -------------------------------------- State -----------------------------------------------------
  const [switchLoginVerify, setSwitchLoginVerify] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("tokenShudnil"));

  // TODO: ------------------------------------ definition  -----------------------------
  const loginResponseData = (value) => {
    setSwitchLoginVerify(value);
  };

  // TODO: --------------------------- definition of storeTokenInLS -----------------------------------------
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("tokenShudnil", serverToken);
  };

  // bundle
  const contextValue = {
    loginResponseData,
    storeTokenInLS,
    switchLoginVerify,
    token,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

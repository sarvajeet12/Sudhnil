const BASE_URL = "https://sudhnil.onrender.com/api/v1";
// const BASE_URL = "http://localhost:4000/api/v1";

export const auth = {
  SIGNUP_API: BASE_URL + "/user/register",
  LOGIN_API: BASE_URL + "/user/login",
  SEND_OTP_API: BASE_URL + "/user/send-otp",
  USER_DETAILS: BASE_URL + "/user/user-details",
};

export const business = {
  BUSINESS_CREATE_API: BASE_URL + "/business/business-register",
  BUSINESS_ACCOUNT_EXISTS_API: BASE_URL + "/business/check-business-account",
};

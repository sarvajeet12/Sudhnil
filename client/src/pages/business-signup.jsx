import React, { useContext, useState } from "react";
import Navbar from "../components/common/navbar/navbar";
import "../components/core/style/business-signup.css";
import { APIContext } from "../context/api-store";
import { useNavigate } from "react-router-dom";

const BusinessSignup = () => {
  const { registerBusiness } = useContext(APIContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    aadharNo: "",
    gstNo: "",
    panNo: "",
    frontImageAadhar: "",
    backImageAadhar: "",
    panCardImage: "",
  });

  // ----------------------------- handle input form -------------------------------------
  const handleInputForm = (e) => {
    const { name, value, files } = e.target;
    if (name === "frontImageAadhar") {
      setFormData({
        ...formData,
        frontImageAadhar: files[0],
      });
    } else if (name === "backImageAadhar") {
      setFormData({
        ...formData,
        backImageAadhar: files[0],
      });
    } else if (name === "panCardImage") {
      setFormData({
        ...formData,
        panCardImage: files[0],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ---------------------------------------handle submit  -----------------------------------------------
  const handleDoctorForm = async (e) => {
    e.preventDefault();
    registerBusiness(formData);
    setFormData({
      businessName: "",
      aadharNo: "",
      gstNo: "",
      panNo: "",
      frontImageAadhar: "",
      backImageAadhar: "",
      panCardImage: "",
    });
    navigate("/profile");
  };

  return (
    <>
      <Navbar />
      <div className="businessContainer">
        <h1>Create Business Account</h1>
        <form
          action=""
          onSubmit={(e) => handleDoctorForm(e)}
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="shopName">Enter your shop or business name</label>
            <input
              type="text"
              name="businessName"
              id="shopName"
              onChange={(e) => handleInputForm(e)}
              value={formData.businessName}
              required
            />
          </div>
          <div>
            <label htmlFor="aadharNo">Enter you aadhar number</label>
            <input
              type="number"
              maxLength={12}
              name="aadharNo"
              id="aadharNo"
              onChange={(e) => handleInputForm(e)}
              value={formData.aadharNo}
              required
            />
          </div>
          <div>
            <label htmlFor="gstNo">Enter your GST number</label>
            <input
              type="text"
              name="gstNo"
              id="gstNo"
              onChange={(e) => handleInputForm(e)}
              value={formData.gstNo}
              required
            />
          </div>
          <div>
            <label htmlFor="panNo">Enter your PAN number</label>
            <input
              type="text"
              name="panNo"
              id="panNo"
              onChange={(e) => handleInputForm(e)}
              value={formData.panNo}
              required
            />
          </div>
          <div>
            <label htmlFor="frontAadharImage">
              Upload Aadhar Card Front Image
            </label>
            <input
              type="file"
              name="frontImageAadhar"
              id="frontAadharImage"
              placeholder="Front"
              required
              onChange={(e) => handleInputForm(e)}
            />
          </div>
          <div>
            <label htmlFor="backAadharImage">
              Upload Aadhar Card Back Image
            </label>
            <input
              type="file"
              name="backImageAadhar"
              id="backAadharImage"
              placeholder="Back"
              required
              onChange={(e) => handleInputForm(e)}
            />
          </div>
          <div>
            <label htmlFor="panImage">Upload PAN card Image</label>
            <input
              type="file"
              name="panCardImage"
              id="panImage"
              required
              onChange={(e) => handleInputForm(e)}
            />
          </div>
          <div>
            <input type="submit" value="Create" />
          </div>
        </form>
      </div>
    </>
  );
};

export default BusinessSignup;

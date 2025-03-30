import React, { useContext } from "react";
import Navbar from "../components/common/navbar/navbar";
import { APIContext } from "../context/api-store";
import { Link } from "react-router-dom";
import "../components/core/style/profile.css";

const Profile = () => {
  const { user, userDetailsLoading, businessAccountExists } =
    useContext(APIContext);

  return (
    <>
      <Navbar />
      <div className="profile">
        <>
          <h1>Profile</h1>

          {userDetailsLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table border={"1"}>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <td>State:</td>
                    <td>{user.state}</td>
                  </tr>
                  <tr>
                    <td>Pin Code:</td>
                    <td>{user.pinCode}</td>
                  </tr>
                  <tr>
                    <td>Refer Code:</td>
                    <td>{user.referCode}</td>
                  </tr>
                </tbody>
              </table>

              {businessAccountExists ? (
                <>
                  <Link to={"/business-dashboard"}>
                    <button>Dashboard</button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/create-business"}>
                    <button>Create Business Account</button>
                  </Link>
                </>
              )}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Profile;

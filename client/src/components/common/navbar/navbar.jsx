import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { imageLogoAssets } from "../../../assets/js/image-assets";
import { IoMdClose } from "react-icons/io";
import "./navbar.css";
import { Link } from "react-router-dom";
import navLinks from "../../../data/navbar-data";

const Navbar = () => {
  const [openCloseTab, setOpenCloseTab] = useState(false);

  return (
    <header className="navbar">
      <nav>
        <img src={imageLogoAssets.ProjectLogo} alt="Sudhnil" />
        <button onClick={() => setOpenCloseTab(!openCloseTab)}>
          {openCloseTab ? <IoMdClose /> : <IoMenu />}
        </button>
      </nav>
      <ul className={openCloseTab ? "openTab" : "closeTab"}>
        {navLinks.map((links, index) => {
          const IconComponent = links.icon;
          return (
            <Link to={links.path}>
              <li key={index}>
                <span>
                  <IconComponent />
                </span>{" "}
                <span>{links.link}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </header>
  );
};

export default Navbar;

import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaOpencart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {

  }

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <p>ARBA</p>
      </div>
      <div className={styles.bx_1}>
        <div className={styles.cartvalue}>
          <FaOpencart color="#24bed1" size={"50px"} mg="10px" />
        </div>
        <div className={styles.count}>
          <p>0</p>
        </div>
        <div className={styles.dropdown}>
          <img
            src='https://i.postimg.cc/CM28YPX3/Raj-profile-image-png1.png'
            alt="error"
            className={styles.img}
            onClick={toggleMenu}
          />
          {showMenu && (
            <div className={styles.dropdownContent}>
              <Link to={"/mystore"}>ARBA Store</Link>
              <Link to="/profile">Profile</Link>
              <Link onClick={handleLogout}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

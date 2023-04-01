import React, { useState } from "react";
import styles from "./Form.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [view, setView] = useState(false);
  return (
    <div className={styles.box}>
      <div className={styles.child}>
        <div className={styles.sqr}></div>
        <h1>ARBA User Name</h1>
        <p className={styles.text}>
          If You have an account So Login here.
        </p>
        <div className={styles.form_div}>
          <form className={styles.form}>
            <div className={styles.input_div}>
              <input
                type="text"
                name="userName"
                id="userName"
                className={styles.input}
                placeholder="Enter username"
              />
            </div>
            <div className={styles.input_div}>
              <input
                type={view ? "text" : "password"}
                name="password"
                id="password"
                className={styles.input}
                placeholder="Enter password"
              />
              {view ? (
                <AiFillEye onClick={() => setView(!view)} />
              ) : (
                <AiFillEyeInvisible onClick={() => setView(!view)} />
              )}
            </div>
            <input type="submit" placeholder="Submit" className={styles.btn} to='/home' />
          </form>
        </div>
        <div className={styles.text2}>
          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              <h3 className={styles.text2_color}>Signup</h3>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

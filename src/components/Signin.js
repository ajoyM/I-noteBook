import React, { useContext, useState } from "react";
import "./login.css";
import search from '../images/search.png'
import backgroundImage from '../images/login-bg.jpg'
import authContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";


const Signin = () => {
  const context = useContext(authContext);
  const {login} = context;
  const [auth, setAuth] = useState({email: "", password: ""});
  const navigate = useNavigate();
  const onChange = (e) => {
    setAuth({...auth, [e.target.name]: e.target.value})
  }
  const handleLogin = (e) => {
    e.preventDefault();
   // setTimeout(() => {
      login(auth).then(data => console.log('login data is', data))
   // }, 1500);
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100vh', width:'100%', backgroundImage:`url(${backgroundImage})`}}>
      <div style={{height: "80vh", width: '60%', border: '1px solid #ccc', boxShadow:'0 4px 8px rgba(0, 0,0, 0.4)'}}>
      <div className="login-page">
        <div className="login-left">
          <h3>Welcome to login</h3>
          <br />
          <p>Don't have an account?</p>
          <button className="btn-info">Sign up</button>
        </div>
        <div className="login-right">
          <form onSubmit={handleLogin}>
            <h3>Login</h3>
            <div className="form-group">
              <label htmlFor="email">User Name</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enater your email/name"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enater your password"
                onChange={onChange}
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="forgot">
            <div className="checkbox-info">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <label htmlFor="checkbox">Remember me</label>
            </div>
            <p style={{ textDecoration: "underline", cursor: "pointer" }}>
              Forgot password?
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
            <hr
              style={{
                flex: 1,
                height: "1px",
                border: "none",
                backgroundColor: "#000",
              }}
            />
            <span style={{ margin: "0 10px" }}>or</span>
            <hr
              style={{
                flex: 1,
                height: "1px",
                border: "none",
                backgroundColor: "#000",
              }}
            />
          </div>
          <div style={{display: "flex"}}>
            <img src={search} alt="" style={{height: '1rem', marginTop:"5px"}}/><p style={{marginLeft: "0.5rem", marginTop: "0"}}>Sign in with Google</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Signin;

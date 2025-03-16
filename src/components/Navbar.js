import React, { useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import logo from '../images/book.png'
const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location)
  }, [location])
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          
            <Link to="/"><img src={logo} to="/" style={{height: "24px"}}/></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname}==='/' ? 'active': ''`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname}==='/about' ? 'active': ''`} to="/about">About us</Link>
                </li>
            </ul>
            <form className="d-flex" >
              <Link class="btn btn-primary mx-2" to='/signin' role="button">Login</Link>
              <Link class="btn btn-primary mx-2" to='/signup' role="button">Sign up</Link>
            </form>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar

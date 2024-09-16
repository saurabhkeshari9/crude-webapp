import React from "react";
import { Link } from "react-router-dom";
export function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom box-shadow py-3 mb-2">
        <div className="container">
          <Link className="navbar-brand" to="/">Crude Web App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">Crude</Link>
              </li>
              
            </ul>
            </div>
        </div>
      </nav>
    );
}

export function Footer() {
    return(
          <footer>
            <div className="container p-3 mt-5 border-top">
                <small className="d-block text-muted text-centre">&copy; 2024 - CRUDE WEBAPP</small>
            </div>
          </footer>
    );
}
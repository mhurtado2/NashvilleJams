import React, { useState } from "react";
import { Navigate, NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn, userProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="navBar h-100">
      <Navbar color="dark" className="m-2" dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
           <img 
            src= "https://th.bing.com/th/id/R.12fd188a3ad1053da103f80f2d97fc97?rik=HJPHmS7t6HFDKA&riu=http%3a%2f%2fsouthparktavern.com%2fwp-content%2fuploads%2f2018%2f10%2fGuitar.png&ehk=DJmGipKcMBe7OOqVIBgwFo%2fv84Ygu9y%2bs893P%2bUXM30%3d&risl=&pid=ImgRaw&r=0"
            alt = "Nashville Jams"
            className = ""
            style={{width : '80px'}}
            />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="m1-auto" navbar style={{ justifyContent: 'space-between', width: '100%'}}>
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/blues">
                    Blues Jams
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/country">
                    Country Jams
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/randb">
                    R&B Jams
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/jazz">
                    Jazz Jams
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/add">
                    Add Jam
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/users">
                    User Profiles
                  </NavLink>
                </NavItem>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout
                  </a>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            {userProfile && (
              <NavItem>
                <NavLink>Welcome, {userProfile.fullName}!</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

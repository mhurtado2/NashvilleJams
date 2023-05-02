import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
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
    <div className="navBar">
      <Navbar color="dark" className="m-2" dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          Nashville Jams
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

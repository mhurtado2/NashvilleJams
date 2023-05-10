import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "reactstrap";
import AreaForm from "./AreaForm";
import BluesJam from "./BluesJam";
import CountryJam from "./CountryJam";
import GenreForm from "./GenreForm";
import JamDetails from "./JamDetails";
import JamEdit from "./JamEdit";
import JamForm from "./JamForm";
import JamList from "./JamList";
import JazzJam from "./JazzJam";
import Login from "./Login";
import RandBJam from "./RandBJam";
import Register from "./Register";
import UserProfiles from "./UserProfiles";

//is logged in pass in as a prop
export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main className="vh-100">
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <JamList /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="blues"
            element={isLoggedIn ? <BluesJam /> : <Navigate to="/login" />}
          />
          <Route
            path="country"
            element={isLoggedIn ? <CountryJam /> : <Navigate to="/login" />}
          />
          <Route
            path="randb"
            element={isLoggedIn ? <RandBJam /> : <Navigate to="/login" />}
          />
          <Route
            path="jazz"
            element={isLoggedIn ? <JazzJam /> : <Navigate to="/login" />}
          />
          <Route
            path="add"
            element={isLoggedIn ? <JamForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/addGenre"
            element={isLoggedIn ? <GenreForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/addArea"
            element={isLoggedIn ? <AreaForm /> : <Navigate to="/login" />}
          />
          <Route
            path="users"
            element={isLoggedIn ? <UserProfiles /> : <Navigate to="/login" />}
          />
          <Route path="details/:id">
            <Route
              index
              element={isLoggedIn ? <JamDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="edit/:id"
              element={isLoggedIn ? <JamEdit /> : <Navigate to="/login" />}
            />
          </Route>
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
}

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BluesJam from "./BluesJam";
import CountryJam from "./CountryJam";
import JamDetails from "./JamDetails";
import JamEdit from "./JamEdit";
import JamForm from "./JamForm";
import JamList from "./JamList";
import JazzJam from "./JazzJam";
import Login from "./Login";
import RandBJam from "./RandBJam";
import Register from "./Register";


export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={isLoggedIn ? <JamList/>: <Navigate to="/login" />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="blues" element={<BluesJam />} />
        <Route path="country" element={<CountryJam />} />
        <Route path="randb" element={<RandBJam />} />
        <Route path="jazz" element={<JazzJam />} />
        <Route path="add" element={<JamForm />} />
        <Route path="edit" element={<JamEdit />} />
        <Route path="details/:id" element={<JamDetails />} />

        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route>
    </Routes>
  );
}

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import JamEdit from "./JamEdit";
import JamList from "./JamList";
import Login from "./Login";
import Register from "./Register";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={isLoggedIn ? <JamList/>: <Navigate to="/login" />}
        />
        <Route
          path=":id"
          element={isLoggedIn ? <JamEdit /> : <Navigate to="/login" />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route>
    </Routes>
  );
}

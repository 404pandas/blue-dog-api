import React from "react";
import Header from "../components/Header";
import AuthService from "../utils/auth";

export default function Logout() {
  AuthService.logout();
  return (
    <div>
      <Header />
      Logout page goes here
    </div>
  );
}

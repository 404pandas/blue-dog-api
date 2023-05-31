import React from "react";
import { CURRENT_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Header from "../components/Header";

export default function Dashboard() {
  const { data } = useQuery(CURRENT_USER);
  const userData = data?.me || {};

  return (
    <div>
      <Header />
      Dashboard page goes here
      {userData.username}
    </div>
  );
}

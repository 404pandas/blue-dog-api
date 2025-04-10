import AuthService from "../utils/auth";
import { Typography } from "@mui/material";

export default function Logout() {
  AuthService.logout();
  return (
    <div>
      <Typography variant='h1'>Successfully logged out!</Typography>{" "}
    </div>
  );
}

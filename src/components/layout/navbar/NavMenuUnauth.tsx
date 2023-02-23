import { Box, Icon, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Button from "@mui/material/Button";

export default function NavMenuUnauth() {
  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
      <Link href={"login"} className="mr-4">
        <Button className="!text-gray-300 p-1">
          <LoginIcon className="inline-block w-5 h-5 mr-1" />
          <span className="mr-1">Login</span>
        </Button>
      </Link>
      <Link href={"signup"}>
        <Button className="!text-gray-300 p-1">
          <AppRegistrationIcon className="inline-block w-5 h-5 mr-1" />
          <span className="mr-1">Signup</span>
        </Button>
      </Link>
    </Box>
  );
}

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import NavMenuAuth from "./NavMenuAuth";
import NavMenuUnauth from "./NavMenuUnauth";
import { useSelector } from "react-redux";

function ResponsiveAppBar() {
  const loginData = useSelector((state: any) => state.auth.loginData);

  return (
    <AppBar className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/nextjs-boilerplate-logo.png"
              className="w-10 mr-2"
              alt=""
            />

            <Typography className="hidden sm:block">NextBlog</Typography>
          </Link>
          {loginData && <NavMenuAuth />}
          {!loginData && <NavMenuUnauth />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

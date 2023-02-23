import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/authSlice";
import { Box } from "@mui/system";
import Link from "next/link";
import { AVATAR_PATH } from "../../../../Constants";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

export default function SettingsMenu() {
  const loginData = useSelector((state: any) => state.auth.loginData);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={loginData.user.username}
            src={AVATAR_PATH + loginData.user.avatarUrl}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        disableScrollLock={true}
      >
        <Box sx={{background:"#333" , borderBottom: "1px solid #777", pt: 1, pb: 1, px: 2 }}>
          <Typography textAlign="center">{loginData.user.username}</Typography>
        </Box>
        <Link href={"settings"}>
          <MenuItem onClick={handleCloseUserMenu} sx={{ pt: 1 }}>
            <Typography textAlign="center">
              <SettingsSuggestIcon
                fontSize="small"
                className="relative bottom-[1px] mr-2"
              />
              Settings
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">
            <LogoutIcon
              fontSize="small"
              className="relative bottom-[1px] mr-2"
            />
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

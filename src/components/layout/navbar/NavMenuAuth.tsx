import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SettingsMenu from "./menuAuth/SettingsMenu";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../../store/postSlice";
import NotificationsMenu from "./menuAuth/notifications/Menu";

export default function NavMenuAuth() {
  const dispatch = useDispatch();
  const handleModalOpen = () => {
    dispatch(setModalOpen(true));
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
      <NotificationsMenu />
      <Button
        onClick={handleModalOpen}
        variant="contained"
        className="blue-btn new-post-btn !my-2 !mr-6 !ml-2"
      >
        <Typography color={"#eee"} sx={{ fontSize: "14px" }}>
          Post
        </Typography>
        <AddIcon sx={{ position: "relative", bottom: "1px" }} />
      </Button>

      <SettingsMenu />
    </Box>
  );
}

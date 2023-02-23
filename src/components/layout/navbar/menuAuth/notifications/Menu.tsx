import ClickAwayListener from "@mui/base/ClickAwayListener";
import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../../../../../api/queries";
import { useSelector } from "react-redux";
import NotificationsMenuList from "./MenuList";
import countUnread from "../../../../../services/dataProcessing/countUnread";

export default function NotificationsMenu() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any>(null);
  const [totalUnread, setTotalUnread] = useState<number>(0);
  const token = useSelector((state: any) => state.auth.loginData.token);
  const { data: notificationData, startPolling } = useQuery(GET_NOTIFICATIONS, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  });

  useEffect(() => {
    if (notificationData) {
      setNotifications(notificationData.getUserNotifications);
      setTotalUnread(countUnread(notificationData.getUserNotifications));
      startPolling(5000);
    }
  }, [notificationData]);


  return (
    <ClickAwayListener onClickAway={() => setShowMenu(false)}>
      <div className="relative">
        <IconButton
          onClick={() => setShowMenu(!showMenu)}
          size="large"
          sx={{ color: "#eee", pt: "1rem", mr: 1 }}
        >
          {notifications && (
            <Badge badgeContent={totalUnread} color="error">
              <NotificationsIcon />
            </Badge>
          )}
        </IconButton>
        {showMenu && (
          <NotificationsMenuList
            notifications={notifications}
            setShowMenu={setShowMenu}
          />
        )}
      </div>
    </ClickAwayListener>
  );
}

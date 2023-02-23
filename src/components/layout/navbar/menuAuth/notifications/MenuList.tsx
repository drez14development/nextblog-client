import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import NotificationItem from "./MenuListItem";
import { useEffect } from "react";
import {
  DELETE_NOTIFICATIONS,
  MARK_NOTIFICATIONS_AS_READ,
} from "../../../../../api/mutations";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { Button, ListItemText, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export default function NotificationsMenuList({
  notifications,
  setShowMenu,
}: any) {
  const token = useSelector((state: any) => state.auth.loginData.token);
  const [markAsRead, { data: markAsReadData }] = useMutation(
    MARK_NOTIFICATIONS_AS_READ,
    {
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const [deleteNotifications, { data: deleteNotificationsData }] = useMutation(
    DELETE_NOTIFICATIONS,
    {
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    }
  );

  useEffect(() => {
    (async () => {
      await markAsRead();
    })();
  }, [notifications]);

  const handleDeleteNotifications = () => {
    setShowMenu(false);
    Swal.fire({
      title: "Are you sure you want to delete all the notifications?",
      showCancelButton: true,
      confirmButtonText: "Delete all",
      confirmButtonColor: "#d32f2f",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNotifications();
      }
    });
  };

  return (
    <>
      <Paper className="notifications-menu render-animation">
        <div className="relative">
          <div className="clear-notifications-wrapper">
            <span>Notifications</span>
            {notifications.length > 0 && (
              <div className="clear-all-btn-wrapper">
                <Button onClick={handleDeleteNotifications}>
                  <DeleteIcon />
                </Button>
              </div>
            )}
          </div>
          <MenuList className="menu-list">
            {notifications.map((n: any) => (
              <NotificationItem
                notification={n}
                key={n.id}
                setShowMenu={setShowMenu}
              />
            ))}
            {notifications.length == 0 && (
              <MenuItem className="list-item">
                <ListItemText className="message">
                  There are no notifications to show
                </ListItemText>
              </MenuItem>
            )}
          </MenuList>
        </div>
      </Paper>
    </>
  );
}

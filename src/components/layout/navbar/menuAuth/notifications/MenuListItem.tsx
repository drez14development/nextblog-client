import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { AVATAR_PATH } from "../../../../../Constants";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setLastCommentsUpdate } from "../../../../../store/postSlice";

export default function NotificationItem({ notification, setShowMenu }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const redirectToPost = () => {
    router.push(`${notification.postUrl}`);
    setShowMenu(false);
    if(notification.message.includes("comment")){
      dispatch(setLastCommentsUpdate(new Date().toString()));
    }
  };

  return (
    <MenuItem className="list-item" onClick={redirectToPost}>
      <ListItemIcon>
        <Avatar
          className="avatar"
          alt={notification.actor.username}
          src={AVATAR_PATH + notification.actor.avatarUrl}
        />
      </ListItemIcon>
      <ListItemText className="message">
        {notification.message} <br />&quot;{notification.refExcerpt}&quot;
        {!notification.wasRead && (
          <span className="badge-new-notification">NEW</span>
        )}
      </ListItemText>
    </MenuItem>
  );
}

import React, { useState } from "react";
import PostI from "../PostInterface";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CircularProgress, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../../../api/mutations";
import isPostLiked from "../../../services/dataProcessing/IsPostLiked";
import styles from "./PostCard.module.css";
import Swal from 'sweetalert2'
import updatePostLikeCache from "../../../services/cache/updatePostLikeCache";

export default function PostLikeBtn({ post }: { post: PostI }) {
  const loginData = useSelector((state: any) => state.auth.loginData);
  const isLikedOnRender = isPostLiked({ post });
  const [isLiked, setisLiked] = useState<boolean>(isLikedOnRender);

  const [likePost, { loading, error, data }] = useMutation(LIKE_POST, {
    variables: { postId: post.id },
    context: {
      headers: {
        authorization: `Bearer ${loginData?.token}`,
      },
    },
  });

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!loginData) {
      Swal.fire({
        icon: 'warning',
        titleText: 'You must log in to like or comment',
        showConfirmButton: false,
        timer: 1500,
        backdrop: false,
      })
      return;
    }

    await likePost()
      .then((payload) => {
        setisLiked(!isLiked);
        updatePostLikeCache(payload.data.postLike);
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <IconButton size="large" onClick={handleLike} className={styles.likeButton}>
      <FavoriteIcon className={isLiked ? "text-rose-500" : "text-gray-200"} />
      <span style={{ opacity: loading ? 0 : 1, fontSize: "14px", color:"#eee" }}>
        {post.likes.length}
      </span>
      {loading && (
        <span className="absolute left-7">
          <CircularProgress style={{width:"15px", height:"15px", color:"#eee"}} size={14} color="inherit" />
        </span>
      )}
    </IconButton>
  );
}

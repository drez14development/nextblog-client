import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CircularProgress, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { LIKE_COMMENT } from "../../../../api/mutations";
import isCommentLiked from "../../../../services/dataProcessing/IsCommentLiked";
import Swal from 'sweetalert2'
import CommentI from "../../CommentInterface";
import updateCommentLikeCache from "../../../../services/cache/updateCommentLikeCache";


export default function CommentLikeBtn({ comment }: { comment: CommentI }) {
  const loginData = useSelector((state: any) => state.auth.loginData);
  const isLikedOnRender = isCommentLiked({ comment });
  const [isLiked, setisLiked] = useState<boolean>(isLikedOnRender);

  const [likeComment, { loading, error, data }] = useMutation(LIKE_COMMENT, {
    variables: { commentId: comment.id },
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
        title: 'You must log in to like or comment',
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }

    await likeComment()
      .then((payload) => {
        setisLiked(!isLiked);
        updateCommentLikeCache(payload.data.commentLike);
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <IconButton size="medium" onClick={handleLike} className="comment-like-btn">
      <FavoriteIcon className={`like-icon-svg ${isLiked ? "text-rose-500" : "text-[#eee]"}`} />
      <span style={{ opacity: loading ? 0 : 1, fontSize: "14px", color:"#eee" }}>
        {comment.likes.length}
      </span>
      {loading && (
        <span className="absolute left-7">
          <CircularProgress style={{color:"#eee"}} className="loading-icon-svg" size={10} color="inherit" />
        </span>
      )}
    </IconButton>
  );
}

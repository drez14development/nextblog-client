import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextsmsIcon from '@mui/icons-material/Textsms';
import { AVATAR_PATH } from "../../../../Constants";
import CommentLikeBtn from "./CommentLikeBtn";
import CommentI from "../../CommentInterface";
import formatDate from "../../../../services/dataProcessing/formatDate";
import CommentForm from "../../form/CommentForm";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";

interface Props {
  comment: CommentI;
  triggerRefetch: null | any;
  isScrollTarget: boolean;
}

export default function CommentItem({ comment, triggerRefetch, isScrollTarget }: Props) {
  const [showReplies, setShowReplies] = useState<boolean>(false);

// useEffect(() => {
//   if(isScrollTarget && !comment.isReplyTo){
//     window.scrollTo(0,document.body.scrollHeight)
//   }
// }, [isScrollTarget])


  return (
    <>
      <div
        className={`${
          comment.isReplyTo ? "isReplyTo" : "isNotReplyTo"
        } comment-item render-animation relative block`}
        onClick={() => setShowReplies(!showReplies)}
      >
        <div className="grid grid-cols-12 min-h-[80px] bg-[#111] text-[#eee] pt-1 text-left border-2 border-[#222] border-solid rounded-md">
          <div className="col-span-2 md:col-span-1 flex items-start justify-center pt-2">
            <Avatar
              alt={comment.user.username}
              src={AVATAR_PATH + comment.user.avatarUrl}
            />
          </div>
          <div className="col-span-10 md:col-span-11 p-1 pl-1 md:pl-0 pr-2 grow text-[14px] md:text-[15px]">
            <div className="flex w-full">
              <span className="font-bold mr-2">{comment.user.username}</span>
              <div className="grow text-gray-400 text-xs flex items-center">
                <span>{formatDate(comment.createdAt)}</span>
              </div>
            </div>
            <p className="leading-4 pt-1 pr-7 md:pr-2">{comment.content}</p>
            <div className="text-right">
              {!comment.isReplyTo && (
                <IconButton
                  onClick={() => setShowReplies(!showReplies)}
                  className="!text-[#eee] !p-0 !mr-2"
                >
                  <TextsmsIcon />
                  <ExpandMoreIcon />
                </IconButton>
              )}
              <CommentLikeBtn comment={comment} />
            </div>
          </div>
        </div>
      </div>
      {!comment.isReplyTo && showReplies && (
        <div className="replies-wrapper rounded-b-lg overflow-hidden overflow-y-scroll max-h-[200px] ml-4 md:ml-20">
          
            <CommentForm
              postId={comment.post?.id}
              isReplyTo={comment.id}
              triggerRefetch={triggerRefetch}
            />
          
          <div className="comment-replies">
            {comment.replies?.map((r: CommentI) => (
              <CommentItem key={r.id} comment={r} triggerRefetch={null} isScrollTarget={isScrollTarget}/>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

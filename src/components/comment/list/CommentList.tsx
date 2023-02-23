import { useEffect } from "react";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import CommentItem from "./item/CommentItem";

interface Props {
  allComments: [];
  loading: boolean;
  triggerRefetch: null | any;
  isScrollTarget: boolean;
}

export default function CommentList({
  allComments,
  loading,
  triggerRefetch,
  isScrollTarget,
}: Props) {
  const [amountToShow, setAmountToShow] = useState<number>(3);
  const comments = allComments?.slice(0, amountToShow);

  useEffect(() => {
    if (isScrollTarget) {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 1000);
    }
  }, [isScrollTarget]);

  const handleShowMoreComments = () => {
    setAmountToShow(amountToShow + 3);

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  };

  if (loading) {
    return (
      <div className="text-center pt-8">
        <CircularProgress size={50} />
      </div>
    );
  }


  return (
    <div className="block">
      {comments.map((c: any) => (
        <CommentItem
          key={c.id}
          comment={c}
          triggerRefetch={triggerRefetch}
          isScrollTarget={isScrollTarget}
        />
      ))}
      {amountToShow < allComments.length && (
        <Button
          onClick={handleShowMoreComments}
          variant="outlined"
          sx={{ color: "#ccc", borderColor: "#ddd", my: 2 }}
        >
          Show more comments <ExpandMoreIcon />
        </Button>
      )}
    </div>
  );
}

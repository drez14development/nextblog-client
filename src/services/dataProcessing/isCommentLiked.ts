import { useSelector } from "react-redux";
import CommentI from "../../components/comment/CommentInterface";

interface Props{
  comment: CommentI
}
interface CommentLikeI {
  user: {
    id: string;
  };
  comment: string; //ID
}

export default function IsCommentLiked({ comment }: Props) {
  const userId = useSelector((state: any) => state.auth.loginData?.user?.id);
  let isLiked = false;

  comment.likes.map((like: CommentLikeI) => {
    if (like.user.id == userId) {
      isLiked = true;
    }
  });

  return isLiked;
}

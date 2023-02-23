import { useSelector } from "react-redux";
import PostI from "../../components/post/PostInterface";

interface Props {
  post: PostI;
}
interface PostLikeI {
  user: {
    id: string;
  };
  post: string; //ID
}

export default function IsPostLiked({ post }: Props) {
  const userId = useSelector((state: any) => state.auth.loginData?.user?.id);
  let isLiked = false;
  
  post.likes.map((like: PostLikeI) => {
    if (like.user.id == userId) {
      isLiked = true;
    }
  });

  return isLiked;
}

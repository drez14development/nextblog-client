import {useEffect} from 'react'
import CommentList from "./list/CommentList";
import CommentForm from "./form/CommentForm";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../api/queries";
import { useSelector } from "react-redux";

interface Props {
  postId: string;
  isScrollTarget: boolean;
}

export default function CommentSection({ postId, isScrollTarget }: Props) {
  const isAuth = useSelector((state: any) => state.auth.loginData);
  const { loading, error, data, refetch } = useQuery(GET_COMMENTS, {
    variables: { postId },
  });

  const lastCommentsUpdate = useSelector((state:any) => state.posts.lastCommentsUpdate)
  useEffect(() => {
    refetch();
  }, [lastCommentsUpdate])
  

  return (
    <div className="text-center pt-4 md:px-10">
      {isAuth && (
        <CommentForm
          postId={postId}
          isReplyTo={null}
          triggerRefetch={refetch}
        />
      )}
      <br />
      <CommentList
        isScrollTarget={isScrollTarget}
        allComments={data?.getComments}
        loading={loading}
        triggerRefetch={refetch}
      />
    </div>
  );
}

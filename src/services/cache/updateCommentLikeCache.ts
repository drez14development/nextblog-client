import { gql } from "@apollo/client";
import client from "../../api/apollo-client";
import CommentI from "../../components/comment/CommentInterface";

export default function updateCommentLikeCache(comment: CommentI) {
  const resp = client.writeFragment({
    id: `Post:${comment.id}`,
    fragment: gql`
      fragment MyComment on Comment {
        likes
      }
    `,
    data: {
      likes: comment.likes,
    },
  });
}

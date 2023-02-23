import { gql } from "@apollo/client";
import client from "../../api/apollo-client";
import PostI from "../../components/post/PostInterface";

export default function updatePostLikeCache(post: PostI) {
  const resp = client.writeFragment({
    id: `Post:${post.id}`,
    fragment: gql`
      fragment MyPost on Post {
        likes
      }
    `,
    data: {
      likes: post.likes,
    },
  });
}

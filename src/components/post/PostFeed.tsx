import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_POSTS } from "../../api/queries";
import { setFeedScrollPosition } from "../../store/postSlice";
import PostCard from "./card/PostCard";
import PostI from "./PostInterface";

export default function PostFeed(): JSX.Element {
  const { loading, error, data, refetch } = useQuery(GET_ALL_POSTS);
  const posts = data?.getAllPosts;
  const dispatch = useDispatch();

  const scrollPosition = useSelector(
    (state: any) => state.posts.feedScrollPosition
  );

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, []);

  const handleScrollPosition = () => {
    dispatch(setFeedScrollPosition(window.pageYOffset));
  };

  if (loading)
    return (
      <div className="text-center pt-8">
        <CircularProgress size={50} />
      </div>
    );

  return (
    <div className="post-feed pt-4">
      {posts.map((p: PostI) => (
        <div
          key={p.id}
          className="post-card-wrapper mb-7"
          onClick={handleScrollPosition}
        >
          <PostCard post={p} />
        </div>
      ))}
    </div>
  );
}

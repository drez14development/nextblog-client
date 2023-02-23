import { Avatar, CircularProgress } from "@mui/material";

import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { GET_POST_BY_SLUG } from "../src/api/queries";
import CommentSection from "../src/components/comment/CommentSection";
import { AVATAR_PATH, POST_IMG_PATH } from "../src/Constants";
import Head from "next/head";
import PostLikeBtn from "../src/components/post/card/PostLikeBtn";
import formatDate from "../src/services/dataProcessing/formatDate";
const smoothScrollCSS = "html {scroll-behavior: smooth}";

export default function PostExtended() {
  const router = useRouter();
  const postSlug = router.query.post_slug;
  const [scrollToComments, setScrollToComments] = useState<boolean>(false);

  const [getPostBySlug, { loading, error, data }] = useLazyQuery(
    GET_POST_BY_SLUG,
    { variables: { slug: postSlug } }
  );

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        await getPostBySlug().then(() => {
          router.query.comments ? setScrollToComments(true) : "";
        });
      })();
    }
  }, [router.isReady, router.query.comments]);

  if (loading) {
    return (
      <div className="text-center pt-8">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (data) {
    const post = data.getPostBySlug;

    return (
      <>
        <Head>
          <title>{post.title}</title>
          <meta name="description" content={post.content} />
          <style>{smoothScrollCSS}</style>
        </Head>
        <div className="extended-post px-2 md:px-32 pt-4 pb-4">
          <div className="extended-post-content grid grid-cols-12 py-2 mb-4">
            <div className="col-span-12 md:col-span-6">
              <div className="text-wrapper px-7 md:pl-7 md:pr-1 pt-2 mb-4">
                <div className="flex items-center mb-2">
                  <div className="flex flex-col items-center text-center">
                    <Avatar
                      alt={post.user.username}
                      src={AVATAR_PATH + post.user.avatarUrl}
                    />
                  </div>
                  <div className="flex flex-col pl-4 min-w-[120px]">
                    <p className="">{post.user.username}</p>
                    <p className="text-gray-500">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>

                <h1 className="text-2xl text-gray-200 font-bold">
                  {post.title}
                </h1>
                <p className="pt-2 pb-2">{post.content}</p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6">
              <div className="h-full px-4">
                <div className="flex h-full justify-center items-center">
                  <img
                    src={POST_IMG_PATH + post.imgUrl}
                    className="rounded-lg max-h-[240px]"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="col-span-12 mt-2 text-right mr-1">
              <PostLikeBtn post={post} />
            </div>
          </div>
          <CommentSection postId={post.id} isScrollTarget={scrollToComments} />
        </div>
      </>
    );
  }
}

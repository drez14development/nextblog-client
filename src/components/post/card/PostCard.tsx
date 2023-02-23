import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Link from "next/link";
import PostI from "../PostInterface";
import { AVATAR_PATH, POST_IMG_PATH } from "../../../Constants";
import styles from "./PostCard.module.css";
import PostLikeBtn from "./PostLikeBtn";
import formatDate from "../../../services/dataProcessing/formatDate";

export default function PostCard({ post }: { post: PostI }) {
  return (
    <Card className={`${styles.postCard} render-animation`}>
      <CardHeader
        avatar={
          <Avatar
            src={AVATAR_PATH + post.user.avatarUrl}
            alt={post.user.username}
          ></Avatar>
        }
        title={post.user.username}
        subheader={formatDate(post.createdAt)}
      />
      <Link href={`${post.slug}`}>
        <div className={styles.imgWrapper}>
          <CardMedia
            component="img"
            image={POST_IMG_PATH + post.imgUrl}
            alt={post.title}
          />
        </div>
        <CardContent className={styles.content}>
          <Typography variant="h6" className={styles.heading}>
            {post.title}
          </Typography>
          <PostLikeBtn post={post} />
        </CardContent>
      </Link>
    </Card>
  );
}

export default interface CommentI {
    id: string;
    content: string;
    createdAt: string;
    post: {
      id: string;
    }
    user: {
      username: string;
      avatarUrl: string;
    };
    likes: []
    isReplyTo: string;
    replies: []
  }
  
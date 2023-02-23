import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation SignUpUser($input: SignUpInput) {
    signUpUser(input: $input) {
      user {
        id
        username
        email
        avatarUrl
      }
      token
    }
  }
`;

export const LOGIN = gql`
  mutation LoginUser($input: LoginInput) {
    loginUser(input: $input) {
      token
      user {
        id
        username
        email
        avatarUrl
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: PostInput) {
    createPost(input: $input) {
      id
    }
  }
`;

export const LIKE_POST = gql`
  mutation PostLike($postId: String) {
    postLike(post_id: $postId) {
      id
      likes {
        user {
          id
        }
      }
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation CommentLike($commentId: String) {
    commentLike(comment_id: $commentId) {
      id
      likes {
        user {
          id
        }
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CommentInput) {
    createComment(input: $input) {
      content
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      avatarUrl
    }
  }
`;

export const MARK_NOTIFICATIONS_AS_READ = gql`
  mutation MarkNotificationsAsRead {
    markNotificationsAsRead {
      id
    }
  }
`;

export const DELETE_NOTIFICATIONS = gql`
  mutation DeleteNotifications {
    deleteNotifications {
      id
    }
  }
`;

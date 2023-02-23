import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      slug
      content
      title
      imgUrl
      createdAt
      user {
        id
        email
        username
        avatarUrl
      }
      likes {
        user {
          id
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    getPostBySlug(slug: $slug) {
      id
      title
      content
      imgUrl
      createdAt
      user {
        id
        email
        username
        avatarUrl
      }
      likes {
        user {
          id
        }
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($postId: ID!) {
    getComments(post_id: $postId) {
      id
      content
      createdAt
      post {
        id
      }
      user {
        username
        avatarUrl
      }
      likes {
        user {
          id
        }
      }
      isReplyTo {
        content
      }
      replies {
        id
        content
        createdAt
        isReplyTo {
          content
        }
        likes {
          user {
            id
          }
        }
        user {
          username
          avatarUrl
        }
      }
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetUserNotifications {
    getUserNotifications {
      id
      message
      postUrl
      refExcerpt
      wasRead
      actor {
        avatarUrl
      }
    }
  }
`;

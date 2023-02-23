export default interface PostI {
  id: string;
  slug: string;
  title: string;
  content: string;
  imgUrl: string;
  createdAt: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  likes: []
}

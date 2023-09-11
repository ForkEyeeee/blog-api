type PostProps = {
  _id: string;
  url: string;
  title: string;
  comments: Array<object>;
  time: string;
  content: string;
  published: boolean;
};

export default PostProps;

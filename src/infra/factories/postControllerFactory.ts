import { PostRepositoryImpl } from './../../data/repositories/postRepositoryImpl';
import { PostController } from "../../controllers/postController";
import { DeletePost } from "../../usecase/posts/deletePost";
import { GetPosts } from "../../usecase/posts/getPosts";
import { SavePost } from "../../usecase/posts/savePost";

export const makePostController = () => {
  const postRepository = new PostRepositoryImpl();
  const savePostUseCase = new SavePost(postRepository);
  const getPostsUseCase = new GetPosts(postRepository);
  const deletePostUseCase = new DeletePost(postRepository);
  const postController = new PostController(getPostsUseCase, savePostUseCase, deletePostUseCase);  

  return postController;
}
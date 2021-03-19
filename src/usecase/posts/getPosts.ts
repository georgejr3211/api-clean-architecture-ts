import { PostRepository } from './ports/repository/postRepository';
import { Post } from "../../entities/post";
import { GetPostsProtocol } from './protocols/getPostsProtocol';

export class GetPosts implements GetPostsProtocol {

  constructor (private readonly postRepository: PostRepository) {

  }

  public async execute(): Promise<Post[]> {
    const posts = await this.postRepository.getAll()
    return posts;
  }
}
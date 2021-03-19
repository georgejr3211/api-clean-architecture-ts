import { SavePostDto } from './ports/dtos/savePostDto';
import { PostRepository } from './ports/repository/postRepository';
import { Post } from "../../entities/post";
import { SavePostProtocol } from './protocols/savePostProtocol';

export class SavePost implements SavePostProtocol {

  constructor (private readonly postRepository: PostRepository) {

  }

  public async execute(postDto: SavePostDto): Promise<Post> {
    const existingPost = await this.postRepository.getByTitle(postDto.title);
    if (existingPost) throw new Error('Post already exists');

    const post = await this.postRepository.save(postDto)
    return post;
  }
}
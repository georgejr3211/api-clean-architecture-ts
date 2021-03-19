import { PostRepository } from './ports/repository/postRepository';
import { DeletePostProtocol } from './protocols/deletePostProtocol';

export class DeletePost implements DeletePostProtocol {

  constructor (private readonly postRepository: PostRepository) {

  }

  public async execute(id: string): Promise<boolean> {
    const existingPost = await this.postRepository.getById(id);
    if (!existingPost) throw new Error('Post does not exists');

    const hasBeenDeleted = await this.postRepository.delete(id);
    return hasBeenDeleted;
  }
}
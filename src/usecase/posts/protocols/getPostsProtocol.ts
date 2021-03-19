import { Post } from '../../../entities/post';

export interface GetPostsProtocol {
  execute(): Promise<Post[]>
}
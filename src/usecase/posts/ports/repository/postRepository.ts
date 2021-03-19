import { SavePostDto } from './../dtos/savePostDto';
import { Post } from "../../../../entities/post";

export interface PostRepository {
  delete(id: string): Promise<boolean>
  getByTitle(title: string): Promise<Post>;
  getById(id: string): Promise<Post>;
  getAll(): Promise<Post[]>;
  save(postModel: SavePostDto): Promise<Post>;
}
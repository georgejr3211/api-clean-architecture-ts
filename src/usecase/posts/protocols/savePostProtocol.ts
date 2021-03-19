import { Post } from "../../../entities/post";
import { SavePostDto } from "../ports/dtos/savePostDto";

export interface SavePostProtocol {
  execute(postDto: SavePostDto): Promise<Post>
}
import { SavePostDto } from "../usecase/posts/ports/dtos/savePostDto";
import { DeletePostProtocol } from "../usecase/posts/protocols/deletePostProtocol";
import { GetPostsProtocol } from "../usecase/posts/protocols/getPostsProtocol";
import { SavePostProtocol } from "../usecase/posts/protocols/savePostProtocol";
import { ResponseProtocol } from "./protocols/reponseProtocol";
import { RequestProtocol } from "./protocols/requestProtocol";

export class PostController {

  constructor(
    private readonly getPostsUseCase: GetPostsProtocol,
    private readonly savePostUseCase: SavePostProtocol,
    private readonly deletePostUseCase: DeletePostProtocol,
  ) { }

  public async getPosts(): Promise<ResponseProtocol> {
    try {
      const posts = await this.getPostsUseCase.execute();

      return {
        data: posts,
        statusCode: 200,
        rows: posts.length
      }
    } catch (error) {
      return {
        data: new Error(error).message,
        statusCode: 500,
      }
    }
  }

  public async savePosts(requestProtocol: RequestProtocol): Promise<ResponseProtocol> {
    try {
      const postDto: SavePostDto = {
        author: requestProtocol.body.author,
        title: requestProtocol.body.title,
        content: requestProtocol.body.content,
      }

      const post = await this.savePostUseCase.execute(postDto);

      return {
        data: post,
        statusCode: 201,
      }
    } catch (error) {
      return {
        data: new Error(error).message,
        statusCode: 500,
      }
    }
  }

  public async deletePosts(requestProtocol: RequestProtocol): Promise<ResponseProtocol> {
    try {
      const id: string = requestProtocol.params.id;
      const hasBeenDeleted = await this.deletePostUseCase.execute(id);

      return {
        data: hasBeenDeleted,
        statusCode: 200,
      }
    } catch (error) {
      return {
        data: new Error(error).message,
        statusCode: 500,
      }
    }
  }

}
import { Post } from "../../entities/post";
import db from "../../infra/database/node-json-db";
import { SavePostDto } from "../../usecase/posts/ports/dtos/savePostDto";
import { PostRepository } from "../../usecase/posts/ports/repository/postRepository";

export class PostRepositoryImpl implements PostRepository {
  constructor() { }

  getByTitle(title: string): Promise<Post> {
    const index = db.getIndex("/posts", title, 'title');
    return new Promise((resolve, reject) => {
      if (index === -1) {
        resolve(null);
      } else {
        const post = db.getObject<Post>(`/posts[${index}]`)
        resolve(post);
      }
      reject(new Error());
    });
  }

  getById(id: string): Promise<Post> {
    const index = db.getIndex("/posts", id);
    return new Promise((resolve, reject) => {
      resolve(db.getObject<Post>(`/posts[${index}]`));
      reject(new Error());
    });
  }

  getAll(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      resolve(db.getObject<Post[]>(`/posts`));
      reject(new Error());
    });
  }

  save(postModel: SavePostDto): Promise<Post> {
    let lastPost = db.getData('/posts[-1]');
    if (!lastPost) {
      lastPost = { id: 1 };
    }
    db.push('/posts[]', {id: lastPost.id + 1, ...postModel}, true);
    const index = db.getIndex("/posts", postModel.title, 'title');
    return new Promise((resolve, reject) => {
      resolve(db.getObject<Post>(`/posts[${index}]`));
      reject(new Error());
    });
  }

  delete(id: string): Promise<boolean> {
    const index = db.getIndex("/posts", id);
    return new Promise((resolve, reject) => {
      db.delete(`/posts[${index}]`)
      resolve(true);
      reject(false);
    });
  }
}
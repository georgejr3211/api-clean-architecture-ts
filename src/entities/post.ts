export class Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;

  constructor(postDto: Omit<Post, 'id'> & { id?: number }) {
    Object.assign(this, postDto);
    if (!this.createdAt) this.createdAt = new Date();
  }
}
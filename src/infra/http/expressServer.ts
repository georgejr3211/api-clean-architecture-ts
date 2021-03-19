import express from 'express';
import { PostController } from '../../controllers/postController';
import { RequestProtocol } from '../../controllers/protocols/requestProtocol';
import { PostRepositoryImpl } from '../../data/repositories/postRepositoryImpl';
import { DeletePost } from '../../usecase/posts/deletePost';
import { GetPosts } from '../../usecase/posts/getPosts';
import { SavePost } from '../../usecase/posts/savePost';
import { makePostController } from '../factories/postControllerFactory';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/posts', async (req, res) => {
  const postController = makePostController();
  const httpResponse = await postController.getPosts();

  res.status(httpResponse.statusCode).json({ data: httpResponse.data, rows: httpResponse.rows })
})

app.post('/posts', async (req, res) => {
  const postController = makePostController();
  const httpRequest: RequestProtocol = {
    params: req.params,
    body: req.body
  };
  
  const httpResponse = await postController.savePosts(httpRequest);

  res.status(httpResponse.statusCode).json({ data: httpResponse.data, rows: httpResponse.rows })
})

app.delete('/posts/:id', async (req, res) => {
  const postController = makePostController();
  const httpRequest: RequestProtocol = {
    params: req.params,
    body: req.body
  };

  const httpResponse = await postController.deletePosts(httpRequest);

  res.status(httpResponse.statusCode).json({ data: httpResponse.data, rows: httpResponse.rows })
})

app.listen(port, () => console.log('Server running on http://localhost:' + port));
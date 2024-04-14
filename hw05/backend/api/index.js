import express from 'express';
import userAPIRouter from './user.js';
import chatAPIRouter from './chat.js'

const apiRootRouter = express.Router();

apiRootRouter.use('/user',userAPIRouter);
apiRootRouter.use('/chat', chatAPIRouter);

export default apiRootRouter;
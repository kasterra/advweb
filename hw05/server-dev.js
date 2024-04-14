import fs from 'fs';
import express from 'express';
import { createServer as createServerNode } from 'node:http';
import { createServer } from 'vite';
import socketIOBootstrap from './backend/socket/index.js';
import maria from './backend/maria.js'
import apiRootRouter from './backend/api/index.js';

const app = express();
const server = createServerNode(app);
socketIOBootstrap(server);

maria.connect();
 
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: 'custom',
});
 
app.use(vite.middlewares);

app.use('/api',apiRootRouter);

app.use('*', async (req, res) => {
  const url = req.originalUrl;
 
  try {
    const template = await vite.transformIndexHtml(url, fs.readFileSync('index.html', 'utf-8'));
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
 
    const html = template.replace(`<!--outlet-->`, render);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});
 
server.listen(3000, () => {
  console.log('http://localhost:3000.');
});
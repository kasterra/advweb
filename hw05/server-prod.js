import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer } from 'node:http';
import maria from './backend/maria.js'
import apiRootRouter from './backend/api/index.js';
import socketIOBootstrap from './backend/socket/index.js';

const app = express();
const server = createServer(app);
socketIOBootstrap(server);

maria.connect();

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist/client'), { index: false }));

app.use('/api',apiRootRouter);
app.use('*', async (_, res) => {
  try {
    const template = fs.readFileSync('./dist/client/index.html', 'utf-8');
    const { render } = await import('./dist/server/entry-server.js');
 
    const html = template.replace(`<!--outlet-->`, render);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});
 
server.listen(3000, () => {
  console.log('http://localhost:3000.');
});
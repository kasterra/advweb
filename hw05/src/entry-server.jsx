import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";
 
import App from '../frontend/app';
 
export const render = (req,res) => {
  return renderToString(
  <StaticRouter location ={req.url}>
    <App />
  </StaticRouter>
  );
};
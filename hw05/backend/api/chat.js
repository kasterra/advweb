import express from 'express';
import maria from '../maria.js';

const chatApiRouter = express.Router();

chatApiRouter.get('/sessions',(req,res)=>{
  const query = `SELECT SessionID, ClientID, StartTime, EndTime FROM Sessions WHERE Status='ended'`;
  maria.query(query,(error, results)=>{
    if(error){
      res.status(500).send({});
    }
    res.send(results);
  })
})

chatApiRouter.get('/',(req,res)=>{
  const {sessionID} = req.query;
  const query = `SELECT SenderID, MessageText, Timestamp FROM Messages WHERE SessionID = ? ORDER BY Timestamp ASC`;
  maria.query(query,[sessionID], (error, results)=>{
    if(error){
      console.error(error);
      res.status(500).send({});
    }
    res.send(results);
  })
})


export default chatApiRouter;
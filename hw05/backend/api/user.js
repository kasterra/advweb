import express from 'express';
import maria from '../maria.js';

const userApiRouter = express.Router();

userApiRouter.get('/',(req,res)=>{
  const {userName, userType} = req.query;
  const query = 'SELECT UserID FROM Users WHERE Username = ? AND UserType = ?';
  maria.query(query, [userName, userType],(error, results)=>{
    if (error) {
      console.error(error);
      return res.status(500).send("DB ERROR");
    }
    if(results.length == 0){
      const query = `INSERT INTO Users(Username, UserType) VALUES (?, ?)`;
      maria.query(query,[userName, userType],(error,results)=>{
        if(error){
          console.error(error);
          return res.status(500).send("DB ERROR");
        }
        console.log(results);
        res.status(201).send({userID: results.insertId})
      });
    }
    else{
      console.log(results[0].UserID)
      res.status(200).send({userID: results[0].UserID})
    }
  })
})

export default userApiRouter;
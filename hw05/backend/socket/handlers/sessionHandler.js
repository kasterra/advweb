import maria from '../../maria.js'
import store from '../sessionStore.js';

export default (io, socket) => {
  // Session management logic here
  socket.on('start session', (ID) => {
    store.setCounsel(ID);
  });

  socket.on('join',async (ID)=>{
    if(store.CounselorID === ""){
      socket.emit("error", "현재 상담사 미접속중");
      return;
    }

    const session = store.getSession();
    if(Object.keys(session).length !== 0){
      const sockets = await io.fetchSockets();
      const prevSock = sockets.find(socket=>socket.id === session.socketID);
      const query = `UPDATE Sessions SET EndTime = NOW(), Status = 'ended' WHERE ClientID=?`;
      maria.query(query, [session.clientID],error => {
        if(error){
          socket.emit("error",error);
        }
        prevSock.emit("bye");
        console.log("BYE");
        prevSock.disconnect(true);
        store.clearSession();
      })
    }
    const query = `INSERT INTO Sessions(CounselorID, ClientID, StartTime, Status) VALUES (?, ?, NOW(), 'active')`;
    maria.query(query, [store.CounselorID, ID], (error,results)=> {
      if(error){
        socket.emit("error", error)
      }
      store.saveSession(ID, socket.id, results.insertId)
    })

    const userQuery = `SELECT Username FROM Users WHERE UserID=${ID}`;
    maria.query(userQuery, (error, results)=>{
      if(error){
        socket.emit("error", error)
      }
      io.emit('joined', results[0].Username)
    })
  })

  socket.on('quit',async ()=>{
      const session = store.getSession();
      if(Object.keys(session).length == 0) return;
      const sockets = await io.fetchSockets();
      const prevSock = sockets.find(socket=>socket.id === session.socketID);
      const query = `UPDATE Sessions SET EndTime = NOW(), Status = 'ended' WHERE ClientID=?`;
      maria.query(query, [session.clientID],error => {
        if(error){
          socket.emit("error",error);
        }
        prevSock.emit("bye");
        console.log("BYE");
        prevSock.disconnect(true);
        store.clearSession();
        io.emit('msg',{
          senderID:-1,
          messageText:"금일 상담은 종료입니다!!!"
        })
      })
  })
};

import maria from '../../maria.js'
import store from '../sessionStore.js';

export default (io, socket) => {
  socket.on('msg', (msgObj) => {
    if(store.CounselorID === ""){
      io.emit('msg', {
        senderID:-1,
        messageText:"사용자가 접속하지 않았습니다!"
      })
      return;
    }
    const {senderID, messageText} = msgObj;
      const query = "INSERT INTO Messages(SessionID, SenderID, MessageText, Timestamp) VALUES(?, ?, ?, NOW())";
      maria.query(query, [store.sessions.sessionID, senderID, messageText],(error, results)=>{
        if(error){
          socket.emit("error",error);
        }
        io.emit('msg', msgObj); 
      })
  });
};

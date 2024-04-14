import { useState,useContext, useEffect } from "react";
import SessionList from '../components/SessionList.jsx';
import ChatDisplay from '../components/ChatDisplay.jsx';
import Messanger from "../components/Messanger.jsx";
import {SocketContext} from '../context/socket.js';

const Index = () => {
  const socket = useContext(SocketContext);
  const [selectedSessionID, setSelectedSessionID] = useState(null);

  const handleSelectSession = (sessionID) => {
    setSelectedSessionID(sessionID);
  };

  useEffect(()=>{
    socket.emit('start session',sessionStorage.getItem("ID"))
  },[])

  return (
    <div style={{ display: 'flex',height:"100vh"}}>
      <div style={{ width: '30%' }}>
        <div style={{display:'flex', color:"tomato"}} onClick={() => handleSelectSession(null)}>
          실시간 상담화면 가기
        </div>
        <SessionList onSelectSession={handleSelectSession} />
        <div style={{display:'flex', color:"tomato"}} onClick={() => {
          handleSelectSession(null);
          socket.emit('quit');
        }}>
          상담 종료하기
        </div>
      </div>
      <div style={{ width: '70%' }}>
        {selectedSessionID ? <ChatDisplay sessionID={selectedSessionID} /> : <Messanger/>}
      </div>
    </div>
  );
}

export default Index;
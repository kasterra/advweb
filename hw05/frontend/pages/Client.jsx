import React, {useState, useContext, useEffect,useRef} from 'react';
import {SocketContext} from '../context/socket.js';
import Messanger from '../components/Messanger.jsx';

const Index = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const socket = useContext(SocketContext);
  useEffect(()=>{
    socket.on('joined',()=>{
      setIsAllowed(true);
    })
    socket.on('error',(error)=>{
      alert(error);
    })
    socket.on('bye', ()=>{
      alert("다른 사용자가 접속하여 종료되었답니다")
    })
    socket.on("disconnect",()=>{
      alert("앗 접속이 종료되었다!!");
      window.location.href = "http://34.118.157.109"
    })
  },[])
  useEffect(()=>{
    socket.emit('join', sessionStorage.getItem("ID"));
  },[])
  return isAllowed ? <Messanger/> : <h1>허가되지 않았습니다</h1> 
}

export default Index;
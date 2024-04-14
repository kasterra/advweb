import React, {useState, useContext, useEffect,useRef} from 'react';
import {SocketContext} from '../context/socket.js';

const Messanger = () => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // 메시지 목록의 끝으로 스크롤하는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  
  // 컴포넌트가 마운트될 때 소켓 이벤트 리스너를 설정합니다.
  useEffect(() => {
    socket.on('msg', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // 메시지가 추가될 때마다 스크롤
    scrollToBottom();

    // 컴포넌트 언마운트 시 리스너 해제
    return () => {
      socket.off('msg', sessionStorage.getItem('ID'));
    };
  }, []);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (!inputText) return;
    const msgObj = {
      senderID: sessionStorage.getItem('ID'),
      messageText: inputText,
    };
    socket.emit('msg', msgObj);
    setInputText('');
  };

  return (
    <div>
      <div style={{height:"90%", background:"rgba(0,0,0,0.1)", overflow:"auto"}}>
        {messages.map((msg, index) => (
          <p key={index}><b>{msg.senderID}:</b> {msg.messageText}</p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
        style={{width:'100%'}}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Messanger;
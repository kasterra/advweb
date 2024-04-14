import React, { useEffect, useState } from 'react';

function SessionList({ onSelectSession }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/chat/sessions');
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div>
      {sessions.length!==0 ? sessions.map(session => (
        <div style={{display:'flex'}} key={session.SessionID} onClick={() => onSelectSession(session.SessionID)}>
          Client ID: {session.ClientID}, Start: {session.StartTime}, End: {session.EndTime}
        </div>
      )) : <div>현재 기록 없음</div>}
      
    </div>
  );
}

export default SessionList;
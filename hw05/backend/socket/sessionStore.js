class SessionStore {
  findSession(clientID) {}
  saveSession(clientID, socketID) {}
  findAllSessions() {}
}

class InMemorySessionStore extends SessionStore {
  constructor() {
    super();
    this.sessions = {}
    this.CounselorID = "";
  }

  setCounsel(CounselorID){
    this.CounselorID = CounselorID;
  }

  saveSession(clientID, socketID,sessionID) {
    this.sessions = {clientID, socketID, sessionID}
  }

  getSession(){
    return this.sessions;
  }

  clearSession(){
    this.sessions = {};
  }
}

const store = new InMemorySessionStore();

export default store;
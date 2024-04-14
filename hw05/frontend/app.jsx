import {Routes,Route} from "react-router-dom";
import {SocketContext, socket} from './context/socket.js';
import Index from './pages/Index.jsx'
import Consel from './pages/Consel.jsx'
import Client from './pages/Client.jsx'

const App = () => {
 
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/consel" element={<Consel/>}/>
          <Route path="/client" element={<Client/>}/>
      </Routes>
    </SocketContext.Provider>
  );
};
 
export default App

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Chatpage from './Components/Chatpage';
import ChatProvider from './Components/context/ChatProvider';

function App() {
  return (
    <ChatProvider>
      <div>
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chat" element={<Chatpage />} />
    </Routes>
    </div>
    </ChatProvider>
  );
}

export default App;

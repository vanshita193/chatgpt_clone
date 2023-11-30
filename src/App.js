import React, { useState } from "react";
import { sendMsgToOpenAI } from './openai';
import './App.css';

import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';

function App() {
  const [messages, setMessages] = useState([
    { text: "I am an AI, how can I help you today?", sender: "bot" },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleUserInput = async () => {
    if (currentMessage.trim() === "") return;

    setMessages((prevMessages) => [...prevMessages, { text: currentMessage, sender: "user" }]);
    setCurrentMessage(""); 

    const aiResponse = await sendMsgToOpenAI(currentMessage);

    setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: "bot" }]);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={gptLogo} alt="Logo" className="logo" />
          <span className="brand">ChatGpt</span>
        </div>
        <button className="mid-btn">
          <img src={addBtn} alt="new chat" className="add-btn" />
          New Chat
        </button>
        <div className="upper-side-bottom">
          <button className="query">
            <img src={msgIcon} alt="Query" />
            How to use API ?
          </button>
          <button className="query">
            <img src={msgIcon} alt="Query" />
            How to use API ?
          </button>
        </div>
        <div className="lower-side">
          <div className="list-items">
            <img src={home} alt="Home" className="list-items-img" />
            Home
          </div>
          <div className="list-items">
            <img src={saved} alt="Saved" className="list-items-img" />
            Saved
          </div>
          <div className="list-items">
            <img src={rocket} alt="Upgrade" className="list-items-img" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, index) => (
            <div key={index} className={`chat ${message.sender}`}>
              {message.sender === 'user' && <img className='chating' src={userIcon} alt="" />}
              {message.sender === 'bot' && <img className='chating' src={gptImgLogo} alt="" />}
              <p className="txt">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUserInput();
                }
              }}
            />
            <button className="send" onClick={handleUserInput}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
        </div>
        <p>ChatGpt may produce inaccurate information about facts.</p>
      </div>
    </div>
  );
}

export default App;

import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage, handleFileUpload }) => (
  <div className="form">
    <input type="file" className="file" onChange={handleFileUpload} />
    <input
      className="input"
      type="text"
      placeholder="Type message ..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
    />
    <button className="sendButton" onClick={sendMessage}>
      Send Message
    </button>
  </div>
);

export default Input;

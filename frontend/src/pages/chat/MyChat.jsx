import "./MyChat.css";
import InfoBar from "../../components/InfoBar/InfoBar";
import Input from "../../components/Input/Input";
import Messages from "../../components/Messages/Messages";
import UserContainer from "../../components/UserContainer/UserContainer";
import ScrollToBottom from "react-scroll-to-bottom";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const socket = io(SERVER_URL);

const MyChat = () => {
  const location = useLocation();
  const logged_user = location.state;
  const [users, setUsers] = useState([]);
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  console.log("logged_user : ", logged_user);

  socket.on("get_connected_users", ({ connected_users }) => {
    const connected_users_without_me = connected_users.filter(
      (user) => user._id !== logged_user._id
    );
    setUsers(connected_users_without_me);
  });

  const handleSendMessageClick = () => {
    const send_message = {
      from: logged_user._id,
      to,
      body: message,
    };
    socket.emit(
      "send_message",
      { message: send_message },
      ({ data, error }) => {
        if (error) {
          console.log("send_message_error : ", error);
          if (error.includes("socket_id")) {
            setConversation([...conversation, send_message]);
            setMessage("");
            return;
          }
          alert(error);
          setMessage("");
          return;
        }
        setMessage("");
        console.log("send_message : ", data);
      }
    );
  };

  useEffect(() => {
    socket.on("message_sent", ({ new_message }) => {
      console.log("message_sent : ", new_message);
      setConversation([...conversation, new_message]);
    });
  }, [conversation]);

  useEffect(() => {
    get_conversation({ from: logged_user?._id, to });
  }, [logged_user, to]);

  useEffect(() => {
    socket.emit("login_me", { logged_user });
  }, [logged_user]);

  // rest api for conversation in axios

  const get_conversation = async ({ from, to }) => {
    try {
      const result = await axios.post(`${SERVER_URL}/conversation/from-to`, {
        from,
        to,
      });
      if (result.data.error) {
        console.log("error while get converation : ", result.data.error);
        alert(result.data.error);
        return;
      }
      const conversation_from_to = result.data;
      console.log("conversation from to : ", result);
      setConversation(conversation_from_to);
    } catch (error) {
      console.log("Mychat.jsx get conversation : ", error.message);
    }
  };

  return (
    <div>
      <div className="outer">
        <div className="chat-container">
          <div className="search-container" style={{ background: "#74b816" }}>
            <h2>Chat App</h2>
            <span>{logged_user.name}</span>
          </div>

          <div className="conversation-list" style={{ background: "#74b816" }}>
            <UserContainer users={users} setTo={setTo} />
          </div>

          <div
            className="new-message-container"
            style={{ background: "#74b816" }}
          ></div>

          <div className="chat-title">
            <InfoBar
              room={users
                ?.filter((user) => user._id === to)
                .map((user) => user.name)}
            />
          </div>

          <ScrollToBottom className="chat-message-list">
            <Messages messages={conversation} />
          </ScrollToBottom>

          <div className="chat-form">
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={handleSendMessageClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChat;

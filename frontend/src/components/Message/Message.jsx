import ReactEmoji from "react-emoji";

import "./Message.css";
import { useLocation } from "react-router-dom";

const Message = ({ message }) => {
  const location = useLocation();
  const logged_user = location.state;
  let isSentByCurrentUser = logged_user._id === message.from;

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">
          {ReactEmoji.emojify(message.body)}
        </p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">
          {ReactEmoji.emojify(message.body)}
        </p>
      </div>
    </div>
  );
};

export default Message;

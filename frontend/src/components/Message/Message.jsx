import ReactEmoji from "react-emoji";

import "./Message.css";
import { useLocation } from "react-router-dom";
import MediaComponent from "../media/MediaComponent";

const Message = ({ message }) => {
  const location = useLocation();
  const logged_user = location.state;
  let isSentByCurrentUser = logged_user._id === message.from;

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <div className="messageText colorWhite">
          {message.media_url ? (
            <MediaComponent mediaUrl={message.media_url} />
          ) : (
            ReactEmoji.emojify(message.body)
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <div className="messageText colorDark">
          {message.media_url ? (
            <MediaComponent mediaUrl={message.media_url} />
          ) : (
            ReactEmoji.emojify(message.body)
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;

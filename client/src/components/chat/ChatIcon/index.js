import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
const ChatIcon = ({ userCount, toggleShowChat }) => {
  return (
    <div className='chat-icon-container' onClick={toggleShowChat}>
      <FontAwesomeIcon
        className='icon-fa icon-comment-dots'
        icon={faCommentDots}
      />
      <span className='chat-icon-user-count disable-selection'>
        {`chat(${userCount})`}
      </span>
    </div>
  );
};
export default ChatIcon;

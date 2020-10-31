import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowMinimize,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { InputGroup, FormControl, Button as Btn, Form } from "react-bootstrap";
import TimeAgo from "react-timeago";
import { MESSAGE } from "../Constants/enum";
import Spinner from "../../layout/Spinner";
import Button from "../Button";
import Alert from "../Alert";
import "./styles.scss";

const ChatModal = ({ toggleShowChat, userCount, messages }) => {
  const [sendLoading, setSendLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);
  const scrollDivRef = useRef(null);
  const inputRef = useRef(null);
  const scrollToBottom = () => {
    scrollDivRef.current.scrollIntoView({ behavior: "auto" });
  };
  // Scroll to bottom when messages change
  useEffect(scrollToBottom, [messages]);
  const handleChange = (e) => {
    const value = e.target.value;
    const rowCount = value.split("\n").length;
    // Character limit & row limit
    if (
      value.length <= MESSAGE.CHAR_LIMIT &&
      rowCount <= MESSAGE.TEXTAREA_MAX_ROWS &&
      value !== "\n"
    ) {
      setMessage(value);
    }
  };
  // Submit on enter in textarea. Shift + enter still valid to type newline
  const handleKeyPress = (e) => {
    // Submit if enter was pressed without shift
    if (e.key === `Enter` && !e.shiftKey) {
      e.preventDefault(); // Prevents newline
      handleSubmit(e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim().length > 0 && message.length <= MESSAGE.CHAR_LIMIT) {
      setSendLoading(true);
      try {
        const res = await fetch(process.env.REACT_APP_FETCH_URL + "/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        });
        if (res.status === 400) {
          throw new Error("You're typing too fast! Please try again soon");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to post");
        }
        await res.json();
        setMessage(""); // Clear input field
        setSendLoading(false);
      } catch (err) {
        setError(err);
        setMessage("");
        setSendLoading(false);
      }
    }
  };
  return (
    <div className='chat-modal'>
      <div className='chat-main'>
        <div className='chat-delay-show'>
          <header className='chat-header'>
            <div className='icon-container'>
              <Button disabled iconBtn>
                <FontAwesomeIcon
                  className={`icon-ellipsis-h`}
                  icon={faEllipsisH}
                />
              </Button>
            </div>
            <h1 className='chat-header-text'>{`Chat with others! (${userCount})`}</h1>
            <div className='icon-container'>
              <Button iconBtn onClick={toggleShowChat}>
                <FontAwesomeIcon
                  className={`icon-window-minimize`}
                  icon={faWindowMinimize}
                />
              </Button>
            </div>
          </header>
          <div className='chat-content'>
            <div className='chat-content-inner'>
              <Alert error={error} onClose={() => setError(undefined)} />
              {messages.length > 0 ? (
                messages.map((m, i) => (
                  <div key={i} className='message-container'>
                    <div className='message-sender'>
                      <span className='message-sender-location'>
                        {`${m.partialIp}${
                          m.timezone ? ` (${m.timezone})` : ``
                        }`}
                      </span>
                      <span className='message-sender-time'>
                        <TimeAgo date={m.createdAt} />
                      </span>
                    </div>
                    <div className='message-block'>
                      <span>{m.message}</span>
                    </div>
                  </div>
                ))
              ) : (
                <Spinner />
              )}
              <div ref={scrollDivRef} />
            </div>
          </div>
          <div className='chat-input-container' onSubmit={handleSubmit}>
            <Form>
              <InputGroup className='mb-2' size='sm'>
                <FormControl
                  required
                  as='textarea'
                  rows={MESSAGE.TEXTAREA_MAX_ROWS}
                  maxLength={MESSAGE.CHAR_LIMIT}
                  placeholder='Text Message'
                  aria-label='Text Message'
                  aria-describedby='basic-addon2'
                  value={message}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  ref={inputRef}
                />
                <InputGroup.Append>
                  <Btn
                    variant='outline-secondary'
                    type='submit'
                    disabled={sendLoading}
                  >
                    Send
                  </Btn>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatModal;

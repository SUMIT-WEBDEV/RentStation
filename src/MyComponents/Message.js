import React, { useContext, useEffect, useRef, useState } from "react";
import "./Message.css";
import { format } from "timeago.js";
import { AuthContext } from "../Authentications/context/AuthContext";
import axios from "axios";

function Message({
  username,
  messageTime,
  messageId,
  message,
  own,
  reciever,
  userr,
  id,
  MessageDelete,
}) {
  const [show, setShow] = useState(false);
  // const [menubar, setMenubar] = useState(true);
  // const [deletem, setdeletem] = useState(false)

  // const MessageDelete = (id) => {
  //   axios
  //     .delete(`http://localhost:4000/messages/${id}`)
  //     .then((res) => {
  //       // setLoading(false)
  //       // setProduct(res.data);
  //       console.log(res.data);
  //       // setMsgs(message.filter((elem) => elem._id !== id));
  //       // setChange(true);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const visible = () => {
    setShow(true);
    // setMenubar(false);
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!menuRef?.current?.contains(event?.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.addEventListener("mousedown", handler);
    };
  });

  return (
    <div ref={menuRef} className={own ? "message" : "recievermsg"}>
      <div className="message__Text">
        <div className="msg">
          <h1>{message}</h1>
          {/* <h1>{id}</h1> */}
          <span className="msg__menu" onClick={visible}>
            <>⁝</>
          </span>
          {show && (
            <>
              <div className="delete" onClick={() => MessageDelete(id)}>
                <p>delete</p>
              </div>
            </>
          )}
        </div>
        <span>{format(messageTime)}</span>
      </div>
    </div>
  );
}

export default Message;

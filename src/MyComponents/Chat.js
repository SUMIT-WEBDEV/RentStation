import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import Message from "./Message";
import { AuthContext } from "../Authentications/context/AuthContext";

function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   const getMessages = async () => {
  //     try {
  //       const res = await axios.get("/messages/" + currentChat?._id);
  //       setMessages(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getMessages();
  // }, [currentChat]);

  console.log("currentChat");
  console.log(currentChat);
  console.log("currentChat");

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/conversations/" + user._id
        );
        setConversations(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  return (
    <div className="chat">
      <div className="chat__Wrapper">
        <div className="chat__Top">
          <div className="chat__topLeft">
            <div>
              <img className="chat__Image" src={user?.photoURL} />
            </div>
            <div>
              <h3>{user.username}</h3>
            </div>
          </div>

          <div className="chat__topRight">
            <h1>X</h1>
          </div>
        </div>

        <div className="chat__Mid">
          <Message />
          <Message own={true} />
          <Message />
        </div>

        <div className="chat__Bottom">
          <div className="chat__Inputt">
            <input placeholder="Type Messsage" className="chat__Input" />
          </div>
          <div>
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

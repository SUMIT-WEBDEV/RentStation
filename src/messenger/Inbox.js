import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authentications/context/AuthContext";
import Inboxx from "./Inboxx";
import "./Inbox.css";
import LoadInbox from "./LoadInbox";
import Messenger from "./Messenger";

function Inbox() {
  const [conv, setConv] = useState([]);
  const [who, setWho] = useState("");

  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/conversations/userId/${user._id}`)
  //     .then((res) => {
  //       setConv(res.data);
  //       // console.log(res.data._id);
  //       // console.log(res.data);
  //       console.log(res.data.members);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/conversations/userId/${user._id}`
        );
        setConv(res.data);
        console.log("setConv");
        console.log(res.data);
        console.log("setConv");
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);

  // const receiverrId = conv.find((member) => member !== user._id);

  // useEffect(() => {  useEffect(() => {
  // useEffect(() => {
  //   const gtMessages = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:4000/messages/${conv}`);
  //       console.log("last Message");
  //       console.log(res.data);
  //       console.log("last Message");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   gtMessages();
  // }, [conv]);

  // const receiverrId = conv.find((member) => member !== user._id);

  //   axios
  //     .get(`http://localhost:4000/users/${receiverrId}`)
  //     .then((res) => {
  //       setWho(res.data.username);
  //       console.log(res.data.username);
  //     })
  //     .catch((error) => console.log(error));
  // });

  // const hello = [
  //   ...new Set(
  //     message
  //       // .filter((m) => user._id === m.sender)
  //       .map((item) => {
  //         return item.conversationId;
  //       })
  //   ),
  // ];

  // const removeItem = (arr, item) => {
  //   let newArray = [...arr];
  //   const index = newArray.findIndex((element) => element === item);
  //   if (index != -1) {
  //     newArray.splice(index, 1);
  //     return newArray;
  //   }
  // };

  // console.log(removeItem(hello, user._id));

  return (
    <div className="inbox">
      <div className="inbox__Wrapper">
        <div className="inbox__Fit">
          <div className="inbox__Inbox">
            <h1>Inbox</h1>
          </div>
          {/* <h1>{conv._id}</h1> */}
          {conv.map((h, key) => (
            <Inboxx con={h.members} conOn={h._id} />
          ))}
          {/* <Inboxx conv={conv} /> */}
          {/* <div>{message}</div> */}

          {/* {conversations.map((c) => (
              <div>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))} */}
        </div>
      </div>
    </div>
  );
}

export default Inbox;

{
  /* <div className="chat__Top">
  {messages.find((m) => m.conversationId && user._id) ? (
    <>
      {messages.map((m, key) => (
        <div className="chat__Message">
          <Message
            message={m.text}
            messageId={m.sender}
            messageTime={m.createdAt}
            own={m.sender === user._id}
            username={user.username}
          />
        </div>
      ))}
    </>
  ) : (
    <h2>Loading...</h2>
  )}
</div>; */
}

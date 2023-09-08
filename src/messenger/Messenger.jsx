import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Authentications/context/AuthContext";
import Message from "../MyComponents/Message";
import Inbox from "./Inbox";
import "./messenger.css";
import { io } from "socket.io-client";

function Messenger(props) {
  const [conversations, setConversations] = useState([]);
  const [forrcv, setForrcv] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [who, setWho] = useState("");
  const [messages, setMessages] = useState([]);
  const [whoLoad, setWhoLoad] = useState(false);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [deletem, setdeletem] = useState(false);

  // 33333333333333333333333333333333333333333

  // console.log("props.match.params.id");
  // console.log(forrcv);
  // console.log("props.match.params.id");

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      forrcv.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, forrcv]);

  // 111111111111111111111111111111111111111
  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
      console.log("users");
      console.log(users);
      console.log("users");
    });
  }, [user]);

  // const allMesssage = [props.match.params.id, user._id];
  // console.log(allMesssage);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/messages/${props.match.params?.id}`
        );
        setMessages(res.data);
        // console.log(res.data);
        // // setLastMessage(res)
        // console.log("jgygfuyfy");
        // console.log(res.data[0]);
        // console.log("jgygfuyfy");
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [props.match.params.id, deletem]);

  // console.log("messages Last");
  // console.log(messages[0]);
  // console.log("messages Last");

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/conversations/${props.match.params.id}`
        );
        console.log("conversationsss");
        setForrcv(res.data.members);
        console.log(res.data);
        console.log("conversationsss");
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [props.match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: props.match.params.id,
    };

    const receiverId = forrcv.find((member) => member !== user?._id);

    // 2222222222222222222222222222222222222222222222
    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:4000/messages", message);
      setMessages([...messages, res.data]);
      console.log("added");
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const receiverrId = forrcv.find((member) => member !== user?._id);

    axios
      .get(`http://localhost:4000/users/${receiverrId}`)
      .then((res) => {
        setWho(res.data.username);
        setWhoLoad(true);
      })
      .catch((error) => console.log(error));
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ________________________DeleteMessage________________________________
  const MessageDelete = (id) => {
    axios
      .delete(`http://localhost:4000/messages/${id}`)
      .then((res) => {
        setdeletem(messages.filter((elem) => elem?._id !== id));
        console.log(res.data);
        // setMsgs(message.filter((elem) => elem._id !== id));
        // setChange(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="messenger">
      <div className="chat__Left">
        <Inbox />
      </div>

      <div className="chat">
        <div className="chat__Wrapper">
          {whoLoad ? (
            <div className="chat__topLeft">
              <div>
                <img
                  className="chat__ProfilePic"
                  s
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                />
              </div>
              <div>
                <h3 className="Who">{who}</h3>
              </div>
            </div>
          ) : (
            <div className="load__topLeft">
              <div className="load__imgtop">img</div>
              <div>
                <h3 className="Whoo">whowhowwho</h3>
              </div>
            </div>
          )}

          <form>
            <div className="chat__Top">
              {/* {messages.find(
              (n) => n.senderId && n.conversationId === user._Id
            ) ? (
              <> */}

              {/* <h1>{messages[0].text}</h1> */}

              {messages.map((m, key) => (
                <div className="chat__Message">
                  <div ref={scrollRef}>
                    <Message
                      id={m._id}
                      message={m.text}
                      messageId={m.sender}
                      messageTime={m.createdAt}
                      own={m.sender === user._id}
                      // reciever={receiverrId}
                      username={user.username}
                      userr={user._id}
                      MessageDelete={MessageDelete}
                    />
                  </div>
                  {/* <h1>hello</h1> */}
                  {/* <h1>{m[1]}</h1> */}
                  {/* <h1>hello</h1> */}
                </div>
              ))}
              {/* </>
            ) : (
              <div>
                <div id="loading-bar-spinner" className="spinner">
                  <div className="spinner-icon"></div>
                </div>
                {/* <h2>Loading...</h2> */}
              {/* </div> */}
              {/* )} */}
            </div>

            <div className="chat__Bottom">
              <div className="chat__Inputt">
                <textarea
                  placeholder="Type Messsage..."
                  className="chat__Input"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
              </div>
              <div className="chat__Send">
                <button type="submit" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Messenger;

{
  /*
            295
            
            {messages.find((m) => m.conversationId && user._id) ? (
              <>
                {messages.map((m, key) => (
                  <div>
                    <Inbox
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
              <h2>hello World</h2>
            )} */
}

// 234
// useEffect(() => {
//   const getConversations = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:4000/conversations/" + user._id
//       );
//       setConversations(res.data);
//       console.log(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   getConversations();
// }, [user]);

// import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
// import Conversation from "../../components/conversations/Conversation";
// import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { io } from "socket.io-client";

// export default function Messenger() {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const socket = useRef();
//   const { user } = useContext(AuthContext);
//   const scrollRef = useRef();

//   useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", user._id);
//     socket.current.on("getUsers", (users) => {
//       setOnlineUsers(
//         user.followings.filter((f) => users.some((u) => u.userId === f))
//       );
//     });
//   }, [user]);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get("/conversations/" + user._id);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [user._id]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get("/messages/" + currentChat?._id);
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: user._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== user._id
//     );

//     socket.current.emit("sendMessage", {
//       senderId: user._id,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await axios.post("/messages", message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <Topbar />
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <input placeholder="Search for friends" className="chatMenuInput" />
//             {conversations.map((c) => (
//               <div onClick={() => setCurrentChat(c)}>
//                 <Conversation conversation={c} currentUser={user} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((m) => (
//                     <div ref={scrollRef}>
//                       <Message message={m} own={m.sender === user._id} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat.
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <ChatOnline
//               onlineUsers={onlineUsers}
//               currentId={user._id}
//               setCurrentChat={setCurrentChat}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

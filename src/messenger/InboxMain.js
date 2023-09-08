import React from "react";
import Message from "../MyComponents/Message";
import Hello from "./Hello";
import Inbox from "./Inbox";
import "./InboxMain.css";

function InboxMain() {
  return (
    <div className="inboxMain">
      <div className="inboxMain__Left">
        <Inbox />
      </div>
      <div className="inboxMain__Right">
        <Hello />
      </div>
    </div>
  );
}

export default InboxMain;

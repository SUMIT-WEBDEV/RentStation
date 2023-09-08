import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authentications/context/AuthContext";
import "./LoadInbox.css";

function LoadInbox() {
  return (
    <div className="inboxx">
      {/* <Inboxxx name={name} /> */}
      <div className="inboxx__Link">
        <Link className="inboxx__Linkk" to="/">
          <div className="loadd__Img">img </div>
          <div className="loadd__Name">Loading.......</div>
        </Link>
        <hr />
      </div>
    </div>
  );
}

export default LoadInbox;

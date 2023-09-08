import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authentications/context/AuthContext";
import "./Inbox.css";
import LoadInbox from "./LoadInbox";

function Inboxx({ con, conOn }) {
  const [name, setName] = useState("");
  const [nam, setNam] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const receiverrId = con.find((member) => member !== user._id);

    axios
      .get(`http://localhost:4000/users/${receiverrId}`)
      .then((res) => {
        setName(res.data.username);
        setNam(res.data._id);
        setLoading(true);
        // console.log(res.data.username);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log("con");
  console.log(con);
  console.log("con");

  useEffect(() => {
    const gtMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/messages/${con}`);
        console.log("last Message");
        console.log(res.data);
        console.log("last Message");
      } catch (err) {
        console.log(err);
      }
    };
    gtMessages();
  }, []);

  return (
    <>
      {loading ? (
        <div className="inboxx">
          <div className="inboxx__Link">
            <Link
              className="inboxx__Linkk"
              to={{ pathname: `/chat/chat1/${conOn}` }}
            >
              <img
                className="profile__Pic"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
              <div className="inboxx__Name">
                <h2 className="names">{name}</h2>
              </div>
            </Link>
            <hr />
          </div>
        </div>
      ) : (
        <LoadInbox />
      )}
    </>
  );
}

export default Inboxx;

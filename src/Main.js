import React, { useEffect, useState, Fragment, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./MyComponents/Navbar";
import { useStateValue } from "./StateProvider";
import Sell from "./MyComponents/Sell";
import axios from "axios";
import Ad from "./MyComponents/Ad";
// import Feed from "./MyComponents/Feed";
import Chat from "./MyComponents/Chat";
import { AuthContext } from "./Authentications/context/AuthContext";
import Register from "./Authentications/register/Register";
import Login from "./Authentications/login/Login";
import Messenger from "./messenger/Messenger";
import Wishlist2 from "./MyComponents/Wishlist2";
import Feed from "./Feed/Feed";
import Feeddd from "./Feed/Feeddd";
import "./Main.css";
import Inbox from "./messenger/Inbox";
import Inboxx from "./messenger/Inboxx";
import Footer from "./Footer/Footer";
import InboxMain from "./messenger/InboxMain";

function Main() {
  const [myAds, setMyAds] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [feedLoad, setFeedLoad] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  // useEffect(() => {
  //   // will only run once when the app components load

  //   // auth.onAuthStateChanged((authUser) => {
  //   //   console.log("The user is >>> ", authUser);

  //   if (user) {
  //     //the user is logged in / the user was logged out

  //     dispatch({
  //       type: "SET_USER",
  //       user: user,
  //     });
  //   } else {
  //     //the user is logged out
  //     dispatch({
  //       type: "SET_USER",
  //       user: null,
  //     });
  //   }
  // });

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((res) => {
        // setLoading(false)
        setMyAds(res.data);
        setFeedLoad(true);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Register">
            <Navbar />
            <Register />
            <Footer />
          </Route>

          <Route path="/login">
            <Navbar />
            <Login />
            <Footer />
          </Route>

          {/* <Route path="/my-ads">
            <Navbar />
            <Ad myAds={myAds} />
          </Route> */}

          <Route
            exact
            path="/my-ads"
            // render={() => <Navbar/>}
            render={() => (
              <Fragment>
                <Navbar />
                <Ad myAds={myAds} />
                <Footer />
              </Fragment>
            )}
          />

          <Route
            path="/chat/chat1/:id"
            render={(props) => (
              <Fragment>
                <Navbar />
                <div className="mainMessage">
                  <div className="mainMessenger">
                    <Messenger {...props} myAds={myAds} />
                  </div>
                </div>
                {/* <Footer /> */}
              </Fragment>
            )}
          />

          {/* Why */}
          {/* <Route
            path="/chat/chat2/:id"
            render={(props) => <Inboxx {...props} myAds={myAds} />}
          /> */}

          <Route
            path="/Feeddd/:id"
            render={(props) => (
              <Fragment>
                <Feeddd {...props} myAds={myAds} />
                <Footer />
              </Fragment>
            )}
          />

          <Route path="/rent">
            <Navbar />
            <Sell />
            <Footer />
          </Route>

          <Route path="/Inbox">
            <Navbar />
            <InboxMain />
            <Footer />
          </Route>

          <Route path="/wishlist">
            <Navbar />
            <Wishlist2 />
            <Footer />
          </Route>

          {/* <Navbar /> */}
          {/* {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Feed myAds={myAds} conversation={c} currentUser={user} />
              </div>
            ))} */}
          <Route path="/">
            <div className="main__Feed">
              <Feed myAds={myAds} feedLoad={feedLoad} />
              <Footer />
            </div>
            {/* {user ? <h1>Hello User</h1> : <h1>Hello Sumit user nahi hei</h1>} */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Main;

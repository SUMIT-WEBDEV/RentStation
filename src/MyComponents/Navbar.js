import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import { StateContext, useStateValue } from "../StateProvider";
import Axios from "axios";
// import Feed from "../Feed/Feed";
import { AuthContext } from "../Authentications/context/AuthContext";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import HelpIcon from "@material-ui/icons/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import { useStateValue } from "../StateProvider";

function Navbar({
  myAds,
  searchTerm,
  locations,
  searchProduct,
  handleChange,
  handleChangeProduct,
}) {
  const { isFetching, dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [{ basket }] = useStateValue();
  const [logout, setLogout] = useState(false);

  const handleAuthentication = () => {
    if (user) {
      // auth.signOut();
      dispatch({
        type: "LOGIN_FAILURE",
      });
      setLogout(true);
      window.location.reload();
    }
  };

  useEffect(() => {
    localStorage.removeItem("basket");
  }, [logout]);

  // const popUp = () => {
  //   setShow(true);
  // };

  // console.log(user.photoURL);

  // console.log(loggedIn);

  return (
    <div className="navbarr">
      <div className="navbar">
        <div className="navbar__Left">
          {/* Left */}
          <div className="logo">
            <a href="/">RentStation</a>
          </div>

          <div className="navbar__Search">
            <div className="navSearch__Drop">
              <form>
                <select
                  className="dropdown"
                  // onChange={(e) => {
                  //   setSearchTerm(e.target.value);
                  // }}
                  onChange={handleChangeProduct}
                >
                  <option>--Select City--</option>
                  {locations?.map((myfeed) => (
                    <option>{myfeed}</option>
                  ))}
                  {/* <option>{locations}</option> */}
                </select>
              </form>
            </div>

            <div className="navSearch__SearchWrapper">
              <div className="navSearch__Search">
                <input
                  className="header__searchInput"
                  type="text"
                  placeholder="Search Your Product..."
                  onChange={handleChange}
                  // onChange={(e) => {
                  //   setSearchProduct(e.target.value);
                  // }}
                />
                <div className="nav__Icon">
                  <SearchIcon className="searchIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar__Right">
          {/* Right */}
          <div className="right__Login">
            {/* <Link>Sign Up</Link> */}
            <div>
              <Link to="/login" className="abc right__Sell">
                Hello, {user ? user.username : "Sign In"}
                {/* Hello, {loggedIn === false{
                  <h2>Hey Guest</h2>
                } else {
                  <h2></h2>
                  } */}
              </Link>
            </div>

            {user ? (
              <div>
                <Link to="/Inbox" className="abc right__Sell">
                  Inbox
                </Link>
              </div>
            ) : null}

            <div className="right__Wrapper">
              <div className="profile__Wrapper">
                <Link to="/" className="abc home">
                  <div>
                    {user ? (
                      <Avatar
                        style={{
                          height: "33px",
                          width: "33px",
                          fontSize: "29px",
                        }}
                        src="https://images.peels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt={user.username}
                        width="small"
                      />
                    ) : (
                      <img
                        className="profile"
                        // src={
                        //   user
                        //     ? user.photoURL
                        //     : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        // }
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      />
                    )}
                  </div>
                  <div className="profile__drop">
                    <h1>˅</h1>
                  </div>
                </Link>
              </div>
              <div className="right__dropdownwrap">
                {/* <a href="/">{user?.displayName}</a> */}
                <div className="right__dropdown">
                  <Link to="/my-ads">
                    <LibraryBooksIcon style={{ padding: "0px 9px 0px 0px" }} />
                    My ads
                  </Link>
                  <Link onClick={handleAuthentication}>
                    <ExitToAppIcon style={{ padding: "0px 9px 0px 0px" }} />
                    {user ? "Sign out" : "Sign In"}
                  </Link>
                  <Link>
                    <HelpIcon style={{ padding: "0px 9px 0px 0px" }} />
                    Help
                  </Link>
                  <Link>
                    <SettingsIcon style={{ padding: "0px 9px 0px 0px" }} />
                    Setting
                  </Link>
                  {/* <Link>{user ? "Sign out" : "Sign In"}</Link> */}
                </div>
              </div>
            </div>
          </div>

          <div className="right__Sell">
            <Link className="hoverr" to="/wishlist">
              {}
              Wishlist{basket.length === 0 ? null : <>({basket.length})</>}
            </Link>
          </div>
          {/* <div className="Sell "> */}
          {/* <Link className="hoverr" to="/rent"> */}
          <Link to="/rent">
            {/* <div className="Rent">Rent</div> */}
            <div className="right__Sell">Rent+</div>
            <div>{/* <AddIcon /> */}</div>
          </Link>
        </div>
        {/* </div> */}
      </div>

      <div>
        {/* <Feed /> */}
        {/* {myAds.map((myfeed, key) => (
          <Feed
            id={myfeed._id}
            price={myfeed.price}
            description={myfeed.description}
            location={myfeed.location}
            Image={`/photos/${myfeed.Image}`}
            title={myfeed.title}
          />
        ))} */}
      </div>
    </div>
  );
}

export default Navbar;

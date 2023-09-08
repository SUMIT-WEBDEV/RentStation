import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { format } from "timeago.js";
import { useStateValue } from "../StateProvider";
import "./Feedd.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { AuthContext } from "../Authentications/context/AuthContext";

function Feedd({
  id,
  location,
  price,
  createdAt,
  description,
  title,
  Image1,
  username,
  userId,
  duration,
  category,
}) {
  const [{ basket }, dispatch] = useStateValue();
  const [alertFav, setAlertFav] = useState(false);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  // console.log("add to basket>>>>", basket);

  useEffect(() => {
    setTimeout(function () {
      setAlertFav(false);
    }, 2000);
  }, [alertFav]);

  const addToBasket = () => {
    if (!user) {
      history.push("/login");
    } else {
      // alert("Recipe Added Successfully!");
      setAlertFav(true);

      // dispatch the item into the data layer
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id,
          Image1,
          location,
          price,
          title,
          createdAt,
          duration,
        },
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  return (
    <div className="feedd">
      <div className="feed__Alert">
        {alertFav && (
          <>
            <CheckCircleIcon
              style={{ color: "#42ba96", margin: "10px 0px 10px 10px" }}
            />
            <h2>Added Successfully</h2>
          </>
        )}
      </div>
      <div className="feed__Wrapper">
        {/* <h1>{category}</h1> */}
        <div>
          <img className="feed__image" src={Image1} alt="feedd" />
        </div>

        <div className="feed__Price">
          <div>
            <Link to={{ pathname: `/Feeddd/${id}` }}>
              {/* <h1>{username}</h1> */}
              <h1>
                ₹{price} /{duration}
              </h1>
            </Link>
          </div>
          <div className="price__Fav">
            <FavoriteBorderIcon onClick={addToBasket} />
          </div>
        </div>

        <div className="feed__Title">
          <h1>{title}</h1>
          {/* <h1>{category}</h1> */}
        </div>

        <div className="feed__bottom">
          <div>
            <small>{location}</small>
          </div>
          <div>
            <small>{format(createdAt)}</small>
          </div>
        </div>

        {/* <h1>{category}</h1> */}
        {/* <h1>{description}</h1> */}
        {/* <button onClick={addToBasket}>Add to Favourite</button> */}
      </div>
    </div>
  );
}

export default Feedd;

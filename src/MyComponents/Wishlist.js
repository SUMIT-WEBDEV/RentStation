import React, { useEffect } from "react";
import { useStateValue } from "../StateProvider";
// import "./Wishlist.css";
import "../Feed/Feedd.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

function Wishlist({ id, Image1, location, title, price, duration, time }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  return (
    <div className="f">
      <div className="feedd">
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
          </div>

          <div className="feed__Title">
            <h1>{title}</h1>
          </div>

          <div className="feed__bottom">
            <div>
              <small>{location}</small>
            </div>
            <div>
              <small>{format(time)}</small>
            </div>
          </div>

          {/* <h1>{category}</h1> */}
          {/* <h1>{description}</h1> */}
        </div>
      </div>
      <button onClick={removeFromBasket}>Remove from Basket</button>
    </div>
  );
}

export default Wishlist;

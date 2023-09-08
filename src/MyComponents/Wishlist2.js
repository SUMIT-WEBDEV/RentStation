import React from "react";
import { useStateValue } from "../StateProvider";
import Wishlist from "./Wishlist";
import "../Feed/Feedd.css";

function Wishlist2() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="Wishlist2">
      <h1>Your Wishlist</h1>
      <div className="wishlist">
        {basket.map((item) => (
          <Wishlist
            id={item.id}
            location={item.location}
            Image1={item.Image1}
            price={item.price}
            title={item.title}
            duration={item.duration}
            time={item.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Wishlist2;

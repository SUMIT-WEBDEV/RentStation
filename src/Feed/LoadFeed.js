import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useStateValue } from "../StateProvider";
import "./Feedd.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function LoadFeed() {
  return (
    <div className="feedd">
      <div className="feed__Wrapper">
        {/* <h1>{category}</h1> */}
        <div className="feedLoad__img">.</div>

        <div>
          <Link className="feedLoad__Price" to="/">
            <h1>pricepricepricepricepriceprice</h1>
          </Link>
        </div>

        <div>
          {/* <h1>title</h1> */}
          <Link className="feedLoad__Title" to="/">
            <h1>pricepricepriceprice</h1>
          </Link>
        </div>

        {/* <div className="feed__bottom">
          <div>
            <small>location</small>
          </div>
          <div>
            <small>format</small>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default LoadFeed;

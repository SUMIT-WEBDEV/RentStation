import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function AdLoad() {
  return (
    <div className="ad__User">
      <div className="ad__MyAds">
        <div className="ad__Wrapper">
          <div className="ad__profileLoad">""</div>

          <div className="add__TitleLoad">
            <h2>titletitletitle</h2>
          </div>
          <div className="ad__PriceLoad">
            <h1>₹₹₹₹₹₹</h1>
            <h2>This ad is currently active</h2>
          </div>

          <div className="ad__Icon">
            <DeleteIcon style={{ color: "rgb(220, 215, 215)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdLoad;

import React from "react";
import "./Footer.css";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__Wrapper">
        {/* left */}
        <div class="footer__Left">
          <h3>
            {/* Company<span>logo</span> */}
            RentStation
          </h3>

          <p class="footer__Links">
            <a href="#">Home </a>|<a href="#"> Blog </a>|
            <a href="#"> Pricing </a>|<a href="#"> About </a>|
            <a href="#"> Faq </a>|<a href="#"> Contact </a>
          </p>

          <p class="footer__CN">RentStation © 2022</p>
        </div>

        <div className="footer__Center">
          {/* middle */}
          <div class="footer__Mid">
            <div className="mid__Line">
              <RoomIcon className="icon locIcon" fontSize="large" />
              <p>
                444 S. Cedros Ave
                <br /> <span>Dibrugarh Assam, India</span>
              </p>
            </div>

            <div className="mid__Line">
              <PhoneIcon className="icon" fontSize="large" />
              <span>+1.555.555.5555</span>
            </div>

            <div className="mid__Line">
              <EmailIcon className="icon" fontSize="large" />
              <a href="mailto:support@company.com">support@company.com</a>
            </div>
          </div>
        </div>

        <div className="footer__Right">
          <p class="Right__Para">
            <span>About the company</span>
            <br />
            <p className="about__para">
              The RentStation sets up a online renting platform for customer to
              rent things according to the categories mention in the
              RentStation.{" "}
            </p>
          </p>

          <div class="right__Icons">
            <a href="#">
              <FacebookIcon fontSize="large" className="icons" />
            </a>
            <a href="#">
              <TwitterIcon fontSize="large" className="icons" />
            </a>
            <a href="#">
              <LinkedInIcon fontSize="large" className="icons" />
            </a>
            <a href="#">
              <GitHubIcon fontSize="large" className="icons" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

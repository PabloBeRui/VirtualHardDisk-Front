import React from "react";
import "./style.css";

import Header from "../../components/Header";
import ButtonModal from "../../components/ButtonModal";
import Footer from "../../components/Footer";

import landingDesign from "../../assets/landingDesign.png";

const LandingPage = () => {
  return (
    <section id="LandingPage">
      <Header />

      <section id="MiddleLandingPage">
        <div>
          <img src={landingDesign} alt="Futuristic Design" />
        </div>
        <div id="sloganAboutUs">
          <p className="slogan">For the data that never sleeps</p>
          <ButtonModal text="ABOUT US" destination="../about" />
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default LandingPage;

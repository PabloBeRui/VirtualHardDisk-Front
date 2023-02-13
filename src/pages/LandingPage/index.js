import "./style.css";

//Components

import Header from "../../components/Header";
import ButtonModal from "../../components/ButtonModal";

//Assets
import landingDesign from "../../assets/landingDesign.png";
import Footer from "../../components/Footer";

const LandingPage = () => {
  return (
    <section id="LandinPage">
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

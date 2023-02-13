import "./style.css";

//Components
import AboutUsHeader from "../../components/AboutUsHeader";
import Footer from "../../components/Footer";
import { useState } from "react";
//Assets
import arrowIconAboutUs from "../../assets/arrowIconAboutUs.png";
import logo1 from "../../assets/logo1AboutUs.png";
import logo2 from "../../assets/logo2AboutUs.png";
import logo3 from "../../assets/logo3AboutUs.png";

const AboutPage = () => {
  const [sectionContent, setSectionContent] = useState(
    <div id="divTheWHDWay">
      <h1 className="h1TheVHDWay">The VHD Way</h1>
      <p className="pTheVHDWay">
        Virtual hard disk is a complete cloud storage service developed to be
        easy to use, cheap and open source. (Created as a HackABoss web bootcamp
        project)
      </p>
    </div>
  );

  const handleButtonClick = () => {
    setSectionContent(
      <section id="section2AboutUs">
        <h1 class="h1AboutUs2"> Why VHD?</h1>
        <div class="divCardAboutUs2">
          <img src={logo1} alt="Logo" />
          <h2 class="h2AboutUs2">Wide Network</h2>
          <p class="pAboutUs2">
            No matter where you are, we've got you covered.
          </p>
        </div>
        <div class="divCardAboutUs2">
          <img src={logo2} alt="Logo" />
          <h2 class="h2AboutUs2">Unmatched Support</h2>
          <p class="pAboutUs2">Virtual assistance. Talk to us about any</p>
        </div>
        <div class="divCardAboutUs2">
          <img src={logo3} alt="Logo" />
          <h2 class="h2AboutUs2">Beginner-Friendly</h2>
          <p class="pAboutUs2">
            Easy peasy UI. Our interface is simple and easy to use.
          </p>
        </div>
      </section>
    );
  };

  return (
    <section id="aboutPage">
      <AboutUsHeader />
      <section id="sectionTheVHDWay">
        {sectionContent}{" "}
        <img
          className="arrowIconAboutUs"
          alt="Next"
          src={arrowIconAboutUs}
          onClick={handleButtonClick}
        />
      </section>

      <Footer />
    </section>
  );
};

export default AboutPage;

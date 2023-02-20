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
import arrowIconAboutUsBack from "../../assets/arrowIconAboutUsBack.png";

const AboutPage = () => {
  const [showArrow, setShowArrow] = useState(true);
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
        <div className="divh1AboutUs2">
          <a href="/about">
            <img
              className="arrowIconAboutUsBack"
              alt="Next"
              src={arrowIconAboutUsBack}
              onClick={handleButtonClick}
            />
          </a>
          <h1 class="h1AboutUs2"> Why VHD?</h1>
        </div>
        <section id="sectionCardsAboutUs2">
          <div class="divCardAboutUs2">
            <img src={logo1} alt="Logo" class="logo2" />
            <h2 class="h2AboutUs2">Wide Network</h2>
            <p class="pAboutUs2">
              No matter where you are, we've got you covered.
            </p>
          </div>
          <div class="divCardAboutUs2">
            <img src={logo2} class="logo2" alt="Logo" />
            <h2 class="h2AboutUs2 h2AboutUs2Center ">Unmatched Support</h2>
            <p class="pAboutUs2">Virtual assistance. Talk to us about any</p>
          </div>
          <div class="divCardAboutUs2B">
            <img src={logo3} alt="Logo" class="logo2" />
            <h2 class="h2AboutUs2">Beginner-Friendly</h2>
            <p class="pAboutUs2">
              Easy peasy UI. Our interface is simple and easy to use.
            </p>
          </div>
        </section>
      </section>
    );
    setShowArrow(false);
  };

  return (
    <section id="aboutPage">
      <AboutUsHeader style={{ maxWidth: "60%" }} />

      <section id="sectionTheVHDWay">
        {sectionContent}
        <div className="divArrow">
          {showArrow && (
            <img
              className="arrowIconAboutUs"
              alt="Next"
              src={arrowIconAboutUs}
              onClick={handleButtonClick}
            />
          )}
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default AboutPage;

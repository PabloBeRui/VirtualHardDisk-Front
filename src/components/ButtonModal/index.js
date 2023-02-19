import "./style.css";

const ButtonModal = ({ text, destination }) => {
  return (
    <button id="button">
      <a href={destination} className="buttonFont">{text}</a>
    </button>
  );
};

export default ButtonModal;

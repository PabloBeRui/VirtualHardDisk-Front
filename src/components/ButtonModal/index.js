import "./style.css";

const ButtonModal = ({ text, destination, buttonClass }) => {
  return (
    <button id="button" className={buttonClass}>
      <a href={destination} className="buttonFont">
        {text}
      </a>
    </button>
  );
};

export default ButtonModal;

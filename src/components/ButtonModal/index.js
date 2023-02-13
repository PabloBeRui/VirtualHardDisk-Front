import "./style.css";

const ButtonModal = ({ text, destination }) => {
  return (
    <button id="button">
      <a href={destination}>{text}</a>
    </button>
  );
};

export default ButtonModal;

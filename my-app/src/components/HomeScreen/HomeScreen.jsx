import "./HomeScreen.css";

function HomeScreen({ timer }) {
  return (
    <div className="homeScreen__content">
      <div className="homeScreen__text_container">
        <h1 className="homeScreen__text_container_title">
          We've received your request
        </h1>
        <p className="homeScreen__text_container_subtext">
          Please check your email for confirmation{" "}
        </p>
        <button className="homeScreen__button">
          Logging out in{" "}
          <span className="homeScreen__button_span">{timer}</span>
          seconds
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;

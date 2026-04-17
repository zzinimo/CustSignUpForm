import "./HomeScreen.css";

function HomeScreen() {
  return (
    <div className="homeScreen__content">
      <div className="homeScreen__text_container">
        <h1 className="homeScreen__text_container_title">
          We've received your request
        </h1>
        <p className="homeScreen__text_container_subtext">
          Please check your email for confirmation{" "}
        </p>
      </div>
    </div>
  );
}

export default HomeScreen;

import "./HomeScreen.css";

function HomeScreen({ timer, handleLogoutClick, userData }) {
  return (
    <div className="homeScreen__content">
      <div className="homeScreen__text_container">
        <h1 className="homeScreen__text_container_title">
          {`${userData.firstName}, we've received your request!`}
        </h1>
        <p className="homeScreen__text_container_subtext">
          Please check your email for confirmation.{" "}
        </p>
        <p className="homeScreen__text_container_subtext">
          {`Sent to ${userData.email}.`}
        </p>
        <button className="homeScreen__button">
          Logging out in
          <span className="homeScreen__button_span">{timer}</span>
          seconds
        </button>
        <button
          onClick={handleLogoutClick}
          className="homeScreen__button_type_logout"
        >
          Logout Now
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;

import "./HomeScreen.css";

function HomeScreen({ timer, handleLogoutClick, userData }) {
  const firstName = userData?.firstName ?? "";
  const displayName =
    firstName.length > 0
      ? `${firstName[0].toUpperCase()}${firstName.slice(1)}`
      : "Hello";
  const email = userData?.email ?? "your email";

  return (
    <div className="homeScreen__content">
      <div className="homeScreen__text_container">
        <h1 className="homeScreen__text_container_title">
          {`${displayName}, we've received your request!`}
        </h1>
        <p className="homeScreen__text_container_subtext">
          Please check your email for confirmation.{" "}
        </p>
        <p className="homeScreen__text_container_subtext">
          {email.length > 0 ? `Sent to ${email}` : ""}
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

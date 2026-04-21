import "./MainContent.css";

function MainContent({ setModalType }) {
  const handleSignUpClick = () => {
    setModalType("signUp");
  };
  const handleSignInClick = () => {
    setModalType("signIn");
  };
  return (
    <main className="main__content">
      <div className="main__content_container">
        <h1 className="main__content_title">Sign in to continue</h1>
        <div className="main__content_button_container">
          <button
            className="main__content_button main__content_button_type_signIn"
            onClick={() => setModalType("signIn")}
          >
            Sign In
          </button>
          <button
            className="main__content_button main__content_button_type_signUp"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}

export default MainContent;

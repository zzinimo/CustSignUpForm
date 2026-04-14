import "./SignInForm.css";
import { useState } from "react";

function SignInForm({ modalType, setModalType }) {
  const initialInput = {
    email: "",
    password: "",
  };

  const initialErrors = {
    email: "",
    password: "",
  };
  const isOpen = modalType === "signIn";

  const [input, setInput] = useState(initialInput);
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseButtonClick = (e) => {
    console.log(e.target);
    setModalType(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.email;

    const newErrors = {
      email: emailInput.value.trim()
        ? "Email is required"
        : emailInput.checkValidity()
          ? ""
          : "Please enter valid email",
      password: input.password.trim() ? "" : "Password is required",
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      return;
    }

    setIsLoading(true);
  };

  if (!isOpen) return null;
  const signInForm = document.getElementById("mySignInForm");

  return (
    <div className="overlay">
      <div className="myForm__content">
        <form className="myForm" id="mySignInForm" onSubmit={handleSubmit}>
          <button
            onClick={handleCloseButtonClick}
            className="myForm__button_type_close"
            type="button"
          >
            Close
          </button>
          <h1 className="myForm__title">Sign In</h1>
          <label className="myForm__label">
            Email:
            <input
              onChange={handleInputChange}
              value={input.email}
              id="myForm__label"
              name="email"
              type="email"
              className="myForm__input"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="myForm__error">{errors.email}</span>
            )}
          </label>

          <label className="myForm__label">
            Password:
            <input
              onChange={handleInputChange}
              value={input.password}
              id="myForm__label"
              name="password"
              type="password"
              className="myForm__input"
              placeholder="Enter Your Password"
            />
            {errors.password && (
              <span className="myForm__error">{errors.password}</span>
            )}
          </label>
          <button
            type="submit"
            className={!isLoading ? "myForm__button" : "myForm__button success"}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;

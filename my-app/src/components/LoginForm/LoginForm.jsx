import "./LoginForm.css";
import { useState } from "react";

function LoginForm() {
  const initialInput = {
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };

  const initialErrors = {
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };

  const [isOpen, setIsOpen] = useState(true);
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
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmPasswordError = !input.confirmPassword.trim()
      ? "Confirm passowrd is required"
      : input.confirmPassword !== input.password
        ? "Passwords must match"
        : "";

    const newErrors = {
      firstName: input.firstName.trim() ? "" : "First name is required",
      lastName: input.lastName.trim() ? "" : "Last name is required",
      password: input.password.trim() ? "" : "Password is required",
      confirmPassword: confirmPasswordError,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      console.log(newErrors);
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    } finally {
      setIsLoading(false);
      setInput(initialInput);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="overlay">
      <div className="myForm__content">
        <form className="myForm" id="myForm" onSubmit={handleSubmit}>
          <button
            onClick={handleCloseButtonClick}
            className="myForm__button_type_close"
            type="button"
          >
            Close
          </button>
          <h1 className="myForm__title">Sign Up</h1>

          <label className="myForm__label">
            First Name:
            <input
              onChange={handleInputChange}
              value={input.firstName}
              id="myForm__label"
              name="firstName"
              type="text"
              className="myForm__input"
              placeholder="Enter Your First Name"
            />
            {errors.firstName && (
              <span className="myForm__error">{errors.firstName}</span>
            )}
          </label>
          <label className="myForm__label">
            Last Name:
            <input
              onChange={handleInputChange}
              value={input.lastName}
              id="myForm__label"
              name="lastName"
              type="text"
              className="myForm__input"
              placeholder="Enter Your Last Name"
            />
            {errors.lastName && (
              <span className="myForm__error">{errors.lastName}</span>
            )}
          </label>
          <label className="myForm__label">
            Password:
            <input
              onChange={handleInputChange}
              value={input.password}
              id="myForm__label"
              name="password"
              type="text"
              className="myForm__input"
              placeholder="Enter Your Password"
            />
            {errors.password && (
              <span className="myForm__error">{errors.password}</span>
            )}
          </label>
          <label className="myForm__label">
            Re-Enter Password:
            <input
              onChange={handleInputChange}
              value={input.confirmPassword}
              id="myForm__label"
              name="confirmPassword"
              type="text"
              className="myForm__input"
              placeholder="Enter Your Password"
            />
            {errors.confirmPassword && (
              <span className="myForm__error">{errors.confirmPassword}</span>
            )}
          </label>

          <button
            type="submit"
            className={!isLoading ? "myForm__button" : "myForm__button success"}
          >
            {!isLoading ? "Submit" : "Submitted"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

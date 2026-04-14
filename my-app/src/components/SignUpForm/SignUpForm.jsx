import "./SignUpForm.css";
import { useState } from "react";
import { createUserFetch } from "../../utils/api";

function SignUpForm({ setModalType, modalType }) {
  const initialInput = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const isOpen = modalType === "signUp";

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

    const confirmPasswordError = !input.confirmPassword.trim()
      ? "Confirm passowrd is required"
      : input.confirmPassword !== input.password
        ? "Passwords must match"
        : "";

    const newErrors = {
      firstName: input.firstName.trim() ? "" : "First name is required",
      lastName: input.lastName.trim() ? "" : "Last name is required",
      email: !emailInput.value.trim()
        ? "Email is required"
        : emailInput.checkValidity()
          ? ""
          : "Please enter valid email",
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
      await createUserFetch(input);
    } finally {
      setIsLoading(false);
      setInput(initialInput);
      setModalType(null);
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
          <label className="myForm__label">
            Re-Enter Password:
            <input
              onChange={handleInputChange}
              value={input.confirmPassword}
              id="myForm__label"
              name="confirmPassword"
              type="password"
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

export default SignUpForm;

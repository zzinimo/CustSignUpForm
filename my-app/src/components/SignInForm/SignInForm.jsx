import "./SignInForm.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../utils/api";

function SignInForm({
  modalType,
  setModalType,
  onLoginSuccess,
  userDataFromApi,
}) {
  const navigate = useNavigate();

  const handleDataFromApi = (data) => {
    userDataFromApi(data);
  };

  const initialInput = {
    email: "",
    password: "",
  };

  const initialErrors = {
    email: "",
    password: "",
    submitError: "",
  };
  const isOpen = modalType === "signIn";

  const [input, setInput] = useState(initialInput);
  const [errors, setErrors] = useState(initialErrors);

  const formRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    if (modalType !== "signIn") return;

    emailRef.current.focus();

    const handleMouseDown = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setModalType(null);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setModalType(null);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modalType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseButtonClick = (e) => {
    setModalType(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.email;

    const newErrors = {
      email: !emailInput.value.trim()
        ? "Email is required"
        : emailInput.checkValidity()
          ? ""
          : "Please enter valid email",
      password: input.password.trim() ? "" : "Password is required",
      submitError: "",
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      return;
    }
    try {
      const data = await login(input);
      handleDataFromApi(data);
      onLoginSuccess();
    } catch (e) {
      console.error(e);
      setErrors((prev) => ({
        ...prev,
        submitError: "Sign in failed, try again",
      }));
    }
  };

  return (
    <div className="overlay">
      <div className="myForm__content">
        <form
          ref={formRef}
          className="myForm"
          id="mySignInForm"
          onSubmit={handleSubmit}
        >
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
              ref={emailRef}
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
          <button type="submit" className="myForm__button">
            Sign In
          </button>
          {errors.submitError && (
            <span className="myForm__error">{errors.submitError}</span>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignInForm;

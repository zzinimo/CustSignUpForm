import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import SignInForm from "../SignInForm/SignInForm";
import MainContent from "../MainContent/MainContent";
import HomeScreen from "../HomeScreen/HomeScreen";
import { authenticate, logout } from "../../utils/api";

function App() {
  const [modalType, setModalType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [timer, setTimer] = useState(20);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authenticate();
        setAuthenticated(true);
        navigate("/home", { replace: true });
        setModalType(null);
      } catch (e) {
        setAuthenticated(false);
        navigate("/", { replace: true });
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const timeLeft = () => {
      if (!authenticated) {
        return;
      }
      if (timer === 0) {
        logout();
        setAuthenticated(false);
        navigate("/", { replace: true });

        return;
      }

      const timeoutId = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      console.log(timer);
    };

    timeLeft();

    return () => {
      clearTimeout(timeLeft);
    };
  }, [timer, authenticated, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app__content">
            {modalType === "signUp" && (
              <SignUpForm setModalType={setModalType} modalType={modalType} />
            )}
            {modalType === "signIn" && (
              <SignInForm setModalType={setModalType} modalType={modalType} />
            )}

            <MainContent setModalType={setModalType} />
          </div>
        }
      />

      <Route path="/home" element={<HomeScreen />} />
    </Routes>
  );
}

export default App;

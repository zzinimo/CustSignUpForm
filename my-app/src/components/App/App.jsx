import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import SignInForm from "../SignInForm/SignInForm";
import MainContent from "../MainContent/MainContent";

function App() {
  const [modalType, setModalType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
    </Routes>
  );
}

export default App;

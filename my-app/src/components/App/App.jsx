import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app__content">
            <LoginForm />
          </div>
        }
      />
    </Routes>
  );
}

export default App;

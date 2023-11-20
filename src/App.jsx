import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./routes/Login";

function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

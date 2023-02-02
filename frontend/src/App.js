import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Pravin from "./components/Pravin"
import UserPage from "./Pages/UserPage";
import ErrorHandle from "./Pages/ErrorHandle";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/chat" element={<Pravin />}></Route>
        <Route path='*' element={<ErrorHandle />} />
      </Routes>
    </div>
  );
}

export default App;
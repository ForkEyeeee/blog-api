import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/authorsession/posts" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

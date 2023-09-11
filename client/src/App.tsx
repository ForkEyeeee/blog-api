import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Post from "./components/Post";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Aboutus from "./components/AboutUs";
import ErrorPage from "./components/ErrorPage";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postid" element={<Post />} />
        <Route path="/users/new" element={<SignUp />} />
        <Route path="/session/new" element={<Login />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;

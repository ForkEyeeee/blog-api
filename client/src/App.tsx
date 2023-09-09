import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Post from "./components/Post";
import NavBar from "./components/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postid" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;

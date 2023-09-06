import { Box } from "@chakra-ui/react";
import ErrorPage from "./components/ErrorPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;

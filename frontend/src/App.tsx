import "./App.css";
import Certificate from "./components/Certificate";
import Login from "./components/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router";
import Search from "./components/Search";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/generate" element={<Certificate />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;

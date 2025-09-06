import "./App.css";
import Certificate from "./components/Certificate";
import Login from "./components/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/generate" element={<Certificate />} />
        
      </Routes>
    </Router>
  );
};

export default App;

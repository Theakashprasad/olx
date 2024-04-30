import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Details from "./components/Details";
import Create from "./pages/Create";
import View from "./pages/View";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
 './pages/Create'
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/details" element={<Details />} />
      <Route path="/create" element={<Create />} />
      <Route path="/view" element={<View />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  </Router>
  );
}

export default App;

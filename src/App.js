import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TutorialsList from "./components/TutorialsList";
import AddTutorial from './components/AddTutorial';
import Update from './components/Update'
import Del from './components/del';
function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Student List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/del"} className="nav-link">
              find and dell
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/update"} className="nav-link">
              Update
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TutorialsList />} />
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/add" element={<AddTutorial />} />
          <Route path="/del" element={<Del />} />
          <Route path="/update" element={<Update />} />
          {/*<Route path="/tutorials/:id" element={<Tutorial/>} />*/}
        </Routes>
      </div>
    </div>

  );
}

export default App;

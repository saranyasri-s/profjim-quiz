// css
import classes from "./App.module.css";

// route
import { useNavigate } from "react-router-dom";
import { Routes, Route, NavLink, Navigate, Link } from "react-router-dom";

// child component

import QuizComponent from "./components/QuizComponent/QuizComponent";
import Profile from "./components/Profile/Profile";
import StartQuiz from "./components/StartQuiz/StartQuiz";
import SubjectSelection from "./components/SubjectSelection/SubjectSelection";
import Auth from "./components/Auth/Auth";
// redux
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../src/store/UserSlice";
import { clearQuestions } from "./store/questionsSlice";
function App() {
  const isAuthenticated = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());

    navigate("/");
  };

  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <Link
          style={{ textDecoration: "none" }}
          to="/home"
          className={classes.QuizTime}
          onClick={()=>{dispatch(clearQuestions());}}
        >
          QuizTime
        </Link>
        {isAuthenticated && (
          <nav>
            <NavLink
              to="/profile"
              className={({ isActive, isPending }) =>
                isPending
                  ? classes.inactive
                  : isActive
                  ? classes.active
                  : classes.inactive
              }
            >
              Profile
            </NavLink>
            {isAuthenticated && (
              <button onClick={handleLogout} className={classes.button}>
                Logout
              </button>
            )}
          </nav>
        )}
      </header>

      {/* Rendering the component based on route url */}
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route
          path="/home"
          element={isAuthenticated ? <StartQuiz /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/subjectSelection"
          element={isAuthenticated ? <SubjectSelection /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/quiz"
          element={isAuthenticated ? <QuizComponent /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

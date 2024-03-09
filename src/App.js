// css
import classes from "./App.module.css";

// route
import { useNavigate } from "react-router-dom";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

// child component
import ChatComponent from "./components/ChatComponent/ChatComponent";
import Profile from "./components/Profile/Profile";
import StartQuiz from "./components/StartQuiz/StartQuiz";
import SubjectSelection from "./components/SubjectSelection/SubjectSelection";

// redux
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../src/store/UserSlice";

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
        <div className={classes.QuizTime}>QuizTime</div>
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
            <button onClick={handleLogout} className={classes.button}>
              Logout
            </button>
          </nav>
        )}
      </header>

      {/* Rendering the component based on route url */}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <StartQuiz /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/subjectSelection"
          element={isAuthenticated ? <SubjectSelection /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/quiz"
          element={isAuthenticated ? <ChatComponent /> : <Navigate to="/" />}
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

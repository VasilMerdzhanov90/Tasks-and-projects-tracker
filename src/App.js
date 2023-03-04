import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";
import OnlineUsers from "./components/OnlineUsers";
import Finished from "./pages/finished/Finished";
import Settings from "./pages/settings/Settings";
import { useState } from "react";

function App() {
  let { user, authIsReady, userData } = useAuthContext();

  let colors = {
    dark: "#adadad",
    light: "#f4f4f4",
  };
  let containerColor = userData?.userSettings.mainTheme;
  let language = userData?.userSettings.language;

  const [newMainTheme, setNewMainTheme] = useState(userData?.userSettings.mainTheme);
  const [newLanguage, setNewLanguage] = useState(userData?.userSettings.language);
  const [newSidebarColor, setNewSidebarColor] = useState(userData?.userSettings.sidebarColor);
 
  function userSettingsHandler(newUserData) {
    setNewMainTheme(newUserData.userSettings.mainTheme);
    setNewLanguage(newUserData.userSettings.language);
    setNewSidebarColor(newUserData.userSettings.sidebarColor);
  }

  return (
    <div className="App">
      {authIsReady 
    //   && userData 
      && (
        <BrowserRouter>
          {user && userData && (
            <Sidebar language={newLanguage || language} backgroundColor={newSidebarColor} />
          )}
          <div
            className="container"
            style={{ backgroundColor: colors[newMainTheme] || colors[containerColor] }}
          >
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  user ? (
                    <Dashboard language={newLanguage || language} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/create"
                element={
                  user && language ? (
                    <Create language={newLanguage || language} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
              <Route
                path="/projects/:id"
                element={
                  user ? (
                    <Project language={newLanguage || language} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/finished"
                element={
                  user && language ? (
                    <Finished language={newLanguage || language} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/settings"
                element={
                  userData ? (
                    <Settings
                      lang={newLanguage || language}
                      userSettingsHandler={userSettingsHandler}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </div>
          {user && userData && (
            <OnlineUsers
              color={colors[newMainTheme] || colors[containerColor]}
              language={newLanguage || language}
            />
          )}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

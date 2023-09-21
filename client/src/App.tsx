import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import About from "./components/About";
import FavCards from "./components/FavCards";
import MyCards from "./components/MyCards";
import Sandbox from "./components/Sandbox";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import NewCard from "./components/NewCard";
import CardDetails from "./components/CardDetails";
import { LoadScript } from "@react-google-maps/api";
import Footer from "./components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

const themes = {
  light: "",
  dark: "-dark",
};

export const SiteTheme = createContext(themes.light);

function App() {
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false, role: false, userId: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );
  const [darkMode, setDarkMode] = useState<boolean>(false);
  

  // useEffect(() => {
  //   /* global google */
  //   (google as any).accounts.id.initialize({
  //   client_id: "564579423374-e4eqlsfokhl6l18hpthpsdi5tfl2a9ha.apps.googleusercontent.com",
  //   callback : handle
  //   });
    
  // }, []);
  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <SiteTheme.Provider value={darkMode ? themes.dark : themes.light}>
        
<GoogleOAuthProvider clientId={`${process.env.REACT_APP_API_GOOGLE_CLIENT_ID}`} >
        <ToastContainer theme={`${darkMode ? "dark" : "light"}`} />
        <LoadScript
          googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}
        >
          <Router>
            <NavBar
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            <Routes>
              <Route path="/" element={<Home userInfo={userInfo} />} />
              <Route
                path="/login"
                element={
                  <Login userInfo={userInfo} setUserInfo={setUserInfo} />
                }
              />
              <Route
                path="/register"
                element={
                  <Register userInfo={userInfo} setUserInfo={setUserInfo} />
                }
              />
              <Route
                path="/addnewCard"
                element={<NewCard userInfo={userInfo} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/cards/:cardId" element={<CardDetails />} />
              <Route
                path="/favcards"
                element={<FavCards userInfo={userInfo} />}
              />
              <Route
                path="/mycards"
                element={<MyCards userInfo={userInfo} />}
              />
              <Route path="sandbox" element={<Sandbox userInfo={userInfo} />} />
              <Route
                path="/profile"
                element={<Profile userInfo={userInfo} />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer userInfo={userInfo} />
          </Router>
        </LoadScript>
        </GoogleOAuthProvider>;
      </SiteTheme.Provider>
    </div>
  );
}

export default App;

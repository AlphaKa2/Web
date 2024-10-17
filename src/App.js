import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup"; // <- 여기에 추가
import SignupTerms from "./components/SignupTerms";
import SignupEmailVerification from "./components/SignupEmailVerification";
import SignupInfo from "./components/SignupInfo";
import PasswordReset from "./components/PasswordReset";
import TravelPlan from "./components/TravelPlan";
import MBTITravel from "./components/MBTITravel";
import BlogPosts from "./components/BlogPosts";
import Misc from "./components/Misc";
import BalanceGame from "./components/BalanceGame";
import MBTIResult from "./components/MBTIResult";
import BlogPost from "./components/BlogPost";
import Footer from "./components/Footer";
import PostsPage from "./components/PostsPage";
import CreatePlan from "./components/CreatePlan";
import CreatePlan2 from "./components/CreatePlan2";
import ItineraryPage from './components/ItineraryPage';
import ProfilePage from "./components/ProfilePage";
import MyTripList from "./components/MyTripList";
import "./App.css";

function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
}

function Layout({ isLoggedIn, onLogout, children }) {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/signup-terms" ||
    location.pathname === "/signup-email" ||
    location.pathname === "/signup-info" ||
    location.pathname === "/password-reset";

  return (
    <div className="app-container">
      {!hideHeaderFooter && <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />}
      <main className="content">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup-terms" element={<SignupTerms />} />
          <Route path="/signup-email" element={<SignupEmailVerification />} />
          <Route path="/signup-info" element={<SignupInfo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/profile-page" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/travel-plan" element={<PrivateRoute><TravelPlan /></PrivateRoute>} />
          <Route path="/mbti-travel" element={<PrivateRoute><MBTITravel /></PrivateRoute>} />
          <Route path="/blog-posts" element={<PrivateRoute><BlogPosts /></PrivateRoute>} />
          <Route path="/posts-page" element={<PrivateRoute><PostsPage /></PrivateRoute>} />
          <Route path="/create-plan" element={<PrivateRoute><CreatePlan /></PrivateRoute>} />
          <Route path="/create-plan2" element={<PrivateRoute><CreatePlan2 /></PrivateRoute>} />
          <Route path="/itinerary" element={<PrivateRoute><ItineraryPage /></PrivateRoute>} />
          <Route path="/my-trip-list" element={<PrivateRoute><MyTripList /></PrivateRoute>} />
          <Route path="/misc" element={<Misc />} />
          <Route path="/balance-game" element={<BalanceGame />} />
          <Route path="/mbti-result" element={<MBTIResult />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

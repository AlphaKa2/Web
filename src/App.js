import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SignupTerms from "./components/SignupTerms"; // 약관 동의 페이지 추가
import SignupEmailVerification from "./components/SignupEmailVerification"; // 이메일 인증 페이지 추가
import SignupInfo from "./components/SignupInfo"; // 정보 입력 페이지 추가
import PasswordReset from "./components/PasswordReset"; // 비밀번호 찾기 페이지 추가
import TravelPlan from "./components/TravelPlan";
import MBTITravel from "./components/MBTITravel";
import Profile from "./components/Profile";
import BlogPosts from "./components/BlogPosts";
import Misc from "./components/Misc";
import BalanceGame from "./components/BalanceGame"; // BalanceGame 컴포넌트 추가
import MBTIResult from "./components/MBTIResult";
import BlogPost from "./components/BlogPost"; // 블로그 포스트 컴포넌트 추가
import Footer from "./components/Footer"; // 푸터 컴포넌트 추가
import StepProgress from "./components/StepProgress";
import PostsPage from './components/PostsPage';
import './App.css'; // App 스타일 가져오기

// PrivateRoute 컴포넌트: 로그인된 사용자만 접근할 수 있는 페이지 보호
function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
}

// 헤더와 푸터를 제외할 경로를 관리하는 함수
function Layout({ children }) {
  const location = useLocation();

  // 로그인, 회원가입, 비밀번호 찾기 경로에서만 헤더와 푸터를 숨김
  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/signup-terms" ||
    location.pathname === "/signup-email" ||
    location.pathname === "/signup-info" ||
    location.pathname === "/password-reset";

  return (
    <div className="app-container">
      {!hideHeaderFooter && <Header />} {/* 헤더 숨기기 */}
      <main className="content">{children}</main>
      {!hideHeaderFooter && <Footer />} {/* 푸터 숨기기 */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-terms" element={<SignupTerms />} /> {/* 약관 동의 경로 추가 */}
          <Route path="/signup-email" element={<SignupEmailVerification />} /> {/* 이메일 인증 경로 추가 */}
          <Route path="/signup-info" element={<SignupInfo />} /> {/* 정보 입력 경로 추가 */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/password-reset" element={<PasswordReset />} /> {/* 비밀번호 찾기 경로 추가 */}

          {/* PrivateRoute로 보호된 경로 */}
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/travel-plan" element={<PrivateRoute><TravelPlan /></PrivateRoute>} />
          <Route path="/mbti-travel" element={<PrivateRoute><MBTITravel /></PrivateRoute>} />
          <Route path="/blog-posts" element={<PrivateRoute><BlogPosts /></PrivateRoute>} />
          <Route path="/posts-page" element={<PrivateRoute><PostsPage /></PrivateRoute>} />

          {/* 공개된 경로 */}
          <Route path="/misc" element={<Misc />} />

          {/* Balance Game 관련 경로 */}
          <Route path="/balance-game" element={<BalanceGame />} />
          <Route path="/mbti-result" element={<MBTIResult />} />

          {/* 블로그 글 페이지로 이동할 수 있는 경로 */}
          <Route path="/blog/:id" element={<BlogPost />} /> {/* 동적 경로 추가 */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

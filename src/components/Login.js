import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // 스타일 파일
import GoogleImage from "../assets/images/google.png";
import KakaoImage from "../assets/images/kakao.jpg";
import NaverImage from "../assets/images/naver.png";
import axios from "axios"; // axios 추가

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    // 로그인 로직
    if (username === "test" && password === "1234") {
      localStorage.setItem("user", username); // 유저 정보를 로컬 스토리지에 저장
      onLoginSuccess(); // 로그인 성공 시 상위 컴포넌트 상태 업데이트
      navigate("/"); // 로그인 성공 후 홈 페이지로 이동
    } else {
      alert("로그인 정보가 올바르지 않습니다.");
    }
  };

  const handleSignupRedirect = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    navigate("/signup-terms"); // 회원가입 페이지로 이동
  };

  const handlePasswordResetRedirect = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    navigate("/password-reset"); // 비밀번호 찾기 페이지로 이동
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(
        "http://your-backend-url/auth-service/oauth2/authorization/google",
        {
          withCredentials: true, // 쿠키 처리를 위해 설정
        }
      );
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken); // accessToken을 로컬 스토리지에 저장
      onLoginSuccess(); // 로그인 성공 상태 업데이트
      navigate("/"); // 홈 페이지로 이동
    } catch (error) {
      console.error("Google login error:", error);
      alert("구글 로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-section" />
      <div className="login-form-section">
        <form className="login-form">
          <h1>온길</h1>
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" onClick={handlePasswordResetRedirect}>
            비밀번호 찾기
          </a>
          <button onClick={handleLogin}>로그인</button>
          <div className="or-text">Or</div>
          <div className="social-login-buttons">
            <button onClick={handleGoogleLogin}>
              <img src={GoogleImage} alt="Google" />
              Google
            </button>
            <button>
              <img src={KakaoImage} alt="Kakao" />
              Kakao
            </button>
            <button>
              <img src={NaverImage} alt="Naver" />
              Naver
            </button>
          </div>
          <div className="signup-link">
            <p>아직 계정이 없으신가요?</p>
            <button onClick={handleSignupRedirect}>회원가입</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

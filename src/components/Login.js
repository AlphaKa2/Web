import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // 스타일 파일
import GoogleImage from "../assets/images/google.png";
import KakaoImage from "../assets/images/kakao.jpg";
import NaverImage from "../assets/images/naver.png";
import axios from "../axios"; // 공통 axios 인스턴스 불러오기

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 일반 로그인 핸들러 (관리자 빠른 로그인 포함)
  const handleLogin = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 관리자의 빠른 로그인 (test/1234)
    if (email === "test" && password === "1234") {
      localStorage.setItem("accessToken", "admin-access-token"); // 임시 토큰 설정
      alert("관리자 빠른 로그인이 완료되었습니다.");
      onLoginSuccess(); // 로그인 성공 시 상위 컴포넌트 상태 업데이트
      navigate("/"); // 홈 페이지로 이동
      return;
    }

    try {
      // 일반 사용자 로그인
      const response = await axios.post("/auth-service/login", {
        email,
        password,
      });

      // 로그인 성공 시, 액세스 토큰 저장 및 페이지 이동
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken); // Access Token을 로컬 스토리지에 저장
        onLoginSuccess(); // 로그인 성공 시 상위 컴포넌트 상태 업데이트
        navigate("/"); // 홈 페이지로 이동
      } else {
        alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  // 회원가입 페이지로 이동
  const handleSignupRedirect = (e) => {
    e.preventDefault();
    navigate("/signup-terms");
  };

  // 비밀번호 찾기 페이지로 이동
  const handlePasswordResetRedirect = (e) => {
    e.preventDefault();
    navigate("/password-reset");
  };

  // Google 소셜 로그인 핸들러
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(
        "/auth-service/oauth2/authorization/google",
        {
          withCredentials: true, // 쿠키 처리를 위해 설정
        }
      );
      const { accessToken } = response.data;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken); // Access Token 저장
        onLoginSuccess(); // 로그인 성공 상태 업데이트
        navigate("/"); // 홈 페이지로 이동
      }
    } catch (error) {
      console.error("Google 로그인 오류:", error);
      alert("구글 로그인에 실패했습니다. 다시 시도해 주세요.");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            <button disabled>
              <img src={KakaoImage} alt="Kakao" />
              Kakao (미구현)
            </button>
            <button disabled>
              <img src={NaverImage} alt="Naver" />
              Naver (미구현)
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
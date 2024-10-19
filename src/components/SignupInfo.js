import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";  // useLocation 추가
import axios from "../axios";  // axios 인스턴스 불러오기

function SignupInfo() {
  const location = useLocation();  // 회원가입1 페이지에서 전달된 데이터를 받기 위한 useLocation 사용
  const { name, phone } = location.state || {};  // 회원가입1 페이지에서 전달된 이름과 전화번호 받기

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const navigate = useNavigate();

  // 회원가입 완료 시, 백엔드로 모든 데이터 전송
  const handleSignupComplete = async () => {
    if (!email || !password || password !== passwordCheck || !nickname || !birthDate || !gender) {
      alert("모든 정보를 정확하게 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post("/user-service/users/join", {
        email,
        password,
        nickname,
        birth: birthDate,
        gender: gender.toUpperCase(),
        name,  // 회원가입1 페이지에서 받은 이름
        phoneNumber: phone  // 회원가입1 페이지에서 받은 전화번호
      });

      if (response.data.code === 201) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      if (error.response) {
        alert(error.response.data.message || "회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  // 닉네임 중복 확인
  const checkNicknameAvailability = async () => {
    try {
      const response = await axios.get(`/user-service/users/${nickname}/exist`);
      setIsNicknameAvailable(!response.data.data);
      if (response.data.data) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
      alert("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  // 생년월일 형식 변경
  const handleBirthDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length >= 4) value = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 7) value = value.slice(0, 7) + "-" + value.slice(7, 10);
    setBirthDate(value);
  };

  const handleCancelSignup = () => {
    navigate("/login");  // 회원가입 취소 시 로그인 페이지로 이동
  };

  return (
    <div className="signup-info-container">
      <h1>회원가입2 - 나머지 정보 입력</h1>
      <form className="signup-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <button type="button" onClick={checkNicknameAvailability}>닉네임 중복 확인</button>
          {isNicknameAvailable === false && <span className="error">이미 사용 중인 닉네임입니다.</span>}
        </div>
        
        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="생년월일 (yyyy-mm-dd)"
            value={birthDate}
            onChange={handleBirthDateChange}
            maxLength="10"
            required
          />
        </div>

        <div className="gender-selection">
          <button
            type="button"
            className={gender === "female" ? "selected" : ""}
            onClick={() => setGender("female")}
          >
            ♀
          </button>
          <button
            type="button"
            className={gender === "male" ? "selected" : ""}
            onClick={() => setGender("male")}
          >
            ♂
          </button>
        </div>

        <div className="button-container">
          <button type="button" className="signup-complete" onClick={handleSignupComplete}>
            회원가입 완료
          </button>
          <button type="button" className="signup-cancel" onClick={handleCancelSignup}>
            회원가입 취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupInfo;

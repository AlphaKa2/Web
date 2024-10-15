import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupInfo.css";
import StepProgress from "./StepProgress"; // StepProgress 컴포넌트 불러오기

function SignupInfo() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  const handleSignupComplete = () => {
    if (email && password === passwordCheck && nickname && birthDate && gender) {
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } else {
      alert("모든 정보를 정확하게 입력해 주세요.");
    }
  };

  const handleCancelSignup = () => {
    navigate("/login");
  };

  const handleBirthDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length >= 4) value = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 7) value = value.slice(0, 7) + "-" + value.slice(7, 10);
    setBirthDate(value);
  };

  return (
    <div className="signup-info-container">
      {/* Step Progress */}
      <StepProgress currentStep={3} />

      <form className="signup-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text" // 비밀번호가 보이도록 변경
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text" // 비밀번호 확인도 보이도록 변경
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="생년월일 (yyyy-mm-dd)"
            value={birthDate}
            onChange={handleBirthDateChange}
            maxLength="10"
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

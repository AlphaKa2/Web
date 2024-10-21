import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios"; // axios 파일 경로에 맞게 설정
import "./SignupInfo.css";
import StepProgress from "./StepProgress";

function SignupInfo() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false); // 닉네임 중복 체크 여부
  const [isEmailAvailable, setIsEmailAvailable] = useState(null); // 이메일 중복 확인 상태 추가

  // 이메일 중복 확인 로직
  const checkEmailAvailability = async () => {
    try {
      const response = await axios.get(`/user-service/users/email-check?email=${email}`);
      setIsEmailAvailable(response.data.data); // 백엔드에서 이메일 중복 여부 확인
      if (response.data.data) {
        alert("사용 가능한 이메일입니다.");
      } else {
        alert("이미 사용 중인 이메일입니다.");
      }
    } catch (error) {
      console.error("이메일 중복 확인 오류:", error);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복 확인 로직
  const checkNicknameAvailability = async () => {
    try {
      const response = await axios.get(`/user-service/users/${nickname}/exist`);
      if (response.status === 200) {
        setIsNicknameAvailable(true); // 중복되지 않으면 true
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setIsNicknameAvailable(false); // 중복된 닉네임일 경우 false
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        console.error("닉네임 중복 확인 오류:", error);
        alert("닉네임 확인 중 오류가 발생했습니다.");
      }
    }
  };

  // 회원가입 완료 버튼 클릭 시 로직
  const handleSignupComplete = async () => {
    // 모든 입력값이 확인되었는지, 비밀번호가 일치하는지, 그리고 닉네임 중복 체크가 되었는지 확인
    if (!email || !password || password !== passwordCheck || !nickname || !birthDate || !gender) {
      alert("모든 정보를 정확하게 입력해 주세요.");
      return;
    }

    // 닉네임 중복 체크가 완료되지 않았거나 중복일 경우
    if (!isNicknameAvailable) {
      alert("닉네임 중복 체크를 완료해 주세요.");
      return;
    }

    try {
      const response = await axios.post("/user-service/users/join", {
        email,
        password,
        nickname,
        birth: birthDate,
        gender: gender.toUpperCase(), // 'male' 또는 'female'을 'MALE' 및 'FEMALE'로 변환
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

  // 생년월일 형식 변경 로직
  const handleBirthDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length >= 4) value = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 7) value = value.slice(0, 7) + "-" + value.slice(7, 10);
    setBirthDate(value);
  };

  const handleCancelSignup = () => {
    navigate("/login");
  };

  return (
    <div className="signup-info-container">
      <StepProgress currentStep={3} />

      <form className="signup-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="button" onClick={checkEmailAvailability}>이메일 중복 확인</button>
          {isEmailAvailable === false && <span className="error">이미 사용 중인 이메일입니다.</span>}
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

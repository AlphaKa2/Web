import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import axios from "../axios";
import "./SignupInfo.css";
import StepProgress from "./StepProgress";

function SignupInfo() {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation으로 이전 페이지의 데이터를 가져옴
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");

  // useEffect를 사용해 location.state에서 넘어온 값(name과 phone)을 상태에 저장
  useEffect(() => {
    if (location.state) {
      setName(location.state.name);
      setPhone(location.state.phoneNumber);
    }
  }, [location.state]);

  // 이메일 중복 확인 로직
  const checkEmailAvailability = async () => {
    try {
      const response = await axios.get(`/user-service/users/email/${email}/exist`);
      setIsEmailAvailable(response.data.data);
      if (response.data.data) {
        alert("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setIsNicknameAvailable(false);
        alert("이미 사용 중인 이메일입니다.");
        return;
      }
      console.error("서버 오류", error);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복 확인 로직
  const checkNicknameAvailability = async () => {
    try {
      const response = await axios.get(`/user-service/users/nickname/${nickname}/exist`);
      if (response.data.data === true) {
        setIsNicknameAvailable(true);
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setIsNicknameAvailable(false);
        alert("이미 사용 중인 닉네임입니다.");
        return;
      }
      console.error(" 서버 오류:", error);
      alert("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  // 회원가입 완료 버튼 클릭 시 로직
  const handleSignupComplete = async () => {
    if (!email || !password || password !== passwordCheck || !nickname || !birthDate || !gender || !phoneNumber) {
      console.log("입력 값 확인:");
      console.log("이메일:", email);
      console.log("비밀번호:", password);
      console.log("비밀번호 확인:", passwordCheck);
      console.log("닉네임:", nickname);
      console.log("생년월일:", birthDate);
      console.log("성별:", gender);
      console.log("전화번호:", phoneNumber);
      
      alert("모든 정보를 정확하게 입력해 주세요.");
      return;
    }

    if (!isNicknameAvailable) {
      alert("닉네임 중복 체크를 완료해 주세요.");
      return;
    }

    try {
      const response = await axios.post("/user-service/users/join", {
        email,
        password,
        nickname,
        name,
        phoneNumber,
        birth: birthDate,
        gender: gender.toUpperCase(),
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
    let value = e.target.value.replace(/[^0-9]/g, "");
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
          <button type="button" onClick={checkEmailAvailability}>
            이메일 중복 확인
          </button>
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
          <button type="button" onClick={checkNicknameAvailability}>
            닉네임 중복 확인
          </button>
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

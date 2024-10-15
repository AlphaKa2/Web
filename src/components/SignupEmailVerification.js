import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupEmailVerification.css"; // CSS 파일을 새로 생성
import StepProgress from "./StepProgress"; // StepProgress 컴포넌트 불러오기

function SignupEmailVerification() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendVerificationCode = () => {
    if (phone) {
      setCodeSent(true);
      alert("인증 번호가 전송되었습니다.");
    } else {
      alert("전화번호를 입력하세요.");
    }
  };

  const handleVerifyCode = () => {
    if (code === "1234") {
      alert("인증이 완료되었습니다.");
      setIsVerified(true);
    } else {
      alert("인증 코드가 올바르지 않습니다.");
    }
  };

  const handleContinue = () => {
    if (!name) {
      alert("이름을 입력하세요.");
      return;
    }
    if (!phone) {
      alert("전화번호를 입력하세요.");
      return;
    }
    if (!isVerified) {
      alert("전화번호 인증을 완료해 주세요.");
      return;
    }
    navigate("/signup-info");
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <div className="signup-email-verification-container">
      {/* Step Progress */}
      <StepProgress currentStep={2} />

      <div className="verification-form">
        <div className="input-group name-group"> {/* 이름 인풋만 독립적 컨테이너 */}
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="전화번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button className="send-code-btn" onClick={handleSendVerificationCode} disabled={codeSent}>
            인증 번호 전송
          </button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="인증 코드 입력"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="verify-btn" onClick={handleVerifyCode} disabled={isVerified}>
            인증
          </button>
        </div>
      </div>

      <div className="signup-actions">
        <button className="continue-btn2" onClick={handleContinue}>
          회원가입 진행
        </button>
        <button className="cancel-btn2" onClick={handleCancel}>
          회원가입 취소
        </button>
      </div>
    </div>
  );
}

export default SignupEmailVerification;

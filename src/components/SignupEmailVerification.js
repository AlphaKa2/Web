import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupEmailVerification.css";
import StepProgress from "./StepProgress";

function SignupEmailVerification() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendVerificationCode = async () => {
    if (phone) {
      try {
        const response = await axios.post("http://backend-server-url/auth-service/sms/authentication", {
          phoneNumber: phone,
        });
        if (response.data.status === 200) {
          setCodeSent(true);
          alert("인증 번호가 전송되었습니다.");
        }
      } catch (error) {
        console.error("SMS 인증번호 전송 오류:", error);
        alert("인증 번호 전송에 실패했습니다. 다시 시도해 주세요.");
      }
    } else {
      alert("전화번호를 입력하세요.");
    }
  };

  const handleVerifyCode = async () => {
    if (code) {
      try {
        const response = await axios.post("http://backend-server-url/auth-service/sms/verification", {
          phoneNumber: phone,
          authenticationCode: code,
        });
        if (response.data.status === 202) {
          alert("인증이 완료되었습니다.");
          setIsVerified(true);
        } else {
          alert("인증 코드가 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("인증 코드 검증 오류:", error);
        alert("인증 코드 확인에 실패했습니다. 다시 시도해 주세요.");
      }
    } else {
      alert("인증 코드를 입력하세요.");
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
      <StepProgress currentStep={2} />

      <div className="verification-form">
        <div className="input-group name-group">
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

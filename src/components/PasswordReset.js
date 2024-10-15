import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordReset.css";

function PasswordReset() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = () => {
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

  const handleResetPassword = () => {
    if (!isVerified) {
      alert("먼저 전화번호 인증을 완료해 주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (newPassword && confirmPassword) {
      alert("비밀번호가 재설정되었습니다!");
      navigate("/login"); // 비밀번호 재설정 후 로그인 페이지로 이동
    } else {
      alert("새 비밀번호를 입력해 주세요.");
    }
  };

  return (
    <div className="password-reset-container">
      <h2>비밀번호 찾기</h2>
      <p>가입 당시 사용한 전화번호를 통해 인증 후 새로운 비밀번호를 설정해 주세요.</p>

      <div className="verification-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="전화번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="send-code-btn" onClick={handleSendCode} disabled={codeSent}>
            인증 번호 전송
          </button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="인증 코드"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="verify-btn" onClick={handleVerifyCode} disabled={isVerified}>
            인증
          </button>
        </div>
      </div>

      <hr />

      <div className="reset-password-form">
        <div className="input-group">
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="reset-btn" onClick={handleResetPassword}>
            비밀번호 재설정
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupTerms.css'; // CSS 파일 따로 구성
import StepProgress from './StepProgress'; // StepProgress 컴포넌트 불러오기

function SignupTerms() {
  const navigate = useNavigate();
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const handleTermsChange = (e) => {
    setTermsAgreed(e.target.checked);
  };

  const handlePrivacyChange = (e) => {
    setPrivacyAgreed(e.target.checked);
  };

  const handleSignupProgress = () => {
    if (termsAgreed && privacyAgreed) {
      navigate('/signup-email'); // 다음 단계로 이동
    } else {
      alert('모든 약관에 동의해야 회원가입을 진행할 수 있습니다.');
    }
  };

  const handleCancel = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <div className="signup-terms-container">
      {/* Step Progress */}
      <StepProgress currentStep={1} />

      <h2> </h2>

      {/* Terms and Conditions */}
      <div className="terms-section">
        <h3>이용약관 (필수)</h3>
        <textarea
          readOnly
          value={`제 1 조 목적
본 약관은 회원이 온길(이하 '회사')가 제공하는 모든 서비스(이하 '서비스')를 이용함에 있어, 회원과 회사 간의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.

제 2 조 (약정의 의사와 개정)
1. '서비스'의 제공과 관련한 정보의 수집, 저장, 처리 및 이용에 대한 동의를 포함합니다.
2. 회사는 필요 시 약관을 개정할 수 있습니다.`}
        ></textarea>
        <div className="terms-agreement">
          <input type="checkbox" onChange={handleTermsChange} />
          <span>동의합니다</span>
        </div>
      </div>

      {/* Privacy Agreement */}
      <div className="terms-section">
        <h3>개인정보 수집 및 이용에 대한 동의 (필수)</h3>
        <textarea
          readOnly
          value={`1. 수집하는 개인정보 항목
회사는 회원가입, 원활한 고객 상담 및 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다. 
- 이름, 이메일, 연락처, 비밀번호 등.

2. 수집한 개인정보 이용 목적
회사는 회원이 제공한 정보를 바탕으로 최적의 서비스를 제공합니다.`}
        ></textarea>
        <div className="terms-agreement">
          <input type="checkbox" onChange={handlePrivacyChange} />
          <span>동의합니다</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="button-container1">
        <button className="progress-btn1" onClick={handleSignupProgress}>
          회원가입 진행
        </button>
        <button className="cancel-btn1" onClick={handleCancel}>
          회원가입 취소
        </button>
      </div>
    </div>
  );
}

export default SignupTerms;

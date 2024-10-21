import React from "react";
import "./StepProgress.css";

function StepProgress({ currentStep }) {
  return (
    <div className="step-progress-container">
      <div className="step-container">
        <div className={`step ${currentStep >= 1 ? "completed" : ""}`}>1</div>
        <h3 className="step-label">약관 동의</h3>
      </div>
      <div className={`step-line ${currentStep >= 2 ? "completed" : ""}`}></div>
      <div className="step-container">
        <div className={`step ${currentStep >= 2 ? "completed" : ""}`}>2</div>
        <h3 className="step-label">본인 인증</h3>
      </div>
      <div className={`step-line ${currentStep >= 3 ? "completed" : ""}`}></div>
      <div className="step-container">
        <div className={`step ${currentStep >= 3 ? "completed" : ""}`}>3</div>
        <h3 className="step-label">정보 입력</h3>
      </div>
    </div>
  );
}

export default StepProgress;

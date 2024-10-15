// src/components/MBTIResult.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MBTITypes from '../data/MBTItype'; // 16가지 MBTI 타입 정보 불러오기
import './MBTIResult.css';

import shareImage from '../assets/images/share1.png';

function MBTIResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const { resultMBTI } = location.state; // 전달된 MBTI 결과값 가져오기

    const mbtiData = MBTITypes[resultMBTI] || {}; // 결과에 맞는 MBTI 데이터 가져오기

    const handleConfirm = () => {
        navigate('/');
    };

    useEffect(() => {
        const confettiContainer = document.querySelector('.confetti');
        confettiContainer.innerHTML = '';
        
        for (let i = 0; i < 150; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.classList.add('confetti-piece');
            confettiPiece.style.left = `${Math.random() * 100}%`;
            confettiPiece.style.animationDelay = `${Math.random() * 3}s`;
            confettiContainer.appendChild(confettiPiece);
        }
    }, []);

    return (
        <div className="mbti-result-container">
            <div className="confetti"></div>
            <div className="result-card">
                <img 
                    src={mbtiData.image} 
                    alt="결과 이미지" 
                    className="result-image"
                />
                <h1 className="result-title">{resultMBTI}</h1>
                <h3 className="result-subtitle">({mbtiData.title})</h3>
                <p className="result-description">{mbtiData.description}</p>
                <button className="confirm-button" onClick={handleConfirm}>
                    확인
                </button>
                <button className="share-button" onClick={handleConfirm}>
                    <img src={shareImage} alt="공유" />
                </button>
            </div>
        </div>
    );
}

export default MBTIResult;

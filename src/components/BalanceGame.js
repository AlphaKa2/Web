// src/components/BalanceGame.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions';
import QuestionComponent from './QuestionComponent';
import './BalanceGame.css';

function BalanceGame() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selections, setSelections] = useState([]);
    const [scoreCounts, setScoreCounts] = useState({ A: 0, R: 0, B: 0, C: 0, L: 0, S: 0, J: 0, P: 0 });
    const navigate = useNavigate();

    const handleOptionSelect = (selectedOption) => {
        const score = selectedOption.score;
        const newCounts = { ...scoreCounts };

        // 구간별 점수 카운트
        if (currentQuestionIndex >= 0 && currentQuestionIndex <= 4) newCounts[score] += 1;
        if (currentQuestionIndex >= 5 && currentQuestionIndex <= 9) newCounts[score] += 1;
        if (currentQuestionIndex >= 10 && currentQuestionIndex <= 14) newCounts[score] += 1;
        if (currentQuestionIndex >= 15 && currentQuestionIndex <= 19) newCounts[score] += 1;

        setScoreCounts(newCounts);
        setSelections([...selections, selectedOption]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            // 모든 질문 완료 후 결과 페이지로 이동
            const resultMBTI = determineMBTI(newCounts);
            navigate('/mbti-result', { state: { selections, resultMBTI } });
        }
    };

    const determineMBTI = (counts) => {
        const mbti = [
            counts.A >= counts.R ? 'A' : 'R',
            counts.B >= counts.C ? 'B' : 'C',
            counts.L >= counts.S ? 'L' : 'S',
            counts.J >= counts.P ? 'J' : 'P',
        ];
        return mbti.join('');
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            setSelections((prevSelections) => prevSelections.slice(0, -1)); // 마지막 선택 제거
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="balance-game-container">
            <button 
                className="previous-button" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0} // 첫 번째 질문에서는 비활성화
            >
                이전
            </button>
            <QuestionComponent 
                question={currentQuestion.question} 
                options={currentQuestion.options} 
                questionNumber={currentQuestionIndex + 1} 
                totalQuestions={questions.length} 
                onOptionSelect={handleOptionSelect} 
            />
            <div className="vs-text">V  S</div>
        </div>
    );
}

export default BalanceGame;

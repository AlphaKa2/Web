// src/components/QuestionComponent.js
import React from 'react';
import './QuestionComponent.css';

function QuestionComponent({ question, options, questionNumber, totalQuestions, onOptionSelect }) {
    return (
        <div className="question-container">
            <div className="question-header">
                <span className="question-number">{questionNumber}/{totalQuestions}</span>
                <p className="question-text">{question}</p>
            </div>
            <div className="options-container">
                {options.map((option, index) => (
                    <div key={index} className="option-card" onClick={() => onOptionSelect(option)}>
                        <img src={option.image} alt={`Option ${index + 1}`} />
                        <div className="option-text">{option.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestionComponent;

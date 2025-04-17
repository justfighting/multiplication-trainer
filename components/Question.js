// components/Question.js
'use client';
import React, { useState } from 'react';

export default function Question({ num1, num2, onAnswer }) {
  const [userInput, setUserInput] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userInput.trim() === '') {
      setShowError(true);
      return;
    }
    
    const answer = parseInt(userInput, 10);
    onAnswer(answer);
    setUserInput('');
    setShowError(false);
  };

  return (
    <div className="question-container">
      <div className="question">
        <span className="number">{num1}</span>
        <span className="operator">×</span>
        <span className="number">{num2}</span>
        <span className="equals">=</span>
        <span className="answer">?</span>
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Введите ответ"
          autoFocus
        />
        {showError && <div className="error">Пожалуйста, введите ответ</div>}
        <button type="submit">Ответить</button>
      </form>
    </div>
  );
}

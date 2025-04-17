// components/ResultCard.js
import React from 'react';

export default function ResultCard({ score, total, time, answers, difficulty }) {
  const percentage = Math.round((score / total) * 100);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  // Определение рейтинга
  let rating;
  if (percentage >= 90) rating = 'A+';
  else if (percentage >= 80) rating = 'A';
  else if (percentage >= 70) rating = 'B';
  else if (percentage >= 60) rating = 'C';
  else if (percentage >= 50) rating = 'D';
  else rating = 'F';
  
  return (
    <div className="result-card">
      <div className="score-container">
        <div className="score-circle">
          <div className="percentage">{percentage}%</div>
          <div className="rating">{rating}</div>
        </div>
        <div className="score-details">
          <p>Правильных ответов: <span>{score} из {total}</span></p>
          <p>Время: <span>{minutes}:{seconds.toString().padStart(2, '0')}</span></p>
          <p>Уровень: <span>{
            difficulty === 'easy' ? 'Легкий' : 
            difficulty === 'medium' ? 'Средний' : 'Сложный'
          }</span></p>
        </div>
      </div>
      
      <div className="answers-container">
        <h3>Ваши ответы:</h3>
        <div className="answers-list">
          {answers.map((item, index) => (
            <div 
              key={index} 
              className={`answer-item ${item.isCorrect ? 'correct' : 'incorrect'}`}
            >
              <span className="question-text">{item.question} = </span>
              <span className="user-answer">{item.userAnswer}</span>
              {!item.isCorrect && (
                <span className="correct-answer">
                  (правильно: {item.correctAnswer})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

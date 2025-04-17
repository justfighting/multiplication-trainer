// components/Question.js
'use client';
import React, { useEffect, useState } from 'react';

export default function Question({ num1, num2, onAnswer }) {
  const correctAnswer = num1 * num2;
  const [options, setOptions] = useState([]);
  
  // Генерация вариантов ответов
  useEffect(() => {
    // Создаем массив с правильным ответом
    let newOptions = [correctAnswer];
    
    // Функция для генерации случайного неправильного ответа
    const generateWrongAnswer = () => {
      // Определим границы для неправильных ответов
      const min = Math.max(1, correctAnswer - 10);
      const max = correctAnswer + 10;
      let wrongAnswer;
      
      do {
        // Генерируем случайное число около правильного ответа
        wrongAnswer = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (
        wrongAnswer === correctAnswer || // Не должно совпадать с правильным
        newOptions.includes(wrongAnswer)  // Не должно повторяться
      );
      
      return wrongAnswer;
    };
    
    // Добавляем 5 неправильных вариантов
    for (let i = 0; i < 5; i++) {
      newOptions.push(generateWrongAnswer());
    }
    
    // Перемешиваем массив для случайного порядка вариантов
    newOptions = newOptions.sort(() => Math.random() - 0.5);
    
    setOptions(newOptions);
  }, [num1, num2, correctAnswer]);
  
  // Обработка выбора ответа
  const handleOptionClick = (selectedAnswer) => {
    onAnswer(selectedAnswer);
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
      
      <div className="answer-options">
        {options.map((option, index) => (
          <button 
            key={index} 
            className="answer-option"
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

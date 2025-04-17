// components/Question.js
'use client';
import React, { useEffect, useState } from 'react';

export default function Question({ num1, num2, onAnswer, isUndeadMode }) {
  const correctAnswer = num1 * num2;
  const [options, setOptions] = useState([]);
  
  // Генерация вариантов ответов
  useEffect(() => {
    // Создаем массив с правильным ответом
    let newOptions = [correctAnswer];
    
    // Функция для генерации случайного неправильного ответа
    const generateWrongAnswer = () => {
      // Определим границы для неправильных ответов, более сложные для режима UnDead
      const min = Math.max(1, correctAnswer - (isUndeadMode ? 5 : 10));
      const max = correctAnswer + (isUndeadMode ? 5 : 10);
      let wrongAnswer;
      
      // Для режима UnDead добавляем "коварные" ответы, которые близки к правильному
      if (isUndeadMode) {
        // С некоторой вероятностью генерируем "коварный" ответ
        const trickyTypes = [
          () => correctAnswer + 1,  // На 1 больше
          () => correctAnswer - 1,  // На 1 меньше
          () => correctAnswer + 10, // На 10 больше
          () => correctAnswer - 10, // На 10 меньше
          () => num1 + num2,        // Сложение вместо умножения
          () => num1 * (num2 + 1),  // Умножить на число на 1 больше
          () => num1 * (num2 - 1),  // Умножить на число на 1 меньше
          () => (num1 + 1) * num2,  // Умножить число на 1 больше
          () => (num1 - 1) * num2   // Умножить число на 1 меньше
        ];
        
        // 70% вероятность "коварного" ответа в режиме UnDead
        if (Math.random() < 0.7) {
          const trickyFn = trickyTypes[Math.floor(Math.random() * trickyTypes.length)];
          wrongAnswer = trickyFn();
        }
      }
      
      // Если не сгенерирован "коварный" ответ или не режим UnDead, используем случайный
      if (!wrongAnswer) {
        do {
          wrongAnswer = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (
          wrongAnswer === correctAnswer || // Не должно совпадать с правильным
          newOptions.includes(wrongAnswer)  // Не должно повторяться
        );
      }
      
      // Проверка на дубликаты
      if (newOptions.includes(wrongAnswer)) {
        return generateWrongAnswer(); // Рекурсивно пробуем еще раз
      }
      
      return wrongAnswer;
    };
    
    // Добавляем неправильные варианты (5 или 8 в зависимости от режима)
    const optionsCount = isUndeadMode ? 8 : 5;
    for (let i = 0; i < optionsCount; i++) {
      newOptions.push(generateWrongAnswer());
    }
    
    // Перемешиваем массив для случайного порядка вариантов
    newOptions = newOptions.sort(() => Math.random() - 0.5);
    
    setOptions(newOptions);
  }, [num1, num2, correctAnswer, isUndeadMode]);
  
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
      
      <div className={`answer-options ${isUndeadMode ? 'undead-options' : ''}`}>
        {options.map((option, index) => (
          <button 
            key={index} 
            className={`answer-option ${isUndeadMode ? 'undead-option' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

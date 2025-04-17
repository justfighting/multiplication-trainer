// components/MultiplicationTrainer.js
'use client';
import React, { useState, useEffect } from 'react';
import Question from './Question';
import ResultCard from './ResultCard';
import useTimer from '../hooks/useTimer';

const difficultyLevels = {
  easy: { min: 1, max: 5, questions: 10 },
  medium: { min: 1, max: 9, questions: 15 },
  hard: { min: 1, max: 12, questions: 20 }
};

export default function MultiplicationTrainer() {
  const [difficulty, setDifficulty] = useState('easy');
  const [gameState, setGameState] = useState('menu'); // menu, playing, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { time, startTimer, stopTimer, resetTimer } = useTimer();

  // Генерация вопросов
  const generateQuestions = (level) => {
    const { min, max, questions: count } = difficultyLevels[level];
    const newQuestions = [];
    
    for (let i = 0; i < count; i++) {
      const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
      const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
      newQuestions.push({
        num1,
        num2,
        answer: num1 * num2,
        userAnswer: null
      });
    }
    
    return newQuestions;
  };

  // Начало игры
  const startGame = (level) => {
    setDifficulty(level);
    const newQuestions = generateQuestions(level);
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setGameState('playing');
    resetTimer();
    startTimer();
  };

  // Проверка ответа
  const checkAnswer = (answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].userAnswer = answer;
    setQuestions(updatedQuestions);
    
    const isCorrect = answer === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, {
      question: `${questions[currentQuestion].num1} × ${questions[currentQuestion].num2}`,
      correctAnswer: questions[currentQuestion].answer,
      userAnswer: answer,
      isCorrect
    }]);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      stopTimer();
      setGameState('results');
    }
  };

  // Вернуться в меню
  const backToMenu = () => {
    setGameState('menu');
    resetTimer();
  };

  return (
    <div className="multiplication-trainer">
      {gameState === 'menu' && (
        <div className="menu">
          <h1>Тренажёр таблицы умножения</h1>
          <div className="difficulty-selector">
            <h2>Выберите уровень сложности</h2>
            <button onClick={() => startGame('easy')}>Легкий (1-5)</button>
            <button onClick={() => startGame('medium')}>Средний (1-9)</button>
            <button onClick={() => startGame('hard')}>Сложный (1-12)</button>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="game">
          <div className="header">
            <h2>Уровень: {
              difficulty === 'easy' ? 'Легкий' : 
              difficulty === 'medium' ? 'Средний' : 'Сложный'
            }</h2>
            <div className="stats">
              <div className="progress">
                Вопрос {currentQuestion + 1} из {questions.length}
              </div>
              <div className="timer">
                Время: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
          
          <Question 
            num1={questions[currentQuestion].num1} 
            num2={questions[currentQuestion].num2} 
            onAnswer={checkAnswer} 
          />
        </div>
      )}

      {gameState === 'results' && (
        <div className="results">
          <h2>Результаты</h2>
          <ResultCard 
            score={score}
            total={questions.length}
            time={time}
            answers={answers}
            difficulty={difficulty}
          />
          <div className="buttons">
            <button onClick={() => startGame(difficulty)}>Повторить</button>
            <button onClick={backToMenu}>Вернуться в меню</button>
          </div>
        </div>
      )}
    </div>
  );
}

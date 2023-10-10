import React from 'react';

const DifficultyModal = ({ onSelectDifficulty }) => {
  return (
    <div className="modal">
      <h2>Select Difficulty</h2>
      <button onClick={() => onSelectDifficulty('easy')}>Easy</button>
      <button onClick={() => onSelectDifficulty('medium')}>Medium</button>
      <button onClick={() => onSelectDifficulty('hard')}>Hard</button>
    </div>
  );
};

export default DifficultyModal;
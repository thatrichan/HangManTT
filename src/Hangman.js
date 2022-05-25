import { useState } from 'react';
import { randomWord } from './components/words.js';
import React from 'react'; 
import './Hangman.css';
import ReactDOM from 'react-dom';



function Hangman() {
    const [word, setWord] = useState("");
    const generateWord = () => {
       setWord(randomWord());
       alert({word});
      }

  return (
    <div className="Hangman" >
        <button className="single" onClick={generateWord}>1 Player</button>
        <button className="double" onClick={generateWord}>2 Player</button>
    </div>
  );
}

export default Hangman;
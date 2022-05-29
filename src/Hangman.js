import React, {Component} from "react";
// import { useState } from 'react';
import { randomWord } from './components/words.js';
// import './Hangman.css';
// import ReactDOM from 'react-dom';

import step2 from "./images/2.png";
import step3 from "./images/3.png";
import step4 from "./images/4.png";
import step5 from "./images/5.png";
import step6 from "./images/6.png";
import step7 from "./images/7.png";
import step8 from "./images/8.png";


let gameStat;
class Hangman extends Component {
  static defaultProps = {
    maxWrong:6,
    images: [step2, step3, step4, step5, step6, step7, step8],
  }

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set(), 
      answer: randomWord(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.keyPress = this.keyPress.bind(this);
    window.addEventListener("keydown", this.keyPress);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((bingo) => (this.state.guessed.has(bingo) ? bingo : "_"));
  }
  
  handleGuess(value) {
    let letter = value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0: 1), // if guessed value's letter is in answer, then return 0, therefore mistake + 0
    }))
  }

  keyPress(event) {
    /**
     * 8 = backspace
     * 13 = enter
     * 32 = space
     * 65 = A (Capital)
     * 90 = Z (Capital)
     * 97 = a (Small)
     * 122 = z (Small)
     * event.keyCode are ASCII numberings: https://www.asciitable.com
     */ 
     if (gameStat === "YOU WON" || gameStat === "YOU LOST") {
      if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 32) {
        this.resetButton();
      }
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    ) {
      this.handleGuess(event.key);
    } else if (
      event.keyCode === 8 ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      this.resetButton();
    } else {
    }
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        key={letter}
        value={letter}
        onClick={(e) => this.handleGuess(e.target.value)}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  };



  render() {
    //   // const [word, setWord] = useState("");
    //   const {mistake, answer} = this.state;
    //   const {maxWrong, images} = this.props;
    //   // const generateWord = () => {
    //   //   setWord(randomWord());
    //   //   alert({word});
    //   //   }

    // return (
    //   <div className="Hangman" >
    //       <img src={images[mistake]} alt='picture'/>
    //       <button className="single" onClick={() => this.props({mistake:this.props.mistake +1 })}>1 Player</button>
    //       {/* <button className="double" onClick={generateWord}>2 Player</button> */}
    //   </div>
    // );
    const { mistake, answer } = this.state;
    const { maxWrong, images } = this.props;
    const gameOver = mistake >= maxWrong;
    const altText = `${mistake}/${maxWrong} wrong guesses`;
    const isWinner = this.guessedWord().join("") === answer;
    gameStat = this.generateButtons();
    if (isWinner) {
      gameStat = "YOU WON";
    }
    if (gameOver) {
      gameStat = "YOU LOST";
    }

    return (
      <div className="Hangman">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand text-light" href="/">
            Hangman. <small>Do (or) Die</small>
          </a>
          <span className="d-xl-none d-lg-none text-primary">
            Guessed wrong: {mistake}
          </span>
          <button
            className="navbar-toggler sr-only"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            {/* <ul className="navbar-nav mr-auto">
              <li className="nav-item "></li>
              <li className="nav-item"></li>
              <li className="nav-item"></li>
            </ul> */}
            <span className="navbar-text text-primary">
              Guessed wrong: {mistake}
            </span>
          </div>
        </nav>
        <p className="text-center">
          <img src={images[mistake]} alt={altText} />
        </p>
        <p className="text-center text-light">
          What is the word?
        </p>
        <p className="Hangman-word text-center">
          {!gameOver ? this.guessedWord() : answer}{" "}
        </p>

        <p className="text-center text-warning mt-4">{gameStat}</p>

        <div>
          <p className="text-center">
            <button className="Hangman-reset" onClick={this.resetButton}>
              Reset
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Hangman;
import React, {Component} from "react";
// import { useState } from 'react';
import { randomWord } from './components/words.js';
import './Hangman.css';
// import ReactDOM from 'react-dom';

import step2 from "./images/2.png";
import step3 from "./images/3.png";
import step4 from "./images/4.png";
import step5 from "./images/5.png";
import step6 from "./images/6.png";
import step7 from "./images/7.png";
import step8 from "./images/8.png";

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
  }



  render() {
      // const [word, setWord] = useState("");
      const {mistake, answer} = this.state;
      const {maxWrong, images} = this.props;
      // const generateWord = () => {
      //   setWord(randomWord());
      //   alert({word});
      //   }

    return (
      <div className="Hangman" >
          <img src={images[mistake]} alt='picture'/>
          <button className="single" onClick={() => this.props({mistake:this.props.mistake +1 })}>1 Player</button>
          {/* <button className="double" onClick={generateWord}>2 Player</button> */}
      </div>
    );
  }
}

export default Hangman;
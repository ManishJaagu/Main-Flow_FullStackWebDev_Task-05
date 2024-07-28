import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState('0');

  const buttons = [
    { id: "clear", value: "C" },
    { id: "add", value: "+" },
    { id: "subtract", value: "-" },
    { id: "multiply", value: "x" },
    { id: "seven", value: "7" },
    { id: "eight", value: "8" },
    { id: "nine", value: "9" },
    { id: "divide", value: "/" },
    { id: "four", value: "4" },
    { id: "five", value: "5" },
    { id: "six", value: "6" },
    { id: "equals", value: "=" },
    { id: "one", value: "1" },
    { id: "two", value: "2" },
    { id: "three", value: "3" },
    { id: "zero", value: "0" },
    { id: "decimal", value: "." },
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      const validKeys = ['C', 'c', '+', '-', '*', '/', '=', 'Enter', '.', 'Backspace', ...Array.from({ length: 10 }, (_, i) => i.toString())];

      if (validKeys.includes(key)) {
        if (key === 'Enter') {
          handleInput('=');
        } else if (key.toLowerCase() === 'c') {
          handleInput('C');
        } else if (key === 'Backspace') {
          handleInput('Backspace');
        } else {
          handleInput(key === '*' ? 'x' : key);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [display]);

  const handleInput = (input) => {
    const operators = ['+', '-', 'x', '/'];
    const lastChar = display[display.length - 1];

    if (input === 'C') {
      setDisplay('0');
    } else if (input === '=' || input === 'Enter') {
      try {
        setDisplay(eval(display.replace(/x/g, '*')).toString());
      } catch (e) {
        setDisplay('Error');
      }
    } else if (input === 'Backspace') {
      if (display.length === 1) {
        setDisplay('0');
      } else {
        setDisplay(display.slice(0, -1));
      }
    } else {
      if (operators.includes(input)) {
        if (operators.includes(lastChar)) {
          setDisplay(display.slice(0, -1) + input);
        } else {
          setDisplay(display + input);
        }
      } else {
        if (display === '0' && input !== '.') {
          setDisplay(input);
        } else {
          setDisplay(display + input);
        }
      }
    }
  };

  const handleClick = (event) => {
    const buttonValue = event.target.innerHTML;
    handleInput(buttonValue);
  };

  return (
    <>
      <div id="display-container" className="display-container">
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div id="display">{display}</div>
      </div>

      <div id="button-container">
        {buttons.map((item, i) => (
          <button key={i} id={item.id} className='button' onClick={handleClick}>
            {item.value}
          </button>
        ))}
      </div>
    </>
  );
};

export default App;

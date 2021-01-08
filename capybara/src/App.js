import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [jumping, toggleJump] = useState(false);
  const [alive, toggleLife] = useState(true);
  const playerRef = useRef();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    if (jumping) {
      const timer = setTimeout(() => {
        toggleJump(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [jumping]);

  const handleKeyDown = (e) => {
    const { key } = e;
    // jump when SPACEBAR is pressed
    if (key === " ") {
      playerJump();
    }
  };

  const playerJump = () => {
    toggleJump(true);
  };

  const checkAlive = () => {
    // console.log(parseInt(window.getComputedStyle(playerRef).getPropertyValue("top")));
    console.log(playerRef.offsetTop);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkAlive();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game">
      <div id="player"
        className={
          jumping ? "jump" : ""
        }
        ref={playerRef}></div>
      <div id="cactus"></div>
    </div>
  );
}

export default App;

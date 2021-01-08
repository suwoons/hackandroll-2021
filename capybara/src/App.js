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
    toggleLife(true);
  }, []);

  useEffect(() => {
    if (!alive) {
      alert("Game Over");
    }
  }, [alive]);

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
    // get player y position
    let playerTop = parseInt(window.getComputedStyle(playerRef.current).getPropertyValue("top"));

    // get obstacle x position
    const cactus = document.getElementById("cactus");
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // detect collision
    if (cactusLeft > 0 && cactusLeft < 50 && playerTop >= 140) {
      console.log("collision");
      toggleLife(false);
    }
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

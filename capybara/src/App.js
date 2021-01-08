import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// import capybaraNeutral from "./capybara_neutral.png";

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     animatePlayer();
  //   }, 90);
  //   return () => clearInterval(interval);
  // }, []);


  // if (!alive) {
  //   return (
  //   <div className="game">
  //     <div id="game-over"></div>
  //     <div id="cactus"></div>
  //   </div>
  //   );
  // }
  // let avatar = { backgroundImage: capybaraNeutral };

  return (
    <div className="game">
      <div id="cloud"></div>
      <div id="player"
        className={
          jumping ? "jump" : "walk"
        }
        ref={playerRef}
      ></div>
      <div id="cactus"></div>
    </div>
  );
}

export default App;

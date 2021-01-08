import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import useSound from "use-sound";
import boop from "./jump.mp3";

const App = () => {
  const [jumping, toggleJump] = useState(false);
  const [alive, toggleLife] = useState(true);
  const [isPause, togglePause] = useState(true);
  const [score, setScore] = useState(0);
  const [highscore, setHighScore] = useState(0);
  const playerRef = useRef();
  const [play] = useSound(boop);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    toggleLife(true);
    togglePause(true);
  }, []);

  useEffect(() => {
    if (!alive) {
      togglePause(true);
      if (!alert("Game Over")) {
        setScore(0);
        toggleLife(true);
      }
    }
  }, [alive]);

  // controls jumping
  useEffect(() => {
    if (jumping) {
      play();
      const timer = setTimeout(() => {
        toggleJump(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [jumping, play]);

  const handleKeyDown = (e) => {
    const { key } = e;
    // jump when SPACEBAR is pressed
    if (key === " ") {
      if (isPause) {
        togglePause(false);
      }
      playerJump();

      // get obstacle x position
      const cactus = document.getElementById("cactus");
      let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

      if (cactusLeft > 0 && cactusLeft < 250) {
        // add point when successfully clearing a cactus
        let newScore = score + 1;
        setScore(newScore);
        if (newScore > highscore) {
          // set high score
          setHighScore(newScore);
        }
      }
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
    if (cactusLeft >= 0 && cactusLeft <= 50 && playerTop >= 130) {
      toggleLife(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkAlive();
    }, 5);
    return () => clearInterval(interval);
  });

  // pad scoreboard with zeroes
  const highscorePadded = ('00000'+ highscore).slice(-5);
  const zerofilled = ('00000'+ score).slice(-5);

  return (
    <div className="game">
      <div id="scoreboard">
        {zerofilled}
      </div>
      <div id="scoreboard" style={{ paddingRight: "15px" }}>
        {`HI  ${highscorePadded}`}
      </div>
      {isPause ? 
        <div id="startMessage">{`Press  SPACE  to Start`}</div>
        : <></>}
      <div id="cloud"
        className={
          isPause ? "pause" : "cloud-animated"
        }></div>
      <div id="ground"></div>
      <div id="player"
        className={
          isPause ? "player-pause"
          : alive ?
            jumping ? "jump" : "walk"
          : "dead"
        }
        ref={playerRef}
      ></div>
      <div id="cactus"
        className={
          isPause ? "pause" : "cactus-animated"
        }></div>
      
    </div>
  );
}

export default App;

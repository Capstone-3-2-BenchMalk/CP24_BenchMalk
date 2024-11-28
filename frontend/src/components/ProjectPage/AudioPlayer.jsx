import React, { useState, useRef } from "react";
import "../../styles/AudioPlayer.css";
import after5 from "../../assets/icons/after5.png";
import before5 from "../../assets/icons/before5.png";
import play from "../../assets/icons/play.png";
import pause from "../../assets/icons/pause.png";

function AudioPlayer({ audioUrl, modelName }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const sliderRef = useRef(null);

  const updateProgress = (time) => {
    const progressValue = (time / duration) * 100;
    setProgress(progressValue);
    if (sliderRef.current) {
      sliderRef.current.style.setProperty("--progress", `${progressValue}%`);
    }
  };

  const handleTimeUpdate = () => {
    const time = audioRef.current.currentTime;
    setCurrentTime(time);
    updateProgress(time);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
    updateProgress(time);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleBackward = () => {
    const newTime = Math.max(audioRef.current.currentTime - 5, 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    updateProgress(newTime);
  };

  const handleForward = () => {
    const newTime = Math.min(audioRef.current.currentTime + 5, duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    updateProgress(newTime);
  };

  // if (!audioUrl) {
  //   return <div className="empty-menu-message">롤모델을 설정하세요</div>;
  // }

  return (
    <div className="audio-player">
      <div className="model-info">
        <span className="model-name">{modelName}</span>
      </div>
      <div className="player-controls">
        <div className="time-display">{formatTime(currentTime)}</div>
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="time-slider"
          style={{ "--progress": `${progress}%` }}
        />
        <div className="time-display">{formatTime(duration)}</div>
      </div>
      <div className="player-buttons">
        <button onClick={handleBackward} className="control-button">
          <img src={before5} alt="before5" style={{ width: "20px" }} />
        </button>
        <button onClick={handlePlayPause} className="play-button">
          <img
            src={isPlaying ? pause : play}
            alt={isPlaying ? "pause" : "play"}
            style={{ width: "40px" }}
          />
        </button>
        <button onClick={handleForward} className="control-button">
          <img src={after5} alt="after5" style={{ width: "20px" }} />
        </button>
      </div>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
}

export default AudioPlayer;

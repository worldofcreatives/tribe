import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import './MusicPlayer.css';


const MusicPlayer = ({ audioUrl, songName, onBack, onSkip, onAccept, onReject, onDownload, currentStatus }) => {
  const [autoSkip, setAutoSkip] = useState(true); // Auto-skip is enabled by default
  const [playing, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  // Update the current playing time and the total duration
  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  // Effect to auto-play the next song if auto-skip is enabled and the current song has ended
  // Note: onEnded prop of ReactPlayer is used to detect song end
  // useEffect(() => {
  //   if (!autoSkip && !playing) {
  //     // If auto-skip is disabled and the player is paused, do not proceed to the next song
  //     setPlaying(false);
  //   }
  // }, [audioUrl, autoSkip, playing]);
  useEffect(() => {
    // Auto-play when a new song is loaded
    if (audioUrl) {
      setPlaying(true);
    }
  }, [audioUrl]);

    // Seek to a new position
    const handleSeekChange = (e) => {
      const newTime = parseFloat(e.target.value);
      playerRef.current.seekTo(newTime);
      setPlayedSeconds(newTime);
    };

    // Format time for display
    const formatTime = (seconds) => {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    };

  return (
    <div className="music-player">
      <div className='player-left'>
        {songName && <div className="song-name"><i className="fas fa-music"></i> {songName}</div>}
      </div>

      <div className='player-middle'>
        <ReactPlayer
          ref={playerRef}
          url={audioUrl}
          playing={playing}
          onProgress={handleProgress}
          onDuration={handleDuration}
          controls={false}
          onEnded={() => autoSkip && onSkip()} // Only call onSkip if autoSkip is true
          width="100%"
          height="0px"
          />
        <div className="player-controls">
          <button onClick={onBack}><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
          <button onClick={() => setPlaying(!playing)}>
            {playing ? <i class="fa fa-pause" aria-hidden="true"></i> : <i class="fa fa-play" aria-hidden="true"></i>}
          </button>
          <button onClick={onSkip}><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>
        <div className="progress-container">
          <div className="time-display-left">{formatTime(playedSeconds)}</div>
          <input
            type="range"
            min={0}
            max={duration || 1} // Prevents a React warning when duration is 0
            value={playedSeconds}
            onChange={handleSeekChange}
            className="progress-bar"
          />
          <div className="time-display-right">{formatTime(duration)}</div>
        </div>
          <label>
            <input
              type="checkbox"
              checked={autoSkip}
              onChange={() => setAutoSkip(!autoSkip)}
              /> Auto-Skip
          </label>
      </div>

      <div className='player-right'>
        <button onClick={onAccept} title="Accept" className={currentStatus === 'Accepted' ? 'highlighted' : ''}>
          <i className="fas fa-heart"></i>
        </button>
        <button onClick={onReject} title="Reject" className={currentStatus === 'Rejected' ? 'highlighted' : ''}>
          <i className="fas fa-archive"></i>
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;

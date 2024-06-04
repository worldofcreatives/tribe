import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const OldMusicPlayer = ({ audioUrl, songName, onBack, onSkip }) => {
  const [autoSkip, setAutoSkip] = useState(true); // Auto-skip is enabled by default
  const [playing, setPlaying] = useState(true); // Assume we want to play immediately

  // Effect to auto-play the next song if auto-skip is enabled and the current song has ended
  // Note: onEnded prop of ReactPlayer is used to detect song end
  useEffect(() => {
    if (!autoSkip && !playing) {
      // If auto-skip is disabled and the player is paused, do not proceed to the next song
      setPlaying(false);
    }
  }, [audioUrl, autoSkip, playing]);

  return (
    <div className="music-player">
      {songName && <div className="song-name">{songName}</div>}
      <ReactPlayer
        url={audioUrl}
        playing={playing}
        controls={true}
        onEnded={() => autoSkip && onSkip()} // Only call onSkip if autoSkip is true
        width="100%"
        height="50px"
      />
      <div className="player-controls">
        <button onClick={onBack}>Back</button>
        <button onClick={() => setPlaying(!playing)}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={onSkip}>Skip</button>
        <label>
          <input
            type="checkbox"
            checked={autoSkip}
            onChange={() => setAutoSkip(!autoSkip)}
          /> Auto-Skip
        </label>
      </div>
    </div>
  );
};

export default OldMusicPlayer;

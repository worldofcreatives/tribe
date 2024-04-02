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



// import React, { useState, useEffect, useRef } from 'react';
// import WaveSurfer from 'wavesurfer.js';

// const MusicPlayer = ({ audioUrl, songName, onBack, onSkip }) => {
//   const waveformRef = useRef(null);
//   const wavesurfer = useRef(null);
//   const [autoSkip, setAutoSkip] = useState(true); // Auto-skip is enabled by default
//   const [isPlaying, setIsPlaying] = useState(false); // Control playing state

//   useEffect(() => {
//     // Initialize WaveSurfer
//     wavesurfer.current = WaveSurfer.create({
//       container: waveformRef.current,
//       waveColor: 'violet',
//       progressColor: 'purple',
//       cursorColor: 'navy',
//       barWidth: 2,
//     });

//     // Load the audio file
//     wavesurfer.current.load(audioUrl);

//     // Listen to the finish event to auto-skip songs
//     wavesurfer.current.on('finish', () => {
//       if (autoSkip) {
//         onSkip();
//       }
//     });

//     // Clean up on component unmount
//     return () => wavesurfer.current.destroy();
//   }, [audioUrl, onSkip, autoSkip]);

//   // Play or pause the audio
//   useEffect(() => {
//     if (isPlaying) {
//       wavesurfer.current.play();
//     } else {
//       wavesurfer.current.pause();
//     }
//   }, [isPlaying]);

//   // Function to toggle play/pause
//   const togglePlayback = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div className="music-player">
//       {songName && <div className="song-name">{songName}</div>}
//       <div id="waveform" ref={waveformRef}></div>
//       <div className="player-controls">
//         <button onClick={onBack}>Back</button>
//         <button onClick={togglePlayback}>
//           {isPlaying ? 'Pause' : 'Play'}
//         </button>
//         <button onClick={onSkip}>Skip</button>
//         <label>
//           <input
//             type="checkbox"
//             checked={autoSkip}
//             onChange={() => setAutoSkip(!autoSkip)}
//           /> Auto-Skip
//         </label>
//       </div>
//     </div>
//   );
// };

// export default MusicPlayer;

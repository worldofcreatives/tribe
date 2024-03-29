import React from 'react';
import ReactPlayer from 'react-player';

const MusicPlayer = ({ audioUrl, songName, onBack, onSkip }) => {
  return (
    <div>
      {songName && <div className="song-name">{songName}</div>}
      <ReactPlayer
        url={audioUrl}
        playing={true}
        controls={true}
        onEnded={onSkip} // Call onSkip when the song ends to play the next song
        width="100%"
        height="50px"
      />
      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={onSkip}>Skip</button>
      </div>
    </div>
  );
};

export default MusicPlayer;


// import { useEffect, useRef, useState } from 'react';
// import ReactPlayer from 'react-player';


// // MusicPlayer component
// const MusicPlayer = ({ audioUrl, songName }) => {
//     const [playing, setPlaying] = useState(false);
//     const currentPlayerUrl = useRef(audioUrl);

//     useEffect(() => {
//       if (audioUrl) {
//         setPlaying(true);
//         currentPlayerUrl.current = audioUrl;
//       }
//     }, [audioUrl]);

//     return (
//       <div>
//         {songName && <div className="song-name">{songName}</div>}
//         <ReactPlayer
//           url={audioUrl}
//           playing={playing}
//           controls={true}
//           onEnded={() => setPlaying(false)} // When the song ends, update the state
//           width="100%"
//           height="50px"
//         />
//       </div>
//     );
//   };


// export default MusicPlayer;


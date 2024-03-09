
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';


// MusicPlayer component
const MusicPlayer = ({ audioUrl, songName }) => {
    const [playing, setPlaying] = useState(false);
    const currentPlayerUrl = useRef(audioUrl);

    useEffect(() => {
      if (audioUrl) {
        setPlaying(true);
        currentPlayerUrl.current = audioUrl;
      }
    }, [audioUrl]);

    return (
      <div>
        {songName && <div className="song-name">{songName}</div>}
        <ReactPlayer
          url={audioUrl}
          playing={playing}
          controls={true}
          onEnded={() => setPlaying(false)} // When the song ends, update the state
          width="100%"
          height="50px"
        />
      </div>
    );
  };


export default MusicPlayer;

// const MusicPlayer = ({ audioUrl }) => {
//   const [playing, setPlaying] = useState(false);

//   const togglePlayPause = () => {
//     setPlaying(!playing);
//   };

//   return (
//     <div>
//       <ReactPlayer
//         url={audioUrl}
//         playing={playing}
//         controls={true} // This will show play/pause buttons and other controls by default.
//         width="100%"
//         height="50px" // Adjust height as needed. Setting a specific height helps maintain layout consistency.
//       />
//       {/* <button onClick={togglePlayPause}>{playing ? 'Pause' : 'Play'}</button> */}
//     </div>
//   );
// };

// export default MusicPlayer;

import { useState } from 'react';
import ReactPlayer from 'react-player';

const MusicPlayer = ({ audioUrl }) => {
  const [playing, setPlaying] = useState(false);

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div>
      <ReactPlayer
        url={audioUrl}
        playing={playing}
        controls={true} // This will show play/pause buttons and other controls by default.
        width="100%"
        height="50px" // Adjust height as needed. Setting a specific height helps maintain layout consistency.
      />
      <button onClick={togglePlayPause}>{playing ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default MusicPlayer;

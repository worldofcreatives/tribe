// src/components/Waveform/index.js

import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const waveSurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    waveSurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4F4A85',
      progressColor: '#383351',
      cursorColor: '#D9D9D9',
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: 200,
      barGap: 3,
      backend: 'MediaElement',
    });

    waveSurfer.current.load(audioUrl);

    // Listen to the play and pause events to update the isPlaying state
    waveSurfer.current.on('play', () => setIsPlaying(true));
    waveSurfer.current.on('pause', () => setIsPlaying(false));
    waveSurfer.current.on('finish', () => setIsPlaying(false));

    return () => waveSurfer.current.destroy();
  }, [audioUrl]);

  const togglePlayback = () => {
    if (waveSurfer.current) {
      waveSurfer.current.isPlaying() ? waveSurfer.current.pause() : waveSurfer.current.play();
    }
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <button onClick={togglePlayback}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};


export default Waveform;

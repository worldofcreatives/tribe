import React, { useState } from 'react';
import './RangeSlider.css';

const RangeSlider = ({ min, max, onChange }) => {
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const handleMinChange = (event) => {
      const value = Math.min(Number(event.target.value), maxValue - 1);
      setMinValue(value);
      onChange([value, maxValue]);
    };

    const handleMaxChange = (event) => {
      const value = Math.max(Number(event.target.value), minValue + 1);
      setMaxValue(value);
      onChange([minValue, value]);
    };

    // Calculate percentage for styling
    const minPercent = ((minValue - min) / (max - min)) * 100;
    const maxPercent = ((maxValue - min) / (max - min)) * 100;

    return (
      <div className="range-slider">
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="thumb thumb--left"
          style={{ zIndex: minValue > max - 100 ? '5' : '' }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="thumb thumb--right"
        />
        <div className="slider">
          <div className="slider__track" />
          <div className="slider__range" style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }} />
        </div>
      </div>
    );
  };

  export default RangeSlider;

import React, { useState } from 'react';
import OpportunitiesChart from '../OpportunitiesChart';
import SubmissionsChart from '../SubmissionsChart';
import './Charts.css'; // Assuming your styles are here

const Charts = () => {
  // State to track which chart is currently selected
  const [selectedChart, setSelectedChart] = useState('opportunities');

  return (
    <div>
      <button
        onClick={() => setSelectedChart('opportunities')}
        className={selectedChart === 'opportunities' ? 'active' : ''}
      >
        Opportunities Chart
      </button>
      <button
        onClick={() => setSelectedChart('submissions')}
        className={selectedChart === 'submissions' ? 'active' : ''}
      >
        Submissions Chart
      </button>

      {selectedChart === 'opportunities' && <OpportunitiesChart />}
      {selectedChart === 'submissions' && <SubmissionsChart />}
    </div>
  );
};

export default Charts;

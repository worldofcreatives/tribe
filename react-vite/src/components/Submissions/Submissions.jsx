import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSubmissionsForOpportunity, updateSubmissionStatus } from '../../redux/submissions';
import SubmissionItem from '../SubmissionItem';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import './Submissions.css';

const Submissions = () => {
  const { oppId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const { submissions, loading, error } = useSelector((state) => state.submissions);
  const isCompany = user && user.type === 'Company';
  const [currentSong, setCurrentSong] = useState({ url: '', name: '' });
  const [currentStatusFilter, setCurrentStatusFilter] = useState('');
  const navigate = useNavigate();
  const [playingSubmissionId, setPlayingSubmissionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [minBpm, setMinBpm] = useState(0);
  const [maxBpm, setMaxBpm] = useState(200);

  useEffect(() => {
    if (isCompany || user) dispatch(fetchSubmissionsForOpportunity(oppId));
  }, [dispatch, oppId, isCompany, user]);

  const playSong = (songUrl, songName, submissionId) => {
    if (currentSong.url === songUrl && playingSubmissionId === submissionId) {
      // If the same song is clicked and it is currently playing, stop the music
      setCurrentSong({ url: '', name: '' });
      setPlayingSubmissionId(null); // Reset the playing ID
    } else {
      // Otherwise, play the selected song
      setCurrentSong({ url: songUrl, name: songName });
      setPlayingSubmissionId(submissionId);
    }
  };

  // Update your filteredSubmissions logic to include search filtering
  // const filteredSubmissions = submissions.filter(submission => {
  //   const matchesStatus = currentStatusFilter ? submission.status === currentStatusFilter : true;
  //   const matchesSearch = submission.username.toLowerCase().includes(searchQuery.toLowerCase()) || submission.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesBpm = submission.bpm >= minBpm && (!maxBpm || submission.bpm <= maxBpm);
  //   return matchesStatus && matchesSearch && matchesBpm;
  // });
  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = currentStatusFilter ? submission.status === currentStatusFilter : true;
    // Ensure username and name are not undefined before calling toLowerCase
    const username = submission.username || '';
    const name = submission.name || '';
    const matchesSearch = username.toLowerCase().includes(searchQuery.toLowerCase()) || name.toLowerCase().includes(searchQuery.toLowerCase());
    const bpm = parseInt(submission.bpm, 10) || 0; // Ensure bpm is a number and provide a default if undefined
    const matchesBpm = bpm >= minBpm && (!maxBpm || bpm <= maxBpm);
    return matchesStatus && matchesSearch && matchesBpm;
  });


  // Function to handle BPM input changes
  const handleMinBpmChange = (e) => {
    setMinBpm(e.target.value ? parseInt(e.target.value, 10) : 0);
  };

  const handleMaxBpmChange = (e) => {
    setMaxBpm(e.target.value ? parseInt(e.target.value, 10) : 200);
  };

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const playStatus = (status) => {
    setCurrentStatusFilter(status);
  };

  const getNextSubmissionIndex = (direction) => {
    const currentIndex = filteredSubmissions.findIndex(submission => submission.id === playingSubmissionId);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= filteredSubmissions.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = filteredSubmissions.length - 1;
    return nextIndex;
  };

  const handleSkip = () => {
    const nextIndex = getNextSubmissionIndex('next');
    const nextSong = filteredSubmissions[nextIndex];
    playSong(nextSong.file_url, nextSong.name, nextSong.id);
  };

  const handleBack = () => {
    const prevIndex = getNextSubmissionIndex('prev');
    const prevSong = filteredSubmissions[prevIndex];
    playSong(prevSong.file_url, prevSong.name, prevSong.id);
  };

console.log(playingSubmissionId)
console.log(currentSong)


useEffect(() => {
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        handleBack();
        break;
      case 'ArrowRight':
        handleSkip();
        break;
      case 'ArrowUp':
        if (playingSubmissionId) {
          event.preventDefault(); // Prevent scrolling
          // Change status to "Accepted"
          dispatch(updateSubmissionStatus(oppId, playingSubmissionId, 'Accepted')).then(() => {
            // After updating, you may need to refresh the submissions list or handle UI update
            // This is just a placeholder, replace it with actual logic as needed
            console.log('Status updated to Accepted');
          });
        }
        break;
      case 'ArrowDown':
        if (playingSubmissionId) {
          event.preventDefault(); // Prevent scrolling
          // Change status to "Rejected"
          dispatch(updateSubmissionStatus(oppId, playingSubmissionId, 'Rejected')).then(() => {
            // After updating, you may need to refresh the submissions list or handle UI update
            // This is just a placeholder, replace it with actual logic as needed
            console.log('Status updated to Rejected');
          });
        }
        break;
      default:
        break;
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  // Cleanup function to remove the event listener
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [dispatch, oppId, playingSubmissionId, handleBack, handleSkip]); // Make sure to include all dependencies here




  const statusButtons = ['Show All', 'Pending', 'Reviewing', 'Accepted', 'Rejected'].map(status => (
    <button key={status} onClick={() => playStatus(status === 'Show All' ? '' : status)}>{status}</button>
  ));

const downloadAllFiles = async () => {
  // Directly use filteredSubmissions since it already contains the submission objects you need
  try {
    const response = await fetch(`/api/aws/download-all/packtune`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the full submission objects
      body: JSON.stringify(filteredSubmissions)
    });

    if (!response.ok) {
      throw new Error(`Failed to download files: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const statusText = currentStatusFilter ? currentStatusFilter : 'all';
    link.download = `submissions-${statusText}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(`Error during bulk file download: ${error.message}`);
  }
};



const handleStatusChange = (status) => {
  setCurrentStatusFilter(status === 'Show All' ? '' : status);
};

  if (loading) return <div>Loading submissions...</div>;
  if (error) {
    navigate('/opps');
    return <div>You are not authorized to view these submissions.</div>;
  }

  return (
    <div className='sub-page'>
      <div className='sub-top'>
        <h2>Submissions</h2>
        <div>
          {['Show All', 'Pending', 'Reviewing', 'Accepted', 'Rejected'].map(status => (
            <button key={status} onClick={() => handleStatusChange(status)}>{status}</button>
            ))}
        </div>
        <button onClick={downloadAllFiles} className="download-all-button">
          Download All {currentStatusFilter || 'Submissions'}
        </button>
            <input
              type="text"
              placeholder="Search by name or username..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <input
              type="number"
              placeholder="Min BPM"
              value={minBpm}
              onChange={handleMinBpmChange}
            />
            <input
              type="number"
              placeholder="Max BPM"
              value={maxBpm}
              onChange={handleMaxBpmChange}
            />
        {filteredSubmissions.map(submission => (
          <SubmissionItem
            key={submission.id}
            submission={submission}
            onPlay={() => playSong(submission.file_url, submission.name, submission.id)}
            isPlaying={submission.id === playingSubmissionId}
          />
        ))}
      </div>
      {/* Only render the music player if there is a current song */}
      {currentSong.url && (
        <div className="music-player-wrapper">
          <MusicPlayer
            audioUrl={currentSong.url}
            songName={currentSong.name}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        </div>
      )}
    </div>
  );

};

export default Submissions;

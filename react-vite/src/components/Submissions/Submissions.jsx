// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchSubmissionsForOpportunity } from '../../redux/submissions';
// import SubmissionItem from '../SubmissionItem';
// import MusicPlayer from '../MusicPlayer/MusicPlayer';
// import './Submissions.css';

// const Submissions = () => {
//   const { oppId } = useParams();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.session);
//   const { submissions, loading, error } = useSelector((state) => state.submissions);
//   const isCompany = user && user.type === 'Company';
//   const [currentSong, setCurrentSong] = useState({ url: '', name: '' });
//   const [playing, setPlaying] = useState(false);
//   const [currentStatusFilter, setCurrentStatusFilter] = useState(null);
//   const navigate = useNavigate();
//   // Add a state to track the ID of the currently playing submission
// const [playingSubmissionId, setPlayingSubmissionId] = useState(null);

// const playSong = (songUrl, songName, submissionId) => {
//   if (currentSong.url !== songUrl) {
//     setCurrentSong({ url: songUrl, name: songName });
//     setPlayingSubmissionId(submissionId); // Update the currently playing submission ID
//   } else {
//     setCurrentSong({ url: '', name: '' });
//     setPlayingSubmissionId(null); // Reset the currently playing submission ID
//   }
// };

//   useEffect(() => {
//     if (isCompany || user) {
//       dispatch(fetchSubmissionsForOpportunity(oppId));
//     }
//   }, [dispatch, oppId, isCompany, user]);

//   // Define the order of the sections
//   const statusOrder = ['Pending', 'Reviewing', 'Accepted', 'Rejected'];

//     // Organize submissions by status
//     const organizedSubmissions = submissions.reduce((acc, submission) => {
//       (acc[submission.status] = acc[submission.status] || []).push(submission);
//       return acc;
//     }, {});

//   // State to track the index of the currently playing song
//   const [currentSongIndex, setCurrentSongIndex] = useState(0);

//   // Flatten the organizedSubmissions into a single array to manage playback order
//   const submissionPlaylist = Object.values(organizedSubmissions).flat();

// // This effect initializes the playlist and sets the first song
// // but doesn't depend on currentSongIndex or submissionPlaylist to avoid loops
// useEffect(() => {
//   if (submissionPlaylist.length > 0) {
//     // Assuming submissionPlaylist is correctly populated outside of this effect
//     const song = submissionPlaylist[0];
//     setCurrentSong({ url: song.file_url, name: song.name });
//   }
// }, [submissionPlaylist.length]); // Depend only on the length of the playlist

// const handleSkip = () => {
//   const filteredSubmissions = currentStatusFilter
//     ? submissions.filter(submission => submission.status === currentStatusFilter)
//     : submissions;
//   let nextIndex = filteredSubmissions.findIndex(submission => submission.id === playingSubmissionId) + 1;

//   if (nextIndex >= filteredSubmissions.length) nextIndex = 0; // Loop to the start

//   const nextSong = filteredSubmissions[nextIndex];
//   playSong(nextSong.file_url, nextSong.name, nextSong.id);
// };

// const handleBack = () => {
//   const filteredSubmissions = currentStatusFilter
//     ? submissions.filter(submission => submission.status === currentStatusFilter)
//     : submissions;
//   let prevIndex = filteredSubmissions.findIndex(submission => submission.id === playingSubmissionId) - 1;

//   if (prevIndex < 0) prevIndex = filteredSubmissions.length - 1; // Loop to the end

//   const prevSong = filteredSubmissions[prevIndex];
//   playSong(prevSong.file_url, prevSong.name, prevSong.id);
// };



// const playStatus = (status) => {
//   setCurrentStatusFilter(status);
//   const filteredSubmissions = submissions.filter(submission => submission.status === status);
//   if (filteredSubmissions.length > 0) {
//     const firstSubmission = filteredSubmissions[0];
//     playSong(firstSubmission.file_url, firstSubmission.name, firstSubmission.id);
//     setCurrentSongIndex(submissions.indexOf(firstSubmission)); // Make sure this index is from the global submissions list
//   }
// };




//   if (loading) {
//     return <div>Loading submissions...</div>;
//   }

//   if (error) {
//     // return <div>Error: {error}</div>;
//     navigate('/opps');
//     return <div>You are not authorized to view these submissions.</div>;
//   }

//   // Filter submissions if user is not a company
//   const visibleSubmissions = isCompany
//     ? submissions
//     : submissions.filter((submission) => submission.creator_id === user.id);



//   const downloadAllFiles = async (status) => {
//     const submissionsToDownload = organizedSubmissions[status];
//     try {
//       const response = await fetch(`/api/aws/download-all/packtune`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(submissionsToDownload)
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to download files: ${response.statusText}`);
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${status}-submissions.zip`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error(`Error during bulk file download: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <div className='sub-top'>
//         <h2>Submissions</h2>

//         {statusOrder.map(status => (
//           organizedSubmissions[status] && organizedSubmissions[status].length > 0 && (
//             <div key={status} className="status-section">
//               <div className='sub-top-2'>
//                 <h3>{status}</h3>
//                 <div className="status-buttons">
//                   <button onClick={() => playStatus(status)} className="play-status-button">{`Play ${status}`}</button>
//                   <button onClick={() => downloadAllFiles(status)} className="download-all-button">Download All {status}</button>
//                 </div>
//               </div>
//               <ul>
//                 {organizedSubmissions[status].map(submission => (
//                   <SubmissionItem
//                     key={submission.id}
//                     submission={submission}
//                     onPlay={() => playSong(submission.file_url, submission.name, submission.id)}
//                     isPlaying={submission.id === playingSubmissionId} // Indicates if this submission is playing
//                   />
//                 ))}
//               </ul>
//             </div>
//           )
//         ))}
//       </div>
//       <div className="music-player-wrapper">
//         <MusicPlayer
//           audioUrl={currentSong.url}
//           songName={currentSong.name}
//           onBack={handleBack}
//           onSkip={handleSkip}
//         />
//       </div>
//     </div>
//   );
// }

// export default Submissions;



















import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSubmissionsForOpportunity } from '../../redux/submissions';
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


  const filteredSubmissions = currentStatusFilter
    ? submissions.filter(submission => submission.status === currentStatusFilter)
    : submissions;

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
    <div>
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
        {filteredSubmissions.map(submission => (
          <SubmissionItem
            key={submission.id}
            submission={submission}
            onPlay={() => playSong(submission.file_url, submission.name, submission.id)}
            isPlaying={submission.id === playingSubmissionId}
          />
        ))}
      </div>
      <div className="music-player-wrapper">
        <MusicPlayer
          audioUrl={currentSong.url}
          songName={currentSong.name}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
};

export default Submissions;

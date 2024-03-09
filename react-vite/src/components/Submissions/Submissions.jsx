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
  const [currentSong, setCurrentSong] = useState('');
  const [playing, setPlaying] = useState(false);
  const navigate = useNavigate();

//   const currentUser = useSelector((state) => state.session.user);

  const playSong = (songUrl) => {
    if (currentSong !== songUrl) {
      setCurrentSong(songUrl);
    } else {
      setCurrentSong(''); // If the same song is clicked, stop playing
    }
  };

  useEffect(() => {
    if (isCompany || user) {
      dispatch(fetchSubmissionsForOpportunity(oppId));
    }
  }, [dispatch, oppId, isCompany, user]);

  // Define the order of the sections
  const statusOrder = ['Pending', 'Reviewing', 'Accepted', 'Rejected'];

  // Organize submissions by status
  const organizedSubmissions = submissions.reduce((acc, submission) => {
    (acc[submission.status] = acc[submission.status] || []).push(submission);
    return acc;
  }, {});

  if (loading) {
    return <div>Loading submissions...</div>;
  }

  if (error) {
    // return <div>Error: {error}</div>;
    navigate('/opps');
    return <div>You are not authorized to view these submissions.</div>;
  }

  // Filter submissions if user is not a company
  const visibleSubmissions = isCompany
    ? submissions
    : submissions.filter((submission) => submission.creator_id === user.id);

    const downloadAllFiles = async (status) => {
      const submissionsToDownload = organizedSubmissions[status];
      console.log("🚀 ~ downloadAllFiles ~ submissionsToDownload:", submissionsToDownload)

      const fileKeys = submissionsToDownload.map(submission => submission.file_url.split('/').pop());

      try {
        const response = await fetch(`/api/aws/download-all/packtune`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include other headers as required, such as authorization headers
          },
          body: JSON.stringify({ fileKeys })
        });

        if (!response.ok) {
          throw new Error(`Failed to download files: ${response.statusText}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${status}-submissions.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error(`Error during bulk file download: ${error.message}`);
      }
    };

    return (
      <div>
        <div className='sub-top'>
          <h2>Submissions</h2>
          {statusOrder.map(status => (
            organizedSubmissions[status] && organizedSubmissions[status].length > 0 && (
              <div key={status} className="status-section">
                <h3>{status}</h3>
                <button onClick={() => downloadAllFiles(status)} className="download-all-button">Download All {status}</button>
                <ul>
                  {organizedSubmissions[status].map(submission => (
                    <SubmissionItem key={submission.id} submission={submission} onPlay={playSong} />
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
        <div className="music-player-wrapper">
          <MusicPlayer audioUrl={currentSong} />
        </div>
      </div>
    );
  };


// return (
//   <div>
//   <div className='sub-top'>
//     <h2>Submissions</h2>
//     {statusOrder.map(status => (
//       organizedSubmissions[status] && organizedSubmissions[status].length > 0 && (
//         <div key={status}>
//           <h3>{status}</h3>
//           <ul>
//             {organizedSubmissions[status].map(submission => (
//               <SubmissionItem key={submission.id} submission={submission} onPlay={playSong} />
//             ))}
//           </ul>
//         </div>
//       )
//     ))}
//   </div>
//     <div className="music-player-wrapper">
//       <MusicPlayer audioUrl={currentSong} />
//     </div>
//     </div>
// );
// };

export default Submissions;

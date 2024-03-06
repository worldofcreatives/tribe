import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSubmissionsForOpportunity } from '../../redux/submissions';
import SubmissionItem from '../SubmissionItem';
import MusicPlayer from '../MusicPlayer/MusicPlayer';

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

//   return (
//     <div>
//       <h2>Submissions for Opportunity {oppId}</h2>
//       <MusicPlayer audioUrl={currentSong} />
//       {visibleSubmissions.length > 0 ? (
//         <ul>
//           {visibleSubmissions.map((submission) => (
//             <SubmissionItem key={submission.id} submission={submission} onPlay={playSong} />
//           ))}
//         </ul>
//       ) : (
//         <p>No submissions found.</p>
//       )}
//     </div>
//   );
// };
return (
  <div>
    <h2>Submissions for Opportunity {oppId}</h2>
    <MusicPlayer audioUrl={currentSong} />
    {statusOrder.map(status => (
      organizedSubmissions[status] && organizedSubmissions[status].length > 0 && (
        <div key={status}>
          <h3>{status}</h3>
          <ul>
            {organizedSubmissions[status].map(submission => (
              <SubmissionItem key={submission.id} submission={submission} onPlay={playSong} />
            ))}
          </ul>
        </div>
      )
    ))}
  </div>
);
};

export default Submissions;

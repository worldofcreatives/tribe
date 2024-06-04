import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './UserSubmissions.css';

const UserSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate(); // Use navigate for redirection


  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const { userStatus } = useSelector((state) => ({
    userStatus: state.session.user.status
  }));

  useEffect(() => {
    // Redirect to "/apply" if user status is "Pre-Apply"
    if (userStatus === "Pre-Apply") {
      navigate('/apply');
    }
  }, [userStatus, navigate]); // Depend on userStatus and navigate


  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/opportunities/submissions/user');
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        } else {
          setError('Failed to load submissions.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const filterAndSortSubmissions = (submissions) => {
    let filteredSubmissions = submissions;

    // Search
    if (searchQuery) {
      filteredSubmissions = filteredSubmissions.filter((submission) =>
        submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.opportunity_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.collaborators.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.bpm.toString().includes(searchQuery)
      );
    }

    // Filter
    if (filterStatus) {
      filteredSubmissions = filteredSubmissions.filter(
        (submission) => submission.status === filterStatus
      );
    }

    // Sort
    filteredSubmissions.sort((a, b) => {
      const dateA = new Date(a.created_date);
      const dateB = new Date(b.created_date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return filteredSubmissions;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const filteredSubmissions = filterAndSortSubmissions(submissions);

  return (
    <div className="user-submissions search-container ">
      <h1>My Submissions</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={filterStatus} onChange={handleFilterStatus}>
          <option value="">All Statuses</option>
          <option value="Accepted">Accepted</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select value={sortOrder} onChange={handleSortOrder}>
          <option value="desc">Sort by Date: Newest First</option>
          <option value="asc">Sort by Date: Oldest First</option>
        </select>
      </div>
      {filteredSubmissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Opportunity</th>
              <th>Status</th>
              <th>Notes</th>
              <th>BPM</th>
              <th>Collaborators</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.name}</td>
                <td>
                  <Link to={`/opps/${submission.opportunity_id}`}>
                    {submission.opportunity_name}
                  </Link>
                </td>
                <td>{submission.status}</td>
                <td className="notes">
                  <span title={submission.notes}>
                    {submission.notes.length > 30 ? `${submission.notes.substring(0, 30)} ...(hover over to read the rest)` : submission.notes}
                  </span>
                </td>
                <td>{submission.bpm}</td>
                <td>{submission.collaborators}</td>
                <td>{new Date(submission.created_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserSubmissions;


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import './UserSubmissions.css';

// const UserSubmissions = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const user = useSelector((state) => state.session.user);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [sortOrder, setSortOrder] = useState('desc');

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const response = await fetch('/api/opportunities/submissions/user');
//         if (response.ok) {
//           const data = await response.json();
//           setSubmissions(data);
//         } else {
//           setError('Failed to load submissions.');
//         }
//       } catch (err) {
//         setError('An error occurred. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleFilterStatus = (e) => {
//     setFilterStatus(e.target.value);
//   };

//   const handleSortOrder = (e) => {
//     setSortOrder(e.target.value);
//   };

//   const filterAndSortSubmissions = (submissions) => {
//     let filteredSubmissions = submissions;

//     // Search
//     if (searchQuery) {
//       filteredSubmissions = filteredSubmissions.filter((submission) =>
//         submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         submission.opportunity_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         submission.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         submission.collaborators.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         submission.bpm.toString().includes(searchQuery)
//       );
//     }

//     // Filter
//     if (filterStatus) {
//       filteredSubmissions = filteredSubmissions.filter(
//         (submission) => submission.status === filterStatus
//       );
//     }

//     // Sort
//     filteredSubmissions.sort((a, b) => {
//       const dateA = new Date(a.created_date);
//       const dateB = new Date(b.created_date);
//       return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//     });

//     return filteredSubmissions;
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   const filteredSubmissions = filterAndSortSubmissions(submissions);

//   return (
//     <div className="user-submissions">
//       <h1>Your Submissions</h1>
//       <div className="controls">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         <select value={filterStatus} onChange={handleFilterStatus}>
//           <option value="">All Statuses</option>
//           <option value="Accepted">Accepted</option>
//           <option value="Pending">Pending</option>
//           <option value="Rejected">Rejected</option>
//         </select>
//         <select value={sortOrder} onChange={handleSortOrder}>
//           <option value="desc">Sort by Date: Newest First</option>
//           <option value="asc">Sort by Date: Oldest First</option>
//         </select>
//       </div>
//       {filteredSubmissions.length === 0 ? (
//         <p>No submissions found.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Opportunity</th>
//               <th>Status</th>
//               <th>Notes</th>
//               <th>BPM</th>
//               <th>Collaborators</th>
//               <th>Submitted At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSubmissions.map((submission) => (
//               <tr key={submission.id}>
//                 <td>{submission.name}</td>
//                 <td>
//                   <Link to={`/opps/${submission.opportunity_id}`}>
//                     {submission.opportunity_name}
//                   </Link>
//                 </td>
//                 <td>{submission.status}</td>
//                 <td className="notes">
//                   <span title={submission.notes}>
//                     {submission.notes.length > 30 ? `${submission.notes.substring(0, 30)} ...(hover over to read the rest)` : submission.notes}
//                   </span>
//                 </td>
//                 <td>{submission.bpm}</td>
//                 <td>{submission.collaborators}</td>
//                 <td>{new Date(submission.created_date).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserSubmissions;

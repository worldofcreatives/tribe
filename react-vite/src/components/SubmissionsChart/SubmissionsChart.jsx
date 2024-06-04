import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllSubmissions } from '../../redux/submissions';

const SubmissionsChart = () => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    dispatch(fetchAllSubmissions());
  }, [dispatch]);

  const submissions = useSelector((state) => state.submissions.submissions);

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortColumn(column);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  // Filter submissions based on searchQuery before sorting
  const filteredSubmissions = submissions.filter(submission =>
    submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (submission.opportunity && submission.opportunity.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    const valueA = a[sortColumn] || ''; // Provide a default empty string if undefined
    const valueB = b[sortColumn] || ''; // Provide a default empty string if undefined

    if (sortColumn === 'created_date') {
      // For dates, convert to Date objects for comparison
      // Use 'new Date(0)' as a default for any undefined dates to ensure they are sorted predictably
      const dateA = valueA ? new Date(valueA) : new Date(0);
      const dateB = valueB ? new Date(valueB) : new Date(0);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      // For strings, handle undefined safely by converting to string and then using localeCompare
      return sortDirection === 'asc' ? String(valueA).localeCompare(String(valueB)) : String(valueB).localeCompare(String(valueA));
    }
  });

    // Handle selecting all submissions
    useEffect(() => {
      if (selectAll) {
        const allSubmissionIds = submissions.map(submission => submission.id);
        setSelectedSubmissions(allSubmissionIds);
      } else {
        setSelectedSubmissions([]);
      }
    }, [selectAll, submissions]);

    // Handle individual checkbox change
    const handleCheckboxChange = (submissionId) => {
      if (selectedSubmissions.includes(submissionId)) {
        setSelectedSubmissions(selectedSubmissions.filter(id => id !== submissionId));
      } else {
        setSelectedSubmissions([...selectedSubmissions, submissionId]);
      }
    };

    // Function to render sort indicator
    const renderSortIndicatorAndHint = (column) => {
      const indicator = sortColumn === column
        ? sortDirection === 'asc'
          ? ' 🔼'
          : ' 🔽'
        : '';
      const hint = '(click to sort)';
      return <>
        {indicator} <span className="sort-hint">{hint}</span>
      </>;
    };

  return (
    <>
      <input
        type="text"
        placeholder="Search submissions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '10px', display: 'block' }} // Ensure the search bar is displayed as a block for better layout
      />
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => setSelectAll(!selectAll)}
            /> Select All
          </th>
          <th onClick={() => handleSort('name')}>
            Submission Name {renderSortIndicatorAndHint('name')}
          </th>
          <th onClick={() => handleSort('opportunity')}>
            Opportunity Name {renderSortIndicatorAndHint('opportunity')}
          </th>
          <th onClick={() => handleSort('created_date')}>
            Date Added {renderSortIndicatorAndHint('created_date')}
          </th>
          <th>Genre(s)</th>
          <th>Type(s)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedSubmissions.map((submission) => (
          <tr key={submission.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedSubmissions.includes(submission.id)}
                onChange={() => handleCheckboxChange(submission.id)}
              />
            </td>
            <td>{submission.name}</td>
            <td>{submission.opportunity || 'N/A'}</td>
            <td>{new Date(submission.created_date).toLocaleDateString()}</td>
            <td>{(submission.genres?.map(genre => genre.name) || []).join(', ') || 'N/A'}</td>
            <td>{(submission.types?.map(type => type.name) || []).join(', ') || 'N/A'}</td>
            <td>
              <Link to={`/opps/${submission.opp_id}/subs`}>View Submissions</Link>
              {' | '}
              <Link to={`/opps/${submission.opp_id}`}>View Opportunity</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default SubmissionsChart;

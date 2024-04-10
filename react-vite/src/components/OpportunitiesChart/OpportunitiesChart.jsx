import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserOpportunities } from '../../redux/useropps';

const UserOpportunitiesTable = () => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOpps, setSelectedOpps] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      dispatch(fetchUserOpportunities());
    }, [dispatch]);

  const opportunities = useSelector((state) => state.userOpportunities.opportunities);
  console.log("🚀 ~ UserOpportunitiesTable ~ opportunities:", opportunities)

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortColumn(column);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  // Filter opportunities based on searchQuery before sorting
  const filteredSubmissions = opportunities.filter(submission =>
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

    // Handle selecting all opportunities
    useEffect(() => {
      if (selectAll) {
        const allOppIds = opportunities.map(opportunity => opportunity.id);
        setSelectedOpps(allOppIds);
      } else {
        setSelectedOpps([]);
      }
    }, [selectAll, opportunities]);

    // Handle individual checkbox change
    const handleCheckboxChange = (oppId) => {
      if (selectedOpps.includes(oppId)) {
        setSelectedOpps(selectedOpps.filter(id => id !== oppId));
      } else {
        setSelectedOpps([...selectedOpps, oppId]);
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
    <table>
      <thead>
        <tr>
          <th>Opportunity Name</th>
          <th>Date Added</th>
          <th>Date Updated</th>
          <th># of Submissions</th>
          <th># of Pending Submissions</th>
          <th>Genre(s)</th>
          <th>Type(s)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {opportunities.map((opportunity) => (
          <tr key={opportunity.id}>
            <td>{opportunity.name}</td>
            <td>{new Date(opportunity.created_date).toLocaleDateString()}</td>
            <td>{new Date(opportunity.updated_date).toLocaleDateString()}</td>
            <td>{opportunity.submissions_count}</td>
            <td>{opportunity.pending_submissions}</td>
            <td>{(opportunity.genres?.map(genre => genre.name) || []).join(', ') || 'N/A'}</td>
            <td>{(opportunity.types?.map(type => type.name) || []).join(', ') || 'N/A'}</td>
            <td>
              <Link to={`/opps/${opportunity.id}/subs`}>View Subs</Link>
              {' | '}
              <Link to={`/opps/${opportunity.id}`}>View Opps</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserOpportunitiesTable;

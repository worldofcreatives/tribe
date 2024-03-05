import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserOpportunities } from '../../redux/useropps';

const UserOpportunitiesTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchUserOpportunities());
    }, [dispatch]);

    const opportunities = useSelector((state) => state.userOpportunities.opportunities);


  return (
    <table>
      <thead>
        <tr>
          <th>Opportunity Name</th>
          <th>Date Added</th>
          <th>Date Updated</th>
          <th># of Submissions</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {opportunities.map((opportunity) => (
          <tr key={opportunity.id}>
            <td>{opportunity.name}</td>
            <td>{new Date(opportunity.created_at).toLocaleDateString()}</td>
            <td>{new Date(opportunity.updated_at).toLocaleDateString()}</td>
            <td>{/* I need to still alculate # of submissions for this opportunity */}</td>
            <td>
              <Link to={`/opps/${opportunity.id}/subs`}>View Submissions</Link>
              {' | '}
              <Link to={`/opps/${opportunity.id}`}>View Opportunity</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserOpportunitiesTable;

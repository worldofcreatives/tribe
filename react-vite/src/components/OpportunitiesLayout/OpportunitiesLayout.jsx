import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchOpportunities } from '../../redux/opportunities';
import OpportunityBox from '../OpportunitiesBox/OpportunitiesBox'; // Make sure the import path is correct

const OpportunitiesLayout = () => {
  const dispatch = useDispatch();
  const { opportunities } = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(fetchOpportunities());
  }, [dispatch]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '30%', borderRight: '1px solid #ccc' }}>
        <h2>All Opportunities</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {opportunities.map((opportunity) => (
            <li key={opportunity.id}>
              <OpportunityBox opportunity={opportunity} />
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default OpportunitiesLayout;

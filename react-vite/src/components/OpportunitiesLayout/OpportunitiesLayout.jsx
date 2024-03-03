import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchOpportunities } from '../../redux/opportunities';
import OpportunityBox from '../OpportunitiesBox/OpportunitiesBox';
import './OpportunitiesLayout.css';

const OpportunitiesLayout = () => {
  const dispatch = useDispatch();
  const { opportunities } = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(fetchOpportunities());
  }, [dispatch]);

  return (
    <div className="opportunities-layout">
      <div className="opportunities-sidebar">
        <ul>
          {opportunities.map((opportunity) => (
            <li key={opportunity.id}>
              <OpportunityBox opportunity={opportunity} />
            </li>
          ))}
        </ul>
      </div>
      <div className="opportunities-content">
        <Outlet />
      </div>
    </div>
  );
};

export default OpportunitiesLayout;

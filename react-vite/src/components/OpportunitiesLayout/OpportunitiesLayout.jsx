import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchOpportunities } from '../../redux/opportunities';
import OpportunityBox from '../OpportunitiesBox/OpportunitiesBox';
import './OpportunitiesLayout.css';

const OpportunitiesLayout = () => {
  const dispatch = useDispatch();
  const { opportunities } = useSelector((state) => state.opportunities);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);

  useEffect(() => {
    dispatch(fetchOpportunities());
  }, [dispatch]);

  useEffect(() => {
    // Filter opportunities based on the search query
    const filtered = opportunities.filter((opportunity) =>
      opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOpportunities(filtered);
  }, [opportunities, searchQuery]);

  return (
    <div className="opportunities-layout">
      <div className="opportunities-sidebar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ul>
          {filteredOpportunities.map((opportunity) => (
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

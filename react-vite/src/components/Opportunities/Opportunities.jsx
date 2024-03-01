import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOpportunities } from '../../redux/opportunities';
import OpportunityBox from '../OpportunitiesBox/OpportunitiesBox';

const OpportunitiesList = () => {
  const dispatch = useDispatch();
  const { loading, opportunities, error } = useSelector((state) => state.opportunities);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchOpportunities());
  }, [dispatch]);

  // Handler to update search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter opportunities based on the search term
  const filteredOpportunities = opportunities.filter((opportunity) =>
    opportunity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>All Opportunities</h2>
      <input
        type="text"
        placeholder="Search opportunities..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredOpportunities.length > 0 ? (
        <ul>
          {filteredOpportunities.map((opportunity) => (
            // <li key={opportunity.id}>{opportunity.name}—{opportunity.description}</li>
            <OpportunityBox key={opportunity.id} opportunity={opportunity} />
          ))}
        </ul>
      ) : (
        <p>No opportunities found.</p>
      )}
    </div>
  );
};

export default OpportunitiesList;


// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchOpportunities } from '../../redux/opportunities';

// const OpportunitiesList = () => {
//   const dispatch = useDispatch();
//   const { loading, opportunities, error } = useSelector((state) => state.opportunities);

//   useEffect(() => {
//     dispatch(fetchOpportunities());
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>All Opportunities</h2>
//       {opportunities.length > 0 ? (
//         <ul>
//           {opportunities.map((opportunity) => (
//             <li key={opportunity.id}>{opportunity.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No opportunities found.</p>
//       )}
//     </div>
//   );
// };

// export default OpportunitiesList;


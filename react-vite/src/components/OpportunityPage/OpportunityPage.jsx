import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleOpportunity } from '../../redux/opportunities';
import Opportunity from '../Opportunity/Opportunity';

const OpportunityPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleOpportunity, loading, error } = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(fetchSingleOpportunity(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!singleOpportunity) return <div>Opportunity not found</div>; // Add this line

  return (
    <div>
      {/* Render the details of singleOpportunity */}
      {/* <h3>{singleOpportunity.name}</h3> */}
      <Opportunity opportunity={singleOpportunity} />
      {/* More details */}
    </div>
  );
};

export default OpportunityPage;

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchSingleOpportunity } from '../../redux/opportunities';
// import Opportunity from '../Opportunity/Opportunity';


// const OpportunityPage = ({ id }) => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { singleOpportunity, loading, error } = useSelector((state) => state.opportunities);

//   useEffect(() => {
//     dispatch(fetchSingleOpportunity(id));
//   }, [dispatch, id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   console.log("SINGLE OPP:", singleOpportunity);

//   return (
//     <div>
//       <Opportunity opportunity={singleOpportunity} />
//     </div>
//   );
// };

// export default OpportunityPage;



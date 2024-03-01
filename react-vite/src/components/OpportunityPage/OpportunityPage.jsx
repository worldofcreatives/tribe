// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchSingleOpportunity } from '../../redux/opportunities';
// import Opportunity from '../Opportunity/Opportunity';

// const OpportunityPage = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { singleOpportunity, loading, error } = useSelector((state) => state.opportunities);

//   useEffect(() => {
//     dispatch(fetchSingleOpportunity(id));
//   }, [dispatch, id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <Opportunity key={singleOpportunity.id} opportunity={singleOpportunity} />
//     </div>
//   );
// };

// export default OpportunityPage;


import { useEffect, useState } from 'react';
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

  console.log("SINGLE OPP:", singleOpportunity);

  return (
    <div>
      <Opportunity opportunity={singleOpportunity} />
    </div>
  );
};

export default OpportunityPage;




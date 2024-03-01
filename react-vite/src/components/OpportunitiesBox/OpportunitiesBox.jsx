const OpportunityBox = ({ opportunity }) => {
  return (
    <div className="opportunity-details">
      <h3>{opportunity.name}</h3>
      <p><strong>Budget:</strong> ${opportunity.budget}</p>
      <p><strong>Created Date:</strong> {new Date(opportunity.created_date).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {opportunity.description}</p>
      <p><strong>Genres:</strong> {opportunity.genres.length > 0 ? opportunity.genres.join(', ') : 'Any'}</p>
      <p><strong>Guidelines:</strong> {opportunity.guidelines}</p>
      <p><strong>Target Audience:</strong> {opportunity.target_audience}</p>
      <p><strong>Updated Date:</strong> {new Date(opportunity.updated_date).toLocaleDateString()}</p>
    </div>
  );
};

export default OpportunityBox;

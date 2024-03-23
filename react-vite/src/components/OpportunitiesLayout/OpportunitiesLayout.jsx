import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchOpportunities } from '../../redux/opportunities';
import OpportunityBox from '../OpportunitiesBox/OpportunitiesBox';
import './OpportunitiesLayout.css';

const GENRE_CHOICES = [
  { id: 1, name: "Afro" },
  { id: 2, name: "Country" },
  { id: 3, name: "Dancehall" },
  { id: 4, name: "Disco" },
  { id: 5, name: "Funk" },
  { id: 6, name: "Hip Hop" },
  { id: 7, name: "Latin" },
  { id: 8, name: "Neo Soul" },
  { id: 9, name: "Pop" },
  { id: 10, name: "R&B" },
  { id: 11, name: "Reggae" },
  { id: 12, name: "Rock" },
  { id: 13, name: "Other" },
];

const TYPE_CHOICES = [
  { id: 1, name: "Songwriter" },
  { id: 2, name: "Musician" },
  { id: 3, name: "Producer" },
  { id: 4, name: "Artist" },
];

const OpportunitiesLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for redirection
  const { opportunities, userStatus } = useSelector((state) => ({
    opportunities: state.opportunities.opportunities,
    userStatus: state.session.user.status // Assuming you have user status in your redux state
  }));
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState('');
  const [selectedTypeId, setSelectedTypeId] = useState('');

  useEffect(() => {
    dispatch(fetchOpportunities());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to "/apply" if user status is "Pre-Apply"
    if (userStatus === "Pre-Apply") {
      navigate('/apply');
    }
  }, [userStatus, navigate]); // Depend on userStatus and navigate


  useEffect(() => {
    let filtered = opportunities;

    if (searchQuery) {
      filtered = filtered.filter((opportunity) =>
        opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenreId) {
      filtered = filtered.filter((opportunity) =>
        opportunity.genres.some(genre => genre.id.toString() === selectedGenreId)
      );
    }

    if (selectedTypeId) {
      filtered = filtered.filter((opportunity) =>
        opportunity.types.some(type => type.id.toString() === selectedTypeId)
      );
    }

    // Sort by most recently added (assuming 'created_at' field exists)
    filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

    setFilteredOpportunities(filtered);
  }, [opportunities, searchQuery, selectedGenreId, selectedTypeId]);


  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenreId('');
    setSelectedTypeId('');
    // Automatically triggers a re-filter due to useEffect dependencies
  };

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
          <div className='search-second-row'>
          <select value={selectedGenreId} onChange={(e) => setSelectedGenreId(e.target.value)}>
            <option value="">Select Genre</option>
            {GENRE_CHOICES.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
          <select value={selectedTypeId} onChange={(e) => setSelectedTypeId(e.target.value)}>
            <option value="">Select Type</option>
            {TYPE_CHOICES.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          <button onClick={clearFilters}>Clear</button>
          </div>
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

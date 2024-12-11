import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch a random list of users
  const fetchCandidates = async () => {
    setLoading(true);
    setError('');
    try {
      const users = await searchGithub();
      if (users.length > 0) {
        await loadCandidateDetails(users[0].login); // Load the first user's details
      } else {
        setError('No candidates available.');
      }
    } catch (err) {
      setError('Failed to fetch candidates.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch details for a specific user
  const loadCandidateDetails = async (username: string) => {
    try {
      const userDetails = await searchGithubUser(username);
      setCurrentCandidate({
        name: userDetails.name || 'N/A',
        username: userDetails.login,
        location: userDetails.location || 'N/A',
        avatar_url: userDetails.avatar_url,
        email: userDetails.email || 'N/A',
        html_url: userDetails.html_url,
        company: userDetails.company || 'N/A',
      });
    } catch (err) {
      setError('Failed to load candidate details.');
    }
  };

  // Save the current candidate to localStorage and fetch the next one
  const saveCandidate = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(currentCandidate); // Add the new candidate
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
    fetchCandidates(); // Load the next candidate
  };

  // Skip the current candidate and fetch the next one
  const skipCandidate = () => {
    fetchCandidates();
  };

  useEffect(() => {
    fetchCandidates(); // Fetch candidates when the component mounts
  }, []);

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p>{error}</p>;
  if (!currentCandidate) return <p>No candidates to display.</p>;

  return (
    <div>
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img src={currentCandidate.avatar_url} alt={`${currentCandidate.name}'s avatar`} />
        <h3>{currentCandidate.name}</h3>
        <p><strong>Username:</strong> {currentCandidate.username}</p>
        <p><strong>Location:</strong> {currentCandidate.location}</p>
        <p><strong>Email:</strong> {currentCandidate.email}</p>
        <p><strong>Company:</strong> {currentCandidate.company}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
        <div className="candidate-actions">
          <button onClick={saveCandidate} className="green">+</button>
          <button onClick={skipCandidate} className="red">-</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;

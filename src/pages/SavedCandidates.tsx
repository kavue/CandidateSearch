import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index}>
              <img src={candidate.avatar_url} alt={candidate.username} width={50} />
              <h3>{candidate.name}</h3>
              <p><strong>Username:</strong> {candidate.username}</p>
              <p><strong>Location:</strong> {candidate.location}</p>
              <p><strong>Email:</strong> {candidate.email}</p>
              <p><strong>Company:</strong> {candidate.company}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;

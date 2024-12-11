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
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate: any, index: number) => (
              <tr key={index}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.username} width={50} />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.username}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email || 'Not provided'}</td>
                <td>{candidate.company}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;

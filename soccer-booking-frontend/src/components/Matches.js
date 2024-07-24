import React, { useState, useEffect } from 'react';
import { getMatches, createMatch, updateMatch, deleteMatch } from '../services/matchService';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchData, setMatchData] = useState({ date: '', time: '', location: '' });

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const result = await getMatches();
    setMatches(result.data);
  };

  const handleCreate = async () => {
    await createMatch(matchData);
    setMatchData({ date: '', time: '', location: '' });
    loadMatches();
  };

  const handleUpdate = async (id) => {
    await updateMatch(id, matchData);
    setSelectedMatch(null);
    setMatchData({ date: '', time: '', location: '' });
    loadMatches();
  };

  const handleDelete = async (id) => {
    await deleteMatch(id);
    loadMatches();
  };

  return (
    <div>
      <h1>Matches</h1>
      <ul>
        {matches.map(match => (
          <li key={match.id}>
            {match.date} - {match.time} - {match.location}
            <button onClick={() => { setSelectedMatch(match); setMatchData({ date: match.date, time: match.time, location: match.location }); }}>Edit</button>
            <button onClick={() => handleDelete(match.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedMatch ? (
        <div>
          <h2>Edit Match</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedMatch.id); }}>
            <input
              type="date"
              value={matchData.date}
              onChange={(e) => setMatchData({ ...matchData, date: e.target.value })}
            />
            <input
              type="time"
              value={matchData.time}
              onChange={(e) => setMatchData({ ...matchData, time: e.target.value })}
            />
            <input
              type="text"
              value={matchData.location}
              onChange={(e) => setMatchData({ ...matchData, location: e.target.value })}
              placeholder="Location"
            />
            <button type="submit">Update Match</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Create Match</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <input
              type="date"
              value={matchData.date}
              onChange={(e) => setMatchData({ ...matchData, date: e.target.value })}
            />
            <input
              type="time"
              value={matchData.time}
              onChange={(e) => setMatchData({ ...matchData, time: e.target.value })}
            />
            <input
              type="text"
              value={matchData.location}
              onChange={(e) => setMatchData({ ...matchData, location: e.target.value })}
              placeholder="Location"
            />
            <button type="submit">Create Match</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Matches;

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const DIVIDE_TEAMS = gql`
  query DivideTeams($matchId: Int!) {
    divideTeams(match_id: $matchId) {
      team1 {
        id
        username
        skill_level
      }
      team2 {
        id
        username
        skill_level
      }
      team3 {
        id
        username
        skill_level
      }
    }
  }
`;

const Teams = () => {
  const { matchId } = useParams();
  const { loading, error, data } = useQuery(DIVIDE_TEAMS, {
    variables: { matchId: parseInt(matchId) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Teams for Match {matchId}</h2>
      <div>
        <h3>Team 1</h3>
        <ul>
          {data.divideTeams.team1.map(player => (
            <li key={player.id}>{player.username} (Skill Level: {player.skill_level})</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Team 2</h3>
        <ul>
          {data.divideTeams.team2.map(player => (
            <li key={player.id}>{player.username} (Skill Level: {player.skill_level})</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Team 3</h3>
        <ul>
          {data.divideTeams.team3.map(player => (
            <li key={player.id}>{player.username} (Skill Level: {player.skill_level})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Teams;

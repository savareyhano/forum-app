import React from 'react';
import LeaderboardItem, { leaderboardItemShape } from './LeaderboardItem';
import PropTypes from 'prop-types';

function LeaderboardsList({ leaderboards }) {
  return (
    <div className="leaderboards-list">
      <header>
        <p className="leaderboards-list__user-label">Pengguna</p>
        <p className="leaderboards-list__score-label">Skor</p>
      </header>
      {leaderboards.map((leaderboard) => (
        <LeaderboardItem key={leaderboard.user.id} {...leaderboard} />
      ))}
    </div>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardItemShape))
    .isRequired,
};

export default LeaderboardsList;

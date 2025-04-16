import PropTypes from 'prop-types';
import React from 'react';

function LeaderboardItem({ user, score, authUser }) {
  const isCurrentUser = authUser === user.id;

  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item__user-info">
        <img src={user.avatar} alt={user.name} />
        <p>
          {user.name} {isCurrentUser && <em>(Anda)</em>}
        </p>
      </div>
      <p className="leaderboard-item__score">{score}</p>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const leaderboardItemShape = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number,
  authUser: PropTypes.string.isRequired,
};

LeaderboardItem.propTypes = leaderboardItemShape;

export { userShape, leaderboardItemShape };

export default LeaderboardItem;

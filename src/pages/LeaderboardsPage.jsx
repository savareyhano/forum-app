import React, { useEffect } from 'react';
import LeaderboardsList from '../components/LeaderboardsList';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  const leaderboardList = leaderboards.map((leaderboard) => ({
    ...leaderboard,
    authUser: authUser.id,
  }));

  return (
    <div className="board-page">
      <h2>Klasmen Pengguna Aktif</h2>
      <LeaderboardsList leaderboards={leaderboardList} />
    </div>
  );
}

export default LeaderboardsPage;

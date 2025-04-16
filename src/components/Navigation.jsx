import PropTypes from 'prop-types';
import React from 'react';
import { PiChartBar, PiChats, PiSignOut } from 'react-icons/pi';
import { useNavigate } from 'react-router';

function Navigation({ signOut }) {
  const navigate = useNavigate();

  const onClickGoToHomePage = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const onClickGoToLeaderboardsPage = (event) => {
    event.preventDefault();
    navigate('/leaderboards');
  };

  return (
    <div className="navigation-bottom">
      <nav>
        <button
          type="button"
          className="navigation-item"
          onClick={onClickGoToHomePage}
        >
          <div className="navigation-item__icon">
            <PiChats />
          </div>
          <p className="navigation-item__label">Threads</p>
        </button>
        <button
          type="button"
          className="navigation-item"
          onClick={onClickGoToLeaderboardsPage}
        >
          <div className="navigation-item__icon">
            <PiChartBar />
          </div>
          <p className="navigation-item__label">Leaderboards</p>
        </button>
        <button type="button" className="navigation-item" onClick={signOut}>
          <div className="navigation-item__icon">
            <PiSignOut />
          </div>
          <p className="navigation-item__label">Logout</p>
        </button>
      </nav>
    </div>
  );
}

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Navigation;

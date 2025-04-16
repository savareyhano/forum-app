import React, { useEffect } from 'react';
import Loading from './components/Loading';
import { Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import NewThreadPage from './pages/NewThreadPage';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <div className="app">
        <header>
          <Loading />
          <div className="top-bar">
            <h1>Dicoding Forum App</h1>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <Loading />
        <div className="top-bar">
          <h1>Dicoding Forum App</h1>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/new" element={<NewThreadPage />} />
        </Routes>
      </main>
      <footer>
        <Navigation signOut={onSignOut} />
      </footer>
    </div>
  );
}

export default App;

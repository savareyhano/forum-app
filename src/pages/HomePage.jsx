import React, { useEffect } from 'react';
import { PiPlusCircleFill } from 'react-icons/pi';
import { useNavigate } from 'react-router';
import CategoriesList from '../components/CategoriesList';
import ThreadsList from '../components/ThreadsList';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncDownvoteThread,
  asyncNeutralizeVoteThread,
  asyncUpvoteThread,
} from '../states/threads/action';
import { getUniqueCategories } from '../utils';
import { toggleCategoryFilterActionCreator } from '../states/categoryFilter/action';

function HomePage() {
  const navigate = useNavigate();

  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const categoryFilter = useSelector((state) => state.categoryFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const uniqueCategories = getUniqueCategories(threads);

  const filteredThreadList =
    categoryFilter === null
      ? threadList
      : threadList.filter((thread) => thread.category === categoryFilter);

  const onUpvote = (id) => {
    dispatch(asyncUpvoteThread(id));
  };

  const onDownvote = (id) => {
    dispatch(asyncDownvoteThread(id));
  };

  const onNeutralizeVote = (id) => {
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const onFilter = (category) => {
    dispatch(toggleCategoryFilterActionCreator(category));
  };

  const onClickGoToNewThread = (event) => {
    event.preventDefault();
    navigate('/new');
  };

  return (
    <section className="home-page">
      <header>
        <p>Kategori popular</p>
        <CategoriesList
          categories={uniqueCategories}
          filter={onFilter}
          selectedCategory={categoryFilter}
        />
      </header>
      <div className="home-page__content">
        <h2>Diskusi tersedia</h2>
        <ThreadsList
          threads={filteredThreadList}
          upvote={onUpvote}
          downvote={onDownvote}
          neutralizeVote={onNeutralizeVote}
        />
      </div>
      <button
        type="button"
        className="new-thread-button"
        onClick={onClickGoToNewThread}
      >
        <PiPlusCircleFill />
      </button>
    </section>
  );
}

export default HomePage;

import React, { useEffect } from 'react';
import ThreadDetail from '../components/ThreadDetail';
import ThreadDetailComment from '../components/ThreadDetailComment';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncAddComment,
  asyncDownvoteComment,
  asyncDownvoteThreadDetail,
  asyncNeutralizeVoteComment,
  asyncNeutralizeVoteThreadDetail,
  asyncReceiveThreadDetail,
  asyncUpvoteComment,
  asyncUpvoteThreadDetail,
  clearThreadDetailActionCreator,
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();

  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));

    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [id, dispatch]);

  const onAddComment = ({ content }) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpvoteThread = () => {
    dispatch(asyncUpvoteThreadDetail(id));
  };

  const onDownvoteThread = () => {
    dispatch(asyncDownvoteThreadDetail(id));
  };

  const onNeutralizeVoteThread = () => {
    dispatch(asyncNeutralizeVoteThreadDetail(id));
  };

  const onUpvoteComment = (commentId) => {
    dispatch(asyncUpvoteComment(commentId));
  };

  const onDownvoteComment = (commentId) => {
    dispatch(asyncDownvoteComment(commentId));
  };

  const onNeutralizeVoteComment = (commentId) => {
    dispatch(asyncNeutralizeVoteComment(commentId));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      <ThreadDetail
        {...threadDetail}
        authUser={authUser.id}
        upvote={onUpvoteThread}
        downvote={onDownvoteThread}
        neutralizeVote={onNeutralizeVoteThread}
      />
      <ThreadDetailComment
        addComment={onAddComment}
        comments={threadDetail.comments}
        authUser={authUser.id}
        upvote={onUpvoteComment}
        downvote={onDownvoteComment}
        neutralizeVote={onNeutralizeVoteComment}
      />
    </section>
  );
}

export default DetailPage;

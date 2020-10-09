import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, user, text, name, avatar, likes, comments, date, edited },
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='MM/DD/YY'>{date}</Moment>
        {edited && (
          <span>
            , Edited on <Moment format='MM/DD/YY'>{edited}</Moment> at{" "}
            <Moment format='h:mm a'>{edited}</Moment>
          </span>
        )}
      </p>
      {showActions && (
        <Fragment>
          <button
            type='button'
            className='btn btn-light'
            onClick={(e) => addLike(_id)}
          >
            <i className='fas fa-thumbs-up' />{" "}
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button
            type='button'
            className='btn btn-light'
            onClick={(e) => removeLike(_id)}
          >
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion{" "}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && auth.user._id === user && (
            <Fragment>
              <Link to={`/posts/edit/${_id}`} className='btn btn-dark'>
                Edit Post
              </Link>
              <button
                type='button'
                className='btn btn-danger'
                onClick={(e) => deletePost(_id)}
              >
                <i className='fas fa-times' />
              </button>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);

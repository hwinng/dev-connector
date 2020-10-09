import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost, updatePost } from "../../actions/post";
import Spinner from "../layout/Spinner";

const EditPost = ({
  getPost,
  updatePost,
  match,
  history,
  post: { post, loading },
  user,
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  useEffect(() => {
    !loading && post && setText(post.text);
  }, [loading, post]);

  const updPost = { text };

  const onSubmit = (e) => {
    e.preventDefault();
    updatePost(updPost, history, match.params.id);
  };
  return (
    <Fragment>
      {loading || !user || !post ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link className='btn btn-light my-1' to='/posts'>
            Back To Posts
          </Link>
          <div className='post-form'>
            <div className='bg-primary p'>
              <h3>Edit Post...</h3>
            </div>
            <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
              <textarea
                name='text'
                cols='30'
                rows='5'
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={user._id === post.user ? false : true}
              />
              {user._id === post.user && (
                <input
                  type='submit'
                  className='btn btn-dark my-1'
                  value='Update Post'
                />
              )}
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EditPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getPost, updatePost })(
  withRouter(EditPost)
);

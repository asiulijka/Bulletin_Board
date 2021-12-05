import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/postsRedux.js';

import styles from './Post.module.scss';

const Component = ({className, user, allPosts, children}) => {

  return (
    <div className={clsx(className, styles.root)}>
      <h2>---One Post page ---</h2>
      {user.isLoggedIn &&
        <h2>--Add page - Logged IN--</h2>
      }



    </div>
  );
};






// const Component = ({className, children}) => (
//   <div className={clsx(className, styles.root)}>
//     <h2>---Post---</h2>
//     {children}
//   </div>
// );


// const Component = ({className, children}) => (
//   <div className={clsx(className, styles.root)}>
//     <h2>Post</h2>
//     {children}
//   </div>
// );

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  // someAction: arg => dispatch(reduxActionCreator(arg)),
});

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  PostContainer as Post,
  Component as PostComponent,
};

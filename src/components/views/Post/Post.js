import React from 'react';
import PropTypes from 'prop-types';

import  { Link, Redirect } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, getPostDetails, fetchPost, getPostsLoadingState } from '../../../redux/postsRedux.js';

import styles from './Post.module.scss';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';


const Component = ({className, match: {params: {id}}, user, postDetails, fetchPost, postsLoadingState}) => {

  React.useEffect(() => {
    fetchPost(id);
  }, []);

  if (postsLoadingState.active){
    return (
      <Container sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  } else {

    if (!postDetails) {
      return (<Redirect to="/*" />);
    } else {
      return (
        <div className={clsx(className, styles.root)}>
                    
          {user.isLoggedIn && (user._id === postDetails.userId || user.type === 'admin') &&
            <Button variant="contained" sx={{ mt: 1 }} component={Link} to={`/post/${postDetails._id}/edit`}>Edit post</Button>
          }

          {postDetails.photo !== '' &&
            <ImageList sx={{ width: 500, height: 450 }} cols={1} rowHeight={164}>
              <ImageListItem>
                <img
                  src={postDetails.photo ? postDetails.photo : ''}
                  alt=""
                />
              </ImageListItem>
            </ImageList>
          }

          <p>Added on {postDetails.published}</p>
          <p>Last update: {postDetails.actualised}</p>

          <h1>{postDetails.title}</h1>
          <h3>Description</h3>
          <p>{postDetails.description}</p>

          {postDetails.price !== '' && postDetails.price !== null &&
            <h4>Price: $ {postDetails.price} </h4>
          }

          {postDetails.location !== '' && postDetails.location !== null &&
            <h4>Location: {postDetails.location}</h4>
          }

          <h4>Contact me via email: {postDetails.email}</h4>
          
          {postDetails.phone !== '' && postDetails.phone !== null &&
            <h4>Contact me via phone: {postDetails.phone}</h4>
          }
        </div>
      );
    }
  };
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
  // postDetails: PropTypes.object,
  fetchPost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  user: getUser(state),
  postDetails: getPostDetails(state, props.match.params.id),
  postsLoadingState: getPostsLoadingState(state),
});

const mapDispatchToProps = dispatch => ({
  // getPostDetails: id => dispatch(getPostDetails(id)),
  fetchPost: id => dispatch(fetchPost(id)),
});

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  PostContainer as Post,
  Component as PostComponent,
};

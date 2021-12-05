import React from 'react';
import PropTypes from 'prop-types';

import  { Redirect } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, getPostDetails } from '../../../redux/postsRedux.js';

import styles from './Post.module.scss';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';


const Component = ({className, user, postDetails, allPosts, children}) => {

  if (!postDetails) {
    return (<Redirect to="/*" />);
  } else {
    return (
      <div className={clsx(className, styles.root)}>
                  
        {user.isLoggedIn &&
          <Button variant="contained" sx={{ mt: 1 }} component={Link} to={`/post/${postDetails.id}/edit`}>Edit post</Button>
        }

        {postDetails.photo != "" &&
          <ImageList sx={{ width: 500, height: 450 }} cols={1} rowHeight={164}>
            <ImageListItem>
              <img
                src={postDetails.photo ? postDetails.photo : ""}
              />
            </ImageListItem>
          </ImageList>
        }

        <p>Added on {postDetails.published}</p>
        <p>Last update: {postDetails.actualised}</p>

        <h1>{postDetails.title}</h1>
        <h3>Description</h3>
        <p>{postDetails.description}</p>

        {postDetails.price != "" && postDetails.price != null &&
          <h4>Price: $ {postDetails.price} </h4>
        }

        {postDetails.location != "" && postDetails.location != null &&
          <h4>Location: {postDetails.location}</h4>
        }

        <h4>Contact me via email: {postDetails.email}</h4>
        
        {postDetails.phone != "" && postDetails.phone != null &&
          <h4>Contact me via phone: {postDetails.phone}</h4>
        }
      </div>
    );
  };
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  user: getUser(state),
  postDetails: getPostDetails(state, props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  // getPostDetails: id => dispatch(getPostDetails(id)),
});

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  PostContainer as Post,
  Component as PostComponent,
};

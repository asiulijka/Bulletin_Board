import React from 'react';
import PropTypes from 'prop-types';
import  { Link, Redirect } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, getUserPosts, fetchUserPosts, getPostsLoadingState } from '../../../redux/postsRedux.js';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './MyPosts.module.scss';

const Component = ({className, myPosts, user, postsLoadingState, fetchUserPosts }) => {

  React.useEffect(() => {
    fetchUserPosts(user.email);
  }, []);

  if (postsLoadingState.active){
    return (
      <Container sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  } else {
    if (!user.isLoggedIn) {
      return (<Redirect to="/*" />);
    } else {
      return (
        <div className={clsx(className, styles.root)}>
              <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5" component="div" gutterBottom>
                      My Posts
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button variant="contained" color="success" sx={{ mt: 1 }} component={Link} to={`/post/add`}>Add new</Button>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  myPosts.map((row) => (
                    <TableRow
                      key={row._id}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button variant="contained" sx={{ mt: 1 }} component={Link} to={`/post/${row._id}`}>Check details</Button>
                        
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
  };
};
 


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  user: getUser(state),
  myPosts: getUserPosts(state),
  postsLoadingState: getPostsLoadingState(state),
});

const mapDispatchToProps = dispatch => ({
  // someAction: arg => dispatch(reduxActionCreator(arg)),
  fetchUserPosts: email => dispatch(fetchUserPosts(email)),
});

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as MyPosts,
  MyPostsContainer as MyPosts,
  Component as MyPostsComponent,
};

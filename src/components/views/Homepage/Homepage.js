import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

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

import { connect } from 'react-redux';
import { getPublishedPosts, fetchAllPosts, getPostsLoadingState, fetchPost } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './Homepage.module.scss';

const Component = ({className, user, allPosts, fetchAllPosts, postsLoadingState}) => {

  React.useEffect(() => {
    fetchAllPosts();
  }, []);

  if (postsLoadingState.active){
    return (
      <Container sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  } else {
    return (
      <div className={clsx(className, styles.root)}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" component="div" gutterBottom>
                    Latest bulletins
                  </Typography>
                </TableCell>
                {user.isLoggedIn &&
                  <TableCell component="th" scope="row">
                    <Button variant="contained" color="success" sx={{ mt: 1 }} component={Link} to={`/post/add`}>Add new</Button>
                  </TableCell>
                }
              </TableRow>
            </TableHead>
  
            <TableBody>
              {
                allPosts.map((row) => (
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
  };
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
  postsLoadingState: PropTypes.object, 
  allPosts: PropTypes.array,
  fetchAllPosts: PropTypes.func,
  fetchPost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  allPosts: getPublishedPosts(state),
  user: getUser(state),
  postsLoadingState: getPostsLoadingState(state),
});

const mapDispatchToProps = dispatch => ({
  // someAction: arg => dispatch(reduxActionCreator(arg)),
  fetchAllPosts: () => dispatch(fetchAllPosts()),
  fetchPost: id => dispatch(fetchPost(id)),
});

const HomepageContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  HomepageContainer as Homepage,
  Component as HomepageComponent,
};

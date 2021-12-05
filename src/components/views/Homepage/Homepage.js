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

import { connect } from 'react-redux';
import { getPosts, getUser } from '../../../redux/postsRedux.js';

import styles from './Homepage.module.scss';

const Component = ({className, user, allPosts, children}) => {

  return (
    <div className={clsx(className, styles.root)}>
      
      {user.isLoggedIn &&
        <h2>--Homepage Logged IN--</h2>
      }

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
          {allPosts.map((row) => (
            <TableRow
              key={row.id}
  //                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell component="th" scope="row">
                <Button variant="contained" sx={{ mt: 1 }} component={Link} to={`/post/${row.id}`}>Check details</Button>
                
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>


    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  allPosts: getPosts(state),
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  // someAction: arg => dispatch(reduxActionCreator(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};

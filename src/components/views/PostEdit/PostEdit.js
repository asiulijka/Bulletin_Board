import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { getUser, getPostDetails } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';


const Component = ({className, user, postDetails}) => {
  
  if(postDetails) {
    if(user.isLoggedIn && (user.id == postDetails.userId || user.type == 'admin')){
      return(
        <div className={clsx(className, styles.root)}>
          <h2>change fields to update post</h2>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p>Add title</p>
                    <p> --At least 10 characters--</p>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      placeholder="Add title"
                      defaultValue={postDetails.title}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p>Add description</p>
                    <p> --At least 20 characters--</p>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      required
                      id="outlined-multiline-static"
                      label="Required"
                      multiline
                      rows={4}
                      placeholder="Add description"
                      defaultValue={postDetails.description}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p>Add email</p>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      placeholder="Add email"
                      defaultValue={postDetails.email}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">

                  </TableCell>
                  <TableCell component="th" scope="row">

                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <h5>-Not Required-</h5>
          <h5>Add the below to make your post more interesting</h5>
            
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p>Add price</p>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <OutlinedInput
                      id="outlined-basic"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      placeholder="Add price"
                      defaultValue={postDetails.price ? postDetails.price : ""}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p>Add phone number</p>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField 
                      id="outlined-basic" 
                      label="Add phone" 
                      placeholder="Add phone number"
                      defaultValue={postDetails.phone ? postDetails.phone : ""}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p>Add location</p>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField 
                      id="outlined-basic" 
                      label="Add location" 
                      placeholder="Add location"
                      defaultValue={postDetails.location ? postDetails.location : ""}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p>Add attachment</p>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      multiple
                      type="file"
                    />
                    <label htmlFor="raised-button-file">
                      <Button variant="outlined" component="span">
                        Change photo
                      </Button>
                    </label> 
                    <Typography component='div' variant="p">
                      Current picture: {postDetails.photo ? postDetails.photo : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">

                  </TableCell>
                  <TableCell component="th" scope="row">

                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant="contained" sx={{ mt: 1 }} component={Link} to={`/`}>Cancel</Button>
          <Button variant="contained" sx={{ mt: 1 }} >Save as draft</Button>
          <Button variant="contained" sx={{ mt: 1 }} >Publish</Button>

        </div>
      );
    } else {
      return (
        <div className={clsx(className, styles.root)}>
          <h2>You are not permitted to do changes to this post</h2>
        </div>
      );
    };
  } else {
    return (
      <div className={clsx(className, styles.root)}>
        <h2>No post found under given ID</h2>
      </div>
    );
  }
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

const PostEditContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  PostEditContainer as PostEdit,
  Component as PostEditComponent,
};

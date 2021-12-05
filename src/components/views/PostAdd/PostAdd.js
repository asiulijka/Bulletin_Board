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
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/postsRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({className, user}) => {
  const [validationError, setValidationError] = React.useState(
    {title: true, description: true, email: true});
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [email, setEmail] = React.useState("");

  const areAllValuesOk = () => {
    const allOk = Object.values(validationError).every(e => e === false);
    console.log('areAllValuesOk: ', allOk);
    return allOk;
  };

  if(user.isLoggedIn){
    return(
      <div className={clsx(className, styles.root)}>
        <h2>Fill in required fields to add new post</h2>

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
                    error={title.length < 10}
                    onChange={event => {
                      setTitle(event.target.value);
                      setValidationError(
                        {
                          ...validationError, 
                          title: title.length < 9,
                        });
                    }}
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
                    error={description.length < 20}
                    onChange={event => {
                      setDescription(event.target.value);
                      setValidationError(
                        {
                          ...validationError, 
                          description: description.length < 19,
                        });
                    }}
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
                    error={!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))}
                    onChange={event => {
                      setEmail(event.target.value);
                      setValidationError(
                        {
                          ...validationError, 
                          email: !(/(.+)@(.+){2,}\.(.+){2,}/.test(email)),
                        });
                    }}
                  />
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell component="th" scope="row">

                </TableCell>
                <TableCell component="th" scope="row">

                </TableCell>
              </TableRow> */}
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
                      Upload photo
                    </Button>
                  </label> 
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell component="th" scope="row">

                </TableCell>
                <TableCell component="th" scope="row">

                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" sx={{ mt: 1 }} component={Link} to={`/`}>Cancel</Button>
        <Button variant="contained" disabled={!areAllValuesOk()} sx={{ mt: 1 }} >Save as draft</Button>
        <Button variant="contained" disabled={!areAllValuesOk()} sx={{ mt: 1 }} >Publish</Button>

      </div>
    );
  } else {
    return (
      <div className={clsx(className, styles.root)}>
        <h2>Please log in to access this page</h2>
      </div>
    );
  };
};

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

const PostAddContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  PostAddContainer as PostAdd,
  Component as PostAddComponent,
};

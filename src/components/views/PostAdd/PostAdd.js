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
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { addPost } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({className, user, addPost}) => {
  const [validationError, setValidationError] = React.useState(
    {title: true, description: true, email: false});
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [email, setEmail] = React.useState(user.email);  // email is not changable and pulled from logged-in user's email
  const [price, setPrice] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [attachment, setAttachment] = React.useState('');
  const [status, setStatus] = React.useState('');

  const history = useHistory();

  const areAllValuesOk = () => {
    const allOk = Object.values(validationError).every(e => e === false);
    return allOk;
  };

  const publish = async () => {
    setStatus('published');
    const payload = {
      title: title,
      description: description,
      published: new Date().toISOString(),
      actualised: new Date().toISOString(),
      email: email,
      status: 'published',
      photo: attachment,
      price: price,
      phone: phone,
      location: location,
    };
    await addPost(payload);
    history.push('/post/myposts');
  };

  const saveDraft = async () => {
    setStatus('draft');
    const payload = {
      title: title,
      description: description,
      published: new Date().toISOString(),
      actualised: new Date().toISOString(),
      email: email,
      status: 'draft',
      photo: attachment,
      price: price,
      phone: phone,
      location: location,
    };
    await addPost(payload);
    history.push('/post/myposts');
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
                    value={user.email}
                  />
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
                    onChange={event => setPrice(event.target.value)}
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
                    onChange={event => setPhone(event.target.value)}
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
                    onChange={event => setLocation(event.target.value)}
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
                    onChange={event => setAttachment(event.target.value)}
                  />
                  <label htmlFor="raised-button-file">
                    <Button variant="outlined" component="span">
                      Upload photo
                    </Button>
                  </label> 
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" onClick={() => history.goBack()} sx={{ mt: 1 }} >Cancel</Button>
        <Button variant="contained" onClick={() => saveDraft()} disabled={!areAllValuesOk()} sx={{ mt: 1 }} >Save as draft</Button>
        <Button variant="contained" onClick={() => publish()} disabled={!areAllValuesOk()} sx={{ mt: 1 }} >Publish</Button>

      </div>
    );
  } else {
    return (
      <div className={clsx(className, styles.root)}>
        <h2>Please log in to access this page</h2>
      </div>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
  addPost: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
});

const PostAddContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  PostAddContainer as PostAdd,
  Component as PostAddComponent,
};

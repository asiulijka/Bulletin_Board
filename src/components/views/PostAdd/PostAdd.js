import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({className, isLoggedIn, children}) => {
  if(isLoggedIn){
    return(
      <div className={clsx(className, styles.root)}>
        <h2>Fill in required fields to add new post</h2>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Add title"
              helperText="Add title - min 10"
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-multiline-static"
              label="Required"
              multiline
              rows={4}
              defaultValue="Add description"
              helperText="Add description - min 20"
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Add email"
              helperText="Add email"
            />
          </div>
          <h5>-Not Required-</h5>
          <h5>Add the below to make your post more interesting</h5>

          {/* <div>
            <TextField 
              id="outlined-basic" 
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Outlined" 
              variant="outlined" 
              defaultValue="Add price"
            />
          </div> */}
          <div>
            <FormControl>
            {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel> */}
            <OutlinedInput
              id="outlined-basic"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              // label="Amount"
              defaultValue="Add price"
              variant="outlined"
            />
            </FormControl>
          </div>
          <div>
            <TextField 
              id="outlined-basic" 
              label="Outlined" 
              variant="outlined" 
              defaultValue="Add phone number"
            />
          </div>
          <div>
            <TextField 
              id="outlined-basic" 
              label="Outlined" 
              variant="outlined" 
              defaultValue="Add location"
            />
          </div>

          <div>
            <input
              accept="image/*"
              // className={classes.input}
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
          </div>

        </Box>
        <Button variant="contained" sx={{ mt: 1 }} >Cancel</Button>
        <Button variant="contained" sx={{ mt: 1 }} >Save as draft</Button>
        <Button variant="contained" sx={{ mt: 1 }} >Publish</Button>



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




// const Component = ({className, children}) => (
//   <div className={clsx(className, styles.root)}>
//     <h2>PostAdd</h2>
//     {children}
//   </div>
// );

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};

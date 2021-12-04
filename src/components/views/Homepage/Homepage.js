import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
// import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

// import { MainLayout } from '../../layout/MainLayout/MainLayout';

import styles from './Homepage.module.scss';


const Component = ({className, isLoggedIn, children}) => {

  // const responseGoogle = (response) => {
  //   console.log(response);
  // }



  
  const demoContent = [
    {
      id: 'gfdhfgn',
      title: 'Test Title #1',
      description: 'Test description #1',
      published: "2021-12-03",
      actualised: "2021-12-04",
      email: 'jo@test.com',
      status: 'published',
      photo: null,
      price: null,
      phone: null,
      location: null
    },
    {
      id: '154512485',
      title: 'Test Title #2',
      description: 'Test description #2',
      published: "2021-12-03",
      actualised: "2021-12-04",
      email: 'jo@test.com',
      status: 'published',
      photo: null,
      price: null,
      phone: null,
      location: null
    },
    {
      id: 'szhfbxn',
      title: 'Test Title #3',
      description: 'Test description #3',
      published: "2021-12-03",
      actualised: "2021-12-04",
      email: 'jo@test.com',
      status: 'published',
      photo: null,
      price: null,
      phone: null,
      location: null
    },
  ];
  


  if(isLoggedIn){
    return (
      <div className={clsx(className, styles.root)}>
        <h2>--Homepage Logged IN--</h2>
        {/* {children} */}
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Latest bulletins</TableCell>
                {/* <TableCell align="right"></TableCell> */}
                <TableCell component="th" scope="row">
                  <Button variant="contained" color="success" sx={{ mt: 1 }} component={Link} to={``}>Add new</Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            {demoContent.map((row) => (
                <TableRow
                  key={row.id}
  //                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button variant="contained" sx={{ mt: 1 }} component={Link} to={``}>Check details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


      </div>
    );


  } else {
    return (
      <div className={clsx(className, styles.root)}>
        <h2>--Homepage NOT LOGGED IN--</h2>
        {/* {children} */}
          <div>
            <p>Please log in</p>
            {/* <Button variant="contained" sx={{ mt: 1 }} component={Link} to={`${process.env.PUBLIC_URL}/`}> */}
            {/* <Button variant="contained" sx={{ mt: 1 }} component={Link} to={``}>
              Login
            </Button> */}
            <GoogleLogin
              // onClick={() => { console.log('Google button clicked') }}
              // component={Link} to={``}
              // clientId=""
              // buttonText="Login"
              // onSuccess={responseGoogle}
              // onFailure={responseGoogle}
            />
          </div>
      </div>
    )
  }
};



// const Component = ({className, isLoggedIn, children}) => {
//   return (
//     <div className={clsx(className, styles.root)}>
//       <Header isLoggedIn={isLoggedIn} />
//       {children}
//     </div>
//   )
// };

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
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};

// src/App.js
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CalendarAdmin from './components/CalenderAdmin';
import CalendarStudent from './components/CalenderStudent';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseurl, listUsersAndGetIds } from './utils';
import UserTypeSelector from './components/UserTypeSelector';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A249D'
    },
    secondary: {
      main: '#009FBD'
    },
    tertiary: {
      main: '#F9E2AF'
    },
    green: {
      main: '#03ab1d'
    }
  },
  typography: {
    h1: {
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});



function App() {

  const [adminId, setAdminId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [userType, setUserType] = useState('admin');
  const [isuserTypeSelected, setIsUserTypeSelected] = useState(false);

  useEffect(()=>{
    listUsersAndGetIds(baseurl)
    .then(({ adminId, studentId }) => {
      setAdminId(adminId)
      setStudentId(studentId)
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
  },[])

  
  return (
    <ThemeProvider theme={theme}>
      { !isuserTypeSelected ?
        <UserTypeSelector {...{userType, setUserType, setIsUserTypeSelected}}/> :
        <>
        {
          adminId && studentId && 
          <>
            {userType=='admin' && <CalendarAdmin {...{adminId, studentId, setIsUserTypeSelected}}/>}
            { userType=='student' && <CalendarStudent {...{adminId, studentId, setIsUserTypeSelected}}/>}
            <ToastContainer />
          </>
        }</>
      }
      
      
    </ThemeProvider>
  );
}

export default App;

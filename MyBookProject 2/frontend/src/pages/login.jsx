import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apis from '../api';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Bookmanagment
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();



export default class SignIn extends React.Component
{
    constructor(props)
    {
      super(props)
      this.state = {
          email:'',
          password:'',

          redirectAdmin:false,
          redirectUser:false
    }
  }


  handleEmailChange = async event => {
      const email = event.target.value      
      this.setState({email})   
    }


  handlePasswordChange = async event => {
      const password = event.target.value
      this.setState({password})
     
    }

  handleMatch = () =>
  {
      if(this.state.email === 'admin' && this.state.password ==='12345')
      {
          window.alert('Admin login successful');
          this.setState({redirectAdmin:true});
      }

      else if(this.state.email === 'admin')
      {
        window.alert("Incorrect password of admin");
      }

      else{
        apis.getUserbyEmail(this.state.email).then( result => {
          // console.log("RESULT:",result)
          if(result.data.success)
          {
            if(this.state.password === result.data.data.password)
            {
              window.alert("User succesfully login"); 
              this.setState({redirectUser:true})
              
            }
            else
            {
              window.alert("incorrect password of user"); 
            }
          }
          else
          {
            window.alert("User does not exist, please sign up first!");
          }

            
        }).catch  ( (error) => {
              console.log(error)
        })
      }
     
  }





  render()
  {
    return (
      <div> 
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={ this.handleEmailChange}
              autoFocus
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ this.handlePasswordChange}  
            />


            {
              this.state.redirectAdmin ?
                <Navigate to='/adminhome' />

              :
                this.state.redirectUser ?
                  <Navigate to='/userhome' />
                :

                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.handleMatch} > Sign In </Button> 

            }


              
            <Grid container>
              <Grid item>
                <Link href="http://localhost:8000/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}
}





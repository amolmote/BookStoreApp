import api from '../api'
import * as React from 'react';
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

const theme = createTheme();



export default class SignUp extends React.Component{
  constructor(props)
  {
    super(props)
      this.state = {
          firstname:'',
          lastname:'',
          email:'',
          password:'',
     }
  }

  handleFirstNameChange = async event => {
    const firstname = event.target.value
    this.setState({firstname})
  }


  handleLastNameChange = async event => {
    const lastname = event.target.value
    this.setState({lastname})
  }


  handleEmailChange = async event => {
    const email = event.target.value
    this.setState({email})
  }


  handlePasswordChange = async event => {
    const password = event.target.value
    this.setState({password})
  }


  handleAddUser = () => 
  {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    if(this.state.firstname === ""){
      alert("please enter first name")
       
    }
   else if(this.state.lastname === ""){
    alert("please enter last name")
      
  }
    else if(this.state.firstname.length < 2){
      alert("please enter more than 2 characher")
       
    }
    else if(this.state.lastname.length < 2){
      alert("please enter more than 2 characher")
     
  }
    
    else if(!emailRegex.test(this.state.email)){alert("Please Enter a Valid Email")}
    else if(this.state.password === ""){alert("Please Enter Password")}
    else if(this.state.password.length  < 3){alert("Password Should be 3 char Long")}
   
    
    else
    {
      api.getUserbyEmail(this.state.email).then(result => {          //not sign up if there are already registered
        console.log(result)
        if(!result.data.success){                            //result.data.success false then user not exits so usr registed succesfull.
              api.adduser(this.state).then( () => {
                window.alert("User registered successfully")
                  this.setState
                  ({
                      firstname:'',
                      lastname:'',
                      email:'',
                      password:'',
                  })
              }
            )
         }
         else
         {
           window.alert("Email already exists!")
         }
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
                Sign up
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={this.handleFirstNameChange}
                  value={this.state.firstname}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={this.handleLastNameChange}
                  value={this.state.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={this.handleAddUser}
            >
              Sign Up

            </Button>
            <Grid container justifyContent="flex-end" >
              <Grid item>
                <Link href="http://localhost:8000/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
    )
  }
}
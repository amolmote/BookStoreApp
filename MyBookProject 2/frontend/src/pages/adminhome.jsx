import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apis from '../api';
        
       
        const theme = createTheme();
        export default class AdminHome extends React.Component
        {
          constructor(props)
          {
            super(props)
            this.state = {
                bookid:'',
                name:'',
                author:'',
                quantity:'',
           }
          }
          

          handleBookIdChange = async event => {
            const bookid = event.target.value
            this.setState({bookid})
            // console.log("setstate",this.state)
          }
        
        
          handleBookNameChange = async event => {
            const name = event.target.value
            this.setState({name})
            // console.log("setstate",this.state)
          }


          handleBookAuthorChange = async event => {
            const author = event.target.value
            this.setState({author})
            // console.log("setstate",this.state)
          }
        
        
          handleBookQuantityChange = async event => {
            const quantity = event.target.value
            this.setState({quantity})
            // console.log("setstate",this.state)
          }


          handleAddBook = async () =>  {
            await apis.addBook(this.state).then(result =>
                {
                    window.alert("Book added successfully");
                    this.setState ({
                        bookid:'',
                        name:'',
                        author:'',
                        quantity:'',
                    })
                })
         }




          render()
          {
            return (
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
                         
                  </Typography>


                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="bookid"
                      label="Book ID"
                      name="bookid"
                      autoComplete="bookid"
                      value={this.state.bookid}
                      autoFocus
                      onChange={ this.handleBookIdChange}
                    />


                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="name"
                      label="Book Name"
                      type="name"
                      id="name"
                      value={this.state.name}
                        onChange={ this.handleBookNameChange}  
                    />
                    



                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="author"
                      label="Book Author"
                      type="author"
                      id="author"
                      value={this.state.author}
                     onChange={ this. handleBookAuthorChange }  
                    />



                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="quantity"
                      label="Book Quantity"
                      type="quantity"
                      id="quantity"
                      value={this.state.quantity}
                     onChange={ this.handleBookQuantityChange }  
                    />

                  
                    <Button fullWidth variant="contained" sx={{ mt: 3 }}
                     onClick={this.handleAddBook}
                    > ADD BOOK</Button>


                  <Button component={Link} to="/adminbooks"  variant="contained" sx={{ mt: 3 , width: '46%', mr:3.5}}
                    > LIST OF BOOKS</Button>


                    <Button component={Link} to="/requestlist"  variant="contained" sx={{ mt: 3, width:'46%'}}
                    > SEE ALL REQUESTS </Button>

                    
                      
        
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          );
        } }
        
        

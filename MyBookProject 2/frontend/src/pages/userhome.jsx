import React, { Component } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { deepPurple, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import apis from '../api';
import Grid from '@mui/material/Grid';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import TextField from '@mui/material/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { Link, Navigate } from 'react-router-dom';


const theme = createTheme();

const dayArray = Array.from(Array(30).keys(),(i) => i + 1)    // dayArray = [1,2,3,4,5,.....30]   // keys matlab index


class UserHome extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            books:[],                   //result.data will be array of books, hence this is initialised to empty array

            filteredBooks:[],           //serach

            popup:false,

            currentBookId:"",
            currentName:"",
            currentEmail:"",
            currentDays:"",
            
            alert:false,
            
        }
    }

    getbook = () =>
    {
        apis.getBooks().then ( (result) => {
            // console.log(result)
            this.setState({books : result.data})        //initially books and filterbooks have all data of books

            this.setState({filteredBooks : result.data})
        }).catch( (err) => {
            console.log(err) 
        }) 
    }
          
    componentDidMount ()                
    {
        this.getbook()
    }


  //  'priyanka'.includes('py') => false
    handleSearch = (event) => {
        console.log(event.target.value)
        const filtered = this.state.books.filter( book => book.name.toLowerCase().includes(event.target.value.toLowerCase()))
        this.setState({filteredBooks:filtered})

    }


    handleLike = (bookid,booklikes) => {    
        apis.updateBookLike(bookid,{likes:parseInt(booklikes)+1}).then(() => {
            this.getbook()
            console.log("Likes updated!")
        }).catch(err => {
            console.log(err)
        })
    }


    handleOpen = (book) => {   
        this.setState({
            popup:true,

            currentBookId:book.bookid,
            currentName:book.name,
        })
    }

    handleClose = () => {
        this.setState({popup:false})
    }


    handleEmailChange = (event) => {
        this.setState({currentEmail:event.target.value})
    }

    
    handleDaysChange = (event) => {
        this.setState({currentDays:event.target.value})
    }
    

    handleSubmitRequest = () => {

        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

        console.log(date)

        const newRequest = {                        //here i store all  data which i want to post,payload that data into newbook
            useremail:this.state.currentEmail,
            bookid:this.state.currentBookId,
            bookname:this.state.currentName,
            status:'requested',
            requestDate:date,
            acceptDate:"",
            numberOfDays:this.state.currentDays
        }

        apis.addRequest(newRequest).then(()=>{
            //window.alert("Request sent successfully")
            this.setState({popup:false,currentEmail:"",currentDays:"",currentName:"",alert:true})
        }).catch((err)=>{
            console.log(err)
        })
    }


    handleAlertClose = () => {
        this.setState({alert:false})
    }

    render() 
    {
        const action = (
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleAlertClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          );


        return (
        
        <div style={{height:'100vh',backgroundColor:"antiquewhite"}}>

        <div style={{backgroundColor:"antiquewhite",paddingLeft:'25%',paddingRight:'25%'}}>
        <TextField style={{backgroundColor:'white', borderRadius:'0%'}}
            variant="filled"
            margin="normal"
            id="searchTerm"
            label="Search books"
            name="searchTerm"
            // autoFocus
            fullWidth
            onChange={this.handleSearch}
            InputProps={{
            endAdornment: (
                <InputAdornment>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                </InputAdornment>
            )
            }}
        />


       
        </div>

        
        <Snackbar
            open={this.state.alert}
            autoHideDuration={2000}
            onClose={this.handleAlertClose}
            message="Request submitted."
            action={action}
        />

        <Dialog open={this.state.popup} onClose={this.handleClose} PaperProps={{
            style: {
            backgroundColor: 'lightcyan',
            boxShadow: '20px',
            borderRadius:'10px'
            },
        }}> 
            <DialogTitle>Issue Book</DialogTitle>

            <DialogContent>
            <DialogContentText>
                You're requesting for: <b>{this.state.currentName}</b>
            </DialogContentText>
            
            <DialogContentText style={{marginTop:'10px'}}>
                Please enter the following details:
            </DialogContentText>
            <ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >

             
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="currentEmail"
                      label="Email"
                      name="currentEmail"
                      value = {this.state.currentEmail}
                      onChange={this.handleEmailChange}
                      autoFocus
                      
                    />
                    <FormControl sx={{ minWidth: 400 }}>
                    <InputLabel id="demo-simple-select-standard-label">Days</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-helper"
                    label="days"
                    onChange={this.handleDaysChange}
                    >


                        {   
                            dayArray.map(i => {
                                return (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                                )
                            })
                        }   

                    </Select>
                    </FormControl>      
                  </Box>
                </Box>            
              </Container>
            </ThemeProvider>
            </DialogContent>


            <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button variant="contained" onClick={this.handleSubmitRequest}>Request</Button>
            </DialogActions>
        </Dialog>


        

            

        <Grid item xs={12} style={{backgroundColor:"antiquewhite", padding:'50px'}}>                
        <Grid container justifyContent="center" spacing={3}>
        
        {this.state.filteredBooks.map((book) => (

           <Grid key={book.bookid} item>
            
                <Card sx={{ ':hover': {boxShadow:20} , width: 300 }} style={{backgroundColor:"azure", borderRadius:'20px'}}>
                    <CardHeader
                        
                        avatar={
                        <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="recipe">
                            {book.name.charAt(0)}
                        </Avatar>
                        }
                        
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title={book.name}
                        subheader=""
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">                         
                        Author: {book.author}           
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                        {book.quantity} copies currently available.
                        </Typography>
                    </CardContent>  




                    <CardActions disableSpacing>                       
                        <IconButton aria-label="Like" onClick={ () => this.handleLike(book.bookid , book.likes)}>
                        <FavoriteIcon />
                        </IconButton>
                        <Typography variant="body1" color="text.secondary">
                            {book.likes}
                        </Typography>

                        <IconButton aria-label="Issue" onClick={() => this.handleOpen(book)}>
                        <ArrowCircleDownIcon/>
                        </IconButton>
                    </CardActions>
        
                </Card>
            </Grid>
        ))}

        <Button component={Link} to="/login"  sx={{ml : 2, width: '46%', mr:3.5}}
                    > LOG OUT</Button>

       </Grid>
        </Grid>
        </div>
        )
    }
}

export default UserHome
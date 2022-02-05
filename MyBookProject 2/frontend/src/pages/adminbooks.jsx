import * as React from 'react';
// import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom';
import api from '../api'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme();


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));




class AdminBooks extends React.Component {
    constructor(props)
    {
        super(props)

        this.state = {
            books : [],                         //array of book which is used for store data of books because result  is come in json array form thats why we take books array

            popup: false,                       // this is used for show update popup

            currentBookId: '',
            currentBookName: '',
            currentAuthor: '',
            currentQuantity: '',

            filteredBooks : []                  //serach books

        }
    }
     

    componentDidMount () {
        this.getBooks()
    }
    

    getBooks = async () => {
        api.getBooks().then (result => {
            console.log(result.data)

            this.setState({books:result.data})

            this.setState({filteredBooks:result.data})

        })
    }


    handleBookNameChange = async (event) =>
    {
      const currentBookName = event.target.value
      this.setState({currentBookName})
    }

    handleBookAuthorChange = async (event) =>
    {
      const currentAuthor = event.target.value
      this.setState({currentAuthor})
    }

    handleBookQuantityChange = async (event) =>
    {
      const currentQuantity = event.target.value          // event.target.value  is use for show value which we pass in input box 
      this.setState({currentQuantity})                    // this.setState  state ni value update krto rese....means event.tareget.value thi aaveli value set kri dese.
    }



    handleOpen = (bookObject) => {
      this.setState({
        currentBookId : bookObject.bookid,                    // we are using map here so one by one book data come here
        currentBookName : bookObject.name,
        currentAuthor : bookObject.author,
        currentQuantity : bookObject.quantity
      })
      this.setState({popup:true})
    }


    handleUpdateBook = async () => {
      
      const newBook = {                                 /// here new book is payload which we use when we want to update book detail.
        name:       this.state.currentBookName,
        author:     this.state.currentAuthor,
        quantity:   this.state.currentQuantity
      }
       
      await api.updateBook(this.state.currentBookId,newBook).then((result)=>{
        window.alert('Book details updated successfully!')
        this.getBooks()
        this.setState({popup:false})
      }).catch((error)=>{
        console.log(error)
      })
    }




    handleDeleteBook = async (id) => { 
      await api.deleteBook(id).then(() =>{
        this.getBooks()
        window.alert("Book successfully deleted!")
      }).catch((error)=>{
        console.log(error)
      })
    }




    handleClose  = () => {
      this.setState({popup:false})
    }



    handleSearch = (event) => {
      console.log(event.target.value)

      const filteredBooks = this.state.books.filter( book => book.name.toLowerCase().includes(event.target.value))
      
      this.setState({filteredBooks:filteredBooks})
    }
    

    
    render() {


        return (
            <div>

            <div style={{justifyContent :'center'}}>
            <TextField
                      margin="normal"
                      id="searchTerm"
                      label="Search books"
                      name="searchTerm"
                      autoFocus
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
            


            <div style = {{paddingLeft : '5em',paddingRight : '5em',paddingBottom: '5em',marginTop :'1em'}}>
            <Dialog open={this.state.popup} onClose={this.handleClose}>
              <DialogTitle>Update Book Data</DialogTitle>
              <DialogContent>
                    

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

             
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      disabled
                      margin="normal"
                      required
                      fullWidth
                      id="currentBookId"
                      label="Book ID"
                      name="currentBookId"
                      value = {this.state.currentBookId}
                      autoFocus
                      
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="currentBookName"
                      label="Book Name"                    
                      id="currentBookName"
                      value = {this.state.currentBookName}
                        onChange={ this.handleBookNameChange}  
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="currentAuthor"
                      label="Book Author"                  
                      id="currentAuthor"
                      value = {this.state.currentAuthor}
                     onChange={ this. handleBookAuthorChange }  
                    />



                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="currentQuantity"
                      label="Book Quantity"
                      id="currentQuantity"
                      value = {this.state.currentQuantity}
                     onChange={ this.handleBookQuantityChange }  
                    />
                    
                      
                  
                  </Box>
                </Box>
                
              </Container>
            </ThemeProvider>
            


              </DialogContent>


              <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button onClick={this.handleUpdateBook}>Update</Button>
              </DialogActions>
            </Dialog>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700}} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">Book Id</StyledTableCell>
                        <StyledTableCell align="right">Book Name</StyledTableCell>
                        <StyledTableCell align="right">Author</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Update</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.filteredBooks.map((book) => (
                        <StyledTableRow key={book.bookid}>
                         <StyledTableCell align="right">{book.bookid}</StyledTableCell>
                        <StyledTableCell align="right">{book.name}</StyledTableCell>
                        <StyledTableCell align="right">{book.author}</StyledTableCell>
                        <StyledTableCell align="right">{book.quantity}</StyledTableCell>
                        <StyledTableCell align="right"><IconButton onClick={() => this.handleOpen(book)}><EditIcon color="primary" /></IconButton></StyledTableCell>
                        <StyledTableCell align="right"><IconButton onClick={() => this.handleDeleteBook(book.bookid)}><DeleteIcon color="primary" /></IconButton></StyledTableCell>
                        
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>

            </div>
            </div>
        )}}


export default AdminBooks
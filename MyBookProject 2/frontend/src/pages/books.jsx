import * as React from 'react';
// import React, { Component } from 'react'
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
import { padding } from '@mui/system';


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

  
class Books extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            books : [],

        }
    }
    
    componentDidMount () {             // allow us to execute the react code when the component is already placed in DOM(Document object model)
        this.getBooks()
    }
    
    getBooks = async () => {

        api.getBooks().then( result => {
            console.log(result.data)
            this.setState({books:result.data})
        })
    }
    
    
    render() {
        return (
          <div>

          <div style={{marginLeft: '1em',marginRight :'1em'}}>
            <h3 style={{textAlign: 'center',color:'black',marginTop:'1em',backgroundColor :'lightblue'}}> List of All Books</h3>
          </div>
            <div style={{margin : '1em'}}>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 700}} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Book Id</StyledTableCell>
                        <StyledTableCell align="center">Book Name</StyledTableCell>
                        <StyledTableCell align="center">Author</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>

                    {this.state.books.map((book) => (                                   //map is using for iteration and book is like object of books of array
                        <StyledTableRow key={book.name}>
                        <StyledTableCell component="th" scope="row"> {book.bookid} </StyledTableCell>
                        <StyledTableCell align="center">{book.name}</StyledTableCell>
                        <StyledTableCell align="center">{book.author}</StyledTableCell>
                        <StyledTableCell align="center">{book.quantity}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
            </div>
        )}}


export default Books
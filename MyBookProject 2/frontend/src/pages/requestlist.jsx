import { style } from '@mui/system'
import React, { Component } from 'react'
import apis from '../api'
// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import emailjs from '@emailjs/browser';


class RequestList extends Component 
{
        constructor(props)
        {
            super(props)
            this.state={

                requests : []
            }
        }


   componentDidMount()
   {
        this.getIssueRequest()
   }
   

   getIssueRequest = async ()  => {
        await apis.getIssueRequest().then( (result) => {

            const filtered = result.data.data.filter(req => req.status.includes('requested'))

             this.setState({requests : filtered})
            console.log(result);
        }).catch( (err) => {
            console.log(err)
        })
   }
   

   handleAccept = (id,email,bookname) =>
   { 
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

        apis.statusUpdate(id,email,{status : "accepted" , acceptDate : date }).then( (result) => {

                //code to send email
                // syntax: emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', parameters, 'YOUR_USER_ID')

                const template_params = {
                  to_email : email,
                  message:'Your issue request for the book titled ' + bookname + ' has been accepted by the administration. Hope you have a good read!'
                }
                
                emailjs.send('service_ax2soxx', 'template_a4f9h8r', template_params, 'user_6EEHYGHNIYOeMbnJWj82e').then((result)=>{
                  console.log('Email sent successfuly')
                }).catch((err)=>{
                  console.log(err)
                })

                ///////



                apis.updateBookQuantity(id).then(()=>{
                  console.log("Book quantity decreased by 1.")
                }).catch(err=>{
                  console.log(err)
                })

                window.alert("Request Accepted");
                this.getIssueRequest();
        }).catch( (err) => {
            console.log (err)
        })
   }





   handleDelete = (id,email,bookname) => {

      apis.deleteRequest(id,email).then( () => {


        const template_params = {
          to_email : email,
          message:'Your issue request for the book titled ' + bookname + ' has been declined by the administration.'
        }
        
        emailjs.send('service_ax2soxx', 'template_a4f9h8r', template_params, 'user_6EEHYGHNIYOeMbnJWj82e').then((result)=>{
          console.log('Email sent successfuly')
        }).catch((err)=>{
          console.log(err)
        })


        window.alert("Request deleted")
        this.getIssueRequest();
      }).catch( (err) => {
          console.log(err)
      })
   }




    render() 
    { 
        return ( 
        <div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Book ID</TableCell>
            <TableCell align="right">Book Name</TableCell>
            <TableCell align="right">User Email</TableCell>
            <TableCell align="right">Request Date</TableCell>
            <TableCell align="right">Number of Days</TableCell>
            <TableCell align="right">Accept</TableCell>
            <TableCell align="right">Decline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.requests.map((req) => (
            <TableRow
              key={req.bookid + req.useremail}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{req.bookid}</TableCell>
              <TableCell align="right">{req.bookname}</TableCell>
              <TableCell align="right">{req.useremail}</TableCell>
              <TableCell align="right">{req.requestDate}</TableCell>        
              <TableCell align="right">{req.numberOfDays}</TableCell>
              <TableCell align="right">{ <CheckCircleIcon onClick = { () => this.handleAccept(req.bookid , req.useremail, req.bookname)} />} </TableCell>
              <TableCell align="right">{ <CancelIcon onClick = { () => this.handleDelete(req.bookid,req.useremail, req.bookname)}/>}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
        );      
    }
}


export default RequestList
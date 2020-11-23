import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect } from 'react';
const SeatReset = () => {
    const [Allticket,SetAllTicket] = useState([]);
    useEffect( () => {
      loadTable();
    },[])

    const loadTable = () => {
      axios.get(`http://localhost:8071/getAllTicket`)
      .then((doc) => {
        console.log(doc.data)
        SetAllTicket(doc.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }



    const onClickReset = (e) => {
        swal({
            title: "ต้องการที่จะรีเซ็ทที่นั่งทั้งหมดใช่หรือไม่",
            text: "เมื่อรีเซ็ทแล้วที่นั่งทุกสาขาจะกลับมาเต็มทั้งหมด",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            
            axios.post('http://localhost:8071/resetallseat')
            .then(() => {
              loadTable();
              window.location.reload()
            })
            
            } else {
              
            }
          });
    }

    const onDeleteTicket = (ticketId) => {
      swal({
        title: `ต้องการที่จะลบ ${ticketId} ใช่หรือไม่`,
        text: "เมื่อลบแล้วข้อมูลจะหายไปจากระบบไม่สามารถย้อนกลับได้",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.post(`http://localhost:8071/deleteTicket/${ticketId}`)
          .then((doc) => {
            swal(doc.data,"","success").then(() => loadTable())
          }).catch((err) => {
            console.log(err)
          })
        } else {
          
        }
      });
      

      
    }

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);
    const useStyles = makeStyles({
      table: {
        minWidth: 700,
      },
    });
    
    const classes = useStyles();
    
    
    return (
        <div>
            <Button onClick={(e) => onClickReset(e)} variant="contained" color="secondary" >RESET</Button>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Ticket Id</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
            <StyledTableCell align="right">Seat</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Tel</StyledTableCell>
            <StyledTableCell align="right">X</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Allticket.map((ticket) => (
            <StyledTableRow key={ticket.id}>
              <StyledTableCell component="th" scope="row">
                {ticket.id}
              </StyledTableCell>
              <StyledTableCell align="right">{ticket.name}</StyledTableCell>
              <StyledTableCell align="right">{ticket.location}</StyledTableCell>
              <StyledTableCell align="right">{ticket.time}</StyledTableCell>
              <StyledTableCell align="right">{ticket.seat}</StyledTableCell>
              <StyledTableCell align="right">{ticket.date}</StyledTableCell>
              <StyledTableCell align="right">{ticket.tel}</StyledTableCell>
              <StyledTableCell onClick={ () => onDeleteTicket(ticket.id)} style={{cursor:'pointer'}} align="right"><span style={{color:'red',fontWeight:'bold'}}>X</span></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default SeatReset

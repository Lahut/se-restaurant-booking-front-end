import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import classes from './styles/Booking.module.css';
import axios from 'axios';
import swal from 'sweetalert';
const Booking = () => {

    const [formData,SetFormData] = useState({
        name : '',
        tel:'',
        time:'',
        location:'',
        seat:0
    })

    const [duration,SetDuration] = useState({
        durations : []
    })


    const onChangeForms = (e) => {
        if(e.target.name === "location"){
            axios.get(`http://localhost:8071/getDurations/${e.target.value}`)
            .then((doc) => {
                SetDuration({
                    durations : doc.data.durations
                })
            })
            .catch((err) => {
                console.log(err)
            })  
        }

        SetFormData({...formData,[e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8071/addTicket',formData)
        .then((doc) => {
            if(doc.data === "ขออภัยจำนวนที่นั่งไม่พอค่ะ"){
                swal(`${doc.data}`,"","error")
            }else{
                swal(`ทำการจองสำเร็จ!`, `รหัสที่นั่ง : ${doc.data}`, 
                "success");
                SetFormData({
                    name : '',
                    tel:'',
                    time:'',
                    location:'',
                    seat:0
                })
            }
            
        })
        .catch((err) => {
            console.log(err);
        })
        //console.log(formData)

    }





    return (
        <Grid container spacing={3}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className={classes.BookForm}>
                        <h1 >BOOK A SEAT</h1>
                        <br />
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <TextField 
                                id="standard-basic"
                                required id="standard-required" 
                                label="ชื่อ-นามสกุล" 
                                name="name" 
                                value={formData.name}
                                onChange={ (e) => onChangeForms(e)}/>
                            <br/>
                            <br/>
                            <br/>
                            <TextField 
                                id="standard-basic"
                                required id="standard-required" 
                                label="เบอร์โทรศัพท์" 
                                type="number"
                                name="tel"
                                value={formData.tel}
                                onChange={ (e) => onChangeForms(e)}/>
                            <br/>
                            <br/>
                            <br/>
                            <TextField 
                                id="standard-basic"
                                required id="standard-required"  
                                label="จำนวนที่นั่ง"
                                name="seat"
                                InputProps={{
                                
                                    inputProps: { min: 1 }
                                    
                                }}
                                type="number"
                                value={formData.seat}
                                onChange={ (e) => onChangeForms(e)} 
                            />
                            <br/>
                            <br/>
                            <br/>
                            <InputLabel  id="demo-simple-select-label">สาขา</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    style={{minWidth:'12rem'}}
                                    name="location"
                                    value={formData.location}
                                    onChange={ (e) => onChangeForms(e)}
                                    >
                                    
                                    <MenuItem value={"Esplanade-Ngamwongwan-Khae-Rai"}>เอสพลานาด งามวงศ์วาน แคราย</MenuItem>
                                    <MenuItem value={"Major-Ratchayothin"}>เมเจอร์ รัชโยธิน</MenuItem>
                                    <MenuItem value={"Pinklao"}>ปิ่นเกล้า</MenuItem>
                                </Select>
                              
                            
                                
                            <br/>
                            <br/>
                            <br/>
                            <InputLabel  id="demo-simple-select-label">ช่วงเวลา</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    style={{minWidth:'12rem'}}
                                    value={formData.time}
                                    name="time"
                                    onChange={ (e) => onChangeForms(e)}
                                    >
                                    {/* <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem> */}
                                    
                                    {duration.durations.map( (Etime) => {
                                        return <MenuItem value={Etime.time}>{Etime.time} น. 
                                        { Etime.status ?  <span><span style={{color:'green',fontWeight:'bold'}}>{`   ว่าง `}</span>
                                        {`${Etime.seat} ที่`}</span> : <span style={{color:'red'}}>เต็ม</span>}</MenuItem>
                                    })} 
                                </Select>
                                <br/>
                                <br/>
                                <br/>

                                <Button type="submit" variant="contained" color="primary">
                                    จองที่นั่ง
                                </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Booking

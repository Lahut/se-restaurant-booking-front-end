import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
const Login = () => {
    let history = useHistory();
    const [AdminData,SetAdminData] = useState({
        email : '',
        password : ''
    });

    const OnChangeText = (e) => {
        SetAdminData({...AdminData,[e.target.name] : e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(AdminData.email === 'admin@admin.com' && AdminData.password === 'admin1234'){
            localStorage.setItem("Token",'2d3871165e008a526004b0a8bc640e175c10922c0f14daaf9f5f8eae43fcdd35')
            //2d3871165e008a526004b0a8bc640e175c10922c0f14daaf9f5f8eae43fcdd35
            swal("Login successfully.","","success").then(() => {
                history.push('/seatreset')  
                window.location.reload(); 
            })
           
            

        }

    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <form onSubmit={ (e) => handleSubmit(e)}>
                <h1 style={{textAlign:'center',marginTop:'20px'}}>SUSHIKUNG ADMIN LOGIN</h1>
                <TextField
                    id="filled-full-width"
                    label="Email"
                    name="email"
                    value={AdminData.email}
                    onChange={(e) => OnChangeText(e)}
                    style={{backgroundColor:'white',width:"50%"}}
                    placeholder="Email"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style : { color : 'black'}
                    }}
                    variant="filled"
                />
                <br/>
                <TextField
                    id="filled-full-width"
                    label="Password"
                    name="password"
                    value={AdminData.password}
                    onChange={(e) => OnChangeText(e)}
                    style={{marginLeft:'75.5px',backgroundColor:'white',width:"50%"}}
                    placeholder="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style : { color : 'black'}
                    }}
                    variant="filled"
                />
                <Button style={{position:'relative',right:'300px',top:'100px'}} type="submit" variant="contained" color="primary">Login</Button>
            </form>
            </Grid>
        </Grid>
    )
}

export default Login

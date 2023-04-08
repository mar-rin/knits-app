import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";


export default function Detail({ active }) {
    
    const navigate = useNavigate();
    
    function FormField({ placeholder, title }) {
      return (
        <Grid item xs={12} md={6}>
            <h4>{title}</h4>
            <Box
                component="form"
                sx={{'& > :not(style)': { m: 1, width: '100%' }}}
                noValidate
                autoComplete="off"
                >
                <TextField 
                    id="filled-basic"
                    placeholder={placeholder}
                    variant="filled"
                />
            </Box>
        </Grid>
      );
    }

    return (
        <div className='wrapper'>
            <div className="detail-head"></div>
            <div className="white-box">
                <h3>SHIPMENT DETAIL</h3>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <FormField placeholder={active[0].orderNo} title="orderNo" />
                        <FormField placeholder={active[0].date} title="date"/>
                        <FormField placeholder={active[0].customer} title="customer"/>
                        <FormField placeholder={active[0].trackingNo} title="trackingNo"/>
                        <FormField placeholder={active[0].consignee} title="consignee"/>
                        <FormField placeholder={active[0].status} title="status"/>
                    </Grid>
                </Box>
                <div className="button-block confirm">
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" style={{ backgroundColor: "#2196f3" }}>SAVE</Button>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button 
                            variant="contained" 
                            style={{ backgroundColor: "#ff3d00" }}
                            onClick={()=>navigate("/")}
                            >CANCEL</Button>
                    </Stack>
                </div>
        
            </div>
        </div>
        
    )
}
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { fieldNames } from '../utils/fieldNames';
import { useParams } from "react-router-dom";


export default function Detail({ data, handleChange, handleSave }) {
    
    const navigate = useNavigate();
    const disabledFields = [false, false, false, true, false];
    let { shipment } = useParams();
    const activeData = data.filter(item => item.trackingNo === shipment);
    console.log("Shipment " + shipment)


    return (
        <div className='wrapper'>
            <div className="detail-head"></div>
            <div className="white-box">
                <h3>SHIPMENT DETAIL</h3>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                    {fieldNames.map((item, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <h4>{item}</h4>
                            <Box
                                component="form"
                                sx={{'& > :not(style)': { m: 1, width: '100%' }}}
                                noValidate
                                autoComplete="off"
                                >
                                <TextField 
                                    name={item}
                                    id="filled-basic"
                                    placeholder={activeData[0][item]}
                                    variant="filled"
                                    onChange={handleChange}
                                    disabled={disabledFields[index]}
                                />
                            </Box>
                        </Grid>))}
                    </Grid>
                </Box>
                <div className="button-block confirm">
                    <Stack direction="row" spacing={2}>
                        <Button 
                            variant="contained" 
                            style={{ backgroundColor: "#2196f3" }}
                            onClick={ handleSave }
                            >SAVE</Button>
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
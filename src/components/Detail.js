import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { fieldNames } from '../utils/fieldNames';
import { useParams, useNavigate } from "react-router-dom";


export default function Detail({ tempData, handleChange, handleSave }) {

    const disabledFields = [false, false, false, true, false];
    const navigate = useNavigate();

    return (
        <div>
            { (tempData)
            ? <div className='wrapper'>
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
                                            placeholder={tempData[item]}
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
            : <h2>IS FETCHING</h2> }
        </div>
    )
}
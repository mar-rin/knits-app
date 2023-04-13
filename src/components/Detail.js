import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { fieldNames } from '../utils/fieldNames';


export default function Detail({ selectedShipment }) {

    const disabledFields = [false, false, false, true, false];
    const navigate = useNavigate();
    const activeItem  = useSelector(state => state.shipments.filter(item => item.trackingNo === selectedShipment));
    const dispatch = useDispatch();
    const [tempData, setTempData] = useState([{
        orderNo: activeItem[0].orderNo,
        date: activeItem[0].date,
        customer: activeItem[0].customer,
        trackingNo: activeItem[0].trackingNo,
        status: activeItem[0].status,
        consignee: activeItem[0].consignee
    }]);

    console.log("TEmpData initial from D: " + tempData[0].customer)

    function onChange(e) {
        for (let key in tempData[0]) {
            console.log("Item value by key, from D: " + activeItem[0][key])
            if (key === e.target.name) {
                if(e.target.value !== ""){
                    setTempData([{...tempData[0], [key]: e.target.value}]);
                    break;
                }else{
                    setTempData([{...tempData[0], [key]: activeItem[0][key]}]);
                    break;
                }
            }
        }
    }

    console.log("tempData customer from D: " + tempData[0].customer)

    function handleSave() {
        const editedDate = tempData[0].date;
        const pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        const isValidDate = pattern.test(editedDate);
        if (!isValidDate) {
            alert("Invalid date format! Please check input.")
            return;
        } else if (!(tempData[0].status.includes("'Shipped'") ||
            tempData[0].status.includes("'In Transit'") ||
            tempData[0].status.includes("'Delivered'")))
        {
            alert("Status is not correct. Can be 'Shipped', 'In Transit' or 'Delivered'");
            return;
        } else {
            dispatch({
                type: 'shipmentEdited',
                payload: {
                    id: activeItem[0].trackingNo,
                    editedData: {
                        orderNo: tempData[0].orderNo,
                        date: tempData[0].date,
                        customer: tempData[0].customer,
                        trackingNo: tempData[0].trackingNo,
                        status: tempData[0].status,
                        consignee: tempData[0].consignee}
                }
            });
        }
        navigate("/");
    }

    return (
        <div>
            { (selectedShipment)
            ? <div className='wrapper'>
                <div className="detail-head"></div>
                <div className="white-box">
                    <h3>SHIPMENT DETAIL</h3>
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={3}>
                            {fieldNames.map((item, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <h4>{item}</h4>
                                    <Box
                                        component="form"
                                        sx={{'& > :not(style)': {m: 1, width: '100%'}}}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            name={item}
                                            id="filled-basic"
                                            /*placeholder="testing"*/
                                            placeholder={activeItem[0][item]}
                                            variant="filled"
                                            onChange={onChange}
                                            disabled={disabledFields[index]}
                                        />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <div className="button-block confirm">
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                style={{backgroundColor: "#2196f3"}}
                                onClick={handleSave}
                            >SAVE</Button>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                style={{backgroundColor: "#ff3d00"}}
                                onClick={() => navigate("/")}
                            >CANCEL</Button>
                        </Stack>
                    </div>
                </div>
            </div>
            : <h2>IS FETCHING</h2> }
        </div>
    )
}













/*
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
}*/

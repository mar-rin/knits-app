import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';


export default function GeneralTable({ handleEdit }) {

  const shipments  = useSelector(state => state.shipments);
  const fetching = useSelector(state => state.fetching);
  const dispatch = useDispatch();
  const [customerSorted, setCustomerSorted] = useState(false);
  const [dateSorted, setDateSorted] = useState(false);

  function handleCustomerSort() {
    if(customerSorted) {
      dispatch({ type: 'customerSortedDescending' });
      setCustomerSorted(false);
    } else {
      dispatch({ type: 'customerSortedAscending' });
      setCustomerSorted(true);
    }
  }

  console.log("CustomerSorted from GT: " + customerSorted)

  function handleDateSort() {
    if(dateSorted) {
      dispatch({ type: 'dateSortedDescending' });
      setDateSorted(false);
    } else {
      dispatch ({ type: 'dateSortedAscending' });
      setDateSorted(true);
    }
  }

  return (
      <>
      { (fetching)
      ? <h1>Please wait a moment... data is being fetched</h1>
      : <div>
        <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className='table-header'>
              <TableCell>ORDERNO</TableCell>
              <TableCell align="left">DELIVERYDATE
                <IconButton
                    id="sort-date"
                    onClick={handleDateSort}>
                  <SortByAlphaIcon style={{ color: "#2196f3" }}  />
                </IconButton>
              </TableCell>
              <TableCell align="left" id="customer"><div id="customer-label">CUSTOMER</div>
                <IconButton
                    id="sort-customer"
                    onClick={handleCustomerSort}>
                  <SortByAlphaIcon style={{ color: "#2196f3" }}  />
                </IconButton></TableCell>
              <TableCell align="left">TRACKINGNO</TableCell>
              <TableCell align="left">STATUS</TableCell>
              <TableCell align="left">CONSIGNEE</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((item) => (
                <TableRow
                    key={item.trackingNo}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row"  style={{ color: "rgb(104, 104, 104)"}}>{item.orderNo}</TableCell>
                  <TableCell align="left" style={{ color: "rgb(104, 104, 104)"}}>{item.date}</TableCell>
                  <TableCell align="left" style={{ color: "rgb(104, 104, 104)"}}>{item.customer}</TableCell>
                  <TableCell align="left" style={{ color: "rgb(104, 104, 104)"}}>{item.trackingNo}</TableCell>
                  <TableCell align="left" style={{ color: "rgb(104, 104, 104)"}}>{item.status}</TableCell>
                  <TableCell align="left" style={{ color: "rgb(104, 104, 104)"}}>{item.consignee}</TableCell>
                  <TableCell align="left" >
                    <div className="button-block">
                      <Stack spacing={1} direction="row" >
                        <IconButton
                            aria-label="edit"
                            id={item.trackingNo}
                            onClick={handleEdit}>
                          <EditIcon style={{ color: "#2196f3" }}  />
                        </IconButton>
                      </Stack>
                      <Stack spacing={1} direction="row">
                        <IconButton
                            aria-label="delete"
                            id={item.trackingNo}
                            onClick={()=>dispatch({ type: 'shipmentDeleted', payload: item.trackingNo })}>
                          <DeleteIcon style={{ color: "#ff3d00" }}  />
                        </IconButton>
                      </Stack>
                    </div>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      }
      </>
  )
}
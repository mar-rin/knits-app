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


export default function GeneralTable({ data, handleSort, handleSortDate, handleEdit, handleDelete }) {

  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>ORDERNO</TableCell>
            <TableCell align="left">DELIVERYDATE
              <IconButton
                  aria-label="edit"
                  id="sort-date"
                  onClick={handleSortDate}>
                <SortByAlphaIcon style={{ color: "#2196f3" }}  />
              </IconButton>
            </TableCell>
            <TableCell align="left" id="customer"><div id="customer-label">CUSTOMER</div>
              <IconButton
                  aria-label="edit"
                  id="sort-customer"
                  onClick={handleSort}>
                <SortByAlphaIcon style={{ color: "#2196f3" }}  />
              </IconButton></TableCell>
            <TableCell align="left">TRACKINGNO</TableCell>
            <TableCell align="left">STATUS</TableCell>
            <TableCell align="left">CONSIGNEE</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, id) => (
            <TableRow
              key={id}
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
                      onClick={handleDelete}>
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
  );
}

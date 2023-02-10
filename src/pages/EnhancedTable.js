import React from "react";
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { EnhancedTableHead } from "../components/Table/EnhancedTableHead";
import { EnhancedTableBody } from "../components/Table/EnhancedTableBody";


export const EnhancedTable = (props)=>{
        const {data,headCells,postsPerPage,handleEdit,handleDelete,selected,setSelected,}=props;
        const [order, setOrder] = React.useState('asc');
        const [orderBy, setOrderBy] = React.useState('');
        const [page, setPage] = React.useState(0);
       
        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };
        const onRequestSort = (event, property) => {
          const isAsc = orderBy === property && order === 'asc';
          setOrder(isAsc ? 'desc' : 'asc');
          setOrderBy(property);
        };

          function descendingComparator(a, b, orderBy) {
            if (b[orderBy] < a[orderBy]) {
              return -1;
            }
            if (b[orderBy] > a[orderBy]) {
              return 1;
            }
            return 0;
          }
          
          function getComparator(order, orderBy) {
            return order === 'desc'
              ? (a, b) => descendingComparator(a, b, orderBy)
              : (a, b) => -descendingComparator(a, b, orderBy);
          }
        const isSelected = (name) => selected.indexOf(name) !== -1;
       
        const handleClick = (event, name) => {
          const selectedIndex = selected.indexOf(name);
          let newSelected = [];
          if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
          } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
          } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
          } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
              selected.slice(0, selectedIndex),
              selected.slice(selectedIndex + 1),
            );
          }
          setSelected(newSelected);
        };

        const handleSelectAllClick = (event) => {
          console.log(event.target.checked)
          if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
          }
          setSelected([]);
        };

  
    return(
        <>
         <TableContainer component={Paper}>
         <Table sx={{ minWidth: 700 }} aria-label="customized table">
         <EnhancedTableHead 
         headCells={headCells} 
         orderBy={orderBy} 
         order={order} 
         createSortHandler={createSortHandler} 
         onSelectAllClick={handleSelectAllClick}
         numSelected={selected.length}
         rowCount={data.length}
         />
        <EnhancedTableBody 
        order={order} 
        orderBy={orderBy} 
        getComparator={getComparator} 
        page={page} 
        rowsPerPage={postsPerPage} 
        data={data} 
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isSelected={isSelected}
        handleClick={handleClick}
        selected={selected}
        />
         </Table>
         </TableContainer>
        </>
    );
}
import { Button, TableBody, TableCell, TableRow,Checkbox } from '@mui/material'
import React from 'react'

export const EnhancedTableBody = (props) => {
    const {handleEdit,handleDelete,data,page,rowsPerPage,getComparator,order,orderBy,isSelected,handleClick,selected} = props;

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
          return order;
        }
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }
  return (
    <>
      <TableBody>
        {(rowsPerPage > 0
            ? stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((datas,i)=>
          {
             const isItemSelected = isSelected(datas.id);
             const labelId = `enhanced-table-checkbox-${i}`;
            return(
                <TableRow key={i}
                hover
              
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                selected={isItemSelected}
                >
                    <TableCell   onClick={(event) => handleClick(event, datas.id)} padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                <TableCell align="left">{datas.title}</TableCell>
                <TableCell align="right">{datas.userId}</TableCell>
                <TableCell align="right">{datas.id}</TableCell>
                <TableCell align="right">{datas.completed === true ?("yes"):("no")}</TableCell>
                <TableCell align="center">
                  {selected.length !=0 ?(  <Button disabled onClick={(e)=>handleEdit(e,datas,i)}>Edit</Button>):(  <Button  onClick={(e)=>handleEdit(e,datas,i)}>Edit</Button>)}
                
                  {/* <Button onClick={()=>handleDelete(datas.id)}>Delete</Button> */}
                </TableCell>
                </TableRow>
            )}
            )}
            
        </TableBody>
    </>
  )
}

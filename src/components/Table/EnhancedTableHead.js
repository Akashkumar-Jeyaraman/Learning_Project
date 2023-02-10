import { Box, TableCell, TableHead, TableRow, TableSortLabel,Checkbox } from '@mui/material'
import React from 'react'
import { visuallyHidden } from '@mui/utils';

export const EnhancedTableHead = (props) => {
    const {headCells,orderBy,order,createSortHandler,onSelectAllClick,numSelected,rowCount} = props
  
  return (
    <>
      <TableHead>
        <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
             <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
        
          </TableCell>
        ))}
        </TableRow>
        </TableHead>
    
    </>
  )
}

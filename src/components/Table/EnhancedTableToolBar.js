import { Modal, Box,Tooltip,  Button } from '@mui/material'
import React,{useState,useEffect} from 'react'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AddForm } from '../AddForm';
import { Search } from '../common/Search';
import { useSelector,useDispatch } from 'react-redux';
import {
  updateData,
  createData
} from "../../features/UserSlice"

export const EnhancedTableToolBar =(props)=>{
    const {data,edData,handleAdd,handleClose,open,edited,name,uid,comp,setName,setUid,setComp,editId,setInputSearch}=props

    const dispatch = useDispatch();


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 4,
  };

  const handleSubmit =(e)=>{
    console.log("submited")
    e.preventDefault()
    dispatch(createData({
      userId:uid,
      title:name,
      completed:comp
    }))

//   setTableData([...data,{
//     userId:uid,
// id:data.length+1,
// title:name,
// completed:comp
// }])
    handleClose()
    console.log(data)
  }
  const handleUpdate=(e,id)=>{
    e.preventDefault()
    dispatch(updateData({
      id:id,
      userId:uid,
      title:name,
      completed:comp
      }))
    // const newData = data.map((dd)=>
    // dd.id === id ?{...dd, title:name,completed:comp,userId:uid} : dd
    // )
    // console.log(newData,"newData")
    // setTableData(newData)
      handleClose()
    }
    return(
        <>
        <Toolbar>
         <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          align='left'
        >
         User List
        </Typography>
        
        <Tooltip title="search user">
        <div>
        <Search setInputSearch={setInputSearch}/>
        </div>
        </Tooltip>

        <Tooltip title="add User">
        <Button onClick={handleAdd}>Add</Button>
        </Tooltip>
        </Toolbar>
     
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
       <AddForm 
       handleSubmit={handleSubmit} 
       handleUpdate={handleUpdate}
       name={name}
       setName={setName}
       uid={uid}
       setUid={setUid}
       comp={comp}
       setComp={setComp}
       edData={edData} 
       edited={edited} 
       editId={editId}
       />
        </Box>
      </Modal>
     
        </>
    )
}
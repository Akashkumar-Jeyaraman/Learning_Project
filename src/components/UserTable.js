import { Pagination } from "./common/Pagination";
import React, { useState } from "react"
import { EnhancedTable } from "../pages/EnhancedTable";
import { EnhancedTableToolBar } from "./Table/EnhancedTableToolBar";
import { Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import {
    deleteData
  } from "../features/UserSlice"

export const UserTable = (props)=>{
const {data,headCells,title} = props;
const [open, setOpen] = useState(false);
const [edData,setEdData]= useState({})
const [edited,setEdited] = useState(false)
const [name,setName]=useState("")
const [uid,setUid]=useState(0)
const [comp,setComp]=useState(false)
const [selected, setSelected] = useState([]);


const dispatch = useDispatch()


const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);

const handleAdd=()=>{
    setOpen(true)
}

const handleClose=()=>{
    setOpen(false)
    setEdited(false)
}

const handleEdit = (e,data,index)=>{
    e.preventDefault();
    setEdited(true)
    handleAdd()
    setName(data.title)
    setUid(data.userId)
    setComp(data.completed)
    const restValue = data
    setEdData(restValue)
}

const handleDelete = (id)=>{
    dispatch(deleteData(id))
}

const handleDeleteAll=(e,rowData)=>{
   e.preventDefault()
    rowData.map((rd) => 
   ( dispatch(deleteData(rd)))
    );
    setSelected([])
}

    return(
        <>
        <h1>{title}</h1>
        <EnhancedTableToolBar 
        data={data} 
        edData={edData} 
        handleAdd={handleAdd} 
        handleClose={handleClose} 
        open={open} 
        edited={edited}
        name={name}
        setName={setName}
        uid={uid}
        setUid={setUid}
        comp={comp}
        setComp={setComp}
        />
        <EnhancedTable 
        handleDelete={handleDelete} 
        handleEdit={handleEdit}
        data={currentPosts} 
        headCells={headCells} 
        postsPerPage={postsPerPage}
        selected={selected}
        setSelected={setSelected}
        />
        <br/>
        {selected.length != 0 ? ( <Button  onClick={(e)=>handleDeleteAll(e,selected)}>Delete</Button>):( <Button sx={{visibility:"hidden"}} onClick={(e)=>handleDeleteAll(e,selected)}>Delete</Button>)}
        <br/>
        <Pagination
        className="pagination-bar"
         data={data}
         paginate={paginate}
         setPostsPerPage={setPostsPerPage}
         postsPerPage={postsPerPage}
         currentPage={currentPage}
         onPageChange={page => setCurrentPage(page)}
        />
        </>
    );
}
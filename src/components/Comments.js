import React,{createContext, useEffect,useState} from 'react'
import { UserTable } from './UserTable'
import { useSelector,useDispatch } from 'react-redux';
import {
  getData,
  UserSelector,
  updateData,
  createData,
  deleteData
} from "../features/UserSlice"
import { Button } from '@mui/material';

export const UserContext = createContext(null)

const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    align:"left",
  },
  {
    id: 'userId',
    numeric: true,
    disablePadding: false,
    label: 'UserId',
    align:"right",
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Id',
    align:"right",
  },
 {
    id: 'completed',
    numeric: true,
    disablePadding: false,
    label: 'Completed',
    align:"right",
  },
  {
     id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
    align:"center",
  }
];

export const Comments = ()=>{

const [inputSearch,setInputSearch]=useState("")
const dispatch = useDispatch();


const {userList} =useSelector(UserSelector)


console.log(userList,"ul")
   useEffect(()=>{
   dispatch(getData())//eslint-disable-next-line
   },[]) 


// const handleCreate=()=>{
//   dispatch(createData({
//     userId:1,
//     title:"Akash",
//     completed:true
//     }))
// }

// const handleUpdate=(e,id)=>{
//   e.preventDefault()
//   dispatch(updateData({
//     id:2,
//     userId:1,
//     title:"Akash",
//     completed:true
//     }))
// }

// const handleDelete=(e,id)=>{
//   e.preventDefault()
//   dispatch(deleteData(id))
// }

const resData=(datasource)=>{
    return datasource.filter((row)=>{
        return row.title.includes(inputSearch)    
    })
}
    return(
        <>     
        <UserContext.Provider value={{setInputSearch}}>
        <UserTable  
        title="User Table"
        headCells={headCells} 
        data={resData(userList)} 
        />
        <br />
        {/* <Button onClick={handleCreate} >Create</Button>
        <Button onClick={(e)=>handleUpdate(e,2)} > Update</Button>
        <Button onClick={(e)=>handleDelete(e,5)}>Delete</Button> */}
        </UserContext.Provider>
        </>
    );
}